import React, { useState } from "react";
import { Compass, Sparkles, Send, CheckCircle2, Circle, AlertTriangle, Bell, Smartphone, ArrowLeft, RefreshCw, Layers } from "lucide-react";

interface MobileSimulatorProps {
  onBack: () => void;
}

export default function MobileSimulator({ onBack }: MobileSimulatorProps) {
  const [activeScreen, setActiveScreen] = useState<"feed" | "chat" | "actions">("feed");
  const [mobileChatInput, setMobileChatInput] = useState("");
  const [isMobileLoading, setIsMobileLoading] = useState(false);
  const [mobileMessages, setMobileMessages] = useState<{ sender: "user" | "ai"; text: string; isMock?: boolean }[]>([
    { sender: "ai", text: "Bonjour Docteur. Je suis votre copilote Auvia. Un doute sur les DASRI ou Trackdéchets ? Je suis à votre écoute." }
  ]);

  // Mobile checklist
  const [mobileTasks, setMobileTasks] = useState([
    { id: "m1", text: "Vérifier le test de Bowie-Dick hebdomadaire", completed: false, category: "Stérilisation" },
    { id: "m2", text: "Inscrire le cabinet sur Trackdéchets numérique", completed: true, category: "DASRI" },
    { id: "m3", text: "Signer la désignation du CRP (ex-PCR)", completed: false, category: "Radioprotection" },
    { id: "m4", text: "Actualiser la note RGPD en salle d'attente", completed: false, category: "RGPD" }
  ]);

  const handleToggleTask = (id: string) => {
    setMobileTasks(mobileTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSendMobileChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileChatInput.trim()) return;

    const userMsg = mobileChatInput;
    setMobileChatInput("");
    setMobileMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsMobileLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, profile: { profession: "Chirurgien-Dentiste" } })
      });
      const data = await response.json();
      setMobileMessages(prev => [...prev, { sender: "ai", text: data.text, isMock: data.isMock }]);
    } catch (err) {
      console.error(err);
      setMobileMessages(prev => [...prev, { sender: "ai", text: "Problème de connexion. Veuillez réessayer." }]);
    } finally {
      setIsMobileLoading(false);
    }
  };

  const handlePresetClick = (text: string) => {
    setMobileChatInput(text);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column explanation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <button 
              id="mobile-back-btn"
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs bg-[#0A192F]/5 text-[#0A192F] px-2.5 py-0.5 rounded-full font-bold">MOBILE PROTOTYPE</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl text-[#0A192F] tracking-tight leading-tight">
            Exemple d'Application Mobile Auvia
          </h1>
          
          <p className="text-slate-500 text-sm leading-relaxed">
            Un compagnon réglementaire doit être accessible à tout moment, notamment entre deux consultations. L'application mobile Auvia simplifie le suivi de conformité en un coup d'œil et intègre une messagerie instantanée fluide avec l'intelligence de veille.
          </p>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-xs">
            <div className="font-bold text-[#0A192F] uppercase">Scénarios d'utilisation nomade :</div>
            <ul className="space-y-2 text-slate-500">
              <li>📱 <strong>Consultation d'alertes HAS / ASN</strong> entre deux patients.</li>
              <li>💬 <strong>Interrogation vocale ou textuelle</strong> d'Auvia en cas de doute clinique immédiat.</li>
              <li>✓ <strong>Checklists rapides</strong> pour déléguer les actions administratives à l'assistante.</li>
            </ul>
          </div>
        </div>

        {/* Right column: The phone device mock */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Phone body */}
          <div className="relative w-[360px] h-[720px] bg-[#0A192F] rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden">
            
            {/* Phone Top Speaker & Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0A192F] rounded-full z-50 flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
              <span className="w-12 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Simulated Mobile Screen Canvas */}
            <div className="relative flex-1 bg-[#F8FAFC] rounded-[36px] overflow-hidden flex flex-col justify-between pt-6">
              
              {/* Screen Top Header Bar */}
              <div className="bg-white border-b border-slate-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md bg-[#0A192F] flex items-center justify-center text-[#4FD1C5]">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-display font-bold text-xs tracking-tight text-[#0A192F]">Auvia Mobile</span>
                </div>
                
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Veille active
                </span>
              </div>

              {/* Screen Inner Content View */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* 1. FEED SCREEN */}
                {activeScreen === "feed" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0A192F] pb-1">
                      <span>Alertes Récentes</span>
                      <span className="text-[10px] text-slate-400">Chirurgien-Dentiste</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-3.5 space-y-2 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-bold bg-red-50 text-red-700 px-1.5 py-0.5 rounded">DASRI</span>
                        <span className="text-[9px] text-slate-400">14 Juil 2026</span>
                      </div>
                      <h4 className="font-display font-bold text-[11px] text-[#0A192F] leading-snug">Trackdéchets dématérialisé obligatoire</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">Les bordereaux papier BSDA sont définitivement interdits. L'inscription numérique est requise.</p>
                      <button 
                        onClick={() => setActiveScreen("chat")}
                        className="text-[10px] text-[#006a63] font-bold flex items-center gap-1 pt-1"
                      >
                        Demander le plan d'action <Smartphone className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-3.5 space-y-2 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">Radioprotection</span>
                        <span className="text-[9px] text-slate-400">15 Mai 2026</span>
                      </div>
                      <h4 className="font-display font-bold text-[11px] text-[#0A192F] leading-snug">Contrôle OAR tous les 5 ans</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">Vérifiez vos contrats d'accompagnement externe de vos émetteurs radio.</p>
                    </div>
                  </div>
                )}

                {/* 2. CHAT SCREEN */}
                {activeScreen === "chat" && (
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[440px] pr-1 pb-4">
                      {mobileMessages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                          <div className={`p-3 rounded-2xl max-w-[90%] text-[11px] leading-relaxed ${
                            msg.sender === "user" 
                              ? "bg-[#0A192F] text-white rounded-tr-none" 
                              : "bg-white text-slate-700 border border-slate-100 shadow-sm rounded-tl-none"
                          }`}>
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                            {msg.sender === "ai" && msg.isMock && (
                              <div className="mt-1 text-[8px] text-[#006a63] font-bold border-t border-slate-100 pt-1 flex items-center gap-1 font-mono uppercase">
                                <Sparkles className="w-2.5 h-2.5" /> Base autonome active
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isMobileLoading && (
                        <div className="flex gap-1.5 p-2 bg-white border border-slate-100 max-w-[40%] rounded-xl rounded-tl-none">
                          <span className="w-1 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce" />
                          <span className="w-1 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce [animation-delay:0.1s]" />
                          <span className="w-1 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                      )}
                    </div>

                    {/* Chat Presets */}
                    <div className="flex gap-1.5 overflow-x-auto pb-2 pr-1 scrollbar-none">
                      <button 
                        onClick={() => handlePresetClick("Règles radioprotection")}
                        className="text-[9px] font-bold bg-white border border-slate-200 text-[#0a192f] px-2 py-1 rounded-full whitespace-nowrap hover:bg-[#4FD1C5]/10"
                      >
                        ⚡ Radioprotection
                      </button>
                      <button 
                        onClick={() => handlePresetClick("Protocole stérilisation")}
                        className="text-[9px] font-bold bg-white border border-slate-200 text-[#0a192f] px-2 py-1 rounded-full whitespace-nowrap hover:bg-[#4FD1C5]/10"
                      >
                        ⚡ Stérilisation
                      </button>
                    </div>

                    {/* Chat Form */}
                    <form onSubmit={handleSendMobileChat} className="flex gap-1.5 border-t border-slate-100 pt-2 bg-[#F8FAFC]">
                      <input 
                        type="text"
                        value={mobileChatInput}
                        onChange={(e) => setMobileChatInput(e.target.value)}
                        placeholder="Poser une question..."
                        className="flex-1 text-[11px] bg-white px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                      />
                      <button 
                        type="submit"
                        disabled={isMobileLoading || !mobileChatInput.trim()}
                        className="bg-[#0A192F] text-white p-2 rounded-xl"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}

                {/* 3. ACTIONS SCREEN */}
                {activeScreen === "actions" && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-[#0A192F]">Actions Pratiques de Cabinet</div>
                    
                    <div className="space-y-2">
                      {mobileTasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => handleToggleTask(task.id)}
                          className="flex items-start gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl cursor-pointer shadow-sm hover:bg-slate-50"
                        >
                          <button className="text-slate-400 mt-0.5 flex-shrink-0">
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006a63]" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300" />
                            )}
                          </button>
                          <div className="space-y-0.5">
                            <p className={`text-[10px] text-slate-600 leading-normal font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>
                              {task.text}
                            </p>
                            <span className="text-[8px] bg-slate-100 text-slate-400 font-bold uppercase px-1 rounded">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Screen Bottom Navigation Bar */}
              <div className="bg-white border-t border-slate-100 py-2.5 flex items-center justify-around">
                {[
                  { id: "feed", label: "Veille", icon: Bell },
                  { id: "chat", label: "Assistant", icon: Sparkles },
                  { id: "actions", label: "Actions", icon: CheckCircle2 }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveScreen(item.id as any)}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-[#006a63]" : "text-slate-400"}`} />
                      <span className={`text-[8px] font-bold ${active ? "text-[#006a63]" : "text-slate-400"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
