# Feature Specification — F003: Document Upload & AI Revision Workflow

Cette spécification définit la gestion de l'import de documents (PDF, DOCX, TXT), l'extraction automatique, l'analyse de conformité, et le flux de révision guidée par l'IA d'Auvia.

---

## 1. Description & Contexte

Cette fonctionnalité est le cœur opérationnel d'Auvia. Elle permet d'importer le référentiel d'un cabinet, de le confronter automatiquement et en continu aux textes officiels, d'en extraire les écarts de conformité, et d'offrir une interface pas-à-pas de correction assistée par l'IA.

---

## 2. Récits Utilisateurs Associés

* **US-201 :** Import de protocoles internes.
* **US-202 :** Structuration et classification automatique.
* **US-301 :** Détection d'écarts de conformité en tâche de fond (No-Human-In-The-Loop).
* **US-302 :** Visualisation comparative des écarts (Diff-Viewer).
* **US-303 :** Génération et validation de la mise à jour par l'IA.

---

## 3. Spécifications Fonctionnelles

### 3.1 Pipeline de traitement à l'importation
Lors de l'upload d'un document par un `PRACTITIONER` ou un `ADMINISTRATOR` :
1. **Stockage brut :** Enregistrement sécurisé du fichier d'origine dans un stockage d'objets (Object Storage) chiffré.
2. **Extraction de texte :**
   * *PDF / DOCX :* Analyse par un moteur d'extraction de texte (OCR si nécessaire pour les PDF scannés).
   * *Résultat :* Génération d'un document au format texte brut épuré de tout bruit structurel.
3. **Analyse IA Initiale :** Classification thématique, tagging et découpage en morceaux (chunks) stockés dans `vector_chunks` via l'API d'embeddings.

### 3.2 Détection d'écarts et Alignement
Lorsqu'un connecteur automatique (No-Human-In-The-Loop) insère une nouvelle recommandation officielle pertinente :
* Un job d'alignement est déclenché.
* L'IA compare la recommandation et le protocole du cabinet.
* Si un écart (gap) est identifié, l'IA génère un objet d'écart comprenant : le paragraphe ciblé, l'explication textuelle du changement, et une suggestion d'écriture de remplacement.
* Le protocole passe au statut `OUTDATED` (`⚠ À vérifier`).

### 3.3 Visualisation et Édition comparative (Diff-Viewer & Editor)
* **Diff-Viewer :** Affichage côte-à-côte. Les différences sont surlignées de manière sémantique (et non purement syntaxique).
* **AI Suggestions Box :** Permet d'insérer le paragraphe réécrit par l'IA en un clic ou de l'éditer en ligne.
* **Validation de version :**
  * Si validée par un `ADMINISTRATOR` : Publication immédiate sous un nouveau numéro de version, ré-indexation vectorielle automatique, et notification du cabinet.
  * Si proposée par un `PRACTITIONER` : Enregistrement sous l'état `UNDER_REVIEW` (`En attente de validation`).

---

## 4. Flux de Données (Data Flow)

```
[Utilisateur] ──( Upload Fichier )──> [API Upload] ──( Sauvegarde )──> [S3 Storage / Local]
                                           │
                                    [Extractor Service] ──( Extrait Texte )──> [Text Content]
                                                                                   │
                                                                                   v
[HNSW Vector Index] <──( Vectorise )── [RAG Service] <──( Chunks )── [Chunker Service]
```

---

## 5. Critères d'Acceptation & Scénarios de Test

### Scénario 1 : Upload et classification automatique réussie
* **Étant donné que** le Praticien uploade un fichier `protocole-dasri.pdf`,
* **Quand** le pipeline termine l'analyse,
* **Alors** un nouveau protocole est créé avec la catégorie "Gestion des déchets" (détectée par l'IA), l'état "✓ Conforme", et le document est découpé et indexé en base vectorielle.

### Scénario 2 : Approbation d'une révision par l'administrateur
* **Étant donné qu'** un protocole est à l'état `UNDER_REVIEW` (avec un brouillon de révision proposé par un Praticien),
* **Quand** l'Administrateur clique sur `[Valider la révision]`,
* **Alors** la version courante du protocole passe de la v1.0 à la v2.0, le texte de la v2.0 est marqué comme actif, le statut du protocole repasse à `COMPLIANT`, et une notification est émise à toute l'équipe.
