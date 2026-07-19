# Auvia UX Specification — Onboarding & Team Configuration

Ce document définit les parcours, cinématiques et règles d'interaction pour l'inscription, la création de cabinet et l'invitation de collaborateurs sur Auvia.

---

## 1. Objectifs de l'expérience d'Onboarding

* **Rapidité & Simplicité (Zero friction) :** Permettre à un praticien de configurer son espace cabinet en moins de 2 minutes.
* **Personnalisation immédiate :** Capter les informations clés sur la spécialité du cabinet pour configurer la veille réglementaire pertinente.
* **Sécurité & Rôles :** Garantir que les collaborateurs rejoignent le bon espace de travail avec les privilèges adéquats.

---

## 2. Parcours utilisateur 1 : Le Praticien Fondateur (Création de Cabinet)

Ce parcours est destiné à la personne qui initialise l'espace Auvia pour l'ensemble de la structure.

### Étape 1 : Création de compte individuel
* **Description :** Saisie des informations personnelles standard.
* **Champs requis :**
  * Nom et prénom
  * Adresse e-mail professionnelle (vérifiée par code OTP à 6 chiffres)
  * Mot de passe (robuste, conforme aux exigences de sécurité standard)
* **Éléments visuels :** Formulaire minimaliste centré, avec rappel des valeurs de la marque (Confiance, Sécurité).

### Étape 2 : Configuration du Cabinet (Espace de travail multi-tenant)
* **Description :** Établissement des paramètres de la structure de soins ou du cabinet libéral.
* **Champs requis :**
  * Nom de la structure (ex: *Cabinet Dentaire des Oliviers*)
  * Secteur principal / Profession (ex: *Dentaire*, *Vétérinaire*, *Pharmacie*, *Infirmier*, *Autre*)
  * Spécialité détaillée (ex: *Omnipratique*, *Chirurgie*, *Orthodontie*)
  * Mode d'exercice (ex: *Libéral individuel*, *Cabinet de groupe / SCM*, *Clinique*)
  * Localisation (Région géographique pour les arrêtés et spécificités régionales)
* **Comportement IA :** Dès la soumission, l'IA d'Auvia amorce en tâche de fond le ciblage des sources officielles pertinentes pour cette spécialité géographique.

### Étape 3 : Invitation des Collaborateurs (Optionnelle mais recommandée)
* **Description :** Permet d'inviter immédiatement d'autres praticiens ou assistants de la structure.
* **Cinématique :**
  * Saisie de l'e-mail du collaborateur.
  * Sélection du rôle dans un menu déroulant :
    * **Administrateur :** Droits complets (gestion de l'équipe, modification des abonnements, validation finale des protocoles).
    * **Praticien :** Peut uploader des protocoles, proposer des modifications, et utiliser le RAG chat.
    * **Lecteur :** Accès en lecture seule aux protocoles validés, utilisation du RAG chat pour guider l'activité au quotidien.
  * Bouton "Ajouter une ligne" pour inviter plusieurs personnes simultanément.
  * Bouton "Inviter et finaliser".

---

## 3. Parcours utilisateur 2 : Le Collaborateur invité

Ce parcours s'applique à un utilisateur recevant une invitation par e-mail pour rejoindre un cabinet existant.

### Étape 1 : Réception de l'invitation
* **Canal :** E-mail sécurisé contenant un bouton d'action "Rejoindre le Cabinet [Nom du Cabinet]".
* **Durée de validité :** Le lien d'invitation expire au bout de 7 jours.

### Étape 2 : Création de profil associé
* **Description :** Le collaborateur clique sur le lien, saisit son nom, prénom et choisit son mot de passe.
* **Cinématique :**
  * L'adresse e-mail est pré-remplie et verrouillée (pour correspondre à l'invitation).
  * Un message de bienvenue confirme qu'il s'apprête à rejoindre le cabinet configuré par l'initiateur : *"Vous rejoignez le Cabinet Dentaire des Oliviers en tant que Praticien"*.

---

## 4. Règles de Gestion et d'Interaction (UX)

* **Validation des formulaires en temps réel :**
  * Indicateur visuel de force de mot de passe.
  * Vérification instantanée du format de l'e-mail et de l'absence de doublons dans la base de données.
* **Gestion des erreurs :**
  * En cas de saisie invalide, le champ passe en surbrillance rouge doux (`#ba1a1a`) avec un message explicatif situé sous l'input.
* **État de chargement (Loading state) :**
  * Lors de la création de la structure, afficher un écran de chargement élégant avec un indicateur d'état IA pulsé et la phrase d'attente : *"Auvia configure votre espace de veille personnalisé..."*.
