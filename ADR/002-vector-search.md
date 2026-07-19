# Architectural Decision Record (ADR) — 002: Vector Search with pgvector

* **ID :** 002
* **Titre :** Utilisation de l'extension pgvector pour la recherche vectorielle et le RAG
* **Statut :** Accepté (Accepted)
* **Date :** Février 2026
* **Auteur :** Jules (Lead Engineer)

---

## 1. Contexte & Problématique

Pour implémenter la recherche conversationnelle (RAG Chat) et l'alignement intelligent de protocoles, Auvia doit stocker et interroger des représentations vectorielles (embeddings) de morceaux de textes.

La solution choisie doit :
1. Permettre d'effectuer des recherches de similarité cosinus rapides et performantes sur des milliers de chunks.
2. Garantir la sécurité multi-tenant en combinant facilement des filtres relationnels (ex: `tenant_id = X`) avec la recherche sémantique.
3. Limiter la complexité de l'infrastructure en phase de démarrage du projet.

---

## 2. Décision

Nous choisissons d'utiliser l'extension **`pgvector`** de PostgreSQL pour stocker et interroger nos embeddings vectoriels.

---

## 3. Alternatives Envisagées

* **Bases de données vectorielles dédiées (Pinecone, Qdrant, Milvus) :** Elles offrent des performances exceptionnelles pour des millions ou milliards de vecteurs. Cependant, elles introduisent une deuxième base de données dans l'infrastructure, compliquant considérablement la synchronisation des données, les sauvegardes et surtout la gestion de la sécurité multi-tenant (qui nécessite de dupliquer ou de mapper les rôles applicatifs).
* **Recherche en mémoire :** Stocker les vecteurs en mémoire vive ou dans des fichiers de cache. Cette solution est inadaptée à une production multi-tenant et multi-utilisateurs nécessitant persistance et cohérence.

---

## 4. Conséquences

### Avantages (Consequences - Positive)
* **Simplicité opérationnelle :** Une seule base de données (PostgreSQL) gère à la fois les données relationnelles classiques et les données vectorielles. Pas de nouvelle dépendance d'infrastructure à administrer ou surveiller.
* **Filtres relationnels natifs & RLS :** On peut coupler dans la même requête SQL la recherche sémantique (pgvector) et des filtres relationnels ou des politiques d'isolation de données (Row Level Security) :
  ```sql
  SELECT * FROM vector_chunks
  INNER JOIN protocol_versions ON vector_chunks.version_id = protocol_versions.id
  INNER JOIN protocols ON protocol_versions.protocol_id = protocols.id
  WHERE protocols.tenant_id = 'current-tenant-uuid'
  ORDER BY embedding <=> '[vector_query]'
  LIMIT 5;
  ```
  PostgreSQL optimise automatiquement la requête en appliquant d'abord le filtrage de sécurité.
* **Performance :** L'indexation HNSW (Hierarchical Navigable Small World) supportée par `pgvector` offre des temps de réponse de l'ordre de la milliseconde pour nos volumes cibles.

### Inconvénients / Défis (Consequences - Negative)
* **Utilisation des ressources :** Le calcul de similarité et l'indexation HNSW sont intensifs en CPU et RAM. Il faudra monitorer la charge de la base de données PostgreSQL si le nombre d'utilisateurs et de documents augmente de manière exponentielle.
* **Mise à l'échelle :** Moins adapté qu'une base dédiée pour des volumes de plusieurs dizaines de millions d'embeddings par locataire (ce qui dépasse de loin les besoins de départ d'un cabinet de professionnels réglementés).
