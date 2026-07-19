import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import SaaSDashboard from "./components/SaaSDashboard";
import MobileSimulator from "./components/MobileSimulator";
import BrandCenter from "./components/BrandCenter";
import { Compass, BookOpen, Laptop, Phone, ArrowLeft, Layers, Sparkles } from "lucide-react";
import { UserProfile } from "./types";

export default function App() {
  const [view, setView] = useState<"landing" | "saas" | "mobile" | "brand">("landing");
  
  // Lifted User Profile State to dynamically connect landing registration to dashboard
  const [profile, setProfile] = useState<UserProfile>({
    profession: "Chirurgien-Dentiste",
    specialty: "Omnipratique & Chirurgie",
    region: "Île-de-France",
    practiceMode: "Libéral individuel",
    interests: ["Radioprotection", "Stérilisation", "DASRI", "RGPD"]
  });

  // Quick helper to return back to landing
  const handleGoBack = () => setView("landing");

  // 1. Landing View
  if (view === "landing") {
    return <LandingPage onNavigate={setView} profile={profile} setProfile={setProfile} />;
  }

  // 2. Mobile Simulator View
  if (view === "mobile") {
    return <MobileSimulator onBack={handleGoBack} />;
  }

  // 3. Brand Identity / Design System View
  if (view === "brand") {
    return <BrandCenter onBack={handleGoBack} />;
  }

  // 4. SaaS Dashboard View (Wrapped in a premium workspace layout)
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* Workspace Sidebar */}
      <aside className="w-full lg:w-64 bg-[#0A192F] text-white flex flex-col justify-between border-r border-slate-800 lg:sticky lg:top-0 lg:h-screen">
        
        {/* Sidebar Brand / Top */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleGoBack}>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#4FD1C5]">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">Auvia Workspace</span>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block px-3">
              Prototype SaaS V0.1
            </span>
            
            <button 
              onClick={() => setView("saas")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white transition-all text-left"
            >
              <Laptop className="w-4 h-4 text-[#4FD1C5]" />
              Écran de Démo SaaS
            </button>

            <button 
              onClick={() => setView("mobile")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left"
            >
              <Phone className="w-4 h-4" />
              Simulateur Mobile
            </button>

            <button 
              onClick={() => setView("brand")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left"
            >
              <Layers className="w-4 h-4" />
              Livrables de Marque
            </button>
          </div>
        </div>

        {/* Sidebar Footer / Action to return */}
        <div className="p-6 border-t border-slate-800 space-y-3">
          <button 
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-white text-[#0A192F] hover:bg-slate-100 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour au site public
          </button>
          
          <div className="text-[10px] text-slate-500 text-center leading-normal">
            Auvia Intelligence © 2026 <br />
            Tous droits réservés
          </div>
        </div>

      </aside>

      {/* Main SaaS Dashboard Workspace */}
      <main className="flex-1 overflow-x-hidden">
        <SaaSDashboard profile={profile} setProfile={setProfile} />
      </main>

    </div>
  );
}
