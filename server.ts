import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, profile } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback to beautiful simulated expert answers if API key is not present
        console.warn("[Auvia] GEMINI_API_KEY non configurée. Utilisation du simulateur d'IA expert.");
        const fallbackResponse = getSimulatedResponse(message, profile);
        return res.json({ text: fallbackResponse, isMock: true });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemPrompt = `Vous êtes Auvia, un compagnon professionnel de veille réglementaire et d'IA intelligent destiné aux professionnels de santé libéraux (notamment les chirurgiens-dentistes, médecins, kinésithérapeutes).
L'utilisateur actuel a le profil professionnel suivant :
- Profession: ${profile?.profession || "Professionnel de santé"}
- Spécialité: ${profile?.specialty || "Général"}
- Mode d'exercice: ${profile?.practiceMode || "Libéral individuel"}
- Sujets d'intérêt: ${profile?.interests?.join(", ") || "Recommandations, réglementations, obligations documentaires"}

Répondez en français de manière claire, synthétique, structurée (avec des puces si nécessaire) et rassurante. Moins de bruit, plus de clarté. Donnez toujours des actions concrètes ou des impacts clairs pour sa pratique clinique au cabinet.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "Désolé, je n'ai pas pu générer de réponse.", isMock: false });
    } catch (error: any) {
      console.error("[Auvia Chat Error]:", error);
      res.status(500).json({ error: error.message || "Erreur interne de génération d'IA" });
    }
  });

  // Serve static or Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Simple rules-based conversational helper when API key is missing
function getSimulatedResponse(message: string, profile: any): string {
  const msg = message.toLowerCase();
  const profName = profile?.profession || "chirurgien-dentiste";
  
  if (msg.includes("radioprotection") || msg.includes("radio") || msg.includes("x-ray") || msg.includes("rayon")) {
    return `### ⚠️ Réglementation Radioprotection (Mise à jour 2026)

Pour votre exercice en tant que **${profName}**, voici les exigences essentielles de l'Autorité de Sûreté Nucléaire (ASN) concernant vos contrôles et installations :

1. **Contrôle de conformité externe** : Obligatoire tous les **5 ans** par un Organisme Agréé en Radioprotection (OAR). Le rapport de contrôle doit impérativement être consigné dans votre registre de sécurité.
2. **Évaluation individuelle des risques** : Obligatoire pour toute l'équipe clinique (praticiens, assistantes) et révisée annuellement ou à chaque modification de matériel.
3. **Formations obligatoires** : Renouvellement tous les 10 ans pour les praticiens (formation continue à la radioprotection des patients) et formation à la sécurité des travailleurs exposés pour les salariés.

**💡 Plan d'action recommandé pour votre cabinet :**
- **Action 1** : Vérifiez la date du dernier rapport rédigé par votre Organisme de Contrôle Externe.
- **Action 2** : Assurez-vous que la nomination de votre Conseiller en Radioprotection (ex-PCR), interne ou externe, est bien à jour sur le portail en ligne de l'ASN.`;
  }
  
  if (msg.includes("stérilisation") || msg.includes("hygiène") || msg.includes("protocole") || msg.includes("infection")) {
    return `### 🧼 Normes de Stérilisation & Traçabilité Clinique

Pour un **${profName}**, le contrôle du risque infectieux s'accompagne d'obligations documentaires rigoureuses. Voici la synthèse des exigences de la Haute Autorité de Santé (HAS) :

- **Double Traçabilité Documentaire** : Chaque sachet d'instrumentation stérile utilisé lors d'un acte doit faire l'objet d'un archivage associant le numéro de lot de stérilisation (autoclave), le cycle de test, et l'identifiant du patient.
- **Tests quotidiens & hebdomadaires** :
  - *Chaque matin* : Test de vide (Leak Test) de l'autoclave à froid.
  - *Chaque semaine* : Test de pénétration de la vapeur (Bowie-Dick) pour valider la stérilisation des corps creux.
- **Durée de conservation** : Conservez l'intégralité des tickets imprimés ou des rapports numériques de cycle pendant une durée minimale de **5 ans**.

**💡 Plan d'action recommandé pour votre cabinet :**
- **Automatisation** : Intégrez un système de lecture optique par code-barres ou QR code relié directement à la fiche patient de votre logiciel clinique (Julie, Doctolib, etc.) pour supprimer la double saisie manuelle.`;
  }

  if (msg.includes("déchet") || msg.includes("dasri") || msg.includes("amalgame")) {
    return `### ☣️ Gestion des Déchets DASRI & Séparateurs d'Amalgame

La manipulation et l'élimination des déchets infectieux et toxiques sont strictement encadrées :

1. **Délai d'enlèvement DASRI** :
   - Production < 5 kg/mois : Enlèvement et élimination obligatoires sous **3 mois**.
   - Production entre 5 et 100 kg/mois : Enlèvement obligatoire sous **1 mois**.
2. **Trackdéchets Obligatoire** : Depuis le décret d'État, l'inscription et l'établissement des BSDA (Bordereaux de Suivi de Déchets d'Activités de Soins) s'effectuent exclusivement en ligne via la plateforme gouvernementale Trackdéchets.
3. **Séparateurs d'amalgame** (obligatoire pour les chirurgiens-dentistes) : Efficacité de rétention de mercure certifiée à minimum 95%, nettoyé ou remplacé périodiquement avec certificat d'élimination des boues.

**💡 Plan d'action recommandé pour votre cabinet :**
- Créez et configurez votre profil cabinet sur **trackdechets.beta.gouv.fr** en le reliant à votre numéro SIRET.`;
  }

  if (msg.includes("rgpd") || msg.includes("donnée") || msg.includes("médical") || msg.includes("secret")) {
    return `### 🔒 Protection des Données de Santé (RGPD) & Hébergement

En tant que professionnel de santé libéral, vous manipulez des données hautement sensibles. Vos obligations clés sont :

1. **Hébergement certifié HDS** : Tous vos dossiers patients informatisés et vos sauvegardes externes (cloud) doivent impérativement être hébergés auprès d'un prestataire certifié **Hébergeur de Données de Santé (HDS)**.
2. **Registre des traitements** : Vous devez tenir à jour un registre simplifié décrivant la manière dont vous collectez, stockez et sécurisez les données au cabinet.
3. **Consentement & Information** : Affichage d'une note d'information claire en salle d'attente sur les droits d'accès, de rectification et d'opposition du patient.

**💡 Plan d'action recommandé pour votre cabinet :**
- Téléchargez et complétez le modèle de registre RGPD simplifié fourni par la CNIL pour les cabinets de santé libéraux.`;
  }

  return `### Bonjour ! Je suis Auvia, votre assistant de veille réglementaire personnalisé.

J'analyse en continu les sources officielles (Journal Officiel, HAS, ASN, ANSM, CNIL) pour identifier uniquement les alertes et les actions requises pour votre cabinet libéral.

*Note : Aucune clé GEMINI_API_KEY n'étant configurée dans vos secrets d'environnement, je fonctionne actuellement avec ma base locale de connaissances expertes.*

Vous pouvez m'interroger sur l'une des thématiques réglementaires majeures de votre profession :
- *"Quelles sont mes obligations pour la radioprotection des patients ?"*
- *"Pouvez-vous me résumer les obligations de traçabilité de l'autoclave ?"*
- *"Quelles sont les règles d'élimination des déchets DASRI ?"*
- *"Quelles sont les obligations RGPD concernant les fiches patients ?"*

Quelle question souhaitez-vous aborder pour votre exercice aujourd'hui ?`;
}

startServer();
