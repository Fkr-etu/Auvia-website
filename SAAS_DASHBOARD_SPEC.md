# Auvia — SaaS Dashboard Specification

Version : 0.1  
Produit : Interface professionnelle du compagnon IA Auvia  
Cible utilisateur : Professionnels de santé libéraux

---

# 1. Objectif de l'écran Dashboard

Le dashboard est l'écran principal utilisé quotidiennement par le professionnel.

Son objectif est de répondre immédiatement à la question :

> "Est-ce que quelque chose dans ma pratique nécessite mon attention ?"

Le dashboard n'est pas un tableau de bord analytique.

Ce n'est pas une page remplie de statistiques.

C'est un **centre de pilotage de conformité et d'évolution des pratiques professionnelles**.

---

# 2. Principes UX fondamentaux

## 2.1 Zero effort

Le professionnel ne doit pas avoir besoin de chercher l'information.

Auvia doit automatiquement :

- surveiller ;
- analyser ;
- prioriser ;
- proposer une action.

---

## 2.2 Action avant information

Une information seule a peu de valeur.

Le dashboard doit toujours privilégier :

❌ "Nouvelle recommandation publiée"

✅ "Votre protocole d'antibioprophylaxie pourrait nécessiter une mise à jour."

---

## 2.3 Sentiment de contrôle

Le professionnel doit ressentir :

> "Mon activité est surveillée, je maîtrise les changements."

Même lorsqu'il n'y a rien à faire, l'interface doit rassurer.

---

# 3. Architecture générale de la page

Structure principale :


Dashboard

│
├── Etat global de ma pratique
│
├── Actions prioritaires
│
├── Nouvelles informations analysées
│
├── Mes protocoles
│
└── Accès rapide


---

# 4. Header utilisateur

Afficher :


Bonjour Dr Martin

Votre activité est surveillée par Auvia.

Dernière analyse :
Aujourd'hui à 06:00


---

# 5. Carte principale : état global

## Objectif

Donner une vision immédiate.

---

## Cas 1 : tout est à jour

Afficher :


✓ Tout est à jour

Aucune évolution importante
ne nécessite votre intervention.

Auvia continue sa surveillance.


---

## Cas 2 : actions nécessaires

Afficher :


⚠ 3 éléments nécessitent votre attention

2 protocoles à vérifier

1 nouvelle recommandation importante


---

# 6. Bloc principal : Mes actions

C'est l'élément le plus important du dashboard.

## Objectif

Afficher les tâches générées par l'IA.

---

## Format d'une action

Chaque action contient :

- priorité ;
- sujet ;
- raison ;
- impact ;
- action proposée.

---

## Exemple


🔴 Priorité importante

Mise à jour protocole chirurgie orale

Pourquoi ?

Une nouvelle recommandation nationale
a été publiée.

Impact potentiel :

Votre protocole actuel date de 2024.

Actions :

[Analyser]

[Mettre à jour]

[Ignorer]


---

# 7. Gestion des priorités

## Critique

Concerne :

- obligation réglementaire ;
- risque important ;
- changement obligatoire.

---

## Important

Concerne :

- recommandation professionnelle ;
- évolution de bonnes pratiques.

---

## Information

Concerne :

- évolution intéressante ;
- nouvelle publication.

---

# 8. Bloc : Mes protocoles

## Objectif

Donner un accès direct à la bibliothèque documentaire du professionnel.

Afficher :


Mes protocoles

24 documents suivis

12 à jour

3 à vérifier

1 mise à jour recommandée

[Ouvrir ma bibliothèque]


---

# 9. Bibliothèque des protocoles

## Objectif

Créer le référentiel métier personnel du professionnel.

---

## Types de documents

Exemples :

- protocoles médicaux ;
- procédures cabinet ;
- fiches patients ;
- documents qualité ;
- procédures internes.

---

# 10. Vue bibliothèque

Interface :


Mes protocoles

Recherche

[........................]

Filtres :

Tous

À jour

À vérifier

Obsolètes

Protocole hygiène cabinet

Statut :
✓ Conforme

Dernière analyse :
Janvier 2026

Antibioprophylaxie

Statut :
⚠ Mise à jour nécessaire

Cause :
Nouvelle recommandation détectée

[Analyser]


---

# 11. Ajout d'un protocole

Le professionnel peut ajouter un document.

Méthodes :

- upload fichier ;
- glisser-déposer.

Formats :

- PDF ;
- DOCX ;
- TXT.

---

## Interface


Ajouter un protocole

Déposez votre document ici

ou

[Importer un fichier]


---

# 12. Analyse automatique après import

Après upload :

Auvia réalise :


Document reçu

↓

Extraction du texte

↓

Compréhension du sujet

↓

Classification métier

↓

Recherche des recommandations associées

↓

Evaluation du niveau de mise à jour


---

# 13. Résultat d'analyse

Exemple :


Document :

Protocole extraction dentaire

Analyse :

Spécialité :
Chirurgie orale

Etat :

⚠ Une mise à jour est recommandée

Raison :

Deux recommandations importantes
sont apparues depuis votre dernière version.

Actions :

[Voir les changements]

[Mettre à jour]


---

# 14. Processus "Mettre à jour mon protocole"

## Objectif

Transformer une recommandation externe en évolution du document interne.

---

## Etape 1 — Détection

Auvia identifie :


Votre protocole actuel

Nouvelle recommandation

=

Ecart potentiel


---

## Etape 2 — Comparaison

Afficher :


Votre version actuelle

VS

Nouvelle recommandation


---

## Etape 3 — Proposition IA

Auvia propose :


Modification suggérée :

Ajouter une étape de contrôle pré-intervention.

Source :

Nouvelle recommandation HAS

[Accepter]

[Modifier]

[Refuser]


---

## Etape 4 — Nouvelle version

Créer :


Protocole chirurgie orale

Version 2.1

Modifié le :
15/02/2026

Motif :
Adaptation recommandation nationale


---

# 15. Historique

Chaque protocole possède un historique.

Afficher :


Versions

v2.1
15/02/2026
Mise à jour recommandation HAS

v2.0
10/01/2025
Version initiale


---

# 16. Recherche conversationnelle

Depuis le dashboard :

L'utilisateur peut demander :


"Quels sont les changements importants
depuis le mois dernier ?"

"Mon protocole d'hygiène est-il toujours à jour ?"

"Pourquoi dois-je modifier cette procédure ?"


---

# 17. Objectif final de l'expérience

Le professionnel doit ressentir :

Avant Auvia :

> "Je dois surveiller constamment mon métier."

Après Auvia :

> "Mon métier évolue, mais quelqu'un veille pour moi."

---

# 18. Critères de réussite

Le dashboard est réussi si :

- l'utilisateur comprend son état en moins de 5 secondes ;
- il sait immédiatement quoi faire ;
- il retrouve facilement ses protocoles ;
- il comprend pourquoi une mise à jour est proposée ;
- il garde toujours le contrôle final.
