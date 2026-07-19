import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Compass, AlertTriangle, ShieldCheck, CheckCircle2, Circle, 
  HelpCircle, Trash2, Calendar, FileText, Send, Sparkles, User, Settings, Info, Bell
} from "lucide-react";
import { UserProfile, RegulatoryAlert, ActionItem } from "../types";

interface SaaSDashboardProps {
  profile?: UserProfile;
  setProfile?: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function SaaSDashboard({ profile: externalProfile, setProfile: externalSetProfile }: SaaSDashboardProps) {
  // 1. Profile Setup State (Step 2 of spec)
  const [internalProfile, setInternalProfile] = useState<UserProfile>({
    profession: "Chirurgien-Dentiste",
    specialty: "Omnipratique & Chirurgie",
    region: "Île-de-France",
    practiceMode: "Libéral individuel",
    interests: ["Radioprotection", "Stérilisation", "DASRI", "RGPD"]
  });

  const profile = externalProfile || internalProfile;
  const setProfile = externalSetProfile || setInternalProfile;
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 2. Mock Regulatory Alerts (High Fidelity)
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>([
    {
      id: "alert-1",
      title: "Arrêté du 23 Octobre 2020 : Réforme des contrôles de radioprotection",
      date: "15 Mai 2026",
      severity: "critical",
      source: "ASN (Autorité de Sûreté Nucléaire)",
      category: "Radioprotection",
      summary: "La périodicité des contrôles de conformité externes effectués par des Organismes Agréés en Radioprotection (OAR) est modifiée pour passer à un intervalle fixe de 5 ans, avec obligation de nommer un Conseiller en Radioprotection (CRP) inscrit.",
      detailedAnalysis: "La nouvelle réglementation simplifie les contrôles mais renforce la responsabilité pénale du praticien titulaire. Le rôle du Conseiller en Radioprotection (ex-PCR) est centralisé : vous devez obligatoirement disposer d'un contrat d'accompagnement ou d'un salarié qualifié à jour et l'enregistrer officiellement auprès du portail ASN.",
      impacts: [
        "Vérifier la validité de votre dernier contrôle externe (doit avoir moins de 5 ans).",
        "Enregistrer votre Conseiller en Radioprotection sur le portail ASN-SISERI.",
        "Mettre à jour la fiche d'exposition individuelle de votre assistante dentaire."
      ],
      actionPlan: [
        "Prendre contact avec l'organisme d'étalonnage pour planifier le contrôle des émetteurs.",
        "Renseigner l'attestation de désignation du CRP.",
        "Imprimer et signer la fiche collective de radioprotection pour la salle de pause."
      ],
      status: "pending"
    },
    {
      id: "alert-2",
      title: "Double Traçabilité obligatoire des Dispositifs Autoclavés",
      date: "02 Juin 2026",
      severity: "warning",
      source: "HAS (Haute Autorité de Santé)",
      category: "Stérilisation",
      summary: "Rappel des obligations documentaires HAS concernant la stérilisation des dispositifs médicaux réutilisables au cabinet dentaire.",
      detailedAnalysis: "Chaque sachet d'instrumentation stérile doit comporter une double étiquette traçable (code-barres ou QR code). Lors du soin, cette étiquette doit être rattachée numériquement ou physiquement au dossier du patient. Les tickets d'autoclave validant la pression et le palier de température doivent être sauvegardés pendant 5 ans.",
      impacts: [
        "Liaison systématique du lot de stérilisation à chaque acte chirurgical.",
        "Archivage numérique obligatoire des tickets d'autoclave.",
        "Mise à jour du cahier d'enregistrement de stérilisation journalier."
      ],
      actionPlan: [
        "Activer le module de traçabilité par lecteur optique sur le logiciel clinique.",
        "Sauvegarder numériquement le test Bowie-Dick hebdomadaire.",
        "Former l'assistante remplaçante à la double étiquette."
      ],
      status: "pending"
    },
    {
      id: "alert-3",
      title: "Trackdéchets Numérique : Obligation de dématérialisation des BSDA",
      date: "14 Juillet 2026",
      severity: "critical",
      source: "Ministère de la Transition Écologique",
      category: "DASRI",
      summary: "Le suivi papier des déchets d'activités de soins à risques infectieux (DASRI) est définitivement obsolète. L'utilisation de la plateforme numérique Trackdéchets est désormais obligatoire pour tous les cabinets libéraux.",
      detailedAnalysis: "Tous les enlèvements de DASRI (boîtes à aiguilles, fûts d'amalgame) doivent être enregistrés et validés numériquement à l'aide d'un BSDA dématérialisé sur le portail Trackdéchets de l'État. Sans cela, le collecteur ne pourra plus récupérer vos déchets et vous risquez une amende pour défaut de traçabilité.",
      impacts: [
        "Inscription obligatoire du cabinet sur trackdechets.beta.gouv.fr.",
        "Liaison du compte au numéro SIRET professionnel.",
        "Génération des BSDA de collecte uniquement en format électronique."
      ],
      actionPlan: [
        "Créer le compte cabinet sur Trackdéchets.",
        "Associer le collecteur agréé habituel dans l'interface.",
        "Valider le premier bordereau électronique de retrait de juillet."
      ],
      status: "pending"
    }
  ]);

  const [selectedAlertId, setSelectedAlertId] = useState<string>("alert-1");
  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  // 3. Global Checklist state gathered from all alerts
  const [todoItems, setTodoItems] = useState<ActionItem[]>([
    { id: "todo-1", text: "Vérifier la validité de votre dernier contrôle externe (Radioprotection)", category: "Radioprotection", dueDate: "30 Juil 2026", completed: false, alertId: "alert-1" },
    { id: "todo-2", text: "Enregistrer votre Conseiller en Radioprotection sur le portail ASN", category: "Radioprotection", dueDate: "15 Août 2026", completed: false, alertId: "alert-1" },
    { id: "todo-3", text: "Sauvegarder numériquement le rapport Bowie-Dick d'autoclave", category: "Stérilisation", dueDate: "30 Juil 2026", completed: true, alertId: "alert-2" },
    { id: "todo-4", text: "Créer le compte cabinet sur trackdechets.beta.gouv.fr", category: "DASRI", dueDate: "31 Juil 2026", completed: false, alertId: "alert-3" },
    { id: "todo-5", text: "Générer le registre RGPD simplifié de la CNIL", category: "RGPD", dueDate: "10 Sept 2026", completed: false }
  ]);

  // 4. Chat State (Auvia AI Companion)
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "ai"; text: string; isMock?: boolean }[]>([
    { sender: "ai", text: "Bonjour Docteur. Je suis Auvia, votre assistant réglementaire intelligent. Posez-moi vos questions cliniques ou administratives." }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Handlers
  const handleToggleTodo = (id: string) => {
    setTodoItems(todoItems.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, profile })
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

  const completedCount = todoItems.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / todoItems.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* SaaS Dashboard Top Banner */}
      <div className="bg-[#0A192F] text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#4FD1C5]">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <span className="font-display font-bold text-lg">Auvia SaaS Dashboard</span>
          <span className="text-[10px] bg-teal-500/15 text-[#4FD1C5] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#4FD1C5]/20">
            Veille Cabinet Actuelle
          </span>
        </div>

        {/* Profile indicator (Step 2) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <User className="w-4 h-4 text-[#4FD1C5]" />
            <div>
              <span className="font-semibold text-slate-300">{profile.profession}</span>
              <span className="text-slate-500 block text-[9px]">{profile.practiceMode} • {profile.region}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-slate-300"
            title="Configurer le profil cabinet"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex-1 p-6 grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Profile configuration slide down (if active) */}
        {isEditingProfile && (
          <div className="lg:col-span-12 bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-sm text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-[#006a63]" />
                Étape 2 — Configuration de l'environnement Métier
              </h3>
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="text-xs text-[#006a63] font-bold hover:underline"
              >
                Fermer
              </button>
            </div>
            
            <div className="grid sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Profession</label>
                <select 
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none"
                >
                  <option value="Chirurgien-Dentiste">Chirurgien-Dentiste</option>
                  <option value="Médecin Généraliste">Médecin Généraliste</option>
                  <option value="Masseur-Kinésithérapeute">Masseur-Kinésithérapeute</option>
                  <option value="Sage-Femme">Sage-Femme</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Spécialité</label>
                <input 
                  type="text"
                  value={profile.specialty}
                  onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Mode d'exercice</label>
                <select 
                  value={profile.practiceMode}
                  onChange={(e) => setProfile({ ...profile, practiceMode: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none"
                >
                  <option value="Libéral individuel">Libéral individuel</option>
                  <option value="Cabinet de groupe (SELARL)">Cabinet de groupe (SELARL)</option>
                  <option value="Collaborateur libéral">Collaborateur libéral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Région</label>
                <input 
                  type="text"
                  value={profile.region}
                  onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* LEFT COLUMN: Alerts and Detail view (Col Span 8) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* Alerts Horizontal Slider / List */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#006a63]" />
              Filtre actif : {profile.interests.join(", ")}
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {alerts.map((alert) => {
                const isSelected = alert.id === selectedAlertId;
                const isCritical = alert.severity === "critical";
                
                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlertId(alert.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-white border-[#4FD1C5] shadow-md shadow-[#0A192F]/5" 
                        : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCritical ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {alert.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{alert.date}</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-[#0A192F] line-clamp-2 leading-tight">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-normal">
                      {alert.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Detail Panel */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6 flex-1">
            <div className="flex justify-between items-start border-b border-slate-50 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#006a63]">{selectedAlert.source}</span>
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs text-slate-400 font-bold">Dossier #{selectedAlert.id}</span>
                </div>
                <h2 className="font-display font-bold text-lg text-[#0A192F]">
                  {selectedAlert.title}
                </h2>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                selectedAlert.severity === "critical" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
              }`}>
                {selectedAlert.severity}
              </span>
            </div>

            {/* Décryptage Content */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-2">
                <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4FD1C5]" />
                  Décryptage Synthétique (Moins de bruit, plus de clarté)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedAlert.detailedAnalysis}
                </p>
              </div>

              {/* Impacts Section */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/10 border border-emerald-500/10 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-[#007169] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#4FD1C5]" />
                    Impacts Pratiques Cabinet
                  </h4>
                  <ul className="space-y-2">
                    {selectedAlert.impacts.map((imp, idx) => (
                      <li key={idx} className="text-xs text-slate-600 leading-normal flex items-start gap-1.5">
                        <span className="text-[#4FD1C5] font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#0A192F]/5 border border-slate-100 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Plan d'Action Proposé
                  </h4>
                  <ul className="space-y-2">
                    {selectedAlert.actionPlan.map((act, idx) => (
                      <li key={idx} className="text-xs text-slate-600 leading-normal flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">{idx + 1}.</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Chat Companion & To-Do Checklist (Col Span 4) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Action Center (Checklist) */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-sm text-[#0A192F] uppercase tracking-wider">
                Mon Espace Action
              </h3>
              <span className="text-xs font-mono font-bold text-[#006a63]">
                {completedCount}/{todoItems.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#0A192F] to-[#4FD1C5] transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>CONFORMITÉ GLOBALE</span>
                <span>{progressPercent}%</span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {todoItems.map((todo) => (
                <div 
                  key={todo.id}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="flex items-start gap-2.5 p-2 bg-slate-50 hover:bg-slate-100/50 rounded-xl cursor-pointer transition-colors border border-slate-100/30"
                >
                  <button className="text-slate-400 mt-0.5">
                    {todo.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#006a63]" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <div className="space-y-0.5">
                    <p className={`text-xs text-slate-600 leading-normal ${todo.completed ? "line-through text-slate-400" : ""}`}>
                      {todo.text}
                    </p>
                    <span className="text-[9px] bg-slate-200/50 text-[#0A192F] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wide">
                      {todo.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chatbot Companion Panel */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-5 flex flex-col justify-between h-96">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4FD1C5] animate-pulse" />
                <h3 className="font-display font-extrabold text-xs text-[#0A192F] uppercase tracking-wider">
                  Compagnon IA Auvia
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-slate-400 font-mono font-bold">VEILLE LIVE</span>
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
                    {/* Render helper for mock flag or simple text */}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    
                    {msg.sender === "ai" && msg.isMock && (
                      <div className="mt-2 text-[9px] text-[#006a63] font-bold border-t border-slate-200/50 pt-1.5 flex items-center gap-1 uppercase font-mono">
                        <Info className="w-3 h-3" /> Base de données autonome active
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
            <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t border-slate-50 pt-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Posez une question réglementaire..."
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

        </div>

      </div>
    </div>
  );
}
