# Architectural Decision Record (ADR) — 001: PostgreSQL as Primary Database

* **ID :** 001
* **Titre :** Utilisation de PostgreSQL comme base de données primaire
* **Statut :** Accepté (Accepted)
* **Date :** Février 2026
* **Auteur :** Jules (Lead Engineer)

---

## 1. Contexte & Problématique

Auvia est un SaaS multi-tenant gérant des informations de conformité critiques et hautement structurées (utilisateurs, cabinets, rôles, protocoles, historique des versions).

Nous avons besoin d'une solution de stockage qui offre :
1. Une intégrité référentielle absolue (ACID) pour garantir que les rôles, versions de protocoles, et liaisons multi-tenant soient exemptes de corruption.
2. Une sécurité robuste au niveau des données (possibilité de cloisonner les données par locataire de façon native).
3. Une maturité technique indiscutable et de larges options d'hébergement sécurisé (Cloud certifié HDS, managé, etc.).

---

## 2. Décision

Nous choisissons d'utiliser **PostgreSQL** comme système de gestion de base de données relationnelle (SGBDR) primaire.

Toutes les données structurées de l'application (utilisateurs, configurations, métadonnées de protocoles, journaux de révision) y seront stockées.

---

## 3. Alternatives Envisagées

* **MongoDB / NoSQL :** Offre une grande flexibilité sur les schémas de documents de protocoles. Cependant, l'absence de transactions multi-documents natives robustes au départ et le manque d'outils d'intégrité relationnelle stricts ont été jugés trop risqués pour gérer des habilitations multi-utilisateurs et des règles de conformité.
* **MySQL :** Solution relationnelle robuste, mais dispose d'un écosystème vectoriel et de fonctionnalités avancées de sécurité (comme Row Level Security) moins matures et moins intégrées que PostgreSQL.

---

## 4. Conséquences

### Avantages (Consequences - Positive)
* **Intégrité des données :** Support complet des contraintes de clé étrangère, transactions ACID et typages avancés (comme le type `jsonb` pour la flexibilité).
* **Multi-tenancy sécurisé :** PostgreSQL supporte nativement le *Row Level Security (RLS)*, permettant de bloquer les fuites de données inter-cabinets directement au niveau du moteur de base de données.
* **Hébergement certifié :** La plupart des hébergeurs de confiance et serveurs HDS proposent PostgreSQL managé de façon native.

### Inconvénients / Défis (Consequences - Negative)
* **Gestion des migrations :** Nécessite une rigueur dans le suivi des migrations de schéma au fil des évolutions applicatives.
* **Scalabilité horizontale :** Bien que PostgreSQL soit extrêmement performant, la mise à l'échelle horizontale nécessite des outils de réplication ou des architectures spécifiques (ex: Citus), bien que le besoin initial d'Auvia soit largement couvert par une mise à l'échelle verticale.
