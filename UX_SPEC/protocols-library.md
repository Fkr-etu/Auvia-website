# Auvia UX Specification — Protocols Library & Revision Workflow

Ce document spécifie l'expérience de gestion documentaire et le flux de mise à jour des protocoles guidé par l'IA au sein de la bibliothèque Auvia.

---

## 1. Interface de la Bibliothèque des Protocoles

La bibliothèque regroupe l'intégralité des documents et processus officiels du cabinet.

### 1.1 Composants de Recherche et de Filtrage
* **Barre de recherche globale :** Recherche textuelle floue sur les titres et le contenu des protocoles.
* **Sélecteur de filtres rapides (Chips d'état) :**
  * `Tous` (Affiche tous les protocoles)
  * `✓ Conformes` (À jour des recommandations)
  * `⚠ À vérifier` (L'IA a détecté une évolution des recommandations)
  * `En cours de révision` (Une ébauche de mise à jour est en cours de validation par un membre de l'équipe)
* **Tri :** Par date de dernière modification, par titre ou par criticité.

### 1.2 Grille des Protocoles (Cards Grid)
Chaque document est représenté sous forme de carte contenant :
* Le titre du protocole (ex: *"Désinfection des blocs opératoires"*).
* La catégorie métier / Spécialité.
* Le tag de statut visuel (Vert pour Conforme, Orange pour À vérifier, Gris pour Brouillon).
* L'auteur et la date de la dernière version (ex: *"v1.4 par Dr Durand, le 12/01/2026"*).
* Un indicateur d'activité IA (ex: *"Surveillé par Auvia depuis 2025"*).

---

## 2. Processus d'Importation de Document (Upload Flow)

L'importation de documents est la première étape pour intégrer le référentiel du cabinet.

1. **Zone de Drop (Drag & Drop Zone) :**
   * Un grand cadre en pointillés avec une icône de document et un bouton d'action `[Parcourir mes fichiers]`.
   * Formats acceptés clairement rappelés : PDF, DOCX, TXT.
2. **Dialogue de traitement (Modal de chargement) :**
   * Dès le dépôt du fichier, une modale s'ouvre montrant une barre de progression de l'upload.
   * Une fois le fichier chargé, un état "Analyse IA en cours" s'affiche avec une animation pulsée et les étapes franchies en temps réel :
     * [✓] Extraction du texte
     * [✓] Compréhension sémantique
     * [ ] Comparaison avec les recommandations officielles...
3. **Dialogue de résultats :**
   * Présentation d'une fiche d'identité automatique générée par l'IA : titre suggéré, thématique identifiée, niveau estimé de conformité avec les textes légaux actuels.
   * L'utilisateur valide ou ajuste les métadonnées et clique sur `[Enregistrer dans ma bibliothèque]`.

---

## 3. Workflow de Révision Guidé par l'IA (Alignement)

Lorsqu'une nouvelle recommandation est détectée par la veille Auvia (sans aucune intervention humaine), le protocole concerné bascule dans l'état `⚠ À vérifier`.

Voici le parcours de mise à jour interactif en 4 étapes :

### Étape 1 : Détection et Diagnostic d'Écart
* **Interface :** L'utilisateur clique sur le bouton `[Consulter l'analyse d'écart]` depuis le dashboard ou la bibliothèque.
* **Visuel :** Un résumé exécutif clair rédigé par l'IA :
  * *"Votre protocole actuel sur la prescription d'antibiotiques ne prend pas en compte la réduction de la durée de traitement recommandée par la HAS en Janvier 2026."*

### Étape 2 : Comparateur Visuel (Diff-Viewer)
* **Interface :** Présentation côte-à-côte à l'écran :
  * **Colonne de Gauche (Votre document) :** Surlignage ambre du paragraphe concerné par l'écart (ex: *"Durée standard d'antibioprophylaxie : 7 jours"*).
  * **Colonne de Droite (Texte Officiel Source) :** Surlignage vert de la nouvelle recommandation réglementaire (ex: *"HAS 2026 : Réduire la durée d'antibioprophylaxie à 3 jours pour limiter l'antibiorésistance"*).

### Étape 3 : Proposition de Correction par l'IA (AI Proposal)
* **Interface :** Entre les deux colonnes ou en superposition, Auvia présente un bloc d'insertion de texte rédigé par l'IA :
  * *"Auvia suggère de remplacer votre paragraphe par : 'La durée d'antibioprophylaxie est fixée à 3 jours conformément aux directives HAS de 2026.'"*
* **Contrôles utilisateur :**
  * Bouton `[Accepter la suggestion]` : Intègre automatiquement la modification dans l'éditeur.
  * Bouton `[Modifier le texte proposé]` : Ouvre un mini-éditeur de texte riche pour amender manuellement la rédaction de l'IA.
  * Bouton `[Rejeter / Conserver ma version]` : Demande de saisir une note explicative obligatoire (ex: *"Justifié par un protocole clinique spécifique au cabinet"*), ce qui clôt l'alerte mais historise la décision.

### Étape 4 : Validation, Historisation et Diffusion
* **Interface :** Une fois les modifications acceptées ou rédigées, l'utilisateur clique sur `[Générer la nouvelle version]`.
* **Règles métier :**
  * Si l'utilisateur est un **Administrateur**, le protocole passe instantanément en statut `vX.Y - Conforme` et remplace la version précédente. Un historique de version est enrichi.
  * Si l'utilisateur est un **Praticien**, la nouvelle version est enregistrée comme "En attente de validation par un administrateur". Un administrateur du cabinet reçoit une notification sur son Dashboard pour approuver la modification.
  * Un e-mail ou une notification interne est envoyé à tous les membres de l'équipe : *"Le protocole 'Antibioprophylaxie' a été mis à jour en version v2.0 par le Dr Durand. Veuillez en prendre connaissance."*
