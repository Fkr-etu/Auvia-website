# Feature Specification — F001: Authentication & Multi-Tenant Access Control

Cette spécification détaille le fonctionnement, la sécurité et le contrôle d'accès pour l'authentification des utilisateurs d'Auvia et l'isolation multi-tenant de leurs cabinets.

---

## 1. Description & Contexte

Le système d'authentification d'Auvia permet aux professionnels de se connecter de façon hautement sécurisée à leur espace de travail. Pour préserver le secret professionnel, l'accès à un cabinet est cloisonné par un identifiant unique de locataire (`tenant_id`), et les actions au sein de cet espace sont régies par des rôles précis (RBAC).

---

## 2. Récits Utilisateurs Associés

* **US-101 :** Création de cabinet et Onboarding initial.
* **US-102 :** Invitation et rôles de collaborateurs.

---

## 3. Spécifications Fonctionnelles

### 3.1 Authentification par JWT (JSON Web Tokens)
* **Mécanique :** À la connexion, le serveur génère un jeton d'accès (Access Token) signé à l'aide d'une clé secrète asymétrique, contenant l'ID utilisateur, son e-mail, son rôle, et l'ID de son cabinet (`tenant_id`).
* **Durée de validité :** 15 minutes pour l'Access Token, 7 jours pour le Refresh Token (stocké dans un cookie sécurisé, httpOnly et SameSite=Strict).

### 3.2 Contrôle d'Accès Basé sur les Rôles (RBAC)
Le système applique la matrice de droits suivante :

| Ressource / Action | Administrateur (Cabinet) | Praticien | Lecteur |
|---|:---:|:---:|:---:|
| Consulter le Dashboard | Oui | Oui | Oui |
| Poser des questions au RAG Chat | Oui | Oui | Oui |
| Consulter la bibliothèque de protocoles | Oui | Oui | Oui |
| Uploader un nouveau protocole | Oui | Oui | Non |
| Proposer une révision de protocole | Oui | Oui | Non |
| Valider officiellement une révision | Oui | Non | Non |
| Inviter / Exclure un collaborateur | Oui | Non | Non |
| Modifier la configuration du Cabinet | Oui | Non | Non |

---

## 4. Flux de Données (Data Flow)

```
[Client App] ──( Saisie E-mail/Mdp )──> [API Server] ──( Vérif Password & Tenant )──> [PostgreSQL]
                                             │                                              │
[Stockage local JWT] <──( Retourne JWT )─────+<──────────( OK : Retourne l'utilisateur )----+
```

---

## 5. Critères d'Acceptation & Scénarios de Test

### Scénario 1 : Authentification réussie
* **Étant donné que** l'utilisateur possède un compte actif et a saisi son e-mail et son mot de passe corrects,
* **Quand** il soumet le formulaire de connexion,
* **Alors** le serveur retourne un jeton d'accès JWT valide, et l'utilisateur est redirigé vers le Dashboard de son cabinet avec le bon affichage de ses privilèges.

### Scénario 2 : Blocage d'accès inter-tenant (Sécurité critique)
* **Étant donné que** le Praticien A appartient au Tenant X et possède un jeton d'accès valide pour le Tenant X,
* **Quand** le Praticien A tente d'appeler l'API pour lire un protocole du Tenant Y (en modifiant l'ID dans la requête),
* **Alors** le serveur API rejette immédiatement la requête avec un code d'erreur `403 Forbidden` et logge une alerte de sécurité.

### Scénario 3 : Tentative d'action non autorisée
* **Étant donné que** l'utilisateur possède le rôle `READER` dans le cabinet,
* **Quand** il tente d'appeler le point d'accès d'importation de fichier ou de validation de protocole,
* **Alors** l'interface utilisateur masque le bouton d'upload et l'API backend rejette la requête avec un code `403 Forbidden`.
