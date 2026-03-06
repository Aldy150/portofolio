import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from "../composants/textType.tsx";
import { Menu, X, Github, ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS = [
  { src: "/images/facebook.png", alt: "Facebook", label: "Facebook", url: "https://facebook.com" },
  { src: "/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn", url: "https://linkedin.com" }
];

const PROJECTS = [
  {
    id: 1,
    title: "HG Vision Graphic",
    description: "Site web moderne pour une agence de graphisme. Design épuré, interface intuitive et gestion complète du contenu avec une expérience utilisateur optimale.",
    longDescription: "Ce projet a été réalisé pour une agence de graphisme souhaitant moderniser sa présence en ligne. L'objectif était de créer une plateforme qui reflète leur créativité tout en offrant une expérience utilisateur exceptionnelle. Le site comprend une galerie de projets, un blog, et un système de prise de rendez-vous intégré.",
    technologies: ["React JS", "TailwindCSS", "Node.js", "PostgreSQL", "Express.js"],
    image: "/images/E.png",
    category: "Développement web",
    liveUrl: "https://hgvisiongraphic.com",
    githubUrl: "https://github.com/Aldy150/hg-vision-graphic",
    client: "HG Vision Graphic",
    date: "2024",
    features: [
      "Galerie de projets interactive",
      "Blog avec système de commentaires",
      "Prise de rendez-vous en ligne",
      "Dashboard administrateur"
    ]
  },
  {
    id: 2,
    title: "Vagoo - Location de voitures",
    description: "Plateforme innovante de location de voitures entre particuliers. Interface sécurisée et expérience utilisateur fluide avec système de réservation en temps réel.",
    longDescription: "Vagoo est née de la volonté de simplifier la location de voitures entre particuliers. La plateforme propose un système de vérification d'identité, des avis vérifiés, et une assurance intégrée pour chaque location. L'application mobile est également en développement.",
    technologies: ["React JS", "TypeScript", "Express JS", "PostgreSQL", "Redux"],
    image: "/images/image5.png",
    category: "Application web",
    liveUrl: "https://vagoo.com",
    githubUrl: "https://github.com/Aldy150/Vagoo_Plateforme",
    client: "Startup Vagoo",
    date: "2025-2026",
    features: [
      "Système de réservation en temps réel",
      "Paiement sécurisé intégré",
      "Messagerie instantanée",
      "Système d'évaluations"
    ]
  }
];

const CURRENT_PROJECT = {
  title: "Logimonth",
  description: "Application d'automatisation pour commerçants : gestion des clients, ventes, achats et tableau de bord analytique en temps réel.",
  longDescription: "Logimonth est une solution complète pour les commerçants souhaitant automatiser leur gestion quotidienne. L'application propose un tableau de bord personnalisable, des rapports détaillés, et une synchronisation avec les principaux outils de paiement.",
  video: "/videos/video1.mp4",
  technologies: ["React.js", "Node.js", "PostgreSQL", "SFastAPI", "Docker"],
  releaseDate: "Prévu pour Avril 2026"
};

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const footerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const filters = ['Tous', 'Développement web', 'Application web'];

  useEffect(() => {
    // Animation d'entrée pour le hero
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );
    }

    // Animations au scroll
    const fadeElements = gsap.utils.toArray<HTMLElement>('.fade-in');
    const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
    const sectionTitles = gsap.utils.toArray<HTMLElement>('.section-title');

    const animations = [
      ...sectionTitles.map(el =>
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      ),
      ...fadeElements.map(el =>
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      ),
      ...projectCards.map((card, index) =>
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      )
    ];

    // Animation parallax pour le hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openProjectModal = (project: typeof PROJECTS[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
    <div 
      className="project-card bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[#064eb9]/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => openProjectModal(project)}
    >
      <div className="relative group overflow-hidden h-64">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-[#064eb9] transition-colors duration-300"
              aria-label="Voir le code source"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-[#064eb9] transition-colors duration-300"
              aria-label="Voir le projet en direct"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-[#064eb9] text-white text-xs font-bold px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <span className="text-gray-500 text-sm">{project.date}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-[#064eb9] bg-[#064eb9]/10 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-2 py-1 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <button
          className="w-full bg-transparent border border-[#064eb9] text-[#064eb9] rounded-lg 
          px-4 py-2 text-sm font-bold hover:bg-[#064eb9] hover:text-white 
          transition-all duration-300 transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-[#064eb9]/50"
          aria-label="En savoir plus sur le projet"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );

  const filteredProjects = activeFilter === 'Tous' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen">
      {/* Navigation */}
      <header className="flex flex-col justify-between items-center p-3 shadow-md shadow-[#064eb9]/20 bg-gray-900/95 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full p-2 max-w-7xl mx-auto">
          {/* LOGO */}
          <Link to="/" className="text-white font-bold text-xl hover:text-[#064eb9] transition-colors">
            Aldy Mayoubou
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-8 text-white text-md">
              <li>
                <Link className="font-bold hover:text-[#064eb9] transition-colors relative group" to="/">
                  Accueil
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#064eb9] transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <a 
                  href="#projets"
                  className="font-bold hover:text-[#064eb9] transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Projets
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#064eb9] transition-all group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <Link className="font-bold hover:text-[#064eb9] transition-colors relative group" to="/cv">
                  CV
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#064eb9] transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* BOUTON CONTACT */}
          <Link to="/contact" className="hidden lg:block">
            <button 
              className="bg-[#064eb9] text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#064eb9]/25"
              aria-label="Contactez-moi"
            >
              Contactez-moi
            </button>
          </Link>

          {/* BURGER MOBILE */}
          <div className="lg:hidden">
            {isOpen ? (
              <X className="text-white text-2xl cursor-pointer hover:text-[#064eb9] transition-colors" onClick={() => setIsOpen(false)} />
            ) : (
              <Menu className="text-white text-2xl cursor-pointer hover:text-[#064eb9] transition-colors" onClick={() => setIsOpen(true)} />
            )}
          </div>
        </div>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="lg:hidden bg-gray-900 w-full border-t border-gray-800">
            <ul className="flex flex-col gap-4 text-white text-md p-4">
              <li>
                <Link className="font-bold block py-2 hover:text-[#064eb9] transition-colors" to="/" onClick={() => setIsOpen(false)}>
                  Accueil
                </Link>
              </li>
              <li>
                <a 
                  href="#projets"
                  className="font-bold block py-2 hover:text-[#064eb9] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                >
                  Projets
                </a>
              </li>
              <li>
                <Link className="font-bold block py-2 hover:text-[#064eb9] transition-colors" to="/cv" onClick={() => setIsOpen(false)}>
                  CV
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <button 
                    className="w-full bg-[#064eb9] text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transition-all"
                    aria-label="Contactez-moi"
                  >
                    Contactez-moi
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/pexels-helenalopes-4773719.jpg')" }}
        aria-label="Introduction"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Portfolio
            </h1>
            <TextType
              text={["Découvrez mes réalisations", "Explorez mon travail", "Plongez dans mes projets"]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              className="text-white text-xl md:text-3xl font-light mb-8"
            />
            <button
              onClick={() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#064eb9] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#064eb9]/25"
            >
              Voir les projets
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 section-title">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span className="text-[#064eb9]">Projets</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Une sélection de mes réalisations les plus récentes, alliant innovation technique et design soigné.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 
                ${activeFilter === filter 
                  ? 'bg-[#064eb9] text-white shadow-lg shadow-[#064eb9]/50 scale-105' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun projet dans cette catégorie pour le moment.
          </div>
        )}
      </section>

      {/* Projet en cours */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 section-title">
            <span className="text-[#064eb9] font-bold text-sm uppercase tracking-wider">En développement</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Projet en cours</h2>
          </div>

          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <video
              src={CURRENT_PROJECT.video}
              controls
              autoPlay
              loop
              muted
              className="w-full h-[500px] object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-3xl">
                  <h3 className="text-3xl font-bold text-white mb-2">{CURRENT_PROJECT.title}</h3>
                  <p className="text-gray-300 mb-4 text-lg">{CURRENT_PROJECT.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {CURRENT_PROJECT.technologies.map((tech, index) => (
                      <span key={index} className="text-sm text-[#064eb9] bg-[#064eb9]/10 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    className="bg-[#064eb9] text-white px-6 py-3 rounded-lg font-bold 
                    hover:bg-white hover:text-[#064eb9] transition-all duration-300 
                    transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Être notifié du lancement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de détails de projet */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeProjectModal}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-[#064eb9] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                <span className="text-[#064eb9] font-bold">{selectedProject.date}</span>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg">{selectedProject.longDescription}</p>
              
              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Client</h4>
                <p className="text-gray-400">{selectedProject.client}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="bg-[#064eb9]/10 text-[#064eb9] px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-white font-bold mb-2">Fonctionnalités clés</h4>
                <ul className="list-disc list-inside text-gray-400">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#064eb9] text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-300"
                >
                  Voir le projet
                </a>
                <a 
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-[#064eb9] text-[#064eb9] text-center px-6 py-3 rounded-lg font-bold hover:bg-[#064eb9] hover:text-white transition-all duration-300"
                >
                  Code source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer 
        className="px-4 lg:px-20 bg-gray-900 py-12 mt-20"
        ref={footerRef}
        aria-labelledby="footer-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 id="footer-heading" className="text-[#064eb9] text-2xl font-bold">Aldy Mayoubou</h2>
            <p className="text-white text-lg mt-2">Développeur full-stack</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {SOCIAL_ICONS.map((icon, idx) => (
              <div key={idx} className="group relative">
                <a 
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Visiter mon ${icon.label}`}
                >
                  <img 
                    src={icon.src} 
                    alt={icon.alt} 
                    className="w-10 h-10 border border-[#064eb9] rounded-full p-2 cursor-pointer 
                              transition-all duration-300 transform hover:scale-110 hover:bg-[#064eb9] 
                              hover:border-white focus:outline-none focus:ring-2 focus:ring-white" 
                  />
                </a>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300 text-white text-xs 
                                bg-gray-800 px-2 py-1 rounded whitespace-nowrap">
                  {icon.label}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Aldy Mayoubou. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        .animate-scroll {
          animation: scroll 2s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}