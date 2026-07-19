import React from "react";
import { motion } from "motion/react";
import { Sparkles, Shield, Compass, Layers, ArrowRight, Activity, HelpCircle, Laptop, Phone } from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: "landing" | "saas" | "mobile" | "brand") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("landing")}>
            <div className="w-9 h-9 rounded-xl bg-[#0A192F] flex items-center justify-center text-[#4FD1C5]">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-[#0A192F]">
              Auvia
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate("brand")}
              className="text-sm font-semibold text-slate-600 hover:text-[#0A192F] transition-colors"
            >
              Livrables de Marque
            </button>
            <button 
              onClick={() => onNavigate("mobile")}
              className="text-sm font-semibold text-slate-600 hover:text-[#0A192F] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> Version Mobile
            </button>
            <button 
              onClick={() => onNavigate("saas")}
              className="bg-[#0A192F] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
            >
              Démarrer la Démo SaaS <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-[#4FD1C5]/10 border border-[#4FD1C5]/20 rounded-full text-xs font-semibold text-[#007169]">
              <Sparkles className="w-3.5 h-3.5" /> Intelligence Réglementaire
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
              Moins de bruit. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#006a63]">
                Plus de clarté.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-600 text-lg sm:text-xl max-w-2xl leading-relaxed">
              Auvia est le compagnon IA de confiance qui surveille, décode et synthétise pour vous les évolutions réglementaires et les protocoles de votre profession. Libérez-vous de la charge mentale documentaire.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate("saas")}
                className="bg-[#0A192F] hover:bg-[#006a63] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0A192F]/10 hover:shadow-lg group"
              >
                Accéder au Dashboard SaaS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onNavigate("brand")}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2"
              >
                Consulter le Design System
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-100">
              <div>
                <div className="font-display font-bold text-2xl text-[#0A192F]">100%</div>
                <div className="text-xs text-slate-500">Mise à jour en continu</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[#0A192F]">0</div>
                <div className="text-xs text-slate-500">Faux positifs</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[#0A192F]">10h+</div>
                <div className="text-xs text-slate-500">Temps gagné par mois</div>
              </div>
            </motion.div>
          </div>

          {/* Visual Showcase (Mock Dashboard Frame) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0"
          >
            {/* Ambient glows */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#4FD1C5]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#0A192F]/5 rounded-full blur-3xl" />
            
            {/* Visual card */}
            <div className="relative z-10 w-full h-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-6 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4FD1C5] animate-pulse" />
                  <span className="text-xs font-mono font-medium text-slate-400">VEILLE ACTIVE — AUVIA</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  100% Conforme
                </span>
              </div>
              
              <div className="my-auto space-y-4 py-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      Radioprotection
                    </span>
                    <span className="text-[10px] text-slate-400">Mise à jour aujourd'hui</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A192F]">Arrêté du 23 Octobre 2020 : OAR et CRP</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">Le contrôle par l'Organisme Agréé en Radioprotection (OAR) passe à une récurrence de 5 ans.</p>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#006a63]">
                    <span>Action requise : Déclarer CRP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 bg-teal-50/30 rounded-2xl border border-[#4FD1C5]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#007169]">
                    <Sparkles className="w-4 h-4 text-[#4FD1C5]" />
                    <span>Synthèse IA Auvia</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"Simplifiez vos contrôles techniques dentaires : aucun changement sur les retro-alvéolaires cette année, planifiez seulement le panoramique."</p>
                </div>
              </div>
              
              <div className="border-t border-slate-50 pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">Pour Chirurgiens-Dentistes Libéraux</span>
                <span className="text-xs font-semibold text-[#0A192F] flex items-center gap-1">
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Target Problem / Solutions Section */}
      <section className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A192F] tracking-tight">
              Pensé pour les professionnels réglementés
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Face à l'inflation des textes réglementaires, Auvia trie, filtre et synthétise l'information pour vous livrer des plans d'action prêts à l'emploi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F8FAFC] rounded-2xl space-y-4 border border-slate-50">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0A192F]">Zéro Surcharge</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ne lisez plus des pages de décrets. Nous extrayons uniquement l'impact direct pour votre cabinet et vos gestes quotidiens.
              </p>
            </div>

            <div className="p-8 bg-[#F8FAFC] rounded-2xl space-y-4 border border-slate-50">
              <div className="w-12 h-12 rounded-xl bg-[#4FD1C5]/15 flex items-center justify-center text-[#007169]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0A192F]">Sérénité de Conformité</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Soyez alerté en cas d'obligation immédiate. Un rapport HAS ou une modification CNIL ne vous échappera plus.
              </p>
            </div>

            <div className="p-8 bg-[#F8FAFC] rounded-2xl space-y-4 border border-slate-50">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0A192F]">Accompagnement Expert</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Un doute sur un protocole clinique ou administratif ? Interrogez à tout moment le Compagnon IA d'Auvia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Triage / Interactive Entry Modules */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#006a63] uppercase">ESPACE DE DÉMO</span>
          <h2 className="font-display text-3xl font-extrabold text-[#0A192F] tracking-tight">
            Explorez les livrables interactifs
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            Fidèle aux critères de réussite et à l'identité visuelle définie dans le cahier des charges, explorez nos prototypes interactifs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: SaaS Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#0A192F] rounded-xl flex items-center justify-center text-white">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0A192F]">Exemple d'écran SaaS</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Visualisez le tableau de bord de veille réglementaire. Consultez des alertes interactives de stérilisation ou radioprotection, et gérez votre conformité.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("saas")}
              className="mt-6 flex items-center gap-2 text-sm font-bold text-[#006a63] group-hover:text-[#0A192F] transition-colors"
            >
              Lancer l'écran SaaS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Mobile App Simulator */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0A192F]">Exemple d'App Mobile</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Testez le compagnon IA Auvia au format mobile. Simulez une conversation intelligente avec l'assistant sur les règles d'hygiène ou l'archivage de dossiers.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("mobile")}
              className="mt-6 flex items-center gap-2 text-sm font-bold text-[#006a63] group-hover:text-[#0A192F] transition-colors"
            >
              Lancer la Démo Mobile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Brand Identity & Design System */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#4FD1C5] rounded-xl flex items-center justify-center text-[#0A192F]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0A192F]">Identité & Design System</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Consultez le guide officiel de la marque Auvia : Logo principal, palette de couleurs interactive, polices, design system de base et cartes de visite.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("brand")}
              className="mt-6 flex items-center gap-2 text-sm font-bold text-[#006a63] group-hover:text-[#0A192F] transition-colors"
            >
              Découvrir la Charte Graphique <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-slate-400 py-12 px-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#4FD1C5]">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-bold text-lg text-white">Auvia</span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 Auvia. Compagnon IA de veille réglementaire pour professionnels libéraux.
          </p>
          <div className="flex gap-4 text-xs">
            <button onClick={() => onNavigate("brand")} className="hover:text-white transition-colors">Charte Graphique</button>
            <span>•</span>
            <button onClick={() => onNavigate("saas")} className="hover:text-white transition-colors">Espace SaaS</button>
            <span>•</span>
            <button onClick={() => onNavigate("mobile")} className="hover:text-white transition-colors">App Mobile</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
