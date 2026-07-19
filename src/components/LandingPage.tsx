import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  Compass, Sparkles, Shield, Layers, ArrowRight, Activity, 
  HelpCircle, Laptop, Phone, CheckCircle2, AlertTriangle, 
  User, Mail, Landmark, MapPin, Briefcase, Zap, Eye, FileText, Check, Clock, TrendingDown, RefreshCw
} from "lucide-react";
import { UserProfile } from "../types";

interface LandingPageProps {
  onNavigate: (view: "landing" | "saas" | "mobile" | "brand") => void;
  profile?: UserProfile;
  setProfile?: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function LandingPage({ onNavigate, profile, setProfile }: LandingPageProps) {
  // Surcharge Calculator State (Pourquoi Auvia existe)
  const [sliderHours, setSliderHours] = useState<number>(4);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // How it works State (Comment ça fonctionne)
  const [activeHowStep, setActiveHowStep] = useState<1 | 2 | 3>(1);
  const [selectedDecreeTopic, setSelectedDecreeTopic] = useState<"radioprotection" | "dasri" | "sterilisation">("radioprotection");

  // Onboarding Wizard State (Action attendue : Créer un compte)
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1);
  const [signupName, setSignupName] = useState("Dr. Lucie Martin");
  const [signupEmail, setSignupEmail] = useState("l.martin@dentaire-tuileries.fr");
  const [signupRpps, setSignupRpps] = useState("10101234567");
  const [signupProfession, setSignupProfession] = useState("Chirurgien-Dentiste");
  const [signupSpecialty, setSignupSpecialty] = useState("Omnipratique & Chirurgie");
  const [signupPracticeMode, setSignupPracticeMode] = useState("Libéral individuel");
  const [signupRegion, setSignupRegion] = useState("Île-de-France");
  const [formError, setFormError] = useState("");

  const accountRef = useRef<HTMLDivElement>(null);

  // Scroll helper
  const scrollToAccount = () => {
    accountRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculator computations
  const pagesReadPerYear = sliderHours * 52 * 18; // approx 18 pages of legal text per hour
  const hoursSavedPerMonth = Math.round(sliderHours * 4 * 0.85); // Auvia reduces load by 85%
  const clinicalRevenueOpportunity = hoursSavedPerMonth * 125; // estimated hourly clinic rate (125€)

  // Decree Comparison Data
  const decreeData = {
    radioprotection: {
      title: "Contrôles de Radioprotection",
      authority: "ASN (Autorité de Sûreté Nucléaire)",
      raw: "« Vu l’arrêté du 23 octobre 2020 modifiant l’arrêté du 27 juin 2018 portant homologation de la décision n’2018-DC-0649 de l’Autorité de sûreté nucléaire prescrivant la périodicité et les modalités des contrôles techniques de radioprotection externes... l'exploitant est tenu de s'assurer du concours d'un conseiller en radioprotection mentionné à l'article R. 4451-112 du code du travail, sous peine de mise en demeure et sanction administrative de classe V. »",
      clean: "La périodicité des contrôles de radioprotection externes par un Organisme Agréé passe à un intervalle fixe de 5 ans, avec l'obligation stricte d'enregistrer votre Conseiller en Radioprotection (CRP) sur le portail ASN."
    },
    dasri: {
      title: "Suivi numérique des DASRI",
      authority: "Ministère de la Transition Écologique",
      raw: "« Conformément au décret n’2021-321 du 25 mars 2021 relatif à la traçabilité des déchets... l’émetteur de déchets d’activités de soins à risques infectieux (DASRI) doit obligatoirement émettre un bordereau de suivi dématérialisé (BSDA) via le traitement automatisé de données dénommé ‘Trackdéchets’, rendant caducs les précédents formulaires CERFA papier. »",
      clean: "Interdiction définitive de signer des bordereaux d'enlèvement papier (BSDA) pour vos déchets piquants/coupants. Vous devez créer un compte sur Trackdéchets lié à votre SIRET pour valider électroniquement chaque collecte."
    },
    sterilisation: {
      title: "Double Traçabilité Autoclave",
      authority: "HAS (Haute Autorité de Santé)",
      raw: "« Vu l'article R. 6111-1 du code de la santé publique et les recommandations de bonnes pratiques HAS de 2015 sur la stérilisation des dispositifs médicaux... Chaque cycle de stérilisation doit impérativement faire l'objet d'un archivage physique ou numérique des paramètres de pression/température couplé à une étiquette de traçabilité à double feuillet rattachée au dossier patient. »",
      clean: "Chaque sachet d’instrument stérile doit posséder une double étiquette rattachée au dossier du patient soigné. Les rapports de cycle d'autoclave et tests Bowie-Dick hebdomadaires doivent être archivés pendant 5 ans."
    }
  };

  const handleNextStep = () => {
    if (signupStep === 1) {
      if (!signupName.trim() || !signupEmail.trim()) {
        setFormError("Veuillez renseigner votre nom et votre adresse e-mail.");
        return;
      }
      setFormError("");
      setSignupStep(2);
    }
  };

  const handleFinalSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (setProfile) {
      // Build interest list based on profession
      const interests = signupProfession === "Chirurgien-Dentiste" 
        ? ["Radioprotection", "Stérilisation", "DASRI", "RGPD"]
        : ["Radioprotection", "DASRI", "RGPD", "Général"];

      setProfile({
        profession: signupProfession,
        specialty: signupSpecialty,
        region: signupRegion,
        practiceMode: signupPracticeMode,
        interests: interests
      });
    }
    setSignupStep(3);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden font-sans">
      
      {/* Premium Notification Banner */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2.5 px-6 border-b border-slate-800 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-pulse" />
        <span className="font-semibold">Mise à jour Juillet 2026 :</span> 
        <span>Prise en compte immédiate des nouvelles normes Trackdéchets et de la réforme OAR de l'ASN.</span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("landing")}>
            <div className="w-10 h-10 rounded-xl bg-[#0A192F] flex items-center justify-center text-[#4FD1C5]">
              <Compass className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-[#0A192F] block leading-none">
                Auvia
              </span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#006a63] uppercase">
                Veille Libérale IA
              </span>
            </div>
          </div>
          
          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#pourquoi" className="hover:text-[#0A192F] transition-colors">Pourquoi Auvia</a>
            <a href="#fonctionnement" className="hover:text-[#0A192F] transition-colors">Comment ça marche</a>
            <a href="#valeur" className="hover:text-[#0A192F] transition-colors">Bénéfices clés</a>
            <button onClick={() => onNavigate("brand")} className="hover:text-[#0A192F] transition-colors">
              Charte Graphique
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate("saas")}
              className="hidden sm:inline-flex text-xs font-bold text-[#0A192F] hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl transition-all"
            >
              Mode Démo Direct
            </button>
            <button 
              onClick={scrollToAccount}
              className="bg-[#0A192F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-[#4FD1C5]/10 border border-[#4FD1C5]/20 rounded-full text-xs font-semibold text-[#007169]">
              <Sparkles className="w-3.5 h-3.5 text-[#4FD1C5] animate-pulse" /> 
              Étape 1 du parcours : Découverte de la solution
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
              Vos protocoles cliniques, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#006a63]">
                toujours à jour et conformes.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-600 text-lg sm:text-xl max-w-2xl leading-relaxed">
              Auvia est le premier compagnon IA intelligent qui veille sur l'évolution réglementaire de votre profession libérale, analyse son impact sur vos protocoles internes (hygiène, qualité, procédures de soins) et guide votre équipe vers l'action.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={scrollToAccount}
                className="bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0A192F]/10 hover:shadow-lg group"
              >
                Créer mon compte Auvia
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#4FD1C5]" />
              </button>
              
              <button 
                onClick={() => onNavigate("saas")}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Laptop className="w-5 h-5 text-slate-400" />
                Accéder au Dashboard Démo
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-100">
              <div>
                <div className="font-display font-extrabold text-2xl text-[#0A192F]">0 %</div>
                <div className="text-xs text-slate-500 mt-1">Faux positif (Humain vérifié)</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-[#0A192F]">95 %</div>
                <div className="text-xs text-slate-500 mt-1">De charge mentale en moins</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-[#0A192F]">12h / mois</div>
                <div className="text-xs text-slate-500 mt-1">Gagnées sur l'administration</div>
              </div>
            </motion.div>
          </div>

          {/* Core App Visualization Frame */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative w-full max-w-[480px] mx-auto lg:mx-0"
          >
            {/* Soft decorative ambient glow */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#4FD1C5]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#0A192F]/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Visual card */}
            <div className="relative z-10 w-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FD1C5] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FD1C5]"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">VEILLE ACTIVE — CABINET DENTAIRE</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                  SÉCURISÉ
                </span>
              </div>
              
              <div className="my-6 space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#006a63] uppercase tracking-wider bg-[#4FD1C5]/10 px-2 py-0.5 rounded-full">
                      Trackdéchets
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Juillet 2026</span>
                  </div>
                  <h4 className="font-display font-bold text-xs text-[#0A192F]">Alerte Obligatoire : Fin du BSDA Papier</h4>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">L'enlèvement papier des déchets médicaux n'est plus reconnu par l'administration.</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#0A192F] pt-1">
                    <span>Voir le protocole de transition</span>
                    <ArrowRight className="w-3 h-3 text-[#4FD1C5]" />
                  </div>
                </div>

                <div className="p-4 bg-[#0A192F] text-white rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#4FD1C5]/10 to-transparent blur-sm pointer-events-none" />
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#4FD1C5] mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-bold text-[#4FD1C5] uppercase tracking-wider">Auvia Synthèse IA</h5>
                      <p className="text-[11px] text-slate-300 italic leading-relaxed">
                        "Ne perdez pas de temps à lire le décret de 42 pages. Cliquez sur Créer Compte sur trackdechets.beta.gouv.fr et liez votre SIRET. C'est tout."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-50 pt-4 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Compagnon de confiance</span>
                <span className="text-xs font-bold text-[#0A192F] flex items-center gap-1">
                  Explorer la démo <ArrowRight className="w-3.5 h-3.5 text-[#4FD1C5]" />
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY AUVIA EXISTS: Interactive Surcharge Calculator */}
      <section id="pourquoi" className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Why text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#006a63] uppercase bg-[#4FD1C5]/10 px-2.5 py-1 rounded-full">
                Le Constat & Pourquoi nous existons
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-tight">
                La chaîne de conformité de vos protocoles est brisée.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Les protocoles (hygiène, procédures de prise en charge, fiches opératoires, documents qualité, recommandations internes) sont au cœur de la sécurité de votre cabinet. Pourtant, ils évoluent rarement de manière proactive : une nouvelle recommandation HAS ou ASN sort, vous devez l'identifier, vérifier si elle vous concerne, comparer avec vos documents internes, les réécrire puis former votre équipe. Cette chaîne manuelle prend des dizaines d'heures de soins et de repos.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-0.5">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#0A192F] block">Protocoles cliniques obsolètes</strong>
                    <span className="text-xs text-slate-500">Un protocole rédigé il y a plus de 12 mois a 70% de risques de ne plus respecter les dernières bonnes pratiques nationales ou régionales.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-0.5">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#0A192F] block">Charge de veille et réécriture</strong>
                    <span className="text-xs text-slate-500">Chercher l'information, décrypter les arrêtés techniques denses et répercuter les changements sur vos documents d'équipe est épuisant.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator widget */}
            <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-display font-bold text-lg text-[#0A192F]">Simulez l'impact de la veille sur votre cabinet</h3>
                <p className="text-xs text-slate-400 mt-1">Estimez le temps perdu et l'économie potentielle d'heures cliniques.</p>
              </div>

              {/* Slider Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600">Temps estimé par semaine à surveiller et lire la conformité :</span>
                  <span className="font-mono font-bold text-[#006a63] bg-white border border-slate-200 px-3 py-1 rounded-xl text-sm">
                    {sliderHours} h / semaine
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={sliderHours}
                  onChange={(e) => setSliderHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                  <span>1h (Pratique simple)</span>
                  <span>6h (Responsabilité importante)</span>
                  <span>12h (Cabinet multi-praticiens)</span>
                </div>
              </div>

              {/* Dynamic Outcomes */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                
                <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <FileText className="w-4 h-4 text-slate-300" />
                    Volume à lire
                  </div>
                  <div className="font-display font-extrabold text-lg text-[#0A192F]">{pagesReadPerYear.toLocaleString()} pages</div>
                  <span className="text-[10px] text-slate-400 block leading-tight">De textes denses et rapports ASN/HAS par an</span>
                </div>

                <div className="bg-[#4FD1C5]/5 p-4 rounded-2xl border border-[#4FD1C5]/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#007169]">
                    <Clock className="w-4 h-4 text-[#4FD1C5]" />
                    Temps récupéré
                  </div>
                  <div className="font-display font-extrabold text-lg text-[#007169]">{hoursSavedPerMonth} h / mois</div>
                  <span className="text-[10px] text-[#007169]/80 block leading-tight">Libérées pour soigner vos patients</span>
                </div>

                <div className="bg-emerald-50/20 p-4 rounded-2xl border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    Gain d'activité
                  </div>
                  <div className="font-display font-extrabold text-lg text-emerald-800">+{clinicalRevenueOpportunity.toLocaleString()} €</div>
                  <span className="text-[10px] text-emerald-700 block leading-tight">De potentiel d'actes cliniques par mois</span>
                </div>

              </div>

              {/* Interactive compression effect callout */}
              <div className="p-4 bg-[#0A192F] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#4FD1C5] uppercase">Filtre Actif d'Auvia</span>
                  <p className="text-xs text-slate-300 leading-snug">Remplacement automatique du bruit documentaire par un signal d'action.</p>
                </div>
                <button 
                  onClick={scrollToAccount}
                  className="bg-[#4FD1C5] hover:bg-[#3ec3b7] text-[#0A192F] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0A192F]" />
                  Activer Auvia
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* UNIQUE POSITIONING: Ce qu'Auvia est (et ce qu'il n'est pas) */}
      <section className="bg-slate-50 border-b border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#006a63] uppercase bg-[#4FD1C5]/10 px-2.5 py-1 rounded-full">
              Positionnement Unique
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Auvia n'est pas un outil de veille traditionnel.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Nous avons repensé la veille réglementaire pour en faire un véritable moteur d'action et une mémoire professionnelle vivante.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: Not a Document Library */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 bg-red-50/50 w-fit px-3 py-1 rounded-full text-xs font-bold font-mono">
                  <span>✗ Pas une bibliothèque</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-[#0A192F]">"Je cherche une information"</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Une bibliothèque classique stocke passivement des milliers de fichiers PDF denses et de décrets que vous n'avez pas le temps d'ouvrir ou d'interpréter.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-2 text-xs">
                <p className="text-slate-700 leading-relaxed">
                  <span className="text-[#007169] font-bold">✓ Avec Auvia :</span> Répond directement à : <span className="underline italic">"Dis-moi ce qui a changé pour mon cabinet et ce que je dois faire ce matin."</span>
                </p>
              </div>
            </div>

            {/* Card 2: Not a Newsletter */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 bg-red-50/50 w-fit px-3 py-1 rounded-full text-xs font-bold font-mono">
                  <span>✗ Pas une newsletter de plus</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-[#0A192F]">"Voici un flux d'informations froides"</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Une newsletter réglementaire diffuse un volume massif d'articles sans personnalisation, sans analyse d'impact sur vos spécialités, et sans livrer de méthode d'application.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-2 text-xs">
                <p className="text-slate-700 leading-relaxed">
                  <span className="text-[#007169] font-bold">✓ Avec Auvia :</span> Filtre le bruit législatif et n'extrait <span className="font-extrabold">uniquement</span> que ce qui exige de modifier un de vos protocoles actifs.
                </p>
              </div>
            </div>

            {/* Card 3: Not Auto-compliance */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 bg-red-50/50 w-fit px-3 py-1 rounded-full text-xs font-bold font-mono">
                  <span>✗ Pas de conformité robotique</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-[#0A192F]">"La conformité sans pilotage"</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Les solutions rigides prétendent tout automatiser, ignorant la déontologie médicale, les particularités régionales d'ARS et la réalité clinique de votre équipe.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-2 text-xs">
                <p className="text-slate-700 leading-relaxed">
                  <span className="text-[#007169] font-bold">✓ Avec Auvia :</span> La décision finale reste <span className="font-extrabold">humaine</span>. L'IA prépare le travail d'analyse, puis c'est vous qui validez l'application du protocole.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS: Interactive Timeline and Code-Compare (Comment ça fonctionne) */}
      <section id="fonctionnement" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-[#006a63] uppercase bg-[#4FD1C5]/10 px-2.5 py-1 rounded-full">
            La Technologie & Le Processus
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            Comment Auvia aligne vos protocoles professionnels
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Notre plateforme opère en trois étapes fluides pour faire de vos protocoles internes un référentiel métier vivant.
          </p>
        </div>

        {/* 3 Step Interactive Timeline selector */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              step: 1, 
              title: "1. Surveillance & Sourcing Continu", 
              desc: "Auvia surveille H24 les publications officielles (Journal Officiel, ASN, HAS, CNIL, ARS, etc.) pour détecter toute nouvelle recommandation." 
            },
            { 
              step: 2, 
              title: "2. Compréhension & Analyse d'Impact", 
              desc: "Notre moteur croise la nouveauté législative avec la mémoire de votre cabinet et vos protocoles internes existants pour en mesurer l'écart exact." 
            },
            { 
              step: 3, 
              title: "3. Passage à l'Action & Alignement", 
              desc: "Auvia vous propose une synthèse rédigée, prépare les modifications de vos protocoles et vous aide à informer votre équipe." 
            }
          ].map((item) => (
            <div 
              key={item.step}
              onClick={() => setActiveHowStep(item.step as any)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                activeHowStep === item.step 
                  ? "bg-[#0A192F] text-white border-[#0A192F] shadow-lg shadow-[#0A192F]/10" 
                  : "bg-white text-slate-700 border-slate-100 hover:border-slate-200"
              }`}
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-wide mb-2 flex items-center justify-between">
                <span>{item.title}</span>
                {activeHowStep === item.step && <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />}
              </h3>
              <p className={`text-xs leading-relaxed ${activeHowStep === item.step ? "text-slate-300" : "text-slate-500"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Raw text vs Auvia Synthesis Compare Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-[#0A192F] flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-slate-400" />
                Démonstrateur d'extraction (Avant / Après)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Choisissez un domaine réglementaire pour observer le filtre Auvia.</p>
            </div>

            {/* Domain selectors */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "radioprotection", label: "Radioprotection" },
                { id: "dasri", label: "DASRI & Déchets" },
                { id: "sterilisation", label: "Stérilisation" }
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedDecreeTopic(topic.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedDecreeTopic === topic.id 
                      ? "bg-[#4FD1C5]/10 text-[#007169] border border-[#4FD1C5]/30" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Side by side cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            
            {/* Raw Legal Text (Bruit) */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded uppercase">
                    Décret d'Origine (Bruit)
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{decreeData[selectedDecreeTopic].authority}</span>
                </div>
                <p className="text-xs text-slate-500 italic font-mono leading-relaxed bg-white border border-slate-200/50 p-4 rounded-xl">
                  {decreeData[selectedDecreeTopic].raw}
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-4">
                ❌ Surcharge administrative • Difficulté à identifier l'action • Stress de conformité
              </div>
            </div>

            {/* Auvia Digest (Signal) */}
            <div className="bg-[#0A192F]/5 border border-[#4FD1C5]/20 rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-[#007169] bg-[#4FD1C5]/20 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#4FD1C5] animate-pulse" />
                    Synthèse Auvia (Signal)
                  </span>
                  <span className="text-xs text-[#007169] font-bold">100% Actionnable</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white border border-[#4FD1C5]/10 p-4 rounded-xl shadow-sm">
                    {decreeData[selectedDecreeTopic].clean}
                  </p>
                  
                  {/* Action items generated */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action générée au Dashboard :</div>
                    <div className="flex items-center gap-2 text-xs bg-white py-1.5 px-3 rounded-lg border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />
                      <span className="text-slate-600 font-semibold">{decreeData[selectedDecreeTopic].title} à valider</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#007169] font-semibold mt-4">
                ✓ Clarté clinique instantanée • Tâches concrètes générées • Sérénité d'audit
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* VALUE PROVIDED & METRICS: Quelle valeur est apportée */}
      <section id="valeur" className="bg-[#0A192F] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4FD1C5] uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              Savoir-faire & Avantages libéraux
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Une valeur validée par les praticiens de terrain
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Auvia n'est pas un énième portail de formation. C'est un moteur opérationnel qui gère votre conformité à votre place.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#4FD1C5]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4FD1C5]/20 flex items-center justify-center text-[#4FD1C5]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base">1. Surveillance continue</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auvia veille automatiquement et en continu sur toutes les sources pertinentes (HAS, ASN, JO, CNIL, ARS), éliminant ainsi toute tâche de recherche manuelle.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#4FD1C5]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4FD1C5]/20 flex items-center justify-center text-[#4FD1C5]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base">2. Compréhension métier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Notre intelligence artificielle comprend en profondeur le contexte professionnel et la mémoire de vos protocoles internes pour analyser de façon pertinente.
              </p>
            </div>

            <div className="bg-[#4FD1C5]/10 border border-[#4FD1C5]/30 p-6 rounded-2xl space-y-4 hover:border-[#4FD1C5]/60 transition-all relative">
              <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#4FD1C5] text-[#0A192F] px-1.5 py-0.5 rounded uppercase">Pilier Clé</span>
              <div className="w-10 h-10 rounded-xl bg-[#4FD1C5]/20 flex items-center justify-center text-[#4FD1C5]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#4FD1C5]">3. Analyse d'impact</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Auvia ne se contente pas de relayer une information. Il vous explique concrètement <span className="underline italic">"pourquoi cela vous concerne directement"</span>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#4FD1C5]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4FD1C5]/20 flex items-center justify-center text-[#4FD1C5]">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base">4. Passage à l'action</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nous guidons pas à pas la mise à jour de vos fiches, fiches de stérilisation et protocoles, assurant un alignement complet et serein avec les normes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED ACTION: INTERACTIVE ONBOARDING WIZARD */}
      <section ref={accountRef} className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-10 space-y-8 relative overflow-hidden">
          
          {/* Form Background Accent Grid */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-[#4FD1C5]/5 to-transparent blur-sm pointer-events-none" />

          {/* Form Header */}
          <div className="border-b border-slate-50 pb-5 text-center sm:text-left space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#006a63] uppercase bg-[#4FD1C5]/10 px-2.5 py-1 rounded-full">
              Action attendue : Étape 1 / 2
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
              Créer votre espace de veille Auvia
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Enregistrez-vous en quelques clics pour configurer votre tableau de conformité personnalisé.
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            <div className={`h-1.5 rounded-full flex-1 transition-all ${signupStep >= 1 ? "bg-[#0A192F]" : "bg-slate-100"}`} />
            <div className={`h-1.5 rounded-full flex-1 transition-all ${signupStep >= 2 ? "bg-[#0A192F]" : "bg-slate-100"}`} />
            <div className={`h-1.5 rounded-full flex-1 transition-all ${signupStep === 3 ? "bg-[#4FD1C5]" : "bg-slate-100"}`} />
          </div>

          {/* Step 1: Contact Details */}
          {signupStep === 1 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Prénom & Nom du Praticien</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Dr. Lucie Martin"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Adresse e-mail professionnelle</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="l.martin@dentaire-tuileries.fr"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Numéro RPPS (Optionnel)</label>
                  <div className="relative">
                    <Landmark className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={signupRpps}
                      onChange={(e) => setSignupRpps(e.target.value)}
                      placeholder="10101234567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight">Permet de valider votre statut de praticien de santé.</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3 mt-1">
                  <Shield className="w-5 h-5 text-[#006a63] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#0A192F] block">Données 100% Sécurisées</span>
                    <span className="text-[10px] text-slate-500 block leading-relaxed">Vos informations professionnelles sont chiffrées en conformité stricte avec les exigences RGPD de la CNIL.</span>
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-red-600 font-semibold">{formError}</p>
              )}

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleNextStep}
                  className="bg-[#0A192F] hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  Continuer vers le Cabinet
                  <ArrowRight className="w-4 h-4 text-[#4FD1C5]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Practice details */}
          {signupStep === 2 && (
            <form onSubmit={handleFinalSignup} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Profession Réglementée</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <select 
                      value={signupProfession}
                      onChange={(e) => setSignupProfession(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors appearance-none"
                    >
                      <option value="Chirurgien-Dentiste">Chirurgien-Dentiste</option>
                      <option value="Médecin Généraliste">Médecin Généraliste</option>
                      <option value="Masseur-Kinésithérapeute">Masseur-Kinésithérapeute</option>
                      <option value="Sage-Femme">Sage-Femme</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Spécialité / Orientation</label>
                  <input 
                    type="text" 
                    value={signupSpecialty}
                    onChange={(e) => setSignupSpecialty(e.target.value)}
                    placeholder="Omnipratique & Chirurgie"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors"
                  />
                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Région d'Exercice (ARS)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={signupRegion}
                      onChange={(e) => setSignupRegion(e.target.value)}
                      placeholder="Île-de-France"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Mode d'exercice principal</label>
                  <select 
                    value={signupPracticeMode}
                    onChange={(e) => setSignupPracticeMode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4FD1C5] focus:bg-white transition-colors appearance-none"
                  >
                    <option value="Libéral individuel">Libéral individuel</option>
                    <option value="Cabinet de groupe (SELARL)">Cabinet de groupe (SELARL)</option>
                    <option value="Collaborateur libéral">Collaborateur libéral</option>
                  </select>
                </div>

              </div>

              <div className="pt-4 flex justify-between items-center">
                <button 
                  type="button"
                  onClick={() => setSignupStep(1)}
                  className="text-xs text-slate-500 font-bold hover:underline"
                >
                  Retour
                </button>
                
                <button 
                  type="submit"
                  className="bg-[#0A192F] hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  Créer mon compte & Charger mon Profil
                  <Check className="w-4 h-4 text-[#4FD1C5]" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {signupStep === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-sm animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-[#0A192F]">Félicitations Docteur, votre compte est validé !</h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
                  Bienvenue à bord d'Auvia. Nous avons généré votre espace de veille personnalisé en fonction de votre profil de pratique :
                </p>
              </div>

              {/* Dynamic generated badge panel */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-bold">PRATICIEN :</span>{" "}
                  <span className="font-bold text-[#0A192F]">{signupName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">PROFESSION :</span>{" "}
                  <span className="font-semibold text-slate-700">{signupProfession} ({signupSpecialty})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">ENVIRONNEMENT :</span>{" "}
                  <span className="font-semibold text-slate-700">{signupPracticeMode} • {signupRegion}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/50 flex flex-wrap gap-1.5">
                  <span className="bg-[#4FD1C5]/10 text-[#007169] px-2 py-0.5 rounded text-[10px] font-bold">Radioprotection active</span>
                  <span className="bg-[#4FD1C5]/10 text-[#007169] px-2 py-0.5 rounded text-[10px] font-bold">Stérilisation active</span>
                  <span className="bg-[#4FD1C5]/10 text-[#007169] px-2 py-0.5 rounded text-[10px] font-bold">DASRI dématérialisée</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => onNavigate("saas")}
                  className="bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 mx-auto shadow-md"
                >
                  Consulter mon Espace de Veille IA
                  <ArrowRight className="w-4.5 h-4.5 text-[#4FD1C5]" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#4FD1C5]">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-display font-bold text-base text-white block">Auvia</span>
              <span className="text-[9px] text-[#4FD1C5] font-mono block">COMPAGNON RÉGLEMENTAIRE</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © 2026 Auvia. Compagnon IA de veille réglementaire pour professionnels libéraux. <br />
            Tous droits réservés • Conforme HAS, ASN, et RGPD.
          </p>
          
          <div className="flex gap-4 text-xs font-bold">
            <button onClick={() => onNavigate("brand")} className="hover:text-white transition-colors">Charte Graphique</button>
            <span>•</span>
            <button onClick={() => onNavigate("saas")} className="hover:text-white transition-colors">SaaS Workspace</button>
            <span>•</span>
            <button onClick={() => onNavigate("mobile")} className="hover:text-white transition-colors">App Mobile</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
