# Auvia Technical Specification — Retrieval-Augmented Generation (RAG)

Ce document spécifie le fonctionnement et l'intégration du moteur de génération augmentée de récupération (RAG) d'Auvia. C'est ce système qui permet d'interroger les protocoles internes en langage naturel et de générer des propositions de mise à jour fiables et sans hallucinations.

---

## 1. Flux Nominal du RAG (Ingestion & Interrogation)

Le RAG d'Auvia repose sur deux phases distinctes : la phase d'ingestion (lorsqu'un protocole est ajouté/modifié) et la phase de requête (lorsqu'un utilisateur pose une question ou demande un alignement).

### 1.1 Flux d'Ingestion des Documents
```
[Fichier uploadé] ──> [Extracteur de Texte] ──> [Chunker (300 mots, overlap 10%)]
                                                           │
                                                           v
[Stockage PostgreSQL] <── [Sauvegarde vecteur] <── [Générateur d'Embeddings]
```

### 1.2 Flux de Requête (Q&A Chat)
```
[Question utilisateur] ──> [Génération Embedding de la question]
                                       │
                                       v
[Contexte extrait] <── [Recherche de similarité cosinus (HNSW)] <── [PostgreSQL]
        │
        v
[Prompt d'Instruction sécurisé] ──> [LLM (Agnostique)] ──> [Réponse sourcée en streaming]
```

---

## 2. Stratégie de Découpage et Vectorisation (Chunking & Embeddings)

* **Stratégie de découpage (Chunking) :**
  * Découpage basé sur le sens (Markdown ou paragraphes).
  * Taille cible par morceau (chunk) : **300 mots** (environ 1000 à 1200 caractères).
  * Chevauchement (overlap) : **10%** (soit 30 mots) pour éviter la perte de contexte aux frontières de découpage.
* **Embeddings :**
  * Dimension standard : **1536 dimensions** (ex: compatible avec les modèles d'embedding de l'industrie, comme *text-embedding-3-small*).
  * Distance de recherche : **Similarité cosinus** (`vector_cosine_ops` dans `pgvector`).

---

## 3. Directives de Prompt-Engineering & Grounding strict

Le RAG d'Auvia applique des garde-fous extrêmement stricts pour éviter les hallucinations, particulièrement critiques dans le domaine de la santé réglementée.

### 3.1 Prompt Système de Référence (System Prompt)

```
Vous êtes l'assistant IA d'Auvia, un compagnon expert, bienveillant et rigoureux pour les professionnels.
Votre but est d'apporter des réponses fiables et directement exploitables basées uniquement sur les PROTOCOLES DU CABINET fournis ci-dessous.

=== PROTOCOLES DU CABINET ===
{CONTEXT_CHUNKS}
==============================

=== DIRECTIVES STRICTES ===
1. GROUNDING ABSOLU : Ne formulez vos réponses qu'en vous appuyant exclusivement sur les faits mentionnés dans les "PROTOCOLES DU CABINET". N'extrapolez pas.
2. ABSENCE DE DONNÉES : Si la réponse ne figure pas de manière explicite dans les documents fournis, dites textuellement : "Cette information n'est pas répertoriée dans les protocoles de votre cabinet. Je ne peux pas y répondre." N'inventez jamais rien.
3. CITATIONS EXPLICITES : Pour chaque affirmation, citez obligatoirement le titre du document et la section d'où provient l'information (ex: "[Source : Protocole Hygiène Cabinet, Section 3]").
4. AUCUN JARGON COMPLEXE : Parlez de manière claire, concise, et structurée (puces, gras).
5. SÉCURITÉ : Ne donnez jamais d'instructions cliniques ou de prescriptions qui contredisent les bonnes pratiques reconnues ou qui ne figurent pas dans le texte du cabinet.
```

---

## 4. Agnosticisme des Modèles (Abstraction Layer)

Le moteur de RAG d'Auvia utilise un patron de conception *Factory / Adapter* pour isoler le code métier de l'API du fournisseur d'IA.

### Contrat d'interface TypeScript (`ILLMProvider`)

```typescript
export interface EmbeddingResponse {
  embedding: number[];
  tokenUsage: number;
}

export interface ChatCompletionResponse {
  text: string;
  tokenUsage: number;
  finishReason: string;
}

export interface ILLMProvider {
  /** Génère un vecteur d'embedding pour un texte donné */
  generateEmbedding(text: string): Promise<EmbeddingResponse>;

  /** Génère une réponse textuelle en fonction d'un prompt système et utilisateur */
  generateChatCompletion(
    systemPrompt: string,
    userMessage: string,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<ChatCompletionResponse>;
}
```
*Toute intégration avec des API tierces (OpenAI, Anthropic, Mistral) doit implémenter cette interface.*
