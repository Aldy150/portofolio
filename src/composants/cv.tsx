import { MapPin, Mail, Phone, X, Download, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const SOCIAL_ICONS = [
  { src: "/images/facebook.png", alt: "Facebook", label: "Facebook" },
  { src: "/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn" },
];

const FRAMEWORKS = ["React JS", "TailwindCSS", "Express JS", "React Native", "Laravel", "Next.js"];
const LANGAGES   = ["JavaScript", "TypeScript", "Node JS", "Php", "Python"];
const DATABASES  = ["PostgreSQL", "MySQL", "SQL"];
const TOOLS      = ["Git & GitHub", "Docker", "Figma"];

const FORMATION = [
  { periode: "2022 – 2023", diplome: "Baccalauréat scientifique", ecole: "Cours marianiste Sainte Rita" },
  { periode: "2023 – 2026", diplome: "Licence appliquée en Analyse et programmation", ecole: "Institut d'Enseignement Professionnel Appliqué" },
];

const PROJETS = [
  { titre: "Site de réservation restaurant", description: "Gestion des réservations, affichage des menus et interface responsive.", stack: "HTML · CSS · JavaScript · PHP · Tailwind CSS" },
  { titre: "Site pour agence de graphisme", description: "Interface moderne, présentation des services et portfolios interactifs.", stack: "React JS · JavaScript · Tailwind CSS · Express JS" },
];

/* ── Animated section ── */
function FadeSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cssText = "opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease;";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Skill tag ── */
function SkillTag({ label }: { label: string }) {
  return (
    <span className="border border-[#064eb9]/40 text-[#4d8ff5] text-sm px-4 py-1.5 rounded-lg bg-[#064eb9]/10 hover:bg-[#064eb9] hover:text-white hover:border-[#064eb9] transition-all duration-300 cursor-default font-medium">
      {label}
    </span>
  );
}

/* ── Main ── */
export default function CV() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".profile-image",
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)", delay: 0.2 }
    );
    gsap.fromTo(".hero-text",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.5 }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Bloquer le scroll quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawerIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse-ring {
          0%  { box-shadow:0 0 0 0 rgba(6,78,185,0.4); }
          70% { box-shadow:0 0 0 14px rgba(6,78,185,0); }
          100%{ box-shadow:0 0 0 0 rgba(6,78,185,0); }
        }
        .avatar-pulse { animation: pulse-ring 2.8s ease-out infinite; }
        .drawer  { animation: drawerIn  0.32s cubic-bezier(0.4,0,0.2,1) forwards; }
        .overlay { animation: overlayIn 0.32s ease forwards; }
      `}</style>

      <div className="bg-[#070606] min-h-screen" ref={containerRef}>

        {/* ── Navigation ── */}
        <header id="main-header" className="sticky top-0 z-50 bg-[#02090e]/95 backdrop-blur-sm border-b border-[#064eb9]/20">
          <div className="flex justify-between items-center px-4 lg:px-12 py-3 max-w-7xl mx-auto">
            <Link to="/" className="text-white font-bold text-xl tracking-tight">
              Aldy <span className="text-[#064eb9]">Mayoubou</span>
            </Link>

            <ul className="hidden lg:flex gap-8 text-sm list-none m-0 p-0">
              <li><Link to="/" className="font-bold text-white hover:text-[#4d8ff5] transition-colors">Accueil</Link></li>
              <li><Link to="/portofolio.tsx" className="font-bold text-white hover:text-[#4d8ff5] transition-colors">Portfolio</Link></li>
              <li><Link to="/cv.tsx" className="font-bold text-[#4d8ff5]">CV</Link></li>
            </ul>

            <button
              onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aldymayoubou6@gmail.com", "_blank")}
              className="hidden lg:flex items-center gap-2 bg-[#064eb9] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition-all duration-200"
            >
              Contactez-moi
            </button>

            {/* Burger button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-[#064eb9]/30 bg-[#064eb9]/10 hover:bg-[#064eb9]/20 transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <span className="absolute block w-5 h-0.5 bg-white" style={{ transform: "translateY(-5px)" }} />
              <span className="absolute block w-5 h-0.5 bg-white" />
              <span className="absolute block w-5 h-0.5 bg-white" style={{ transform: "translateY(5px)" }} />
            </button>
          </div>
        </header>

        {/* ── Drawer mobile (slide depuis la droite) ── */}
        {isOpen && (
          <>
            {/* Overlay sombre */}
            <div
              className="overlay fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <div className="drawer fixed top-0 right-0 z-[70] h-full w-72 bg-[#0d1117] border-l border-[#064eb9]/25 flex flex-col lg:hidden">
              {/* Header du drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#064eb9]/15">
                <span className="text-white font-bold text-lg">
                  Aldy <span className="text-[#064eb9]">Mayoubou</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-lg border border-[#064eb9]/30 bg-[#064eb9]/10 flex items-center justify-center text-white hover:bg-[#064eb9]/25 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-3 py-6">
                <ul className="flex flex-col gap-1 list-none m-0 p-0">
                  {[
                    { label: "Accueil", to: "/" },
                    { label: "Portfolio", to: "/portofolio.tsx" },
                    { label: "CV", to: "/cv.tsx", active: true },
                  ].map(({ label, to, active }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                          active
                            ? "bg-[#064eb9]/15 text-[#4d8ff5] border border-[#064eb9]/30"
                            : "text-white hover:bg-[#064eb9]/10 hover:text-[#4d8ff5]"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                        <ArrowUpRight size={14} className="text-gray-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer du drawer */}
              <div className="px-5 py-6 border-t border-[#064eb9]/15">
                <button
                  onClick={() => { setIsOpen(false); window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aldymayoubou6@gmail.com", "_blank"); }}
                  className="w-full bg-[#064eb9] text-white py-3 rounded-xl text-sm font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Contactez-moi
                  <ArrowUpRight size={14} />
                </button>
                <div className="flex justify-center gap-3 mt-4">
                  {SOCIAL_ICONS.map((icon, idx) => (
                    <a key={idx} href="#" aria-label={icon.label}>
                      <img src={icon.src} alt={icon.alt} className="w-8 h-8 border border-[#064eb9]/40 rounded-full p-1.5 hover:bg-[#064eb9] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center" style={{ filter: "brightness(12%) saturate(150%)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070606]/40 to-[#070606]" />

          <div className="relative flex flex-col items-center text-center px-4 gap-5">
            <div className="avatar-pulse rounded-full mb-2">
              <img
                src="/images/Mon image.png"
                alt="Aldy Mayoubou"
                className="profile-image w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-[#064eb9] object-cover"
              />
            </div>

            <h1 className="hero-text text-3xl md:text-4xl font-bold text-white tracking-tight">
              Aldy <span className="text-[#064eb9]">Mayoubou</span>
            </h1>

            <span className="hero-text inline-flex items-center gap-2 bg-[#064eb9]/15 border border-[#064eb9]/40 text-[#4d8ff5] text-sm font-bold px-5 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#064eb9] animate-pulse" />
              Software Product Developer
            </span>

            <div className="hero-text flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
              {[
                { icon: <Mail size={16} />, text: "aldymayoubou6@gmail.com" },
                { icon: <MapPin size={16} />, text: "Brazzaville, Congo" },
                { icon: <Phone size={16} />, text: "+242 06 412 3588" },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-[#064eb9]">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            <button className="hero-text mt-2 flex items-center gap-2 bg-[#064eb9] text-white px-7 py-3 rounded-lg font-bold text-sm hover:bg-white hover:text-[#064eb9] transition-all duration-300 transform hover:scale-105">
              <Download size={16} />
              Télécharger mon CV
            </button>
          </div>
        </section>

        {/* ── Contenu principal ── */}
        <section className="py-20 px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Colonne gauche */}
            <div className="flex-1 flex flex-col gap-14">
              <FadeSection>
                <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#064eb9] rounded-full" />
                  À propos de moi
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Je suis Aldy Mayoubou, Software Product Developper spécialisé en React JS, Node JS, Flutter et Python.
                  Je crée des applications web, mobiles et desktop performantes et adaptées aux besoins des utilisateurs.
                  Rigoureux sur l'expérience utilisateur, je cherche toujours à proposer des solutions fluides et maintenables.
                </p>
              </FadeSection>

              <FadeSection delay={100}>
                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#064eb9] rounded-full" />
                  Formation
                </h2>
                <div className="flex flex-col gap-6 pl-4">
                  {FORMATION.map((f, i) => (
                    <div key={i} className="relative pl-4 border-l border-[#064eb9]/25">
                      <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#064eb9] border-2 border-[#070606]" />
                      <p className="text-xs text-[#4d8ff5] font-bold mb-1">{f.periode}</p>
                      <p className="text-white font-bold text-sm mb-0.5">{f.diplome}</p>
                      <p className="text-gray-500 text-xs">{f.ecole}</p>
                    </div>
                  ))}
                </div>
              </FadeSection>

              <FadeSection delay={200}>
                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#064eb9] rounded-full" />
                  Projets personnels
                </h2>
                <div className="flex flex-col gap-5">
                  {PROJETS.map((p, i) => (
                    <div key={i} className="bg-[#02090e] border border-[#064eb9]/20 rounded-xl p-5 hover:border-[#064eb9]/50 transition-colors">
                      <p className="text-white font-bold text-sm mb-1.5">{p.titre}</p>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.description}</p>
                      <p className="text-[#4d8ff5] text-xs font-medium">{p.stack}</p>
                    </div>
                  ))}
                </div>
              </FadeSection>
            </div>

            {/* Séparateur */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#064eb9]/30 to-transparent" />

            {/* Colonne droite */}
            <div className="flex-1 flex flex-col gap-10">
              <FadeSection delay={150}>
                <h2 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#064eb9] rounded-full" />
                  Compétences & outils
                </h2>
                {[
                  { label: "Frameworks", items: FRAMEWORKS },
                  { label: "Langages", items: LANGAGES },
                  { label: "Bases de données", items: DATABASES },
                  { label: "Outils", items: TOOLS },
                ].map(({ label, items }, gi) => (
                  <div key={gi} className="mb-8">
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-3">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => <SkillTag key={item} label={item} />)}
                    </div>
                  </div>
                ))}
              </FadeSection>

              <FadeSection delay={300}>
                <div className="bg-[#02090e] border border-[#064eb9]/25 rounded-2xl p-6 text-center">
                  <p className="text-white font-bold text-lg mb-2">Travaillons ensemble</p>
                  <p className="text-gray-400 text-sm mb-5">Vous avez un projet ? Discutons-en.</p>
                  <button
                    onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aldymayoubou6@gmail.com&su=Discussion%20projet", "_blank")}
                    className="w-full bg-[#064eb9] text-white py-3 rounded-lg text-sm font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
                  >
                    M'écrire un message
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </FadeSection>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-12 px-6 lg:px-20 bg-[#02090e] border-t border-[#064eb9]/15">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-[#064eb9] text-xl font-bold mb-1">Aldy Mayoubou</h2>
            <p className="text-gray-500 text-sm mb-6">Software Product Developer</p>
            <div className="flex justify-center gap-4 mb-8">
              {SOCIAL_ICONS.map((icon, idx) => (
                <div key={idx} className="group relative">
                  <a href="#" className="block" aria-label={`Visiter mon ${icon.label}`}>
                    <img src={icon.src} alt={icon.alt} className="w-9 h-9 border border-[#064eb9]/40 rounded-full p-1.5 transition-all duration-300 group-hover:bg-[#064eb9] group-hover:border-[#064eb9] group-hover:scale-110" />
                  </a>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs bg-gray-800 px-2 py-0.5 rounded whitespace-nowrap">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Aldy Mayoubou. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}