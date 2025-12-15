import { useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from "../composants/textType.tsx";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


const SOCIAL_ICONS = [
  { src: "/images/facebook.png", alt: "Facebook", label: "Facebook" },
  { src: "/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn" }
];

const PROJECTS = [
  {
    id: 1,
    title: "Site de réservation en ligne pour un restaurant",
    description: "Voici un bref résumé d'un projet qui consiste à créer un site web nommé COSEINA. Conçu pour donner la possibilité aux clients de ce restaurant de commander et de réserver en ligne. Accessible depuis une tablette, un smartphone ou un laptop grâce au design responsive.",
    technologies: "HTML, TailwindCSS, JavaScript, MySQL, PHP.",
    images: ["/images/A.1.jpg", "/images/B.jpg", "/images/C.jpg", "/images/D.jpg"],
    layout: "left"
  },
  {
    id: 2,
    title: "HG Vision Graphic",
    description: "Voici un bref résumé d'un site web pour une agence de graphisme. L'objectif de ce projet était de créer une interface utilisateur moderne aux couleurs de cette agence tout en gérant le CEO ainsi que la base de données.",
    technologies: "React JS, TailwindCSS, JavaScript, PostgreSQL, Node.js et Express.js.",
    images: ["/images/E.png", "/images/G.png", "/images/F.png", "/images/H.png"],
    layout: "right"
  }
];

const CURRENT_PROJECT = {
  title: "Logimonth",
  description: "Ce projet en cours est une application qui vise à automatiser les tâches répétitives des commerçants en général. Ils auront la possibilité de gérer les clients, le nombre de ventes et d'achats. Il y aura également un tableau de bord pour visualiser tout ce trafic.",
  image: "/images/I.png"
};

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false); // Déplacer useState ici
  const footerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    // Animation d'apparition des éléments au défilement
    const fadeElements = gsap.utils.toArray<HTMLElement>('.fade-in');
    const projectImages = gsap.utils.toArray<HTMLElement>('.project-image');
    const projectSections = gsap.utils.toArray<HTMLElement>('.project-section');

    const animations = [
      // Animations fade-in
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
      // Animations des images
      ...projectImages.map((img, index) => 
        gsap.fromTo(img, 
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            delay: index * 0.1,
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      ),
      // Animations des sections de projet
      ...projectSections.map((section, index) => 
        gsap.fromTo(section,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          { 
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      )
    ];

    // Cleanup pour éviter les doublons si le composant est démonté
    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Composant de projet réutilisable
  const ProjectSection = ({ project }: { project: typeof PROJECTS[0] }) => (
    <div className={`mt-20 bg-[#02090e] flex flex-col lg:flex-row lg:justify-between project-section ${
      project.layout === 'right' ? 'lg:flex-row-reverse' : ''
    }`}>
      {/* Partie Images */}
      <div className="grid grid-cols-2 gap-4 p-4 lg:w-1/2">
        <div className="flex flex-col gap-4 shadow-2xl shadow-[#064eb9] rounded-lg p-2">
          <div className="flex gap-4">
            <img
              src={project.images[0]}
              alt={`${project.title} - Vue 1`}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md project-image"
            />
            <img
              src={project.images[1]}
              alt={`${project.title} - Vue 2`}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md project-image"
            />
          </div>
          <div className="flex gap-4">
            <img
              src={project.images[2]}
              alt={`${project.title} - Vue 3`}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md project-image"
            />
            <img
              src={project.images[3]}
              alt={`${project.title} - Vue 4`}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md project-image"
            />
          </div>
        </div>
      </div>

      {/* Partie Texte */}
      <div className="flex flex-col gap-3 mt-6 lg:mt-0 lg:ml-12 px-6 lg:w-1/2 justify-center fade-in">
        <h1 className="text-xl lg:text-2xl font-bold text-[#064eb9]">
          {project.title}
        </h1>
        <p className="text-white text-sm md:text-base text-justify leading-relaxed">
          {project.description}
        </p>
        <p className="text-white text-sm md:text-base">
          Les différentes technologies utilisées pour ce projet sont : <br />
          <span className="text-red-400 font-bold">
            {project.technologies}
          </span>
        </p>
        <div className="mt-3">
          <button
            className="bg-[#064eb9] text-white border border-[#064eb9] rounded-lg 
            px-4 py-2 text-sm font-bold transform hover:scale-105 transition duration-300 
            hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Commencer un projet similaire"
          >
            Commençons un projet
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#070606] min-h-screen">
      {/* Navigation */}
      <header className="flex flex-col justify-between items-center p-3 shadow-md shadow-[#064eb9] bg-[#02090e] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full p-2">
          {/* LOGO */}
          <h1 className="text-white font-bold text-xl">Aldy Mayoubou</h1>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-6 text-white text-md">
              <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/acceuil.tsx">Accueil</Link></li>
           <li>
    <a 
      href="#competences"
      className="font-bold text-white text-md hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('competences')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      A propos de moi
    </a>
  </li>
 <li>
    <a 
      href="#services"
      className="font-bold text-white text-md hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Services
    </a>
  </li>
              <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/portofolio.tsx">Portofolio</Link></li>
              <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/cv.tsx">CV</Link></li>
            </ul>
            
            {/* BOUTON BLEU "CONTACTEZ-MOI" */}
            
          </div>
          {/* BOUTON BLEU "CONTACTEZ-MOI" - Desktop seulement */}
<Link to="/contact" className="hidden lg:block">
  <button 
    className="bg-[#064eb9] text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    aria-label="Contactez-moi"
  >
    Contactez-moi
  </button>
</Link>


          {/* BURGER (MOBILE) */}
          <div className="lg:hidden">
            {isOpen ? (
              <X className="text-white text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
            ) : (
              <Menu className="text-white text-2xl cursor-pointer" onClick={() => setIsOpen(true)} />
            )}
          </div>
        </div>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="lg:hidden bg-[#111] shadow-lg w-full">
            <ul className="flex flex-col gap-4 text-white text-md p-4">
          <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/acceuil.tsx">Accueil</Link></li>
           <li>
    <a 
      href="#competences"
      className="font-bold text-white text-md hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('competences')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      A propos de moi
    </a>
  </li>
 <li>
    <a 
      href="#services"
      className="font-bold text-white text-md hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Services
    </a>
  </li>
              <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/portofolio.tsx">Portofolio</Link></li>
              <li><Link className="font-bold text-white text-md  hover:border-b-4 border-b-0 border-[#064eb9] inline-block hover:rounded-sm cursor-pointer hover:transition-all hover:duration-200" to="/cv.tsx">CV</Link></li>
            </ul>
            <Link to="/cv.tsx">
            <button 
              className="bg-[#064eb9] text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Contactez-moi"
            >
              Contactez-moi
            </button>
            </Link>
          </div>
          
        )}
      </header>

      {/* Hero Section */}
      <section 
        className="bg-[url('/images/pexels-helenalopes-4773719.jpg')] bg-cover h-screen bg-fixed bg-center"
        aria-label="Introduction"
      >
        <div className="flex items-center justify-center h-screen bg-black bg-opacity-50">
          <div className="flex flex-col items-center text-center">
            <TextType
              text={["Plongez dans l'univers de mes réalisations"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-white text-3xl font-bold m-6"
            />
            <TextType
              text={["Découvrez mes projets"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-white text-xl font-bold m-6 -mt-6"
            />
          </div>
        </div>
      </section>

      {/* Projets vedettes */}
      <section className="mt-10" aria-labelledby="featured-projects">
        <div className="flex items-start justify-start flex-col fade-in text-center">
          <h1 id="featured-projects" className="text-white text-2xl font-bold m-7">Projets vedettes</h1>
        </div>
        
        {PROJECTS.map(project => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </section>

      {/* Projets en cours */}
      <section className="mt-10 flex flex-col" aria-labelledby="current-projects">
        <h1 id="current-projects" className="text-white text-center text-2xl font-bold fade-in">Projets en cours</h1>

        <div className="bg-[#02090e] flex flex-col lg:flex-row gap-8 mt-12 p-6 rounded-lg project-section">
          {/* Image */}
          <div className="flex justify-center lg:w-1/2">
            <img
              src={CURRENT_PROJECT.image}
              alt="Aperçu du projet Logimonth"
              className="w-full max-w-sm lg:max-w-lg h-auto object-cover rounded-md shadow-2xl shadow-[#064eb9] project-image"
            />
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-3 mt-6 lg:mt-0 text-center lg:text-left items-center lg:items-start justify-center fade-in lg:w-1/2">
            <h2 className="text-xl lg:text-2xl font-bold text-[#064eb9]">{CURRENT_PROJECT.title}</h2>
            <p className="text-white text-sm md:text-base text-justify leading-relaxed">
              {CURRENT_PROJECT.description}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-4 lg:px-20 bg-[#02090e] mt-30"
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
                  href="#" 
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
    </div>
  );
}