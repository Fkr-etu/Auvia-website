# Feature Specification — F002: User Profile & Cabinet Configuration

Cette spécification détaille la gestion du profil utilisateur et de la configuration de la structure d'exercice (Cabinet) pour le multi-tenant.

---

## 1. Description & Contexte

Chaque utilisateur dispose d'un profil individuel rattaché à une structure professionnelle (le Cabinet). Les informations stockées dans le profil utilisateur et dans les métadonnées de la structure guident la personnalisation de la veille automatisée menée par Auvia (choix des recommandations, types de documents prioritaires, etc.).

---

## 2. Récits Utilisateurs Associés

* **US-101 :** Création de cabinet et Onboarding initial.
* **US-102 :** Invitation et rôles de collaborateurs.

---

## 3. Spécifications Fonctionnelles

### 3.1 Édition du Profil Individuel
Chaque membre du cabinet peut modifier ses informations personnelles :
* **Informations modifiables :** Prénom, Nom, Numéro de téléphone professionnel, Préférences de notification (E-mail quotidien, alertes push instantanées).
* **Sécurité :** L'adresse e-mail ne peut pas être modifiée directement sans une procédure de double validation (OTP envoyé sur l'ancienne et la nouvelle adresse).

### 3.2 Configuration du Cabinet (Réservé aux Administrateurs)
L'administrateur peut modifier l'identité et le profil métier du cabinet. Ces données sont cruciales pour calibrer l'ingestion d'Auvia :
* **Métadonnées de la structure :** Nom du cabinet, Profession dominante (Santé, Juridique, etc.), Spécialités cliniques ou d'activité, Région d'exercice.
* **Journal d'Audit du Cabinet :** Un historique non-modifiable répertoriant toutes les actions critiques du cabinet (ex: *"Dr Durand a invité l'assistant Pierre"*, *"Dr Martin a validé la version v2.0 du protocole d'hygiène"*).

---

## 4. Flux de Données (Data Flow)

```
[Client App (Admin UI)] ──( Modif Spécialité Cabinet )──> [API Server (Vérif rôle Admin)]
                                                                    │
[Dashboard mis à jour] <──( Retourne 200 OK & Data )──────── [Sauvegarde PostgreSQL]
```

---

## 5. Critères d'Acceptation & Scénarios de Test

### Scénario 1 : Modification des préférences de notification
* **Étant donné que** le Praticien est connecté à son compte,
* **Quand** il modifie ses préférences pour activer les "notifications push instantanées" et clique sur sauvegarder,
* **Alors** les modifications sont enregistrées en base de données et l'application s'abonne au service de messagerie push de l'appareil.

### Scénario 2 : Modification interdite de la configuration du cabinet par un non-administrateur
* **Étant donné que** l'utilisateur est connecté avec le rôle `PRACTITIONER`,
* **Quand** il tente d'accéder à la page de paramétrage du cabinet ou d'envoyer un requête HTTP `PATCH /api/tenant/config`,
* **Alors** l'interface lui refuse l'accès et le serveur backend retourne une erreur `403 Forbidden`.
