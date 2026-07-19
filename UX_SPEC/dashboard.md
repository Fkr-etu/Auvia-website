# Auvia UX Specification — Workspace Dashboard

Ce document définit l'expérience et la mise en page de l'écran principal d'Auvia : le Dashboard du Cabinet. Cet écran sert de tour de contrôle de conformité pour toute l'équipe.

---

## 1. Principes de Navigation et mise en page globale

Le Dashboard utilise une mise en page à deux sections principales :
* **Barre latérale (Sidebar) :** Toujours visible à gauche (escamotable sur mobile). Elle contient les accès rapides, le sélecteur d'espace de travail (cabinet), les onglets principaux (Dashboard, Bibliothèque, RAG Chat, Paramètres d'Équipe) et l'avatar de l'utilisateur connecté avec l'affichage de son rôle.
* **Zone de contenu principal :** Zone fluide avec une largeur maximale de 1280px pour garantir une lecture agréable des informations réglementaires.

---

## 2. Structure Visuelle du Dashboard

Le Dashboard est découpé de haut en bas en plusieurs blocs d'information stratégiques :

### 2.1 En-tête (Header) de Bienvenue
* **Données affichées :**
  * Salutations dynamiques : *"Bonjour, Dr [Nom]"*.
  * Nom de l'espace de travail actif : *"Cabinet Dentaire des Oliviers"*.
  * Badge de rôle : *"Rôle : Praticien"* ou *"Rôle : Administrateur"*.
  * Indicateur d'état de veille : Une puce verte pulsante indiquant : *"Veille active : Dernière analyse automatique aujourd'hui à 06:00"*.

### 2.2 Carte d'État de Conformité Global (Health Score Card)
* **Objectif :** Donner un sentiment de contrôle absolu en moins de 3 secondes.
* **Cas 1 : Tout est conforme (Statut Vert)**
  * *Contenu :* Une grande icône de validation avec un cercle concentrique doux, le message *"Votre cabinet est à jour"* et le détail : *"24 protocoles suivis, 0 action requise. Auvia continue sa surveillance passive."*
* **Cas 2 : Écart détecté (Statut Ambre/Rouge)**
  * *Contenu :* Un indicateur d'attention avec un fond ambre clair, le message : *"3 éléments nécessitent votre attention"* et le détail condensé : *"2 protocoles obsolètes, 1 alerte réglementaire majeure non lue"*.

### 2.3 Liste des Actions Prioritaires (Action Board)
* **Objectif :** Afficher sous forme de cartes d'action claires les tâches générées automatiquement par l'IA.
* **Attributs de chaque carte d'action :**
  * **Badge de Priorité :**
    * `Critique` (Rouge) : Changements légaux obligatoires sous peine de sanction.
    * `Important` (Orange) : Nouvelles recommandations de bonnes pratiques (ex: HAS).
    * `Info` (Bleu) : Évolutions utiles de la profession.
  * **Sujet & Impact :** Titre court du protocole concerné et phrase d'impact rédigée par l'IA (ex: *"La nouvelle directive HAS 2026 sur la radioprotection modifie le protocole de contrôle périodique de vos installations"*).
  * **Actions immédiates :**
    * Bouton principal `[Analyser l'Écart]` : Redirige vers l'outil de comparaison côte-à-côte de la bibliothèque.
    * Bouton secondaire `[Ignorer]` : Permet de masquer l'action en fournissant un motif rapide (historisé dans le journal du cabinet).

### 2.4 Accès Rapide à la Bibliothèque & RAG Chat
* **Entrée Chat Express :** Une zone d'input intégrée directement sur le dashboard permettant de poser une question à l'IA d'Auvia.
  * *Texte d'invite (Placeholder) :* *"Posez une question sur les protocoles de votre cabinet... (ex: 'Quelle est notre procédure pour les DASRI ?')"*.
  * Au clic sur soumettre, l'utilisateur est redirigé de manière fluide vers la vue RAG Chat avec sa question pré-remplie et la génération lancée.
* **Raccourcis de la Bibliothèque :**
  * Un bloc affichant les 3 derniers protocoles consultés ou modifiés par l'équipe, permettant d'y accéder en un clic.

---

## 3. Règles d'Interaction & Temps Réel

* **Mises à jour collaboratives :** Si un praticien modifie un protocole ou valide une action, l'état du dashboard est mis à jour en temps réel pour l'ensemble des collaborateurs du cabinet connectés à la plateforme.
* **Mode hors-ligne (Lecture seule) :** Sur l'application mobile ou la version SaaS de secours, si la connexion réseau est coupée, l'interface affiche un bandeau discret : *"Mode consultation hors-ligne. Les protocoles validés restent accessibles localement."*
