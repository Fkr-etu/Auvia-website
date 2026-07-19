# Feature Specification — F004: Retrieval-Augmented Generation (RAG) Chat

Cette spécification définit le fonctionnement, l'interface et les contraintes de sécurité du Chat de recherche conversationnelle (RAG Chat) d'Auvia.

---

## 1. Description & Contexte

Le RAG Chat d'Auvia permet à tout collaborateur d'un cabinet de poser des questions complexes et opérationnelles sur l'ensemble des protocoles validés du cabinet. C'est l'assistant idéal pour dissiper un doute clinique ou de conformité en quelques secondes, avec l'assurance d'une réponse exacte et sourcée directement dans les documents du cabinet.

---

## 2. Récits Utilisateurs Associés

* **US-401 :** Recherche et interrogation des protocoles validés du cabinet.

---

## 3. Spécifications Fonctionnelles

### 3.1 Interface Utilisateur du Chat
* **Fenêtre de discussion :** Composant fluide affichant le fil de discussion.
* **Saisie utilisateur :** Zone d'input acceptant jusqu'à 1000 caractères.
* **Streaming des réponses :** Les mots générés par le LLM s'affichent en temps réel (Server-Sent Events) pour réduire la perception du temps d'attente (Zero friction).
* **Affichage des Sources :** À la fin de chaque réponse, un bloc "Sources utilisées" répertorie les protocoles et sections exacts d'où proviennent les informations, avec un lien pour ouvrir le document à cet endroit précis.

### 3.2 Moteur de Recherche Sémantique & Grounding (Sécurité)
Lors de l'envoi d'une question :
1. **Extraction de contexte (Retrieve) :**
   * L'API génère l'embedding de la question de l'utilisateur.
   * Elle effectue une recherche de similarité cosinus avec `pgvector` sur la table `vector_chunks` filtrée strictement par le `tenant_id` de l'utilisateur.
   * Elle sélectionne les **5 meilleurs morceaux** (chunks) dont le score de similarité dépasse un seuil de confiance minimum (ex: `0.70`).
2. **Génération de réponse (Generate) :**
   * Le prompt système strict (défini dans `TECH_SPEC/rag.md`) est soumis au LLM avec les morceaux de contexte et la question.
   * Si aucun morceau ne dépasse le seuil ou s'ils ne contiennent pas la réponse, l'IA décline poliment de répondre pour éviter toute hallucination.

---

## 4. Flux de Données (Data Flow)

```
[Utilisateur Chat] ──( Pose question )──> [API Chat Server (Filtre Tenant_ID)]
                                                       │
[Affiche réponse sourcée] <──( Streaming JWT )<── [LLM Generation] <──( 5 Chunks + System Prompt )
```

---

## 5. Critères d'Acceptation & Scénarios de Test

### Scénario 1 : Question avec réponse présente dans un protocole
* **Étant donné que** le cabinet possède un protocole "Gestion des DASRI" à jour stipulant que : *"Le délai maximal de stockage des DASRI est de 3 mois"*,
* **Quand** l'utilisateur demande : *"Quel est le délai de stockage pour les DASRI ?"*,
* **Alors** l'IA répond correctement en indiquant 3 mois et affiche en source : *"Source : Gestion des DASRI, Version v1.0"*.

### Scénario 2 : Question sans réponse disponible (Grounding strict)
* **Étant donné que** le cabinet ne possède aucun protocole concernant la "Radiographie panoramique",
* **Quand** l'utilisateur demande : *"Quelle est la procédure de contrôle pour la radiographie panoramique ?"*,
* **Alors** l'IA répond textuellement : *"Cette information n'est pas répertoriée dans les protocoles de votre cabinet. Je ne peux pas y répondre."* au lieu d'inventer une réponse basée sur sa connaissance générale.

### Scénario 3 : Isolation de contexte inter-cabinet
* **Étant donné que** le Cabinet X possède un protocole privé stipulant un code d'accès, et que le Cabinet Y n'a aucun protocole de ce type,
* **Quand** un utilisateur du Cabinet Y demande ce code d'accès,
* **Alors** le système filtre la recherche vectorielle uniquement sur le Tenant Y, et l'IA répond qu'elle n'a pas cette information, garantissant l'étanchéité absolue entre cabinets.
