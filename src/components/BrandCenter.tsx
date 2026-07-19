import React, { useState } from "react";
import { Compass, Sparkles, Copy, Check, Palette, Type, Layers, CreditCard, BookOpen, ArrowLeft, Send } from "lucide-react";

interface BrandCenterProps {
  onBack: () => void;
}

export default function BrandCenter({ onBack }: BrandCenterProps) {
  const [activeSubTab, setActiveSubTab] = useState<"logos" | "colors" | "components" | "card" | "guidelines">("logos");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  // Business Card Custom State
  const [cardName, setCardName] = useState("Dr. Lucie Martin");
  const [cardSpecialty, setCardSpecialty] = useState("Chirurgien-Dentiste");
  const [cardCabinet, setCardCabinet] = useState("Cabinet Dentaire des Tuileries");
  const [cardEmail, setCardEmail] = useState("l.martin@dentaire-tuileries.fr");
  const [cardPhone, setCardPhone] = useState("+33 1 42 60 00 00");
  const [cardAddress, setCardAddress] = useState("12 Rue de Rivoli, 75001 Paris");

  const colors = [
    { name: "Primary (Midnight Blue)", hex: "#0A192F", desc: "Expertise, autorité et calme", text: "white" },
    { name: "Secondary (Soft Turquoise)", hex: "#4FD1C5", desc: "Évolution, santé et IA", text: "black" },
    { name: "Background Gray", hex: "#F8FAFC", desc: "Clarté, structure et espace", text: "black" },
    { name: "Pure White", hex: "#FFFFFF", desc: "Minimalisme et lisibilité", text: "black" },
    { name: "Slate Secondary", hex: "#64748B", desc: "Typographie neutre", text: "white" },
    { name: "Accent Amber", hex: "#D97706", desc: "Alertes moyennes", text: "white" },
    { name: "Error Red", hex: "#EF4444", desc: "Obligations urgentes", text: "white" }
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-600 transition-colors"
              title="Retour à l'accueil"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#0A192F]/5 text-[#0A192F] px-2.5 py-0.5 rounded-full font-bold">BRAND IDENTITY</span>
                <span className="text-xs bg-[#4FD1C5]/10 text-[#007169] px-2.5 py-0.5 rounded-full font-bold">DELIVERABLES V0.1</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-[#0A192F] mt-1">Auvia Brand Center & Design System</h1>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "logos", label: "Logos & Icône", icon: Compass },
              { id: "colors", label: "Couleurs & Fontes", icon: Palette },
              { id: "components", label: "Composants", icon: Layers },
              { id: "card", label: "Carte de Visite", icon: CreditCard },
              { id: "guidelines", label: "Lignes Directrices", icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active 
                      ? "bg-[#0A192F] text-white shadow-md shadow-[#0A192F]/10" 
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* LOGOS & ICON TAB */}
        {activeSubTab === "logos" && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0A192F]">Trois directions d'exploration du Logo</h2>
              <p className="text-slate-500 text-sm max-w-3xl">
                Conformément au brief, nous avons exploré trois directions de logos vectoriels, optimisés pour fonctionner en icônes d'application et reconnaissables en petits formats.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Direction A */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#006a63] font-bold">DIRECTION A</span>
                  <h3 className="font-display font-bold text-lg text-[#0A192F]">Le Compagnon (Lien & Présence)</h3>
                  <p className="text-slate-500 text-xs">Évoque l'accompagnement, la sécurité et la complicité humaine d'un assistant intelligent.</p>
                </div>
                
                {/* SVG Logo Direction A */}
                <div className="bg-slate-50 rounded-2xl h-48 flex items-center justify-center border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#0A192F" />
                    {/* Two intertwined paths representing linking/partnership */}
                    <path d="M40,50 C40,40 50,40 50,50 C50,60 60,60 60,50" stroke="#4FD1C5" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <circle cx="40" cy="50" r="4" fill="#FFFFFF" />
                    <circle cx="60" cy="50" r="4" fill="#FFFFFF" />
                  </svg>
                </div>

                <div className="text-center font-display font-bold text-[#0A192F] text-lg">
                  Auvia
                </div>
              </div>

              {/* Direction B */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#006a63] font-bold">DIRECTION B</span>
                  <h3 className="font-display font-bold text-lg text-[#0A192F]">Le Chemin / "Via" (Trajectoire)</h3>
                  <p className="text-slate-500 text-xs">Symbolise la progression, l'évolution continue et l'orientation sans heurts.</p>
                </div>
                
                {/* SVG Logo Direction B */}
                <div className="bg-slate-50 rounded-2xl h-48 flex items-center justify-center border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="80" height="80" rx="20" fill="#0A192F" />
                    <path d="M25,75 C35,65 30,35 50,25 C70,15 75,45 75,75" stroke="#4FD1C5" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <polygon points="50,15 57,25 43,25" fill="#4FD1C5" transform="rotate(35 50 25)" />
                  </svg>
                </div>

                <div className="text-center font-display font-bold text-[#0A192F] text-lg">
                  Auvia
                </div>
              </div>

              {/* Direction C */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#006a63] font-bold">DIRECTION C</span>
                  <h3 className="font-display font-bold text-lg text-[#0A192F]">Le Signal (Soustraction du Bruit)</h3>
                  <p className="text-slate-500 text-xs">Transforme le bruit réglementaire complexe en un signal d'action limpide.</p>
                </div>
                
                {/* SVG Logo Direction C */}
                <div className="bg-slate-50 rounded-2xl h-48 flex items-center justify-center border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#0A192F" />
                    {/* Wave lines transforming into flat clean light beam */}
                    <path d="M25,50 Q32,35 40,50 T55,50 H75" stroke="#4FD1C5" strokeWidth="5" strokeLinecap="round" fill="none" />
                    <circle cx="75" cy="50" r="5" fill="#4FD1C5" />
                  </svg>
                </div>

                <div className="text-center font-display font-bold text-[#0A192F] text-lg">
                  Auvia
                </div>
              </div>
            </div>

            {/* App Icon Mockup */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs bg-[#4FD1C5]/10 text-[#007169] px-2.5 py-0.5 rounded-full font-bold">APPLICATION ICON MOCKUP</span>
                <h3 className="font-display font-extrabold text-xl text-[#0A192F]">Un icône d'application reconnaissable</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  L'icône d'application mobile d'Auvia intègre la direction B ("Le Chemin") et la direction C ("La Lumière") en utilisant la dualité des couleurs de la palette. Elle a été construite pour ressortir sur tous types de fonds d'écran mobiles.
                </p>
                <div className="pt-2 text-xs text-slate-400 font-mono">
                  Résolution idéale : 512px x 512px • Format PNG/SVG
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-8 py-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-2xl bg-[#0A192F] flex items-center justify-center shadow-lg shadow-[#0A192F]/25">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="#0A192F" />
                      <path d="M30,65 C40,40 60,40 70,65" stroke="#4FD1C5" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <circle cx="50" cy="45" r="12" fill="#4FD1C5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Format iOS / Android</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0A192F] flex items-center justify-center shadow-md shadow-[#0A192F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="#0A192F" />
                      <path d="M30,65 C40,40 60,40 70,65" stroke="#4FD1C5" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <circle cx="50" cy="45" r="12" fill="#4FD1C5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Format Favicon</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COLORS & FONTS TAB */}
        {activeSubTab === "colors" && (
          <div className="space-y-12">
            {/* Colors Section */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-[#0A192F]">Palette de Couleurs Interactive</h3>
                <p className="text-slate-500 text-sm">
                  Cliquez sur n'importe quel échantillon de couleur pour copier instantanément son code hexadécimal dans votre presse-papiers.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {colors.map((color) => (
                  <div 
                    key={color.hex}
                    onClick={() => handleCopyColor(color.hex)}
                    className="group relative bg-white border border-slate-100 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div 
                      className="w-full h-24 rounded-xl border border-slate-200/40 mb-3 flex items-end justify-end p-2"
                      style={{ backgroundColor: color.hex }}
                    >
                      <button className="p-1.5 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedColor === color.hex ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#0A192F]">{color.name}</span>
                      <span className="font-mono text-xs text-slate-400 font-bold">{color.hex}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{color.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#006a63]">TITRAGE & EN-TÊTE</span>
                  <h3 className="font-display font-bold text-lg text-[#0A192F]">Plus Jakarta Sans</h3>
                  <p className="text-slate-500 text-xs">
                    Une police sans-serif géométrique contemporaine caractérisée par des courbes amicales et des proportions éditoriales premium.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                  <div className="font-display font-extrabold text-3xl text-[#0A192F] tracking-tight">
                    Auvia Compagnon IA
                  </div>
                  <div className="font-display font-semibold text-xl text-[#0A192F] tracking-tight">
                    Moins de bruit. Plus de clarté.
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Style : ExtraBold / SemiBold • Espacement : Tight (-0.02em / -0.01em)
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#006a63]">TEXTE COURANT & LABELS</span>
                  <h3 className="font-display font-bold text-lg text-[#0A192F]">Inter</h3>
                  <p className="text-slate-500 text-xs">
                    Le moteur de l'interface. Conçu pour une lisibilité clinique et administrative irréprochable et un grand confort oculaire.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">
                    Le double contrôle réglementaire obligatoire passe désormais sous une déclaration de CRP (Conseiller en Radioprotection) interne ou externe à effectuer directement sur le site d'enregistrement.
                  </p>
                  <p className="font-sans font-semibold text-xs text-[#0A192F]">
                    ACTION : METTRE À JOUR LE PROTOCOLE DE CABINET
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Style : Regular / Medium / SemiBold • Espacement : Standard
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPONENTS TAB */}
        {activeSubTab === "components" && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0A192F]">Design System de Base (Fidélité UI)</h2>
              <p className="text-slate-500 text-sm max-w-3xl">
                Présentation des principaux éléments graphiques du Design System : boutons, champs d'entrée, puces et indicateurs de signal d'IA.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Buttons & Chips */}
              <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-[#0A192F]">Boutons & Puces d'État</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <button className="bg-[#0A192F] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
                      Primary button
                    </button>
                    <button className="border border-slate-200 text-[#0A192F] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                      Secondary button
                    </button>
                    <button className="text-slate-500 hover:text-[#0A192F] px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                      Ghost Action
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="bg-[#4FD1C5]/10 text-[#007169] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />
                      Radioprotection
                    </span>
                    <span className="bg-[#0A192F]/5 text-[#0A192F] px-2.5 py-1 rounded-full text-xs font-bold">
                      Stérilisation
                    </span>
                    <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold">
                      Obligation
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Gradient & Pulsing Indicators */}
              <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-[#0A192F]">Signaux Intelligents de l'IA (Auvia Core)</h3>
                <p className="text-slate-500 text-xs">
                  Auvia n'affiche aucun robot. Elle se matérialise par de subtiles impulsions lumineuses ou gradients turquoise animés symbolisant sa veille active.
                </p>

                <div className="p-6 bg-slate-50 rounded-2xl flex flex-col gap-4 items-start justify-center">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FD1C5] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4FD1C5]"></span>
                    </div>
                    <span className="font-mono text-xs text-[#0A192F] font-bold uppercase tracking-wider">
                      Veille Active IA En Cours
                    </span>
                  </div>

                  <div className="w-full bg-[#0A192F] text-white p-4 rounded-xl relative overflow-hidden">
                    {/* Animated background gradient shine */}
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#4FD1C5]/10 to-transparent blur" />
                    <div className="flex items-start gap-3 relative z-10">
                      <Sparkles className="w-4 h-4 text-[#4FD1C5] animate-pulse" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#4FD1C5]">Assistant IA Actif</h4>
                        <p className="text-[11px] text-slate-300">Prêt à répondre et synthétiser votre prochain document clinique.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARTE DE VISITE / BUSINESS CARD */}
        {activeSubTab === "card" && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0A192F]">Générateur Interactif de Cartes de Visite</h2>
              <p className="text-slate-500 text-sm max-w-3xl">
                Créez et prévisualisez instantanément vos cartes de visite professionnelles habillées de la charte de marque premium d'Auvia.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Form Configurator */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-sm">
                <h3 className="font-display font-bold text-sm text-[#0A192F] uppercase tracking-wider">Informations Praticien</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nom Prénom</label>
                    <input 
                      type="text" 
                      value={cardName} 
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Titre / Spécialité</label>
                    <input 
                      type="text" 
                      value={cardSpecialty} 
                      onChange={(e) => setCardSpecialty(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nom du Cabinet</label>
                    <input 
                      type="text" 
                      value={cardCabinet} 
                      onChange={(e) => setCardCabinet(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail Professionnel</label>
                    <input 
                      type="email" 
                      value={cardEmail} 
                      onChange={(e) => setCardEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Téléphone</label>
                    <input 
                      type="text" 
                      value={cardPhone} 
                      onChange={(e) => setCardPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Adresse</label>
                    <input 
                      type="text" 
                      value={cardAddress} 
                      onChange={(e) => setCardAddress(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#4FD1C5] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Cards Showcase */}
              <div className="lg:col-span-8 space-y-8">
                {/* Recto Card */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400">RECTO — IDENTITÉ DE MARQUE</span>
                  <div className="w-full max-w-lg aspect-[85/55] bg-[#0A192F] rounded-2xl p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-lg shadow-[#0A192F]/20">
                    {/* Abstract path background graphics */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4FD1C5]/10 to-transparent pointer-events-none" />
                    
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#4FD1C5]">
                        <Compass className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-display font-extrabold text-lg tracking-tight">Auvia</span>
                    </div>

                    <div className="space-y-1 relative z-10">
                      <div className="text-[10px] font-mono font-semibold tracking-widest text-[#4FD1C5] uppercase">
                        SaaS de Veille Professionnelle
                      </div>
                      <div className="text-xs text-slate-400">
                        Votre pratique libérale, toujours à jour et sereine.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verso Card */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400">VERSO — INFORMATIONS DE CONTACT</span>
                  <div className="w-full max-w-lg aspect-[85/55] bg-white rounded-2xl p-8 flex flex-col justify-between text-[#0A192F] border border-slate-200 shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-lg tracking-tight">{cardName}</h4>
                        <p className="text-xs font-medium text-[#006a63]">{cardSpecialty}</p>
                        <p className="text-[11px] text-slate-400 font-semibold">{cardCabinet}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-4 h-4 text-[#4FD1C5]" />
                        <span className="font-display font-bold text-xs tracking-tight">Auvia</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500 font-mono">
                      <div>📧 {cardEmail}</div>
                      <div>📞 {cardPhone}</div>
                      <div>📍 {cardAddress}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GUIDELINES TAB */}
        {activeSubTab === "guidelines" && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-8">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h2 className="font-display font-bold text-xl text-[#0A192F]">Guide d'Utilisation de la Marque (Guidelines)</h2>
              <p className="text-slate-500 text-sm">
                Les piliers de communication et d'expression de la marque Auvia pour préserver sa vision et son intégrité.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-[#0A192F]">1. Positionnement Émotionnel</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Auvia est un **compagnon de confiance**. Elle doit rassurer sans jamais infantiliser, être experte sans paraître clinique, et inspirer la clarté face à la complexité des textes juridiques.
                </p>
                <div className="bg-[#4FD1C5]/5 border-l-4 border-[#4FD1C5] p-4 text-xs text-[#007169] rounded-r-xl">
                  <strong>Ressenti recherché chez le praticien :</strong> "Je ne suis plus seul face à la complexité réglementaire. Auvia veille sur l'exercice de mon métier."
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-[#0A192F]">2. Ton de Communication</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4FD1C5] font-bold">✓</span>
                    <span><strong>"Moins de bruit. Plus de clarté."</strong> (Minimalisme et focus)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4FD1C5] font-bold">✓</span>
                    <span><strong>"Votre pratique reste toujours à jour."</strong> (Action concrète)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span><em>Éviter : "Le logiciel de conformité légale obligatoire."</em> (Anxiogène et rigide)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
