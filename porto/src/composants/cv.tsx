
import SplitText from "../composants/splitText.tsx";
import { MapPin, Mail, Phone, X, Menu, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function CV() {
  const icones: string[] = [
    "/images/facebook.png",
    "/images/linkedin.png",
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animation d'entrée pour chaque section
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Animation des compétences (effet de remplissage)
    const skills = gsap.utils.toArray('.skill-item');
    skills.forEach((skill: any, index) => {
      gsap.fromTo(skill, 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: skill,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animation de la photo de profil
    gsap.fromTo(".profile-image", 
      { scale: 0, rotation: -180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)" 
      }
    );

    // Animation des icônes de contact
    gsap.fromTo(".contact-icon", 
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        delay: 1.5
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#070606] min-h-screen" ref={containerRef}>
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
          <button 
              className="bg-[#064eb9] text-white px-6 py-2 rounded-lg lg:flex hidden font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Contactez-moi"
            >
              Contactez-moi
            </button>

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
             <button 
              className="bg-[#064eb9] text-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Contactez-moi"
            >
              Contactez-moi
            </button>
          </div>
          
        )}
      </header>

      {/* Section Hero */}
      <div className="relative h-screen flex flex-col overflow-hidden">
        {/* Arrière-plan assombri avec animation */}
        <div
          className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center"
          style={{ filter: 'brightness(20%)' }}
        ></div>

        {/* Contenu au premier plan */}
        <div className="relative flex justify-center items-center h-screen flex-col">
          <img
            src="/images/Mon image.png"
            alt="Aldy Mayoubou"
            className="rounded-full border-4 border-[#064eb9] shadow-lg shadow-[#064eb9] w-60 h-60 md:w-80 md:h-80 profile-image"
          />
          <div className="flex flex-col gap-5 justify-center items-center mt-8">
            <div>
              <SplitText
                text="Aldy Mayoubou"
                tag="h1"
                className="text-2xl md:text-3xl font-bold text-white"
                delay={100}
                duration={0.6}
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              /> 
            </div>
            <div>
              <button className="bg-[#064eb9] text-white p-2 border border-[#064eb9] rounded-lg text-sm font-bold px-4 py-2 hover:bg-white hover:text-[#064eb9] transition-colors duration-300">
                Développeur full-stack
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6">
              <div className="flex gap-2 items-center contact-icon">
                <Mail className="text-[#064eb9]"/>
                <p className="text-white text-sm md:text-lg font-bold">aldymayoubou6@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center contact-icon">
                <MapPin className="text-[#064eb9]"/>
                <p className="text-white text-sm md:text-lg font-bold">75, bis Rue Ngampiema</p>
              </div>
              <div className="flex gap-2 items-center contact-icon">
                <Phone className="text-[#064eb9]"/>
                <p className="text-white text-sm md:text-lg font-bold">+242 06 412 3588</p>
              </div>
            </div>
            <button className="mt-6 bg-[#064eb9] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-white hover:text-[#064eb9] transition-colors duration-300 contact-icon">
              <Download size={20} />
              Télécharger mon CV
            </button>
          </div>
        </div>
      </div>

      {/* Section Contenu Principal */}
      <div className="flex flex-col lg:flex-row justify-between px-6 py-12 max-w-6xl mx-auto">
        {/* Colonne de gauche */}
        <div 
          className="flex flex-col lg:w-1/2 p-5"
          ref={(el: HTMLDivElement | null) => {
            if (el) sectionRefs.current[0] = el;
          }}
        >
          <h1 className="text-white text-2xl font-bold mb-4">À propos de moi</h1>
          <p className="text-white text-md mb-8 leading-relaxed">
            Je suis Aldy Mayoubou, développeur full-stack spécialisé en React JS, Node JS, Flutter et Python. 
            Je crée des applications web, mobiles et desktop performantes et adaptées aux besoins des utilisateurs.
          </p>
          
          <h1 className="text-white text-2xl font-bold mb-4">Formation</h1>
          <div className="mb-6">
            <p className="text-white text-md mb-2">
              <span className="text-[#064eb9] mr-2">⬤</span> 2022-2023: Baccalauréat scientifique
            </p>
            <p className="text-gray-300 text-sm">Cours marianiste Sainte Rita</p>
          </div>
          <div className="mb-8">
            <p className="text-white text-md mb-2">
              <span className="text-[#064eb9] mr-2">⬤</span> 2023-2026: Licence appliquée en Analyse et programmation
            </p>
            <p className="text-gray-300 text-sm">Institut d'Enseignement Professionnel Appliqué</p>
          </div>
          
          <h1 className="text-white text-2xl font-bold mb-4">Projets personnels</h1>
          <div className="mb-6">
            <p className="text-white text-md mb-2">
              <span className="text-[#064eb9] mr-2">⬤</span> Conception et développement d'un site de réservation pour un restaurant.
            </p>
            <p className="text-gray-300 text-sm">
              Gestion des réservations en ligne, affichage des menus et interface utilisateur responsive.
              Technologies utilisées : HTML, CSS, JavaScript, PHP, Tailwind CSS.
            </p>
          </div>
          <div>
            <p className="text-white text-md mb-2">
              <span className="text-[#064eb9] mr-2">⬤</span> Conception et développement d'un site pour une agence de graphisme.
            </p>
            <p className="text-gray-300 text-sm">
              Interface moderne et responsive, présentation des services et portfolios interactifs.
              Technologies utilisées : React JS, JavaScript, Tailwind CSS et Express JS.
            </p>
          </div>
        </div>

        {/* Séparateur */}
        <div className="hidden lg:block border-l border-gray-700 mx-8"></div>

        {/* Colonne de droite - Compétences */}
        <div 
          className="flex flex-col lg:w-1/2 p-5"
          ref={(el: HTMLDivElement | null) => {
            if (el) sectionRefs.current[1] = el;
          }}
        >
          <h1 className="text-white text-2xl font-bold mb-6 text-center">Compétences et outils</h1>
          
          <div className="mb-8">
            <p className="text-white font-bold text-lg text-center mb-4">Frameworks</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['React js', 'TailwindCSS', 'Express js', 'Flutter'].map((skill, index) => (
                <span 
                  key={index}
                  className="skill-item border border-[#064eb9] text-[#064eb9] px-4 py-2 rounded-lg font-medium bg-[#02090e] hover:bg-[#064eb9] hover:text-white transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-white font-bold text-lg text-center mb-4">Langages</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['JavaScript', 'TypeScript', 'Node js', 'Dart', 'Python'].map((skill, index) => (
                <span 
                  key={index}
                  className="skill-item border border-[#064eb9] text-[#064eb9] px-4 py-2 rounded-lg font-medium bg-[#02090e] hover:bg-[#064eb9] hover:text-white transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-white font-bold text-lg text-center mb-4">Bases de données</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['PostgreSQL', 'SQL', 'MySQL'].map((skill, index) => (
                <span 
                  key={index}
                  className="skill-item border border-[#064eb9] text-[#064eb9] px-4 py-2 rounded-lg font-medium bg-[#02090e] hover:bg-[#064eb9] hover:text-white transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-white font-bold text-lg text-center mb-4">Outils</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Git & Github'].map((skill, index) => (
                <span 
                  key={index}
                  className="skill-item border border-[#064eb9] text-[#064eb9] px-4 py-2 rounded-lg font-medium bg-[#02090e] hover:bg-[#064eb9] hover:text-white transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#02090e] py-12 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[#064eb9] text-2xl font-bold mb-4">Aldy Mayoubou</h1>
          <p className="text-white text-lg mb-8">Développeur full-stack</p>
          
          <div className="flex justify-center gap-6 mb-8">
            {icones.map((src, idx) => (
              <img 
                key={idx} 
                src={src} 
                alt={`Icone ${idx}`} 
                className="w-10 h-10 border border-[#064eb9] rounded-full p-2 cursor-pointer hover:bg-[#064eb9] transition-colors duration-300" 
              />
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Aldy Mayoubou. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}