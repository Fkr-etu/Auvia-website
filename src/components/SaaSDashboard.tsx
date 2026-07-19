import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, AlertTriangle, ShieldCheck, CheckCircle2, Circle, 
  HelpCircle, Trash2, Calendar, FileText, Send, Sparkles, User, Settings, Info, Bell,
  Search, Upload, ArrowRight, History, Plus, Check, Layers, X, FileCode, Activity, FileDown,
  CreditCard, Lock, RefreshCw, Eye, Landmark, Receipt, Download
} from "lucide-react";
import { UserProfile, RegulatoryAlert, ActionItem, BillingInvoice } from "../types";

interface SaaSDashboardProps {
  profile?: UserProfile;
  setProfile?: React.Dispatch<React.SetStateAction<UserProfile>>;
}

interface Protocol {
  id: string;
  title: string;
  category: string;
  status: "conforme" | "verify" | "obsolete";
  lastAnalysis: string;
  cause?: string;
  version: string;
  history: { version: string; date: string; comment: string }[];
  contentCurrent: string;
  contentNew?: string;
  proposalText?: string;
  sourceName?: string;
}

export default function SaaSDashboard({ profile: externalProfile, setProfile: externalSetProfile }: SaaSDashboardProps) {
  // 1. Profile Setup State
  const [internalProfile, setInternalProfile] = useState<UserProfile>({
    profession: "Chirurgien-Dentiste",
    specialty: "Omnipratique & Chirurgie",
    region: "Île-de-France",
    practiceMode: "Libéral individuel",
    interests: ["Radioprotection", "Stérilisation", "DASRI", "RGPD"],
    subscriptionTier: "trial",
    subscriptionStatus: "trialing",
    subscriptionEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR"),
    billingHistory: []
  });

  const profile = externalProfile || internalProfile;
  const setProfile = externalSetProfile || setInternalProfile;
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [doctorName, setDoctorName] = useState("Dr Martin");

  // Active navigation tab within the workspace: "dashboard", "library", or "billing"
  const [activeTab, setActiveTab] = useState<"dashboard" | "library" | "billing">("dashboard");

  // State for Custom seeded protocols
  const [protocols, setProtocols] = useState<Protocol[]>([
    {
      id: "prot-1",
      title: "Protocole d'hygiène & Aseptie cabinet",
      category: "Qualité & Hygiène",
      status: "conforme",
      lastAnalysis: "Janvier 2026",
      version: "v1.4",
      history: [
        { version: "v1.4", date: "12/01/2026", comment: "Validation réglementaire annuelle" },
        { version: "v1.0", date: "05/03/2024", comment: "Version initiale" }
      ],
      contentCurrent: "Nettoyage quotidien et systématique de toutes les surfaces cliniques à l'aide de détergents-désinfectants conformes aux normes européennes de virucidie (NF EN 14476). Bionettoyage des sols deux fois par jour. Traçabilité des fiches de tâches archivée sur support numérique."
    },
    {
      id: "prot-2",
      title: "Antibioprophylaxie en Chirurgie Orale",
      category: "Procédures de soins",
      status: "verify",
      lastAnalysis: "Aujourd'hui à 06:00",
      cause: "Nouvelle recommandation nationale (HAS 2026) détectée.",
      version: "v2.0",
      history: [
        { version: "v2.0", date: "10/01/2025", comment: "Version initiale rédigée par l'équipe clinique" }
      ],
      contentCurrent: "Prescription d'Amoxicilline 2g en dose unique par voie orale, 1 heure avant tout geste invasif d'avulsion chirurgicale (dents de sagesse incluses) ou d'implantologie de routine chez tous les patients.",
      contentNew: "Limiter strictement l'antibioprophylaxie aux patients présentant un risque d'endocardite infectieuse (prothèses valvulaires, cardiopathies congénitales cyanogènes) ou d'immunodépression sévère. Pas de prescription systématique d'antibiotiques chez les patients sains pour des actes de chirurgie de routine.",
      proposalText: "Modifier l'article 2 du protocole pour restreindre la prescription pré-opératoire systématique. L'antibiothérapie préventive ne doit plus être systématique pour les avulsions dentaires chez les sujets sains sans antécédents médicaux particuliers.",
      sourceName: "HAS - Recommandation clinique nationale (Juin 2026)"
    },
    {
      id: "prot-3",
      title: "Traitement et Traçabilité des Déchets (DASRI)",
      category: "Réglementaire & Déchets",
      status: "conforme",
      lastAnalysis: "Juin 2026",
      version: "v1.1",
      history: [
        { version: "v1.1", date: "14/06/2026", comment: "Raccordement obligatoire au portail d'État Trackdéchets" },
        { version: "v1.0", date: "12/02/2025", comment: "Version initiale" }
      ],
      contentCurrent: "Tous les enlèvements de DASRI (boîtes à aiguilles, fûts d'amalgame) font l'objet d'un enregistrement dématérialisé et de la génération d'un BSDA sur la plateforme Trackdéchets. Stockage temporaire sécurisé en local ventilé."
    },
    {
      id: "prot-4",
      title: "Protocole de Radioprotection des Patients",
      category: "Radioprotection",
      status: "obsolete",
      lastAnalysis: "Mai 2026",
      cause: "Nouvelle directive ASN de réforme des contrôles.",
      version: "v1.0",
      history: [
        { version: "v1.0", date: "15/09/2024", comment: "Version initiale rédigée" }
      ],
      contentCurrent: "Contrôles techniques externes annuels par des personnes physiques qualifiées. Archivage papier du registre de sécurité.",
      contentNew: "Obligation d'enregistrement d'un Conseiller en Radioprotection (CRP) sur le portail ASN-SISERI et contrôle externe périodique fixé à un intervalle strict de 5 ans.",
      proposalText: "Remplacer l'organisation interne de radioprotection par l'intégration et la désignation obligatoire d'un Conseiller en Radioprotection (CRP) agréé sur le site de l'ASN.",
      sourceName: "ASN - Décision n° 2026-DC-0745"
    }
  ]);

  // 3. Simulated AI-generated actions list (Section 6 & 7)
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: "action-1",
      text: "Mise à jour du protocole d'antibioprophylaxie chirurgicale (HAS 2026)",
      category: "Procédures de soins",
      dueDate: "Aujourd'hui",
      completed: false,
      alertId: "prot-2"
    },
    {
      id: "action-2",
      text: "Nommer un Conseiller en Radioprotection (CRP) sur le portail ASN",
      category: "Radioprotection",
      dueDate: "Sous 15 jours",
      completed: false,
      alertId: "prot-4"
    },
    {
      id: "action-3",
      text: "Désignation électronique du collecteur agréé de juillet (Trackdéchets)",
      category: "Réglementaire & Déchets",
      dueDate: "Sous 30 jours",
      completed: false,
      alertId: "prot-3"
    }
  ]);

  // Library Search & Filters
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryFilter, setLibraryFilter] = useState<"all" | "conforme" | "verify" | "obsolete">("all");

  // Interactive Upload Simulator (Section 11, 12, 13)
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressStep, setUploadProgressStep] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analyzedProtocolData, setAnalyzedProtocolData] = useState<any>(null);

  // Interactive Update Wizard Workflow (Section 14)
  const [activeWizardProtocol, setActiveWizardProtocol] = useState<Protocol | null>(null);
  const [wizardStep, setWizardStep] = useState<"detect" | "compare" | "proposal" | "success" | null>(null);
  const [wizardProposalText, setWizardProposalText] = useState("");

  // Stripe Checkout inside Dashboard State
  const [showDashboardStripe, setShowDashboardStripe] = useState(false);
  const [selectedDashboardPlan, setSelectedDashboardPlan] = useState<{ id: "solo" | "cabinet" | "clinique", title: string, price: number } | null>(null);
  const [stripeStatus, setStripeStatus] = useState<"form" | "loading" | "success">("form");
  const [dbCardHolder, setDbCardHolder] = useState("Dr Lucie Martin");
  const [dbCardNum, setDbCardNum] = useState("4242 4242 4242 4242");

  // Upgrade Gate Banner
  const [showGateBanner, setShowGateBanner] = useState(false);
  const [gateReason, setGateReason] = useState<"protocol_limit" | "pdf_download">("protocol_limit");

  // Chat State (Auvia AI Companion)
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "ai"; text: string; isMock?: boolean }[]>([
    { sender: "ai", text: `Bonjour ${doctorName}. Je suis Auvia, votre premier compagnon intelligent qui veille sur l'évolution réglementaire de votre profession libérale, analyse son impact sur vos protocoles internes (hygiène, qualité, procédures de soins) et guide votre équipe vers l'action. Comment puis-je vous aider ce matin ?` }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Update Doctor Name dynamically in chat messages if user changes it
  useEffect(() => {
    setChatMessages(prev => {
      if (prev.length === 1 && prev[0].sender === "ai") {
        return [{
          sender: "ai",
          text: `Bonjour ${doctorName}. Je suis Auvia, votre premier compagnon intelligent qui veille sur l'évolution réglementaire de votre profession libérale, analyse son impact sur vos protocoles internes (hygiène, qualité, procédures de soins) et guide votre équipe vers l'action. Comment puis-je vous aider ce matin ?`
        }];
      }
      return prev;
    });
  }, [doctorName]);

  // Billing history auto-generation
  useEffect(() => {
    if (profile && !profile.billingHistory) {
      setProfile({
        ...profile,
        billingHistory: []
      });
    }
  }, [profile]);

  // Handlers
  const handleToggleAction = (id: string) => {
    setActions(actions.map(a => {
      if (a.id === id) {
        const nextState = !a.completed;
        // If they complete an action, let's also update the associated protocol status to conforme!
        if (nextState && a.alertId) {
          setProtocols(prev => prev.map(p => p.id === a.alertId ? { ...p, status: "conforme" as const } : p));
        }
        return { ...a, completed: nextState };
      }
      return a;
    }));
  };

  const handleIgnoreAction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActions(actions.filter(a => a.id !== id));
  };

  const handleSendChatMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    setChatMessages(prev => [...prev, { sender: "user", text: messageText }]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, profile })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: "ai", text: data.text, isMock: data.isMock }]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages(prev => [...prev, { sender: "ai", text: "Désolé, j'ai rencontré un problème pour me connecter à mon serveur d'intelligence. Veuillez réessayer." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const onChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    handleSendChatMessage(msg);
  };

  // Simulate file drop / select (Section 11, 12, 13 with Feature Gate check!)
  const triggerFileUploadClick = () => {
    const isTrial = !profile.subscriptionTier || profile.subscriptionTier === "trial";
    // Check if we already have 4 or more protocols (which is > 3, the limit of Free Trial)
    if (isTrial && protocols.length >= 3) {
      setGateReason("protocol_limit");
      setShowGateBanner(true);
      return;
    }

    const fileSamples = ["Protocole_extraction_dentaire_v2024.pdf", "Procedure_desinfection_hygiene.docx", "Fiche_traçabilité_autoclave.txt"];
    const picked = prompt("Simuler l'importation de quel fichier ?\n\n1. " + fileSamples[0] + "\n2. " + fileSamples[1] + "\n3. " + fileSamples[2], "1");
    if (picked === "1") simulateFileUpload(fileSamples[0]);
    else if (picked === "2") simulateFileUpload(fileSamples[1]);
    else if (picked === "3") simulateFileUpload(fileSamples[2]);
    else if (picked) simulateFileUpload(picked);
  };

  const simulateFileUpload = (filename: string) => {
    setUploadedFileName(filename);
    setIsUploading(true);
    setUploadProgressStep(1);
    setShowAnalysisResult(false);
    
    // Simulate steps sequentially
    const intervals = [1000, 2000, 3000, 4000, 5000, 6000];
    
    intervals.forEach((delay, index) => {
      setTimeout(() => {
        setUploadProgressStep(index + 2);
        
        if (index === intervals.length - 1) {
          // Finished uploading and analysing
          setIsUploading(false);
          setShowAnalysisResult(true);
          
          // Seed new protocol analysis result
          const newProtocol: Protocol = {
            id: `prot-${Date.now()}`,
            title: filename.replace(/\.[^/.]+$/, ""),
            category: "Chirurgie orale",
            status: "verify",
            lastAnalysis: "À l'instant",
            cause: "Deux recommandations importantes sont apparues depuis votre dernière version.",
            version: "v1.0",
            history: [
              { version: "v1.0", date: "Aujourd'hui", comment: "Version importée" }
            ],
            contentCurrent: "Prescription courante d'Amoxicilline systématique lors d'avulsions de dents de sagesse incluses ou semi-incluses.",
            contentNew: "Restreindre l'antibioprophylaxie aux patients à haut risque cardiologique d'endocardite infectieuse selon les recommandations HAS 2026.",
            proposalText: "Modifier le paragraphe chirurgical en limitant l'antibioprophylaxie systématique.",
            sourceName: "HAS - Recommandations d'antibiothérapie préventive (2026)"
          };
          
          setAnalyzedProtocolData(newProtocol);
        }
      }, delay);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const isTrial = !profile.subscriptionTier || profile.subscriptionTier === "trial";
    if (isTrial && protocols.length >= 3) {
      setGateReason("protocol_limit");
      setShowGateBanner(true);
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  // Start Update Wizard
  const startUpdateWizard = (protocol: Protocol) => {
    setActiveWizardProtocol(protocol);
    setWizardProposalText(protocol.proposalText || "Modifier le protocole pour l'aligner avec la recommandation nationale.");
    setWizardStep("detect");
  };

  // Save the new version generated by wizard
  const saveWizardNewVersion = () => {
    if (!activeWizardProtocol) return;

    const updatedProtocols = protocols.map(p => {
      if (p.id === activeWizardProtocol.id) {
        const nextVer = (parseFloat(p.version.replace("v", "")) + 0.1).toFixed(1);
        const newHistoryItem = {
          version: `v${nextVer}`,
          date: new Date().toLocaleDateString("fr-FR"),
          comment: `Mise à jour suite à : ${activeWizardProtocol.sourceName || "recommandation nationale"}`
        };
        return {
          ...p,
          version: `v${nextVer}`,
          status: "conforme" as const,
          lastAnalysis: "Aujourd'hui à " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          history: [newHistoryItem, ...p.history],
          contentCurrent: p.contentNew || p.contentCurrent,
          cause: undefined
        };
      }
      return p;
    });

    setProtocols(updatedProtocols);

    // Also mark associated action items as completed
    setActions(prev => prev.map(a => {
      if (a.alertId === activeWizardProtocol.id) {
        return { ...a, completed: true };
      }
      return a;
    }));

    setWizardStep("success");
  };

  // Upgrade in Stripe Portal Handler
  const openDashboardStripeCheckout = (planId: "solo" | "cabinet" | "clinique", title: string, price: number) => {
    setSelectedDashboardPlan({ id: planId, title, price });
    setStripeStatus("form");
    setShowDashboardStripe(true);
  };

  const submitDashboardStripePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStripeStatus("loading");

    setTimeout(() => {
      setStripeStatus("success");

      if (selectedDashboardPlan) {
        const newInvoice: BillingInvoice = {
          id: "inv-" + Math.floor(Math.random() * 9000000 + 1000000),
          date: new Date().toLocaleDateString("fr-FR"),
          amount: selectedDashboardPlan.price,
          status: "paid",
          pdfUrl: "#"
        };

        setProfile({
          ...profile,
          subscriptionTier: selectedDashboardPlan.id,
          subscriptionStatus: "active",
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR"),
          billingHistory: [newInvoice, ...(profile.billingHistory || [])]
        });
      }
    }, 1800);
  };

  // Cancel subscription simulation
  const handleCancelSubscription = () => {
    if (confirm("Êtes-vous sûr de vouloir résilier votre abonnement Auvia ? Vos protocoles ne seront plus surveillés automatiquement.")) {
      setProfile({
        ...profile,
        subscriptionStatus: "canceled"
      });
      alert("Votre abonnement a été résilié et prendra fin le " + (profile.subscriptionEndDate || "prochainement") + ".");
    }
  };

  // Reactivate subscription simulation
  const handleReactivateSubscription = () => {
    setProfile({
      ...profile,
      subscriptionStatus: "active"
    });
    alert("Votre abonnement a été réactivé avec succès !");
  };

  // Simulated invoice download
  const handleDownloadInvoice = (inv: BillingInvoice) => {
    alert(`Génération du PDF de la facture ${inv.id}\nMontant : ${inv.amount} €\nStatut : PAYÉ\n\nVotre téléchargement commencera sous peu.`);
  };

  // PDF Download Gate check
  const checkPdfDownloadGate = () => {
    const isTrial = !profile.subscriptionTier || profile.subscriptionTier === "trial";
    if (isTrial) {
      setGateReason("pdf_download");
      setShowGateBanner(true);
    } else {
      alert("Génération et téléchargement du PDF clinique validé de " + activeWizardProtocol?.title + " v" + (parseFloat(activeWizardProtocol?.version.replace("v", "") || "1.0") + 0.1).toFixed(1));
    }
  };

  // Compute stats
  const activeActionsCount = actions.filter(a => !a.completed).length;
  const docsVerifiedCount = protocols.filter(p => p.status === "conforme").length;
  const docsToVerifyCount = protocols.filter(p => p.status === "verify").length;
  const docsObsoleteCount = protocols.filter(p => p.status === "obsolete").length;

  const totalDocsCount = protocols.length;

  // Filtered protocols for the library view
  const filteredProtocols = protocols.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(librarySearch.toLowerCase());
    
    if (libraryFilter === "all") return matchesSearch;
    return matchesSearch && p.status === libraryFilter;
  });

  return (
    <div id="saas-dashboard-container" className="min-h-screen bg-[#F8FAFC] flex flex-col relative">
      
      {/* SaaS Dashboard Top Info Bar */}
      <header className="bg-[#0A192F] text-white px-6 py-5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-[#4FD1C5]/10 text-[#4FD1C5] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#4FD1C5]/20">
              Copilote Réglementaire Actif
            </span>
            <span className="text-slate-400 text-xs font-mono font-bold">Cabinet connecté</span>
            {profile.subscriptionTier && profile.subscriptionTier !== "trial" ? (
              <span className="text-[9px] bg-[#006a63] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> PRO : {profile.subscriptionTier.toUpperCase()}
              </span>
            ) : (
              <span className="text-[9px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ESSAI GRATUIT
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <h1 className="font-display font-extrabold text-xl text-white">
              {doctorName}
            </h1>
            <button 
              onClick={() => {
                const nameInput = prompt("Modifier le nom du praticien :", doctorName);
                if (nameInput) setDoctorName(nameInput);
              }}
              className="text-[10px] text-slate-400 hover:text-white underline font-semibold transition-colors"
            >
              (modifier)
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Votre activité est surveillée par Auvia. <span className="text-[#4FD1C5] font-semibold">Dernière analyse : Aujourd'hui à 06:00</span>
          </p>
        </div>

        {/* Quick Tabs / Mode Selector */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            id="tab-dashboard"
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "dashboard"
                ? "bg-[#006a63] text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Centre de Pilotage
          </button>
          <button
            id="tab-library"
            onClick={() => {
              setActiveTab("library");
              setShowAnalysisResult(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "library"
                ? "bg-[#006a63] text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Mes Protocoles ({totalDocsCount})
          </button>
          <button
            id="tab-billing"
            onClick={() => setActiveTab("billing")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "billing"
                ? "bg-[#006a63] text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Abonnement & Factures
          </button>
        </div>
      </header>

      {/* Main SaaS Screen */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-6">

        {/* Profile configuration banner (Section 2.1 zero effort profile matching) */}
        <div className="lg:col-span-12 bg-white rounded-3xl border border-slate-100 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-[#006a63] shrink-0 mt-1">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#006a63] uppercase tracking-wider block">Filtre d'Analyse Métier</span>
              <p className="text-xs text-slate-700 leading-normal">
                Auvia filtre la législation pour correspondre à votre profil de <strong>{profile.profession}</strong> ({profile.practiceMode}), exerçant en <strong>{profile.region}</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-xs font-bold text-[#006a63] hover:underline flex items-center gap-1 shrink-0"
          >
            <Settings className="w-4 h-4" />
            {isEditingProfile ? "Masquer la configuration" : "Ajuster mon profil d'intérêts"}
          </button>
        </div>

        {/* Profile Settings Slide Down (Section 11 / Étape 2) */}
        {isEditingProfile && (
          <div className="lg:col-span-12 bg-white rounded-3xl border border-[#006a63]/20 p-6 shadow-md space-y-4 animate-fadeIn">
            <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#006a63]" />
              Configuration de votre Environnement Cabinet
            </h3>
            <div className="grid sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Profession réglementée</label>
                <select 
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:border-[#4FD1C5]"
                >
                  <option value="Chirurgien-Dentiste">Chirurgien-Dentiste</option>
                  <option value="Médecin Généraliste">Médecin Généraliste</option>
                  <option value="Masseur-Kinésithérapeute">Masseur-Kinésithérapeute</option>
                  <option value="Sage-Femme">Sage-Femme</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Spécialité d'exercice</label>
                <input 
                  type="text"
                  value={profile.specialty}
                  onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:border-[#4FD1C5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Mode d'exercice</label>
                <select 
                  value={profile.practiceMode}
                  onChange={(e) => setProfile({ ...profile, practiceMode: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:border-[#4FD1C5]"
                >
                  <option value="Libéral individuel">Libéral individuel</option>
                  <option value="Cabinet de groupe (SELARL)">Cabinet de groupe (SELARL)</option>
                  <option value="Collaborateur libéral">Collaborateur libéral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Région d'exercice (ARS rattachée)</label>
                <input 
                  type="text"
                  value={profile.region}
                  onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:border-[#4FD1C5]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* TAB 1: COCKPIT / CENTRE DE PILOTAGE                    */}
        {/* ====================================================== */}
        {activeTab === "dashboard" && (
          <>
            {/* LEFT COLUMN: Actions & Overview (Col span 8) */}
            <div className="lg:col-span-8 space-y-6 flex flex-col">

              {/* SECTION 5: Carte principale d'état global (Cas 1 / Cas 2) */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-hidden relative">
                
                {activeActionsCount > 0 ? (
                  /* Cas 2 : actions nécessaires */
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Attention requise</span>
                      </div>
                      <h2 className="font-display font-extrabold text-lg text-[#0A192F]">
                        ⚠ {activeActionsCount} éléments nécessitent votre attention
                      </h2>
                      <p className="text-xs text-slate-500 leading-normal max-w-xl">
                        Auvia a identifié <strong className="text-amber-700">{docsToVerifyCount + docsObsoleteCount} protocoles</strong> à vérifier ou obsolètes suite à de nouvelles publications de la HAS et de l'ASN.
                      </p>
                      <div className="flex gap-4 pt-1">
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          📁 {docsToVerifyCount} protocoles à analyser
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          🔴 {docsObsoleteCount} obsolète
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Dynamically update all to conforme
                        setProtocols(prev => prev.map(p => ({ ...p, status: "conforme" as const, cause: undefined })));
                        setActions(prev => prev.map(a => ({ ...a, completed: true })));
                      }}
                      className="px-5 py-3 bg-gradient-to-r from-[#0A192F] to-[#006a63] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Mettre tout à jour d'un coup
                    </button>
                  </div>
                ) : (
                  /* Cas 1 : tout est à jour */
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-[#006a63] bg-emerald-50 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>100% Conforme</span>
                      </div>
                      <h2 className="font-display font-extrabold text-lg text-[#0A192F]">
                        ✓ Tout est parfaitement à jour au cabinet
                      </h2>
                      <p className="text-xs text-slate-500 leading-normal">
                        Aucune évolution législative ou recommandation clinique importante ne nécessite votre intervention. Auvia continue sa surveillance passive sur les bulletins d'État.
                      </p>
                    </div>
                    <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-12 h-12 text-[#006a63]" />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 6 & 7: Bloc principal : Mes actions */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#006a63]" />
                    Mes actions réglementaires ({activeActionsCount} en attente)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold">PROPOSITION IA AUTOMATISÉE</span>
                </div>

                {actions.filter(a => !a.completed).length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-[#006a63] mx-auto" />
                    <p className="text-xs text-slate-500 font-bold">Aucune action en attente. Votre cabinet est serein.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {actions.filter(a => !a.completed).map((act) => {
                      const associatedProtocol = protocols.find(p => p.id === act.alertId);
                      const priority = act.category === "Radioprotection" || act.category === "DASRI" ? "critique" : "important";
                      
                      return (
                        <div 
                          key={act.id} 
                          className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-4 hover:shadow-sm transition-all"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              {priority === "critique" ? (
                                <span className="text-[9px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  🔴 Priorité Critique (Législation)
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  🟡 Priorité Importante (Pratique)
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">• Échéance : {act.dueDate}</span>
                            </div>

                            <h4 className="font-display font-bold text-sm text-[#0A192F] leading-snug">
                              {act.text}
                            </h4>

                            <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-slate-100/50">
                              <p>
                                <strong>Pourquoi ?</strong> Une nouvelle recommandation ou loi nationale a été détectée et concerne votre cabinet.
                              </p>
                              {associatedProtocol && (
                                <p className="text-slate-500">
                                  <strong>Impact potentiel :</strong> Votre protocole interne actuel date de {associatedProtocol.lastAnalysis === "À l'instant" ? "2024" : "2025"}. L'écart exige un ajustement.
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex md:flex-col justify-end gap-2 shrink-0 md:w-36 pt-2 md:pt-0">
                            {associatedProtocol ? (
                              <>
                                <button
                                  onClick={() => startUpdateWizard(associatedProtocol)}
                                  className="flex-1 px-3 py-2 bg-[#006a63] hover:bg-[#005550] text-white text-[11px] font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Analyser / Ajuster
                                </button>
                                <button
                                  onClick={() => handleToggleAction(act.id)}
                                  className="flex-1 px-3 py-2 bg-slate-200/60 hover:bg-slate-200 text-[#0A192F] text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Mettre à jour
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleToggleAction(act.id)}
                                className="flex-1 px-3 py-2 bg-[#006a63] hover:bg-[#005550] text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Marquer fait
                              </button>
                            )}
                            <button
                              onClick={(e) => handleIgnoreAction(act.id, e)}
                              className="px-3 py-2 hover:bg-red-50 text-slate-400 hover:text-red-600 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center"
                            >
                              Ignorer
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SECTION 8: Bloc : Mes protocoles (Overview Card) */}
              <div className="bg-[#0A192F] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-base text-[#4FD1C5] tracking-tight">
                    Mes protocoles cliniques et administratifs
                  </h3>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                    Vous disposez d'un référentiel de conformité d'activité complet et modifiable de <strong>{totalDocsCount} documents suivis</strong>.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                      <span className="block text-sm font-extrabold text-emerald-400">{docsVerifiedCount}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">À Jour</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                      <span className="block text-sm font-extrabold text-amber-400">{docsToVerifyCount}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">À Vérifier</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                      <span className="block text-sm font-extrabold text-red-400">{docsObsoleteCount}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">Obsolètes</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("library")}
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-[#0A192F] text-xs font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  Ouvrir ma bibliothèque
                </button>
              </div>

              {/* SECTION 16: Recherche conversationnelle (Quick suggestions) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Questions réglementaires fréquentes (Recherche contextuelle)
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      q: "Quels sont les changements importants depuis le mois dernier ?",
                      icon: "📅"
                    },
                    {
                      q: "Mon protocole d'hygiène est-il toujours à jour ?",
                      icon: "🧼"
                    },
                    {
                      q: "Pourquoi dois-je modifier cette procédure ?",
                      icon: "❓"
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendChatMessage(item.q)}
                      className="p-3.5 bg-white border border-slate-100 rounded-2xl text-xs text-[#0A192F] font-bold hover:border-[#006a63] cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5"
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.q}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Chat Companion Panel (Col span 4) */}
            <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
              
              {/* Core Chat View */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 flex flex-col justify-between h-[480px]">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#006a63] animate-pulse" />
                    <h3 className="font-display font-extrabold text-xs text-[#0A192F] uppercase tracking-wider">
                      Compagnon IA Auvia
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-slate-400 font-mono font-bold">VEILLE LIVE</span>
                  </div>
                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto space-y-3 py-3 text-xs pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-[#0A192F] text-white rounded-tr-none" 
                          : "bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100"
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        
                        {msg.sender === "ai" && msg.isMock && (
                          <div className="mt-2 text-[9px] text-[#006a63] font-bold border-t border-slate-200/50 pt-1.5 flex items-center gap-1 uppercase font-mono">
                            <Info className="w-3 h-3" /> Base experte Auvia active
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex items-center gap-2 p-3 bg-slate-50 text-slate-400 rounded-2xl rounded-tl-none border border-slate-100 max-w-[50%]">
                      <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={onChatSubmit} className="flex gap-2 border-t border-slate-50 pt-3">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Posez une question à l'IA..."
                    className="flex-1 bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-[#0A192F] text-white p-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Status and helpful details */}
              <div className="bg-teal-50/40 border border-teal-500/10 rounded-3xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#006a63] uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#4FD1C5]" />
                  Garantie Auvia
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Chaque recommandation ou analyse synthétique est croisée et relue par notre équipe juridique avant publication, assurant 0% d'erreur réglementaire.
                </p>
              </div>

            </div>
          </>
        )}

        {/* ====================================================== */}
        {/* TAB 2: MES PROTOCOLES / BIBLIOTHÈQUE                    */}
        {/* ====================================================== */}
        {activeTab === "library" && (
          <div className="lg:col-span-12 grid lg:grid-cols-12 gap-6">
            
            {/* Left Col (Library view, list and search) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
                
                {/* Header Section 10 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                  <div>
                    <h2 className="font-display font-extrabold text-lg text-[#0A192F]">
                      Mes Protocoles & Fiches Pratiques
                    </h2>
                    <p className="text-xs text-slate-500">
                      Consultez, recherchez et mettez à jour la mémoire vivante de vos procédures cabinet.
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold bg-[#0A192F] text-white px-3 py-1.5 rounded-xl">
                    📁 {totalDocsCount} Documents actifs
                  </span>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Rechercher un protocole (ex. hygiène, antibiotique...)"
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      className="w-full bg-slate-50 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>

                  <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                    {[
                      { id: "all", label: "Tous" },
                      { id: "conforme", label: "✓ Conforme" },
                      { id: "verify", label: "⚠ À vérifier" },
                      { id: "obsolete", label: "🔴 Obsolètes" }
                    ].map((filt) => (
                      <button
                        key={filt.id}
                        onClick={() => setLibraryFilter(filt.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          libraryFilter === filt.id
                            ? "bg-white text-[#0A192F] shadow-sm"
                            : "text-slate-500 hover:text-[#0A192F]"
                        }`}
                      >
                        {filt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Protocol Grid List */}
                <div className="space-y-4">
                  {filteredProtocols.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <Layers className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">Aucun protocole ne correspond à vos filtres.</p>
                    </div>
                  ) : (
                    filteredProtocols.map((p) => (
                      <div 
                        key={p.id}
                        className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-[#4FD1C5] hover:shadow-sm transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-[#006a63] bg-teal-50 px-2.5 py-0.5 rounded-full">
                                {p.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">Version {p.version}</span>
                            </div>
                            <h3 className="font-display font-extrabold text-base text-[#0A192F]">
                              {p.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {p.status === "conforme" && (
                              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                ✓ Conforme
                              </span>
                            )}
                            {p.status === "verify" && (
                              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                ⚠ À vérifier
                              </span>
                            )}
                            {p.status === "obsolete" && (
                              <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                🔴 Obsolète
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Cause message if status is not conforme */}
                        {p.cause && (
                          <div className="p-3 bg-amber-50/50 border border-amber-500/10 rounded-xl text-xs text-amber-900 leading-normal">
                            <strong>Cause :</strong> {p.cause}
                          </div>
                        )}

                        <div className="text-xs text-slate-600 line-clamp-3 bg-slate-50/50 p-4 rounded-xl border border-slate-50 leading-relaxed font-mono">
                          {p.contentCurrent}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-50">
                          <span className="text-[11px] text-slate-400">
                            Dernière analyse : <span className="font-semibold text-slate-600">{p.lastAnalysis}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            {p.status !== "conforme" && (
                              <button
                                onClick={() => startUpdateWizard(p)}
                                className="px-4 py-2 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                Analyser / Mettre à jour
                              </button>
                            )}
                            
                            {/* Version History Toggle dropdown placeholder */}
                            <button
                              onClick={() => {
                                alert(`Historique des versions de "${p.title}" :\n\n` + p.history.map(h => `${h.version} (${h.date}) : ${h.comment}`).join("\n"));
                              }}
                              className="px-3.5 py-2 hover:bg-slate-50 text-slate-500 hover:text-[#0A192F] text-xs font-bold rounded-xl border border-slate-100 transition-all flex items-center gap-1"
                              title="Afficher l'historique des modifications"
                            >
                              <History className="w-3.5 h-3.5" />
                              Historique ({p.history.length})
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>

            </div>

            {/* Right Col (Section 11, 12, 13: Import protocol uploader simulator) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#006a63]" />
                    Ajouter un protocole (Section 11)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Déposez vos documents existants pour les intégrer dans le référentiel de surveillance automatique Auvia.
                  </p>
                </div>

                {/* Drag and drop target uploader */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                    isDragging 
                      ? "border-[#4FD1C5] bg-[#4FD1C5]/10 scale-[0.98]" 
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                  }`}
                >
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                  <p className="text-xs font-bold text-[#0A192F]">
                    Déposez votre document ici
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    PDF, DOCX, ou TXT (Max 10Mo)
                  </p>

                  <div className="relative mt-4">
                    <button
                      onClick={triggerFileUploadClick}
                      className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-[#0A192F] text-xs font-bold rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      Importer un fichier
                    </button>
                  </div>
                </div>

                {/* SECTION 12: Analyse automatique après import (Progress Steps) */}
                {isUploading && (
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="text-[11px] font-bold text-[#0A192F] font-mono">ANALYSE COGNITIVE EN COURS</span>
                      <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse" />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Fichier reçu : <strong className="text-[#0A192F]">{uploadedFileName}</strong>
                    </p>

                    {/* Sequence Stepper */}
                    <div className="space-y-3">
                      {[
                        { step: 1, text: "Document reçu et validé" },
                        { step: 2, text: "Extraction du flux textuel" },
                        { step: 3, text: "Compréhension clinique du sujet" },
                        { step: 4, text: "Classification thématique métier" },
                        { step: 5, text: "Recherche des recommandations d'État" },
                        { step: 6, text: "Évaluation du niveau de conformité" }
                      ].map((item) => {
                        const isDone = uploadProgressStep > item.step;
                        const isActive = uploadProgressStep === item.step;
                        
                        return (
                          <div 
                            key={item.step} 
                            className={`flex items-center gap-3 transition-opacity ${
                              isDone ? "opacity-100" : isActive ? "opacity-100 text-[#006a63]" : "opacity-40"
                            }`}
                          >
                            <div className="shrink-0">
                              {isDone ? (
                                <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              ) : isActive ? (
                                <div className="w-4.5 h-4.5 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                              ) : (
                                <div className="w-4.5 h-4.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 font-mono">
                                  {item.step}
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SECTION 13: Résultat d'analyse */}
                {showAnalysisResult && analyzedProtocolData && (
                  <div className="bg-amber-50/50 border border-amber-500/10 p-5 rounded-3xl space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-amber-700">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">
                        Rapport d'Analyse Réglementaire
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p className="text-slate-500">
                        Document : <strong className="text-slate-800">{uploadedFileName}</strong>
                      </p>
                      <p className="text-slate-500">
                        Spécialité : <strong className="text-slate-800">{analyzedProtocolData.category}</strong>
                      </p>
                      <div className="py-2.5 px-3 bg-white border border-amber-500/10 rounded-xl space-y-1">
                        <span className="block text-[10px] font-mono font-bold text-amber-700 uppercase">État : Mise à jour recommandée</span>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          Deux recommandations importantes de la HAS de 2026 sont apparues depuis la rédaction de votre version.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          // Insert the analyzed protocol into our lists!
                          const newProt: Protocol = {
                            ...analyzedProtocolData,
                            title: uploadedFileName.replace(/\.[^/.]+$/, ""),
                          };
                          setProtocols([newProt, ...protocols]);
                          
                          // Add to actions too
                          setActions([
                            {
                              id: `action-${Date.now()}`,
                              text: `Mise à jour suite à analyse de ${newProt.title}`,
                              category: "Chirurgie orale",
                              dueDate: "Sous 10 jours",
                              completed: false,
                              alertId: newProt.id
                            },
                            ...actions
                          ]);

                          setShowAnalysisResult(false);
                          alert("Le document a été intégré avec succès à votre bibliothèque pour surveillance continue. Une action corrective a été ajoutée à votre tableau de bord !");
                        }}
                        className="flex-1 py-2 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Intégrer et surveiller
                      </button>
                      <button
                        onClick={() => startUpdateWizard(analyzedProtocolData)}
                        className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Mettre à jour maintenant
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ====================================================== */}
        {/* TAB 3: STRIPE CUSTOMER PORTAL / ABONNEMENT & FACTURES */}
        {/* ====================================================== */}
        {activeTab === "billing" && (
          <div className="lg:col-span-12 space-y-6 animate-fadeIn">

            {/* Header */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#006a63] uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-full">
                  Portail Client Stripe
                </span>
                <h2 className="font-display font-extrabold text-lg text-[#0A192F]">
                  Gestion d'Abonnement & Facturation
                </h2>
                <p className="text-xs text-slate-500">
                  Consultez votre formule, mettez à jour votre carte bancaire et accédez à vos factures certifiées.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Flux de facturation crypté
              </div>
            </div>

            {/* Main Billing Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

              {/* Left Side: Current Subscription details */}
              <div className="lg:col-span-7 space-y-6">

                {/* Active Plan Detail */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider border-b border-slate-50 pb-3 flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#006a63]" />
                    Formule Active
                  </h3>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">ABONNEMENT ACTIF</span>
                      <h4 className="font-display font-extrabold text-lg text-[#0a192f] leading-snug">
                        {profile.subscriptionTier === "trial" && "Essai Gratuit (14 jours)"}
                        {profile.subscriptionTier === "solo" && "Individuel Solo"}
                        {profile.subscriptionTier === "cabinet" && "Cabinet Plus"}
                        {profile.subscriptionTier === "clinique" && "Clinique & Groupe"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {profile.subscriptionStatus === "trialing" && "Période d'évaluation en cours."}
                        {profile.subscriptionStatus === "active" && "Abonnement en cours de validité."}
                        {profile.subscriptionStatus === "canceled" && "Résilié. Se terminera le " + profile.subscriptionEndDate + "."}
                      </p>
                    </div>

                    <div className="space-y-1 sm:text-right shrink-0">
                      <div className="font-mono font-extrabold text-[#006a63] text-xl">
                        {profile.subscriptionTier === "trial" && "0,00 €"}
                        {profile.subscriptionTier === "solo" && "29,00 €"}
                        {profile.subscriptionTier === "cabinet" && "79,00 €"}
                        {profile.subscriptionTier === "clinique" && "199,00 €"}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        {profile.subscriptionTier === "trial" ? "Aucun prélèvement" : "Prélèvement mensuel"}
                      </span>
                    </div>
                  </div>

                  {/* Renew info / Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="space-y-0.5 text-xs text-slate-500">
                      <p>
                        <strong>Prochaine facture :</strong> {profile.subscriptionEndDate || "N/A"}
                      </p>
                      <p>
                        <strong>Moyen de paiement :</strong> Carte Visa terminant par <strong className="font-mono">4242</strong>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {profile.subscriptionStatus === "active" ? (
                        <button
                          onClick={handleCancelSubscription}
                          className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold rounded-xl transition-all"
                        >
                          Résilier l'abonnement
                        </button>
                      ) : profile.subscriptionStatus === "canceled" ? (
                        <button
                          onClick={handleReactivateSubscription}
                          className="px-4 py-2 bg-[#006a63] text-white hover:bg-[#005550] text-xs font-bold rounded-xl transition-all shadow-sm"
                        >
                          Réactiver l'abonnement
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-bold italic">Essai non-facturé</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Change pricing formula directly */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider border-b border-slate-50 pb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#006a63]" />
                    Changer de Formule de Service
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-4 pt-1">
                    {[
                      { id: "solo", title: "Individuel Solo", price: 29, limit: "5 protocoles" },
                      { id: "cabinet", title: "Cabinet Plus", price: 79, limit: "20 protocoles" },
                      { id: "clinique", title: "Clinique", price: 199, limit: "Illimités" }
                    ].map((formula) => {
                      const isActive = profile.subscriptionTier === formula.id;

                      return (
                        <div
                          key={formula.id}
                          className={`border rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all ${
                            isActive
                              ? "border-[#006a63] bg-teal-50/10 shadow-sm ring-1 ring-[#006a63]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">ABONNEMENT</span>
                            <h4 className="font-display font-bold text-xs text-[#0A192F]">{formula.title}</h4>
                            <p className="text-[11px] text-slate-500 font-semibold">{formula.limit}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="font-mono text-sm font-extrabold text-[#006a63]">
                              {formula.price} € <span className="text-[9px] text-slate-400">/ mois</span>
                            </div>

                            {isActive ? (
                              <div className="w-full text-center py-1 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase tracking-wider">
                                Formule Actuelle
                              </div>
                            ) : (
                              <button
                                onClick={() => openDashboardStripeCheckout(formula.id as any, formula.title, formula.price)}
                                className="w-full py-1.5 bg-[#0a192f] hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg transition-all"
                              >
                                Choisir via Stripe
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Side: Billing Invoices History */}
              <div className="lg:col-span-5 space-y-6">

                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider border-b border-slate-50 pb-3 flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#006a63]" />
                    Historique des Factures
                  </h3>

                  {!profile.billingHistory || profile.billingHistory.length === 0 ? (
                    <div className="text-center py-12 space-y-2">
                      <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-400 font-bold">Aucune facture émise pour le moment.</p>
                      <p className="text-[11px] text-slate-400">Les factures apparaîtront dès votre premier règlement Stripe.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.billingHistory.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4FD1C5]/30 transition-all text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-[#0A192F]">{invoice.id}</span>
                              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold uppercase">
                                PAYÉ
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400">Émise le {invoice.date}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <strong className="font-mono text-slate-800">{invoice.amount.toFixed(2)} €</strong>
                            <button
                              onClick={() => handleDownloadInvoice(invoice)}
                              className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 rounded-lg hover:text-[#006a63] transition-colors"
                              title="Télécharger la facture PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subcription Guarantee badge */}
                <div className="bg-emerald-50/20 border border-emerald-500/10 rounded-3xl p-5 space-y-2">
                  <h4 className="text-xs font-bold text-[#006a63] uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#4FD1C5]" />
                    Garantie d'abonnement Auvia
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Résiliation en 1 clic sans frais de rupture. Prise en compte immédiate. Pour toute question de facturation ou litige Stripe, contactez support@auvia.ai.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ====================================================== */}
      {/* SECTION 14: INTERACTIVE UPDATE WIZARD (MODAL OVERLAY) */}
      {/* ====================================================== */}
      <AnimatePresence>
        {wizardStep !== null && activeWizardProtocol && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              
              {/* Wizard Modal Header */}
              <div className="bg-[#0A192F] text-white px-6 py-5 flex justify-between items-center shrink-0 border-b border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#4FD1C5] uppercase tracking-wider block">
                    Copilote IA Auvia — Processus d'alignement de protocole
                  </span>
                  <h3 className="font-display font-extrabold text-base text-white">
                    Mise à jour : {activeWizardProtocol.title}
                  </h3>
                </div>

                <button 
                  onClick={() => setWizardStep(null)}
                  className="p-1.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wizard Nav Steps Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 shrink-0 flex items-center justify-between gap-4 overflow-x-auto text-xs">
                {[
                  { id: "detect", label: "1. Détection & Écart" },
                  { id: "compare", label: "2. Comparaison (v2.0 VS HAS)" },
                  { id: "proposal", label: "3. Proposition IA" },
                  { id: "success", label: "4. Nouvelle version (v2.1)" }
                ].map((item) => {
                  const isActive = wizardStep === item.id;
                  
                  return (
                    <div 
                      key={item.id}
                      className={`flex items-center gap-2 font-bold whitespace-nowrap ${
                        isActive ? "text-[#006a63]" : "text-slate-400"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isActive ? "bg-[#006a63] text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {item.id === "detect" ? "1" : item.id === "compare" ? "2" : item.id === "proposal" ? "3" : "4"}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Wizard Dynamic Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">

                {/* STEP 1: DETECTION & ÉCART */}
                {wizardStep === "detect" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider">
                        Étape 1 — Détection de l'écart réglementaire
                      </h4>
                      <p className="text-xs text-slate-500">
                        Auvia compare automatiquement votre protocole d'équipe aux nouvelles recommandations nationales ou directives réglementaires parues.
                      </p>
                    </div>

                    {/* Flowchart visualizer */}
                    <div className="grid md:grid-cols-3 items-center gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-1.5 shadow-sm">
                        <FileText className="w-8 h-8 text-[#0A192F] mx-auto" />
                        <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Votre version</span>
                        <strong className="text-xs text-[#0A192F] block truncate">{activeWizardProtocol.title} ({activeWizardProtocol.version})</strong>
                        <p className="text-[10px] text-slate-500">Rédigé il y a plus de 12 mois</p>
                      </div>

                      <div className="text-slate-400 flex flex-col items-center">
                        <ArrowRight className="w-6 h-6 animate-pulse text-[#006a63]" />
                        <span className="text-[9px] font-mono font-bold text-[#006a63] mt-1">ÉCART DÉTECTÉ</span>
                      </div>

                      <div className="bg-teal-50 border border-teal-500/10 p-4 rounded-2xl space-y-1.5 shadow-sm">
                        <Sparkles className="w-8 h-8 text-[#006a63] mx-auto animate-pulse" />
                        <span className="text-[10px] text-[#006a63] font-bold block uppercase font-mono">Recommandation active</span>
                        <strong className="text-xs text-[#0A192F] block">{activeWizardProtocol.sourceName || "Directives HAS 2026"}</strong>
                        <p className="text-[10px] text-[#006a63]">Publié récemment</p>
                      </div>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-500/10 p-4 rounded-2xl space-y-1.5 text-xs">
                      <strong className="text-amber-800 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Risque identifié en cas d'omission :
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Le maintien de l'ancien protocole médical au sein de votre cabinet présente un risque médico-légal en cas d'audit ARS, de plainte patient ou d'expertise d'assurance suite à une complication (par exemple, antibiorésistance ou mauvaise prescription d'antibiotiques).
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setWizardStep("compare")}
                        className="px-5 py-2.5 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Continuer vers la comparaison
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: COMPARATIVE VIEW */}
                {wizardStep === "compare" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider">
                        Étape 2 — Comparaison analytique comparative
                      </h4>
                      <p className="text-xs text-slate-500">
                        Comparez le texte actif de votre protocole à la nouvelle règle pour en comprendre la divergence immédiate.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Left side: current */}
                      <div className="border border-slate-100 rounded-2xl p-5 space-y-3 bg-white shadow-sm">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                            Votre texte actuel ({activeWizardProtocol.version})
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">
                            Obsolète
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap bg-slate-50/50 p-4 rounded-xl border border-slate-50 min-h-[140px]">
                          {activeWizardProtocol.contentCurrent}
                        </p>
                      </div>

                      {/* Right side: new recommandation */}
                      <div className="border border-teal-500/10 rounded-2xl p-5 space-y-3 bg-teal-50/10 shadow-sm">
                        <div className="flex justify-between items-center border-b border-teal-500/10 pb-2">
                          <span className="text-[10px] font-mono font-bold text-[#006a63] uppercase">
                            Nouvel alignement exigé ({activeWizardProtocol.sourceName || "HAS 2026"})
                          </span>
                          <span className="text-[10px] bg-[#006a63] text-white font-bold px-2 py-0.5 rounded uppercase animate-pulse">
                            Recommandé
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap bg-white p-4 rounded-xl border border-teal-500/10 min-h-[140px]">
                          {activeWizardProtocol.contentNew || "Veuillez mettre à jour le protocole pour insérer les nouvelles obligations de sécurité."}
                        </p>
                      </div>

                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        onClick={() => setWizardStep("detect")}
                        className="px-4 py-2.5 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-xl transition-all border border-slate-200"
                      >
                        Précédent
                      </button>
                      <button
                        onClick={() => setWizardStep("proposal")}
                        className="px-5 py-2.5 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Voir la proposition IA
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PROPOSITION IA */}
                {wizardStep === "proposal" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm text-[#0A192F] uppercase tracking-wider">
                        Étape 3 — Proposition de rédaction de notre IA
                      </h4>
                      <p className="text-xs text-slate-500">
                        Notre IA a rédigé une révision sur-mesure pour votre document cabinet. Ajustez le texte proposé avant de l'entériner.
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      <div className="bg-[#0A192F] text-white p-5 rounded-2xl space-y-2">
                        <span className="text-[9px] font-mono font-bold text-[#4FD1C5] uppercase tracking-wider block">MODIFICATION SUGGÉRÉE</span>
                        <p className="text-xs leading-relaxed italic text-slate-200">
                          "{activeWizardProtocol.proposalText || "Modifier l'organisation en y désignant un Conseiller en Radioprotection certifié."}"
                        </p>
                        <span className="block text-[9px] text-slate-400">
                          Source légale de référence : {activeWizardProtocol.sourceName || "Autorité de Santé (HAS/ASN)"}
                        </span>
                      </div>

                      {/* Text editor mock */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500">Texte final du protocole révisé (Modifiable) :</label>
                        <textarea
                          rows={6}
                          value={wizardProposalText}
                          onChange={(e) => setWizardProposalText(e.target.value)}
                          className="w-full text-xs font-mono p-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#4FD1C5] bg-slate-50/50"
                        />
                      </div>

                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        onClick={() => setWizardStep("compare")}
                        className="px-4 py-2.5 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-xl transition-all border border-slate-200"
                      >
                        Précédent
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setWizardStep(null);
                            alert("La modification a été refusée. Le protocole conserve sa version actuelle.");
                          }}
                          className="px-4 py-2.5 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-all"
                        >
                          Refuser & Fermer
                        </button>
                        <button
                          onClick={saveWizardNewVersion}
                          className="px-5 py-2.5 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accepter et Publier
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUCCESS WITH PDF DOWNLOAD GATED */}
                {wizardStep === "success" && (
                  <div className="text-center py-8 space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="font-display font-extrabold text-lg text-[#0A192F]">
                        Protocole mis à jour et aligné avec succès !
                      </h3>
                      <p className="text-xs text-slate-500 leading-normal">
                        La nouvelle version du document a été archivée au sein de votre bibliothèque numérique cabinet. Votre équipe clinique en est informée.
                      </p>
                    </div>

                    {/* Version card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm mx-auto text-left space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Document :</span>
                        <strong className="text-slate-800">{activeWizardProtocol.title}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Nouvelle version :</span>
                        <strong className="text-emerald-700 font-bold">v{(parseFloat(activeWizardProtocol.version.replace("v", "")) + 0.1).toFixed(1)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Statut :</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">✓ Conforme et Actif</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Modifié le :</span>
                        <span className="text-slate-600 font-mono">{new Date().toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-center gap-2">
                      <button
                        onClick={checkPdfDownloadGate}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <FileDown className="w-4 h-4" />
                        Télécharger le PDF clinique
                      </button>
                      <button
                        onClick={() => setWizardStep(null)}
                        className="px-5 py-2.5 bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Retourner au Dashboard
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================== */}
      {/* FEATURE GATE ALERTS & OVERLAYS                          */}
      {/* ====================================================== */}
      <AnimatePresence>
        {showGateBanner && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg p-6 space-y-6 text-center"
            >
              <div className="w-14 h-14 bg-amber-50 text-amber-600 border border-amber-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-6 h-6 stroke-[2.5]" />
              </div>

              {gateReason === "protocol_limit" ? (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">Limite d'Essai Atteinte</span>
                  <h3 className="font-display font-extrabold text-lg text-[#0A192F]">
                    Débloquez l'intégration de protocoles illimitée !
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    La formule Essai Gratuit est limitée à un maximum de <strong>3 protocoles</strong>. Passez sur notre offre professionnelle pour étendre la surveillance de votre cabinet.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded font-bold">Option Réservée aux Membres</span>
                  <h3 className="font-display font-extrabold text-lg text-[#0A192F]">
                    Export PDF clinique réservé aux abonnés !
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Le téléchargement de PDF officiels scellés cliniquement requiert une formule active d'Auvia (Individuel Solo ou Cabinet Plus).
                  </p>
                </div>
              )}

              {/* Subcribe quick choices */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-xs text-[#0a192f] block">Formule Individuel Solo</strong>
                    <span className="text-[10px] text-slate-400 font-semibold">Jusqu'à 5 protocoles • PDF inclus</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowGateBanner(false);
                      setActiveTab("billing");
                      openDashboardStripeCheckout("solo", "Individuel Solo", 29);
                    }}
                    className="px-3 py-1.5 bg-[#0A192F] text-white text-[10px] font-bold rounded-lg hover:bg-slate-800"
                  >
                    29 € / mois
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                  <div>
                    <strong className="text-xs text-[#0a192f] block">Formule Cabinet Plus</strong>
                    <span className="text-[10px] text-slate-400 font-semibold">Jusqu'à 20 protocoles • Équipe</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowGateBanner(false);
                      setActiveTab("billing");
                      openDashboardStripeCheckout("cabinet", "Cabinet Plus", 79);
                    }}
                    className="px-3 py-1.5 bg-[#006a63] text-white text-[10px] font-bold rounded-lg hover:bg-[#005550]"
                  >
                    79 € / mois
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowGateBanner(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setShowGateBanner(false);
                    setActiveTab("billing");
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#0a192f] to-[#006a63] text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Voir les abonnements
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================== */}
      {/* DASHBOARD STRIPE PAYOUT SIMULATOR                      */}
      {/* ====================================================== */}
      <AnimatePresence>
        {showDashboardStripe && selectedDashboardPlan && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* stripe banner */}
              <div className="bg-[#0A192F] text-white p-8 md:w-5/12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowDashboardStripe(false)}>
                    <Compass className="w-5 h-5 text-[#4FD1C5]" />
                    <span className="font-display font-extrabold text-sm tracking-tight text-white">Auvia</span>
                  </div>

                  <div className="space-y-1 pt-4">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">MISE À NIVEAU</span>
                    <h4 className="font-display font-extrabold text-base text-[#4FD1C5] leading-snug">{selectedDashboardPlan.title}</h4>
                    <p className="text-[11px] text-slate-300">Renouvellement mensuel automatique. Sans engagement.</p>
                  </div>
                </div>

                <div className="space-y-4 pt-12">
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-3">
                    <span className="text-slate-400 text-xs font-semibold">Montant HT</span>
                    <span className="text-slate-200 text-sm font-mono">{(selectedDashboardPlan.price / 1.2).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-3">
                    <span className="text-slate-400 text-xs font-semibold">TVA (20%)</span>
                    <span className="text-slate-200 text-sm font-mono">{(selectedDashboardPlan.price - (selectedDashboardPlan.price / 1.2)).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">Total à payer</span>
                    <span className="text-[#4FD1C5] text-2xl font-extrabold font-mono">{selectedDashboardPlan.price.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Paiement sécurisé via Stripe
                </div>
              </div>

              {/* pay form */}
              <div className="bg-white p-8 flex-1 flex flex-col justify-between">
                {stripeStatus === "form" && (
                  <form onSubmit={submitDashboardStripePayment} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">Informations de carte</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDashboardStripe(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Titulaire de la carte</label>
                        <input
                          type="text"
                          value={dbCardHolder}
                          onChange={(e) => setDbCardHolder(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Numéro de carte</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={dbCardNum}
                            onChange={(e) => setDbCardNum(e.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            required
                          />
                          <span className="absolute right-3.5 top-2.5 text-[9px] text-[#006a63] font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            TEST STRIPE
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Expiration</label>
                          <input
                            type="text"
                            defaultValue="12/28"
                            className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">CVC</label>
                          <input
                            type="password"
                            defaultValue="123"
                            className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#006a63] hover:bg-[#005550] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <Lock className="w-3.5 h-3.5" /> Confirmer le paiement sécurisé
                      </button>
                    </div>
                  </form>
                )}

                {stripeStatus === "loading" && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12 animate-fadeIn">
                    <RefreshCw className="w-10 h-10 text-[#006a63] animate-spin stroke-[2.5]" />
                    <div className="text-center space-y-1">
                      <h4 className="font-display font-extrabold text-sm text-[#0A192F]">Authentification 3D Secure</h4>
                      <p className="text-xs text-slate-400">Finalisation du prélèvement Stripe...</p>
                    </div>
                  </div>
                )}

                {stripeStatus === "success" && (
                  <div className="flex-1 flex flex-col justify-between py-4 animate-fadeIn">
                    <div className="text-center space-y-4 pt-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-display font-extrabold text-base text-[#0A192F]">Abonnement Activé !</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                          Votre cabinet est désormais équipé de la formule <strong>{selectedDashboardPlan.title}</strong> d'Auvia.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => {
                          setShowDashboardStripe(false);
                          setActiveTab("dashboard");
                        }}
                        className="w-full py-3 bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        Retourner au Pilotage
                        <ArrowRight className="w-4 h-4 text-[#4FD1C5]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
