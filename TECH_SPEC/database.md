# Auvia Technical Specification — Database Schema

Ce document décrit le schéma relationnel de la base de données PostgreSQL d'Auvia. Le schéma intègre la gestion multi-tenant, le contrôle d'accès basé sur les rôles (RBAC), la gestion des versions de protocoles, et le stockage des embeddings vectoriels via `pgvector`.

---

## 1. Choix Technologiques & Conventions

* **SGBD :** PostgreSQL (Version 15+ recommandée).
* **Extension Vectorielle :** `pgvector` activée pour stocker et interroger les représentations vectorielles des documents.
* **Nomenclature :** Tables et colonnes écrites en `snake_case`, au pluriel pour les tables.
* **Clés Primaires :** Utilisation systématique de `UUIDv4` pour toutes les clés primaires afin de faciliter la distribution, la migration de données et la sécurité (non-déductibilité).

---

## 2. Schéma Conceptuel des Tables

```
+------------------+         +------------------+         +-------------------+
|     tenants      |         |      users       |         |   user_roles      |
+------------------+         +------------------+         +-------------------+
| id (PK, UUID)    |<-------+| id (PK, UUID)    |<-------+| user_id (FK)      |
| name (VARCHAR)   |         | tenant_id (FK)   |         | role (VARCHAR)    |
| profession (VAR) |         | email (VARCHAR)  |         +-------------------+
| region (VARCHAR) |         | password_hash    |
+------------------+         +------------------+
         |                            |
         |                            |
         | +------------------------+ |
         | |                        | |
         v v                        v v
+------------------+         +------------------+
|    protocols     |         | protocol_versions|
+------------------+         +------------------+
| id (PK, UUID)    |<-------+| id (PK, UUID)    |
| tenant_id (FK)   |         | protocol_id (FK) |
| title (VARCHAR)  |         | version (VARCHAR)|
| category (VAR)   |         | content (TEXT)   |
| status (VARCHAR) |         | created_by (FK)  |
+------------------+         +------------------+
                                      ^
                                      |
                                      +---+
                                          |
                                 +------------------+
                                 |  vector_chunks   |
                                 +------------------+
                                 | id (PK, UUID)    |
                                 | version_id (FK)  |
                                 | chunk_index (INT)|
                                 | text_content(TXT)|
                                 | embedding (VECTOR|
                                 +------------------+
```

---

## 3. Définition des Tables (SQL DDL)

### 3.1 Table `tenants` (Les Cabinets / Espaces de travail)
Cette table représente l'entité supérieure de multi-tenancy. Chaque cabinet possède son propre ID.

```sql
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    practice_mode VARCHAR(100),
    region VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 Table `users` (Les Utilisateurs)
Contient les informations d'authentification et de profil des utilisateurs, liés à un tenant.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 Table `user_roles` (Rôles & Habilitations)
Gère les rôles RBAC des utilisateurs au sein de leur cabinet.

```sql
CREATE TYPE user_role_type AS ENUM ('ADMINISTRATOR', 'PRACTITIONER', 'READER');

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role user_role_type NOT NULL,
    PRIMARY KEY (user_id, role)
);
```

### 3.4 Table `protocols` (Les Protocoles du Cabinet)
Représente l'enveloppe d'un protocole d'un cabinet. Son état global (conforme, obsolète, etc.) y est stocké.

```sql
CREATE TYPE protocol_status_type AS ENUM ('COMPLIANT', 'OUTDATED', 'UNDER_REVIEW');

CREATE TABLE protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status protocol_status_type DEFAULT 'COMPLIANT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.5 Table `protocol_versions` (Historique des Versions de Protocoles)
Pour chaque protocole, cette table stocke le texte brut de chaque version successive validée par le cabinet.

```sql
CREATE TABLE protocol_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_id UUID NOT NULL REFERENCES protocols(id) ON DELETE CASCADE,
    version_number VARCHAR(20) NOT NULL, -- ex: '1.0', '2.0'
    content TEXT NOT NULL,
    change_reason TEXT, -- ex: 'Mise à jour HAS Janvier 2026'
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.6 Table `vector_chunks` (Stockage Vectoriel pour RAG)
Cette table stocke les morceaux de texte (chunks) d'une version de protocole spécifique, ainsi que leur embedding vectoriel généré par l'IA d'Auvia.

```sql
-- Chargement de l'extension vectorielle
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vector_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES protocol_versions(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    text_content TEXT NOT NULL,
    -- Vecteur de dimension 1536 (par exemple, pour text-embedding-3-small de OpenAI)
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la recherche cosinus rapide avec pgvector
CREATE INDEX vector_chunks_embedding_cosine_idx ON vector_chunks
USING hnsw (embedding vector_cosine_ops);
```

---

## 4. Politique d'Isolation des Données (Row Level Security)

Pour interdire toute fuite de données entre locataires (cabinets), la sécurité au niveau des lignes est implémentée sur toutes les tables liées à un `tenant_id` ou de façon transitive.

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_users_isolation ON users
    FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);

CREATE POLICY tenant_protocols_isolation ON protocols
    FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
```
