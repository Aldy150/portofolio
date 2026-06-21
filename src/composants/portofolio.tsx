import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {  X, Github, ExternalLink, ChevronDown, ArrowUpRight, Home, FolderKanban, FileUser, Send } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────
   Design tokens
   bg        #060a12  ink background
   surface   #0c121c  card / panel surface
   line      #1b2433  hairline borders
   accent    #2f6fed  primary blue (slightly brighter than original)
   accent-2  #f5a623  warm amber — used once, as the signature spark
   text      #e8ebf0  primary text
   muted     #8b93a3  secondary text
   ────────────────────────────────────────────────────────── */

type Project = typeof PROJECTS[0];

const SOCIAL_ICONS = [
  { src: "/images/facebook.png", alt: "Facebook", label: "Facebook", url: "https://facebook.com" },
  { src: "/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn", url: "https://linkedin.com" },
];

const PROJECTS = [
  {
    id: 1,
    title: "HG Vision Graphic",
    description: "Site web moderne pour une agence de graphisme. Design épuré, interface intuitive et expérience utilisateur optimale.",
    longDescription: "Ce projet a été réalisé pour une agence de graphisme souhaitant moderniser sa présence en ligne. Le site comprend une galerie de projets, un blog, et un système de prise de rendez-vous intégré.",
    technologies: ["React JS", "TailwindCSS", "Node.js", "PostgreSQL", "Express.js"],
    image: "/images/E.png",
    category: "Développement web",
    githubUrl: "https://github.com/Aldy150/hg-vision-graphic",
    client: "HG Vision Graphic",
    date: "2024",
    features: [
      "Galerie de projets interactive",
      "Blog avec système de commentaires",
      "Prise de rendez-vous en ligne",
    ],
  },
  {
    id: 2,
    title: "Vagoo — Location de voitures",
    description: "Plateforme de location de voitures entre particuliers. Système de réservation en temps réel et messagerie intégrée.",
    longDescription: "Vagoo simplifie la location de voitures entre particuliers avec un système de vérification d'identité, des avis vérifiés, et une assurance intégrée pour chaque location.",
    technologies: ["React JS", "TypeScript", "Express JS", "PostgreSQL", "Redux"],
    image: "/images/image5.png",
    category: "Application web",
    githubUrl: "https://github.com/Aldy150/Vagoo_Plateforme",
    client: "Startup Vagoo",
    date: "2025–2026",
    features: [
      "Affichage dynamique des véhicules disponibles",
      "Messagerie instantanée",
      "Système d'évaluations",
    ],
  },
  {
    id: 3,
    title: "Nexa — Hub de formation",
    description: "Plateforme de formation en ligne pour les professionnels. Cours interactifs, suivi personnalisé et webinaires en direct.",
    longDescription: "Nexa propose des cours interactifs, des webinaires en direct, et un système de mentorat pour accompagner les apprenants dans leur développement professionnel.",
    technologies: ["Next.js", "TailwindCSS", "Prisma", "NEON"],
    image: "/images/nexa.png",
    category: "Développement web",
    githubUrl: "https://github.com/Aldy150/Nexa",
    client: "Nexa Formation",
    date: "2026",
    features: [
      "Cours interactifs avec quiz intégrés",
      "Webinaires en direct avec experts",
      "Système de mentorat personnalisé",
    ],
  },
];

const CURRENT_PROJECT = {
  title: "Logimonth",
  description: "Application d'automatisation pour commerçants : gestion des clients, ventes, achats et tableau de bord analytique en temps réel.",
  video: "/videos/video1.mp4",
  technologies: ["React.js", "Node.js", "PostgreSQL", "FastAPI", "Docker"],
  releaseDate: "Prévu pour septembre 2026",
};

/* ── Animated heading (IntersectionObserver, no SplitText) ── */
function AnimatedHeading({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
}: {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cssText = "opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease;";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref as React.RefObject<never>} className={className}>{text}</Tag>;
}

/* ── Project card ── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      className="group bg-[#0c121c] border border-[#1b2433] hover:border-[#2f6fed]/50 rounded-2xl overflow-hidden cursor-pointer"
      style={{ transition: "transform 0.35s cubic-bezier(.2,.8,.2,1), border-color 0.35s ease, box-shadow .35s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 40px -20px rgba(47,111,237,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/10 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-end p-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black/40 border border-white/10 hover:bg-[#2f6fed] hover:border-[#2f6fed] flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="Code source"
          >
            <Github className="w-4 h-4 text-white" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black/40 border border-white/10 hover:bg-[#2f6fed] hover:border-[#2f6fed] flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="Voir en ligne"
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </a>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-[#060a12]/80 backdrop-blur-sm border border-[#2f6fed]/40 text-[#7fa8f7] text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-3">
          <h3 className="text-[#e8ebf0] font-bold text-lg leading-snug">{project.title}</h3>
          <span className="text-[#5b6475] text-xs flex-shrink-0 pt-1 font-mono">{project.date}</span>
        </div>
        <p className="text-[#8b93a3] text-sm leading-relaxed mb-5 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs font-medium text-[#7fa8f7] bg-[#2f6fed]/10 border border-[#2f6fed]/15 px-2.5 py-1 rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs font-medium text-[#5b6475] bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-[#1b2433] text-[#e8ebf0] rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#2f6fed] hover:border-[#2f6fed] transition-all duration-300">
          Voir les détails
          <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
}

/* ── Mobile drawer nav (app-style) ── */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = [
    { label: "Accueil", icon: Home, to: "/" },
    { label: "Projets", icon: FolderKanban, href: "#projets" },
    { label: "CV", icon: FileUser, to: "/cv.tsx" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 z-[70] h-full w-[82%] max-w-[340px] bg-[#0b0f17] border-l border-[#1b2433] flex flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(.16,1,.3,1)",
          boxShadow: open ? "-24px 0 60px -20px rgba(0,0,0,0.6)" : "none",
        }}
        aria-hidden={!open}
      >
        {/* Header / handle */}
        <div className="flex items-center justify-between px-6 pt-7 pb-5 border-b border-[#1b2433]">
          <div>
            <p className="text-[#e8ebf0] font-bold text-base leading-none">Aldy Mayoubou</p>
            <p className="text-[#5b6475] text-xs mt-1">Software Product Developer</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="w-9 h-9 rounded-full bg-white/[0.04] border border-[#1b2433] flex items-center justify-center text-[#8b93a3] active:scale-90 transition-transform"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav list — app style rows */}
        <nav className="flex-1 px-3 pt-4">
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#e8ebf0] font-semibold text-[15px] active:bg-white/[0.06] transition-colors"
                    style={{ animation: open ? `drawerItemIn 0.4s cubic-bezier(.16,1,.3,1) ${0.08 + i * 0.05}s both` : "none" }}
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#2f6fed]/10 border border-[#2f6fed]/20 flex items-center justify-center text-[#7fa8f7]">
                      <item.icon size={17} />
                    </span>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" }), 200);
                    }}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#e8ebf0] font-semibold text-[15px] active:bg-white/[0.06] transition-colors"
                    style={{ animation: open ? `drawerItemIn 0.4s cubic-bezier(.16,1,.3,1) ${0.08 + i * 0.05}s both` : "none" }}
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#2f6fed]/10 border border-[#2f6fed]/20 flex items-center justify-center text-[#7fa8f7]">
                      <item.icon size={17} />
                    </span>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer CTA + socials, like an app account panel */}
        <div className="px-5 pb-8 pt-4 border-t border-[#1b2433]">
          <Link to="/cv.tsx" onClick={onClose}>
            <button className="w-full flex items-center justify-center gap-2 bg-[#2f6fed] text-white py-3.5 rounded-xl text-sm font-bold active:scale-[0.98] transition-transform">
              <Send size={15} />
              Contactez-moi
            </button>
          </Link>
          <div className="flex justify-center gap-3 mt-5">
            {SOCIAL_ICONS.map((icon, idx) => (
              <a
                key={idx}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.label}
                className="w-9 h-9 rounded-full border border-[#1b2433] flex items-center justify-center active:bg-white/[0.06] transition-colors"
              >
                <img src={icon.src} alt={icon.alt} className="w-4 h-4 opacity-80" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

/* ── Main component ── */
export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const filters = ["Tous", "Développement web", "Application web"];

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });
    }
    const cards = gsap.utils.toArray<HTMLElement>(".project-card-animate");
    cards.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const filtered = activeFilter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scrollDot { 0%{transform:translateY(0);opacity:1} 75%{transform:translateY(18px);opacity:0} 100%{transform:translateY(0);opacity:0} }
        @keyframes drawerItemIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        .scroll-dot { animation: scrollDot 2s infinite; }
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }

        /* Animated hamburger -> X, app-style */
        .burger-lines { width: 18px; height: 13px; position: relative; }
        .burger-lines span {
          position: absolute; left: 0; width: 100%; height: 2px; border-radius: 2px;
          background: #e8ebf0; transition: transform .32s cubic-bezier(.16,1,.3,1), opacity .25s ease, top .32s cubic-bezier(.16,1,.3,1);
        }
        .burger-lines span:nth-child(1) { top: 0; }
        .burger-lines span:nth-child(2) { top: 5.5px; }
        .burger-lines span:nth-child(3) { top: 11px; }
        .burger-lines.is-open span:nth-child(1) { top: 5.5px; transform: rotate(45deg); }
        .burger-lines.is-open span:nth-child(2) { opacity: 0; }
        .burger-lines.is-open span:nth-child(3) { top: 5.5px; transform: rotate(-45deg); }
      `}</style>

      <div className="bg-[#060a12] min-h-screen text-[#e8ebf0]">

        {/* ── Navigation ── */}
        <header className="fixed top-0 w-full z-50 bg-[#060a12]/90 backdrop-blur-md border-b border-[#1b2433]">
          <div className="flex justify-between items-center px-5 lg:px-12 py-4 max-w-7xl mx-auto">
            <Link to="/" className="font-bold text-[17px] tracking-tight">
              Aldy <span className="text-[#2f6fed]">Mayoubou</span>
            </Link>

            <ul className="hidden lg:flex gap-9 text-sm font-semibold list-none m-0 p-0 text-[#c4c9d3]">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li>
                <a
                  href="#projets"
                  className="hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Projets
                </a>
              </li>
              <li><Link to="/cv.tsx" className="hover:text-white transition-colors">CV</Link></li>
            </ul>

            <Link to="/cv.tsx" className="hidden lg:block">
              <button className="bg-[#2f6fed] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1f5adf] transition-colors duration-200">
                Contactez-moi
              </button>
            </Link>

            <button
              className="hidden max-lg:flex items-center justify-center w-10 h-10 rounded-[10px] bg-white/[0.04] border border-[#1b2433]"
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <span className="burger-lines">
                <span /><span /><span />
              </span>
            </button>
          </div>
        </header>

        {/* ── Mobile drawer ── */}
        <MobileDrawer open={isOpen} onClose={() => setIsOpen(false)} />

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('/images/pexels-helenalopes-4773719.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a12]/80 via-[#060a12]/60 to-[#060a12]" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2f6fed]/10 blur-[120px]" />

          <div className="relative text-center px-4 max-w-3xl" style={{ animation: "fadeInUp 1s ease forwards" }}>
            <span className="inline-flex items-center gap-2 text-[#7fa8f7] text-xs font-semibold uppercase tracking-[0.18em] mb-5 border border-[#2f6fed]/30 px-4 py-1.5 rounded-full bg-[#2f6fed]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
              Software Product Developer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-[1.05] tracking-tight">
              Mon <span className="text-[#2f6fed]">Portfolio</span>
            </h1>
            <p className="text-[#8b93a3] text-lg md:text-xl mb-10 leading-relaxed">
              Une sélection de projets alliant design soigné et ingénierie solide.
            </p>
            <button
              onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-[#2f6fed] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#1f5adf] transition-all duration-300"
            >
              Voir les projets
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-5 h-9 border border-white/25 rounded-full flex justify-center pt-2">
              <div className="w-0.5 h-2.5 bg-white/50 rounded-full scroll-dot" />
            </div>
          </div>
        </section>

        {/* ── Projets ── */}
        <section id="projets" className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <AnimatedHeading text="Mes projets" tag="h2" className="font-bold text-3xl lg:text-4xl mb-3 tracking-tight" />
              <AnimatedHeading
                text="Des réalisations récentes alliant innovation technique et design soigné."
                tag="p"
                className="text-[#8b93a3] text-sm max-w-xl mx-auto"
                delay={150}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#2f6fed] text-white"
                      : "bg-[#0c121c] border border-[#1b2433] text-[#8b93a3] hover:border-[#2f6fed]/50 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <div key={project.id} className="project-card-animate">
                  <ProjectCard project={project} onClick={() => openModal(project)} />
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-[#5b6475] py-16 text-sm">Aucun projet dans cette catégorie pour le moment.</p>
            )}
          </div>
        </section>

        {/* ── Projet en cours ── */}
        <section className="py-24 px-6 lg:px-20 bg-[#0b0f17] border-y border-[#1b2433]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#7fa8f7] text-xs font-semibold uppercase tracking-widest">En développement</span>
              <AnimatedHeading text="Projet en cours" tag="h2" className="font-bold text-3xl mt-2 tracking-tight" delay={100} />
            </div>

            <div className="border border-[#1b2433] rounded-2xl overflow-hidden bg-[#0c121c]">
              <div className="relative">
                <video src={CURRENT_PROJECT.video} controls autoPlay loop muted className="w-full h-[420px] object-cover" />
              </div>
              <div className="p-8 flex flex-col lg:flex-row justify-between items-start gap-6">
                <div>
                  <h3 className="font-bold text-2xl mb-2">{CURRENT_PROJECT.title}</h3>
                  <p className="text-[#8b93a3] text-sm leading-relaxed max-w-xl mb-4">{CURRENT_PROJECT.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_PROJECT.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-[#7fa8f7] bg-[#2f6fed]/10 border border-[#2f6fed]/15 px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block text-xs text-[#f5a623] border border-[#f5a623]/30 bg-[#f5a623]/10 px-4 py-2 rounded-full font-semibold mb-4 whitespace-nowrap">
                    {CURRENT_PROJECT.releaseDate}
                  </span>
                  <button
                    className="flex items-center gap-2 bg-[#2f6fed] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1f5adf] transition-colors duration-300"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Être notifié
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Modal ── */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div
              className="bg-[#0b0f17] border border-[#1b2433] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] to-transparent" />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-[#2f6fed] text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#060a12]/80 border border-[#2f6fed]/40 text-[#7fa8f7] text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-2xl">{selectedProject.title}</h3>
                  <span className="text-[#7fa8f7] text-sm font-semibold ml-4 font-mono">{selectedProject.date}</span>
                </div>
                <p className="text-[#8b93a3] text-sm leading-relaxed mb-6">{selectedProject.longDescription}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-[#5b6475] text-xs uppercase tracking-widest mb-2">Client</p>
                    <p className="text-[#e8ebf0] text-sm font-semibold">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="text-[#5b6475] text-xs uppercase tracking-widest mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="text-xs text-[#7fa8f7] bg-[#2f6fed]/10 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[#5b6475] text-xs uppercase tracking-widest mb-3">Fonctionnalités clés</p>
                  <ul className="space-y-2">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#8b93a3] text-sm">
                        <span className="w-1.5 h-1.5 bg-[#2f6fed] rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#2f6fed] text-[#7fa8f7] px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#2f6fed] hover:text-white transition-all duration-300"
                >
                  <Github size={16} />
                  Voir le code source
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="py-12 px-6 lg:px-20 bg-[#0b0f17] border-t border-[#1b2433]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-[#2f6fed] text-xl font-bold mb-1">Aldy Mayoubou</h2>
            <p className="text-[#5b6475] text-sm mb-6">Software Product Developer</p>

            <div className="flex justify-center gap-4 mb-8">
              {SOCIAL_ICONS.map((icon, idx) => (
                <div key={idx} className="group relative">
                  <a href={icon.url} target="_blank" rel="noopener noreferrer" aria-label={`Visiter mon ${icon.label}`}>
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-9 h-9 border border-[#1b2433] rounded-full p-1.5 transition-all duration-300 group-hover:bg-[#2f6fed] group-hover:border-[#2f6fed] group-hover:scale-110"
                    />
                  </a>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs bg-[#0c121c] border border-[#1b2433] px-2 py-0.5 rounded whitespace-nowrap">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1b2433] pt-6">
              <p className="text-[#5b6475] text-xs">© {new Date().getFullYear()} Aldy Mayoubou. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}