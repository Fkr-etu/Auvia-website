# Auvia Technical Specification — Ingestion Connectors (No-Human-In-The-Loop)

Ce document décrit le fonctionnement et la spécification technique des connecteurs de surveillance d'Auvia. Ces composants ont pour mission de scanner les sources réglementaires officielles en continu, de récupérer les données textuelles de façon autonome, et d'alimenter le pipeline de conformité globale d'Auvia sans intervention humaine.

---

## 1. Pipeline de Surveillance et d'Ingestion Automatisée

Le pipeline de veille s'exécute à intervalles réguliers (toutes les nuits à 02:00) sous la forme de tâches planifiées (cron-jobs).

```
+------------------+     Requête HTTP / API     +--------------------+
|  Source Légale   |===========================>| Connector Scraper  |
|  (ex: HAS, JO)   |                            | (Spécifique source)|
+------------------+                            +---------+----------+
                                                          |
                                                          | Données normalisées (JSON)
                                                          v
                                                +--------------------+
                                                | Ingestion Engine   |
                                                | (Vérif doublons)   |
                                                +---------+----------+
                                                          |
                                                          | Nouveauté détectée
                                                          v
                                                +--------------------+
                                                | Alignement IA      |
                                                | (Calcul d'écarts)  |
                                                +--------------------+
```

---

## 2. Connecteurs Cibles Prioritaires

Les connecteurs sont modulaires et implémentent une structure commune.

### 2.1 Connecteur HAS (Haute Autorité de Santé)
* **Type de source :** Flux RSS officiels, API ouverte HAS, scraping sélectif de la section "Recommandations professionnelles".
* **Données récoltées :** Titre, spécialité médicale ciblée, date de publication, résumé exécutif, lien PDF du document source.
* **Fréquence :** 1 fois par jour.

### 2.2 Connecteur Légifrance / JORF (Journal Officiel de la République Française)
* **Type de source :** API Légifrance (via PISTE).
* **Données récoltées :** Nouveaux arrêtés et décrets classés sous les thématiques de santé publique, d'exercice libéral ou de déontologie.
* **Fréquence :** 1 fois par jour.

---

## 3. Gestion de l'Idempotence et du Cache

Pour éviter d'analyser plusieurs fois la même recommandation légale et de saturer l'infrastructure de traitement :

* **Clé d'idempotence (`source_checksum`) :** Chaque document officiel récupéré est haché (algorithme SHA-256 sur son contenu textuel brut).
* **Table de cache réglementaire (`raw_recommendations`) :**
  ```sql
  CREATE TABLE raw_recommendations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      source_name VARCHAR(100) NOT NULL, -- ex: 'HAS'
      external_id VARCHAR(255) NOT NULL, -- ex: URL ou ID API Légifrance
      source_checksum VARCHAR(64) UNIQUE NOT NULL, -- Hash SHA-256
      title VARCHAR(255) NOT NULL,
      published_at DATE NOT NULL,
      raw_content TEXT NOT NULL,
      extracted_metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  ```
  *Avant tout traitement IA, Auvia vérifie si le `source_checksum` est déjà présent dans la table.*

---

## 4. Pipeline d'Alignement Automatique (Analyse d'écarts)

Lorsqu'un nouveau document est inséré avec succès dans la table `raw_recommendations` :

1. L'Ingestion Engine extrait les métadonnées (Spécialités concernées, ex: *Chirurgie dentaire*).
2. Il effectue une requête en base de données pour identifier tous les cabinets (`tenants`) exerçant cette spécialité.
3. Pour chaque cabinet identifié, l'Ingestion Engine récupère l'intégralité de leurs protocoles actifs de cette catégorie.
4. Un job asynchrone d'IA est planifié : il prend le texte de la recommandation officielle, le texte du protocole interne du cabinet, et exécute un prompt d'analyse d'écart (gap analysis) :
   * S'il y a un écart : Le statut du protocole interne passe à `⚠ À vérifier` et une entrée est créée dans le Dashboard du cabinet (Action Board).
   * S'il n'y a aucun écart (le protocole du cabinet est déjà conforme ou le sujet est hors périmètre) : Aucun changement de statut, le silence radio est de mise (Zero effort UX).
