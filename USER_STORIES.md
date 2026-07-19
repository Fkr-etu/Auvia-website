# Auvia — Récits Utilisateurs (User Stories)

Ce document répertorie les récits utilisateurs (User Stories) d'Auvia. Ils décrivent le parcours global de bout en bout pour un cabinet de professionnels réglementés (multi-utilisateurs).

---

## 1. Vision du Parcours Utilisateur Global

Pour comprendre l'enjeu et l'expérience fluide d'Auvia, voici le parcours type au sein d'un cabinet médical pluridisciplinaire ou d'une structure libérale :

1. **Création du Cabinet & Onboarding** : Un administrateur crée l'espace Cabinet, configure la spécialité de base et invite ses collaborateurs avec des rôles spécifiques.
2. **Importation du Référentiel** : Les praticiens déposent leurs protocoles existants (PDF, Word). Auvia les ingère, extrait le texte et valide leur conformité initiale.
3. **Surveillance Passive & Détection** : Auvia surveille en permanence et de façon autonome les sources réglementaires (sans intervention humaine). Une nouvelle norme est publiée.
4. **Analyse d'Écart & Alerte** : Auvia détecte que cette norme rend un protocole interne du cabinet obsolète ou incomplet. Il génère une alerte ciblée dans le Workspace.
5. **Aide à la Décision & Comparaison** : Le praticien ouvre l'outil de comparaison. Il voit précisément les modifications recommandées par l'IA en se basant sur les sources officielles.
6. **Mise à jour & Diffusion** : Le praticien accepte ou modifie la suggestion de l'IA. Une nouvelle version du document est générée, historisée et partagée avec tout le cabinet.
7. **Interrogation via RAG** : N'importe quel membre de l'équipe peut poser des questions complexes en langage naturel à l'IA pour obtenir des réponses sourcées sur les protocoles à jour du cabinet.

---

## 2. Récits Utilisateurs Détaillés (User Stories)

### Thème 1 : Onboarding et Gestion du Cabinet Multi-Utilisateur

#### US-101 : Création de cabinet et Onboarding initial
* **En tant que** Directeur de cabinet ou Praticien fondateur
* **Je veux** créer un espace de travail dédié à mon cabinet, spécifier nos spécialités et notre région géographique
* **Afin de** disposer d'un environnement de conformité personnalisé et adapté à notre cadre d'exercice.

* **Critères d'acceptation :**
  * Le formulaire d'inscription recueille le nom du cabinet, la profession/spécialité dominante, le mode d'exercice et la localisation (région).
  * L'utilisateur initial est automatiquement désigné comme Administrateur du cabinet.
  * Un tableau de bord vide mais guidé accueille l'utilisateur pour l'étape suivante (import de documents).

#### US-102 : Invitation et rôles de collaborateurs
* **En tant qu'** Administrateur du cabinet
* **Je veux** inviter mes associés, assistants ou secrétaires à rejoindre le cabinet sur Auvia en leur attribuant un rôle spécifique (Praticien, Administrateur, Lecteur)
* **Afin que** chacun puisse consulter, modifier ou valider les protocoles selon ses responsabilités.

* **Critères d'acceptation :**
  * Envoi d'un lien d'invitation sécurisé par e-mail.
  * Définition de trois rôles distincts :
    * *Administrateur* : Gestion des abonnements, des invitations, des configurations de cabinet et validation des protocoles.
    * *Praticien* : Lecture, écriture de protocoles, proposition de mises à jour, interrogation du RAG chat.
    * *Lecteur* (ex: assistant, stagiaire) : Lecture des protocoles validés uniquement, interrogation du RAG chat pour guider la pratique quotidienne.

---

### Thème 2 : Gestion de la Bibliothèque de Protocoles et Ingestion

#### US-201 : Import de protocoles internes
* **En tant que** Praticien ou Administrateur du cabinet
* **Je veux** déposer mes fichiers de protocoles actuels (formats PDF, DOCX, TXT) sur la plateforme
* **Afin qu'** Auvia puisse les centraliser, en extraire le contenu textuel et commencer la surveillance automatisée de leur conformité.

* **Critères d'acceptation :**
  * Support du glisser-déposer (drag-and-drop) de documents uniques ou multiples.
  * Extraction automatique du texte brut, élimination du bruit de mise en page.
  * Notification visuelle de la réussite du traitement de chaque fichier.
  * Rangement immédiat dans la bibliothèque avec le statut "En cours d'analyse initiale".

#### US-202 : Structuration et classification automatique
* **En tant que** Praticien
* **Je veux** que l'IA classifie automatiquement mes protocoles importés par catégories métiers, thématiques et dates de validité
* **Afin de** ne pas perdre de temps à organiser manuellement mon référentiel documentaire.

* **Critères d'acceptation :**
  * Identification automatique de la thématique majeure (ex: hygiène, clinique, administratif, urgence).
  * Détection de la version de départ ou de la date de rédaction du document d'origine.
  * Possibilité pour le praticien de modifier manuellement la catégorie ou d'ajouter des tags.

---

### Thème 3 : Surveillance Automatisée et Alignement IA

#### US-301 : Détection d'écarts de conformité en tâche de fond (No-Human-In-The-Loop)
* **En tant que** Praticien ou Administrateur du cabinet
* **Je veux** qu'Auvia surveille en continu les bases de données officielles (HAS, Légifrance, etc.) et détecte de manière autonome si un changement réglementaire impacte l'un de nos protocoles
* **Afin d'** être alerté sans avoir à mener une veille active de mon côté.

* **Critères d'acceptation :**
  * La veille s'exécute automatiquement en tâche de fond.
  * Si une nouvelle recommandation officielle est publiée et qu'elle contredit ou enrichit un protocole existant du cabinet, l'état du protocole passe de "✓ Conforme" à "⚠ Mise à jour nécessaire".
  * L'alerte est affichée de manière prioritaire sur le Dashboard du cabinet avec la mention de la source officielle.

#### US-302 : Visualisation comparative des écarts (Diff-Viewer)
* **En tant que** Praticien
* **Je veux** visualiser de manière claire et structurée la comparaison entre mon protocole actuel et la nouvelle recommandation détectée par l'IA
* **Afin de** comprendre instantanément où se situe l'écart (gap analysis) et quel est l'impact sur ma pratique.

* **Critères d'acceptation :**
  * Affichage côte-à-côte : à gauche le texte du protocole interne, à droite la recommandation officielle correspondante.
  * Synthèse rédigée par l'IA expliquant pourquoi la mise à jour est recommandée, sans jargon inutile.

#### US-303 : Génération et validation de la mise à jour par l'IA
* **En tant que** Praticien habilité
* **Je veux** qu'Auvia me propose une version révisée de mon protocole intégrant harmonieusement la nouvelle recommandation, que je peux amender ou approuver
* **Afin de** mettre à jour le document officiel de mon cabinet en quelques clics tout en gardant le contrôle final.

* **Critères d'acceptation :**
  * L'IA rédige une proposition d'insertion ou de modification textuelle dans le corps du protocole.
  * L'utilisateur peut accepter la modification, la modifier en ligne via un mini-éditeur de texte, ou la rejeter.
  * Après validation par un Administrateur ou un Praticien qualifié, le document est enregistré sous un nouveau numéro de version (ex: v2.0) avec l'historique complet des modifications.
  * Le protocole repasse immédiatement au statut "✓ Conforme".

---

### Thème 4 : Recherche Conversationnelle Augmentée (RAG Chat)

#### US-401 : Recherche et interrogation des protocoles validés du cabinet
* **En tant que** Collaborateur ou Praticien du cabinet (utilisateur multi-rôle)
* **Je veux** poser des questions opérationnelles en langage naturel à l'IA d'Auvia au sujet de nos protocoles internes
* **Afin d'** obtenir instantanément une réponse précise, fiable et contextualisée en cas de doute durant ma pratique.

* **Critères d'acceptation :**
  * Interface de chat accessible facilement depuis le Dashboard et sur l'application mobile.
  * La réponse fournie par l'IA doit exclusivement se baser sur les protocoles validés du cabinet (grounding).
  * L'IA doit obligatoirement citer le document source exact et le paragraphe de référence pour éviter toute hallucination.
  * Si l'information ne figure pas dans les protocoles du cabinet, l'IA l'indique clairement au lieu d'inventer une réponse.

---

## 3. Matrice de Traçabilité des Récits Utilisateurs

Pour assurer la cohérence du développement axé sur les spécifications (Spec-Driven-Dev), chaque récit utilisateur est couvert par des spécifications UX, techniques et des fonctionnalités (Features) :

| ID Récit | Thème | Spécification UX | Spécification Tech | Feature (Spec) |
|---|---|---|---|---|
| **US-101** | Onboarding & Multi-utilisateurs | `UX_SPEC/onboarding.md` | `TECH_SPEC/architecture.md` | `FEATURES/F001-auth.md`, `F002-user-profile.md` |
| **US-102** | Gestion de l'équipe | `UX_SPEC/onboarding.md` | `TECH_SPEC/architecture.md`, `database.md` | `FEATURES/F001-auth.md`, `F002-user-profile.md` |
| **US-201** | Import de documents | `UX_SPEC/protocols-library.md` | `TECH_SPEC/connectors.md` | `FEATURES/F003-document-upload.md` |
| **US-202** | Structuration IA | `UX_SPEC/protocols-library.md` | `TECH_SPEC/database.md`, `rag.md` | `FEATURES/F003-document-upload.md` |
| **US-301** | Veille & Détection d'écart | `UX_SPEC/dashboard.md` | `TECH_SPEC/connectors.md`, `rag.md` | `FEATURES/F003-document-upload.md` |
| **US-302** | Comparateur de protocoles | `UX_SPEC/protocols-library.md` | `TECH_SPEC/rag.md` | `FEATURES/F003-document-upload.md` |
| **US-303** | Validation & Historique | `UX_SPEC/protocols-library.md` | `TECH_SPEC/database.md` | `FEATURES/F003-document-upload.md` |
| **US-401** | RAG Chat conversationnel | `UX_SPEC/dashboard.md` | `TECH_SPEC/rag.md`, `database.md` | `FEATURES/F004-rag-chat.md` |
