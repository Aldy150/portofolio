import { Rocket, Edit, Lightbulb, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated heading (scroll-triggered fade+slide) ── */
function AnimatedHeading({
  text, tag: Tag = "h2", className = "", delay = 0,
}: { text: string; tag?: "h1" | "h2" | "h3" | "p" | "span"; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cssText = "opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease;";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref as React.RefObject<never>} className={className}>{text}</Tag>;
}

const SOCIAL_ICONS = [
  { src: "/public/images/facebook.png", alt: "Facebook", label: "Facebook", url: "https://www.facebook.com/aldy.mayoubou" },
  { src: "/public/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn", url: "https://www.linkedin.com/in/mayoubou/?locale=en" },
];

const objectifs = [
  { titre: "Optimisation des performances", description: "Réduire les temps de chargement, améliorer l'expérience sur mobile et desktop.", icon: <Rocket size={20} /> },
  { titre: "Design intuitifs", description: "Concevoir des interfaces claires, accessibles et agréables à utiliser, centrées sur l'utilisateur.", icon: <Edit size={20} /> },
  { titre: "Innovations qui comptent", description: "Développer des applications utiles qui répondent aux besoins réels et créent une vraie valeur.", icon: <Lightbulb size={20} /> },
];

const skills = [
  { img: "/images/1.jpg", label: "Javascript" },
  { img: "/images/2.jpg", label: "React JS" },
  { img: "/images/3.jpg", label: "Node JS" },
  { img: "/images/4.jpg", label: "TailwindCSS" },
  { img: "/images/5.jpg", label: "Express JS" },
  { img: "/images/6.jpg", label: "PostgreSQL" },
  { img: "/images/TS.jpg", label: "TypeScript" },
  { img: "/images/Python logo.jpeg", label: "Python" },
  { img: "/images/Laravel-Logo.wine.png", label: "Laravel" },
];

const cards = [
  {
    titre: "Applications métiers sur mesure",
    desc: "Je conçois des applications web personnalisées adaptées à vos besoins métier, avec une interface moderne et une expérience utilisateur optimisée.",
    prix: "sur devis",
    img: "/images/1.jpeg"
  },

  {
    titre: "CRM & Gestion commerciale",
    desc: "Développement de solutions CRM pour gérer vos clients, ventes et activités commerciales de manière efficace et centralisée.",
    prix: "sur devis",
    img: "/images/2.jpeg"
  },

  {
    titre: "Automatisation des processus",
    desc: "Automatisation de vos tâches répétitives grâce à des scripts et outils intelligents pour améliorer votre productivité.",
    prix: "sur devis",
    img: "/images/3.jpeg"
  },

  {
    titre: "Maintenance & Evolution logicielle",
    desc: "Maintenance, correction de bugs et amélioration continue de vos applications pour assurer performance et sécurité.",
    prix: "sur devis",
    img: "/images/4.jpeg"
  }
];

const NAV_ITEMS = [
  { label: "Accueil", to: "/" },
  { label: "À propos", anchor: "competences" },
  { label: "Services", anchor: "services" },
  { label: "Portfolio", to: "/portofolio.tsx" },
  { label: "CV", to: "/cv.tsx" },
];

export default function Accueil() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleAnchor = (anchor: string) => {
    setIsOpen(false);
    setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 10);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawerIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes overlayIn{ from{opacity:0} to{opacity:1} }
        @keyframes pulsRing {
          0%  {box-shadow:0 0 0 0 rgba(6,78,185,.4);}
          70% {box-shadow:0 0 0 16px rgba(6,78,185,0);}
          100%{box-shadow:0 0 0 0 rgba(6,78,185,0);}
        }
        .avatar-pulse{animation:pulsRing 2.5s ease-out infinite;}
        .drawer {animation:drawerIn  .32s cubic-bezier(.4,0,.2,1) forwards;}
        .overlay{animation:overlayIn .32s ease forwards;}
        .skill-card:hover{transform:translateY(-4px) scale(1.03);}
        .svc-card:hover{transform:translateY(-4px);}
      `}</style>

      <div className="bg-[#070606] min-h-screen" ref={containerRef}>

        {/* ── Nav ── */}
        <header className="sticky top-0 z-50 bg-[#02090e]/95 backdrop-blur-sm border-b border-[#064eb9]/20">
          <div className="flex justify-between items-center px-4 lg:px-12 py-3 max-w-7xl mx-auto">
            <span className="text-white font-bold text-xl tracking-tight">
              Aldy <span className="text-[#064eb9]">Mayoubou</span>
            </span>

            {/* Desktop links */}
            <ul className="hidden lg:flex gap-8 text-sm list-none m-0 p-0">
              {NAV_ITEMS.map(({ label, to, anchor }) => (
                <li key={label}>
                  {anchor ? (
                    <button onClick={() => handleAnchor(anchor)} className="font-bold text-white hover:text-[#4d8ff5] transition-colors bg-transparent border-0 cursor-pointer p-0">
                      {label}
                    </button>
                  ) : (
                    <Link to={to!} className="font-bold text-white hover:text-[#4d8ff5] transition-colors">{label}</Link>
                  )}
                </li>
              ))}
            </ul>

            <Link to="/cv.tsx" className="hidden lg:block">
              <button className="bg-[#064eb9] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition-all duration-200">
                Contactez-moi
              </button>
            </Link>

            {/* Burger — 3 barres animées */}
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

        {/* ── Drawer mobile ── */}
        {isOpen && (
          <>
            <div className="overlay fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
            <div className="drawer fixed top-0 right-0 z-[70] h-full w-72 bg-[#0d1117] border-l border-[#064eb9]/25 flex flex-col lg:hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#064eb9]/15">
                <span className="text-white font-bold text-lg">Aldy <span className="text-[#064eb9]">Mayoubou</span></span>
                <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-lg border border-[#064eb9]/30 bg-[#064eb9]/10 flex items-center justify-center text-white hover:bg-[#064eb9]/25 transition-colors" aria-label="Fermer">
                  <X size={18} />
                </button>
              </div>
              {/* Links */}
              <nav className="flex-1 px-3 py-6">
                <ul className="flex flex-col gap-1 list-none m-0 p-0">
                  {NAV_ITEMS.map(({ label, to, anchor }) => (
                    <li key={label}>
                      {anchor ? (
                        <button onClick={() => handleAnchor(anchor)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-[#064eb9]/10 hover:text-[#4d8ff5] transition-all bg-transparent border-0 cursor-pointer">
                          {label}<ArrowUpRight size={14} className="text-gray-600" />
                        </button>
                      ) : (
                        <Link to={to!} onClick={() => setIsOpen(false)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-[#064eb9]/10 hover:text-[#4d8ff5] transition-all">
                          {label}<ArrowUpRight size={14} className="text-gray-600" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Footer */}
              <div className="px-5 py-6 border-t border-[#064eb9]/15">
                <Link to="/cv.tsx" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#064eb9] text-white py-3 rounded-xl text-sm font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-200 flex items-center justify-center gap-2">
                    Contactez-moi <ArrowUpRight size={14} />
                  </button>
                </Link>
                <div className="flex justify-center gap-3 mt-4">
                  {SOCIAL_ICONS.map((icon, idx) => (
                    <a key={idx} href="#" aria-label={icon.label}>
                      <img src={icon.url} alt={icon.alt} className="w-8 h-8 border border-[#064eb9]/40 rounded-full p-1.5 hover:bg-[#064eb9] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 lg:px-20 gap-12 lg:gap-20 pt-8">
          <div className="flex flex-col gap-5 text-center lg:text-left max-w-xl">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#4d8ff5] border border-[#064eb9]/40 bg-[#064eb9]/10 self-center lg:self-start"
              style={{ opacity: 0, animation: "fadeUp 0.6s ease 0.3s forwards" }}>
              <span className="w-2 h-2 rounded-full bg-[#064eb9] animate-pulse" />
              Disponible pour de nouveaux projets
            </span>

            {/* Titre — texte plein, pas de SplitText */}
            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight"
              style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.5s forwards" }}>
              Hello, je suis{" "}
              <span className="text-[#4d8ff5]">Aldy Mayoubou</span>
            </h1>

            <p className="text-lg lg:text-2xl font-bold text-[#064eb9]"
              style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.75s forwards" }}>
              Software Product Developer
            </p>

            <p className="text-gray-400 leading-relaxed text-sm lg:text-base"
              style={{ opacity: 0, animation: "fadeUp 0.7s ease 1s forwards" }}>
              Je conçois et développe des produits numériques qui aident les entreprises à optimiser leurs opérations, centraliser leurs données et améliorer leur productivité.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-center lg:justify-start"
              style={{ opacity: 0, animation: "fadeUp 0.7s ease 1.2s forwards" }}>
              <Link to="/cv.tsx">
                <button className="bg-[#064eb9] text-white px-7 py-3 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm">
                  Collaborons ensemble
                </button>
              </Link>
              <button
                onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aldymayoubou6@gmail.com&su=Discussion%20projet", "_blank")}
                className="border border-[#064eb9] text-[#064eb9] px-7 py-3 rounded-lg font-bold hover:bg-[#064eb9] hover:text-white transition-all duration-300 transform hover:scale-105 text-sm">
                Discutons
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-1 justify-center lg:justify-start"
              style={{ opacity: 0, animation: "fadeUp 0.7s ease 1.4s forwards" }}>
              {SOCIAL_ICONS.map((icon, idx) => (
                <a key={idx} href="#" aria-label={icon.label} className="group">
                  <img src={icon.src} alt={icon.alt} className="w-9 h-9 border border-[#064eb9]/50 rounded-full p-1.5 group-hover:bg-[#064eb9] group-hover:border-[#064eb9] transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0" style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.4s forwards" }}>
            <div className="avatar-pulse rounded-full">
              <img src="/images/Mon image.png" alt="Aldy MAYOUBOU"
                className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border-4 border-[#064eb9] object-cover" />
            </div>
          </div>
        </section>

        {/* ── Objectifs ── */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <AnimatedHeading text="Mes objectifs" tag="h2" className="text-white font-bold text-2xl lg:text-3xl" />
              <AnimatedHeading text="Ce qui guide chacun de mes projets" tag="p" className="text-gray-500 mt-3 text-sm" delay={150} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {objectifs.map((obj, i) => (
                <div key={i} className="group bg-[#02090e] rounded-xl p-7 border border-[#064eb9]/20 hover:border-[#064eb9]/60 transition-all duration-300 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-[#064eb9]/10 border border-[#064eb9]/30 flex items-center justify-center text-[#064eb9] mb-5 group-hover:bg-[#064eb9] group-hover:text-white transition-all duration-300">
                    {obj.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 leading-snug">{obj.titre}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{obj.description}</p>
                  <div className="flex items-center mt-6 cursor-pointer group/link">
                    <span className="text-sm font-bold text-[#064eb9] group-hover/link:text-white transition-colors">Me contacter</span>
                    <ArrowUpRight size={16} className="ml-1 text-[#064eb9] group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── À propos ── */}
        <section className="py-24 px-6 lg:px-20 bg-[#02090e]" id="competences">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedHeading text="Qui suis-je ?" tag="h2" className="text-white font-bold text-2xl lg:text-3xl mb-6" />
            <AnimatedHeading
              text="Je suis Software Product Developer spécialisé dans la conception d'applications et de plateformes destinées aux entreprises. Mon objectif est de transformer des besoins métier complexes en produits numériques simples, performants et évolutifs. J'interviens sur l'ensemble du cycle de développement, de la conception à la mise en production, en m'appuyant sur React, TypeScript, Node.js, Laravel et PostgreSQL."
              tag="p"
              className="text-gray-400 leading-relaxed text-sm lg:text-base"
              delay={200}
            />
          </div>
        </section>

        {/* ── Compétences ── */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <AnimatedHeading text="Mes compétences" tag="h2" className="text-white font-bold text-2xl lg:text-3xl" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {skills.map((skill, i) => (
                <div key={i} className="skill-card flex flex-col items-center gap-3 p-5 bg-[#02090e] rounded-xl border border-[#064eb9]/15 hover:border-[#064eb9]/50 cursor-default transition-all duration-300">
                  <img src={skill.img} alt={skill.label} className="w-12 h-12 rounded-full object-cover border-2 border-[#064eb9]/30" />
                  <p className="text-white text-center text-sm font-bold">{skill.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="py-24 px-6 lg:px-20 bg-[#02090e]" id="services">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <AnimatedHeading text="Mes services" tag="h2" className="text-white font-bold text-2xl lg:text-3xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, i) => (
                <div key={i} className="svc-card border border-[#064eb9]/25 hover:border-[#064eb9]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col bg-[#070606]">
                  <img src={card.img} alt={card.titre} className="w-full h-44 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-[#4d8ff5] mb-3">{card.titre}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">{card.desc}</p>
                    <button className="mt-6 w-full py-2.5 text-sm text-white bg-[#064eb9] border border-[#064eb9] rounded-lg hover:bg-transparent hover:text-[#064eb9] transition-colors duration-300 font-bold">
                      {card.prix}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto bg-[#02090e] border border-[#064eb9]/30 rounded-2xl p-8 lg:p-14 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-xl lg:text-2xl text-white font-bold mb-3 leading-snug">Travaillons ensemble sur votre prochain projet.</h2>
              <p className="text-gray-400 text-sm">De la conception à la mise en ligne, je vous accompagne à chaque étape.</p>
            </div>
            <Link to="/portofolio.tsx" className="flex-shrink-0">
              <button className="bg-[#064eb9] text-white px-7 py-3 rounded-lg font-bold text-sm hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Voir mon portfolio
              </button>
            </Link>
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