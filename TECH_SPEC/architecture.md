# Auvia Technical Specification — Platform Architecture

Ce document définit l'architecture système globale d'Auvia. Elle est conçue pour être robuste, sécurisée, hautement disponible et conforme aux exigences strictes de protection des données professionnelles et réglementaires.

---

## 1. Principes Directeurs d'Architecture

* **Sécurité & Confidentialité des Données (Privacy by Design) :** Les protocoles internes d'un cabinet sont strictement confidentiels. L'isolation des locataires (multi-tenancy) doit être garantie à tous les niveaux.
* **Architecture Agnostique (IA & Cloud) :** Les moteurs d'IA et l'infrastructure d'hébergement doivent pouvoir être migrés ou interchangés sans réécriture complète du code (utilisation d'interfaces abstraites).
* **Mode Spec-Driven-Development :** Chaque couche applicative possède des contrats d'interface stricts et testables de bout en bout.

---

## 2. Schéma Conceptuel de l'Architecture

```
                                    +-----------------------+
                                    |   Client Web/Mobile   |
                                    |    (React / Vite)     |
                                    +-----------+-----------+
                                                |
                                                | HTTPS / JSON
                                                v
                                    +-----------+-----------+
                                    |     API Gateway       |
                                    +-----------+-----------+
                                                |
                +-------------------------------+-------------------------------+
                |                                                               |
                v                                                               v
    +-----------+-----------+                                       +-----------+-----------+
    |  Service Utilisateurs  |                                       |   Service Documents   |
    |  & Auth (Multi-tenant) |                                       |      & Protocoles     |
    +-----------+-----------+                                       +-----------+-----------+
                |                                                               |
                |                                                               | Extraction /
                |                                                               | Vectorisation
                |                                                               v
                |                                                   +-----------+-----------+
                |                                                   |  RAG Engine & LLM     |
                |                                                   |   (Interface agnost.) |
                |                                                   +-----------+-----------+
                |                                                               |
                +-------------------------------+-------------------------------+
                                                |
                                                v
                                    +-----------+-----------+
                                    |      Base PostgreSQL  |
                                    |   (Relationnel +      |
                                    |    pgvector + RLS)    |
                                    +-----------------------+
```

---

## 3. Description des Couches Applicatives

### 3.1 Couche Présentation (Frontend)
* **Stack technologique :** Application SPA moderne en React + TypeScript, propulsée par Vite pour des performances optimales.
* **Design :** Intégration de Tailwind CSS en respectant rigoureusement la charte esthétique définie dans `DESIGN.md`.
* **Réseau :** Appels d'API REST asynchrones pour les requêtes de données, et WebSockets ou SSE (Server-Sent Events) pour le streaming des réponses de l'IA (RAG Chat).

### 3.2 Couche API Gateway & Services Backend
* **Rôle :** Routage des requêtes, gestion de la limitation de débit (rate limiting), authentification et validation des jetons JWT.
* **Sécurité Multi-Tenant :** Chaque requête API entrante doit porter l'identifiant du locataire (`tenant_id`) validé par le jeton d'authentification. Aucune requête ne peut interroger la base de données sans ce filtre.

### 3.3 Couche Intelligence Artificielle & RAG Engine
* **Rôle :** Orchestration du flux de recherche d'informations (Retrieve) et de génération de texte (Generate).
* **Agnosticisme LLM :** Encapsulation des appels LLM derrière un adaptateur unifié (`ILLMProvider`) permettant d'interchanger le fournisseur (OpenAI, Anthropic, Mistral AI ou LLM local) par simple configuration d'environnement.

---

## 4. Sécurité & Conformité de l'Hébergement

* **Isolation au niveau de la base de données :** Utilisation des politiques de sécurité au niveau des lignes de PostgreSQL (Row-Level Security - RLS). Chaque table contenant des données spécifiques à un cabinet possède une politique :
  ```sql
  CREATE POLICY tenant_isolation_policy ON protocols
  USING (tenant_id = current_setting('app.current_tenant_id'));
  ```
* **Chiffrement :**
  * Toutes les données en transit sont chiffrées via HTTPS (TLS 1.3).
  * Les fichiers de protocoles stockés sur le serveur sont chiffrés au repos (AES-256).
* **Hébergement des Données de Santé (HDS) :** Dans la perspective du marché de la santé en France, toute infrastructure de production d'Auvia doit être déployée sur un cloud certifié HDS (Hébergeur de Données de Santé) et conforme RGPD.
