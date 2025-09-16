import { Rocket, Edit, Lightbulb, ArrowUpRight, Menu, X } from "lucide-react";
import SplitText from "../composants/splitText.tsx";
import TextType from "../composants/textType.tsx";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

export default function Accueil() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const SOCIAL_ICONS = [
    { src: "/images/facebook.png", alt: "Facebook", label: "Facebook" },
    { src: "/images/linkedin.png", alt: "LinkedIn", label: "LinkedIn" }
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animation d'entrée pour chaque section
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const icones: string[] = [
    "/images/facebook.png",
    "/images/linkedin.png",
  ];

  const objectif: { titre: string; Description: string; icon?: React.ReactNode; icon2?: React.ReactNode }[] = [
    { 
      titre: "Optimisation des performances",
      Description: "Réduire les temps de chargement, améliorer l'expérience sur mobile et desktop",
      icon: <Rocket/>,
      icon2: <ArrowUpRight />,
    },
    {
      titre: "Création des Design intuitifs",
      Description: "Concevoir des interfaces claires, accessibles et agréables à utiliser, centrées sur l'utilisateur.",
      icon: <Edit/>,
      icon2: <ArrowUpRight />,
    },
    {
      titre: "Innovations qui comptent",
      Description: "Développer des applications utiles qui répondent aux besoins réels et créent une vraie valeur.",
      icon: <Lightbulb/>,
      icon2: <ArrowUpRight />,
    },
  ];

  const Images: {imgage: string; description: string}[] = [
    { imgage: "/images/1.jpg", description: "Javascript" },
    { imgage: "/images/2.jpg", description: "React js" },
    { imgage: "/images/3.jpg", description: "Node js" },
  ];

  const Images2: {imgage: string; description: string}[] = [
    { imgage: "/images/4.jpg", description: "TailwindCSS" },
    { imgage: "/images/5.jpg", description: "Express js" },
    { imgage: "/images/6.jpg", description: "PostgreSQL" }
  ];

  const Images3: {imgage: string; description: string}[] = [
    { imgage: "/images/TS.jpg", description: "Typescript" },
  ];

  const cards: {texte: string; objet: string; btn: string; Image: string}[] = [
    {
      texte: "Conception de sites web",
      objet: "Je crée des sites web dynamiques, que vous soyez juste une boutique d'habillement ou une entreprise opérant à l'échelle mondiale, je conçois votre site vitrine ou dynamique avec une expérience utilisateur très appréciable",
      btn: " à partir de 300$",
      Image: "/images/Purple Pink Gradient Mobile Application Presentation.jpg",
    },
    {
      texte: "Création d'applications Mobile & Desktop",
      objet: "Vous voulez une application qui pourra gérer votre entreprise? Vous êtes au bon endroit. Vous avez la possibilité d'avour une application cross-plateforme",
      btn: " à partir de 1000$",
      Image: "/images/4115654.jpg",
    },
    {
      texte: "Maintenance de sites web & Applications",
      objet: "Vous voulez améliorer votre site ou application ou vous avez rencontré un problème? Mon expertise me permet de vous accompagner dans la maintenance de vos projets",
      btn: " à partir de 100$",
      Image: "/images/7594534.jpg",
    },
    {
      texte: "Automatisation des tâches",
      objet: "Vous proposez un service et votre souhait est d'automatiser certaines tâches? C'est très bien, je vous accompagne dans l'automatisation de vos tâches répétitives",
      btn: " à partir de 300$",
      Image: "/images/7.jpg",
    }
  ];

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

      {/* Section Hero */}
      <section 
        className="h-screen flex flex-col lg:flex-row justify-between items-center px-4 lg:px-20 pt-20 lg:pt-16"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[0] = el;
        }}
      >
        {/* Texte principal */}
        <div className="flex flex-col gap-6 lg:ml-24 text-center lg:text-left mt-25">
          <div className="flex flex-col gap-2">
            <SplitText
              text="Hello, je suis Aldy MAYOUBOU"
              tag="h1"
              className="text-lg lg:text-3xl font-bold text-white"
              delay={100}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <SplitText
              text="Développeur full-stack"
              tag="h3"
              className="text-md lg:text-3xl font-bold text-[#064eb9]"
              delay={150}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <SplitText
              text="Je transforme vos idées en solutions digitales innovantes et performantes."
              tag="p"
              className="text-md lg:text-lg text-gray-300 mt-4 max-w-lg mx-auto lg:mx-0"
              delay={200}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>

          {/* Boutons */}
   <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
  <Link to="/cv.tsx" className="w-full sm:w-auto">
    <button className="bg-[#064eb9] text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#064eb9] transition-all duration-300 transform hover:scale-105 active:scale-95 w-full max-w-[200px] mx-auto sm:mx-0">
      Collaborons
    </button>
  </Link>
  <button
    onClick={() => {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aldymayoubou6@gmail.com&su=Discussion%20projet&body=Bonjour%20Aldy,", "_blank");
    }}
    className="border border-[#064eb9] text-[#064eb9] px-6 py-3 rounded-lg font-bold hover:bg-[#064eb9] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 w-full max-w-[200px] mx-auto sm:mx-0 sm:w-auto"
  >
    Discutons
  </button>
</div>

          {/* Icônes réseaux */}
          <div className="flex gap-4 mt-6 justify-center lg:justify-start">
            {icones.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Icone ${idx}`}
                className="w-10 h-10 border border-[#064eb9] rounded-full p-2 cursor-pointer hover:bg-[#064eb9] transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="mt-10 lg:mt-0 lg:mr-24 flex justify-center">
          <img
            src="/images/Mon image.png"
            alt="Aldy MAYOUBOU"
            className="w-64 h-64 lg:w-72 lg:h-72 rounded-full border-4 border-[#064eb9] shadow-lg shadow-[#064eb9] object-cover"
          />
        </div>
      </section>

      {/* Section Objectifs */}
     <section 
  className="py-20 px-4 lg:px-20 flex flex-col items-center justify-center min-h-screen "
  ref={(el: HTMLDivElement | null) => {
    if (el) sectionRefs.current[1] = el;
  }}
>
  <div className="text-center mb-16">
    <h1 className="text-white font-bold text-2xl lg:text-3xl mt-40 lg:-mt-50">Mes objectifs</h1>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full lg:-mt-10">
    {objectif.map((obj, index) => (
      <div key={index} className="bg-[#02090e] rounded-lg p-6 border border-[#02090e] text-white shadow-lg shadow-[#064eb9] hover:shadow-xl hover:shadow-[#064eb9] transition-all duration-300 flex flex-col">
        <div className="flex items-center gap-4 text-[#064eb9] font-bold mb-4">
          <div className="text-2xl">{obj.icon}</div>
          <h3 className="text-xl">{obj.titre}</h3>
        </div>
        <p className="mt-3 text-justify text-gray-300 flex-grow">{obj.Description}</p>
        <div className="flex items-center mt-6 cursor-pointer group">
          <span className="text-sm font-bold text-[#064eb9] group-hover:text-white transition-colors">
            Contactez moi
          </span>
          <div className="ml-2 group-hover:translate-x-1 transition-transform">
            <ArrowUpRight className="text-[#064eb9] group-hover:text-white" />
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Section À propos */}
      <section 
        className="py-20 px-4 lg:px-20 bg-[#02090e]"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[2] = el;
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <TextType
              text={[`Qui suis-je ?`]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-white font-bold text-2xl lg:text-3xl"
            />
          </div>
          <div className="text-center">
            <TextType
              text={[
                `Je suis un développeur full stack passionné par la création de sites web, applications mobiles et desktop. J'utilise principalement React.js, TypeScript et TailwindCSS côté front-end, Node.js, Express.js et PostgreSQL côté back-end. Je suis rigoureux en ce qui concerne l'expérience utilisateur (UX Design). Mon objectif est de proposer des solutions fluides, facilement maintenables et scalables.`
              ]}
              typingSpeed={55}
              pauseDuration={100}
              showCursor={true}
              cursorCharacter="|"
              className="text-white text-justify lg:text-center leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section 
        className="py-20 px-4 lg:px-20"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[3] = el;
        }}
      >
        <div className="text-center mb-16">
          <h1 className="text-white font-bold text-2xl lg:text-3xl" id="competences">Mes compétences</h1>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {Images.map((tcx, index) => (
              <div key={index} className="flex flex-col items-center gap-4 p-6 bg-[#02090e] rounded-lg shadow-lg shadow-[#064eb9] hover:scale-105 transition-transform duration-300">
                <img 
                  src={tcx.imgage} 
                  alt={tcx.description}  
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <p className="text-white text-center font-bold">{tcx.description}</p>
              </div>
            ))}
            {Images2.map((tcx, index) => (
              <div key={index} className="flex flex-col items-center gap-4 p-6 bg-[#02090e] rounded-lg shadow-lg shadow-[#064eb9] hover:scale-105 transition-transform duration-300">
                <img 
                  src={tcx.imgage} 
                  alt={tcx.description}  
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <p className="text-white text-center font-bold">{tcx.description}</p>
              </div>
            ))}
            {Images3.map((tcx, index) => (
              <div key={index} className="flex flex-col items-center gap-4 p-6 bg-[#02090e] rounded-lg shadow-lg shadow-[#064eb9] hover:scale-105 transition-transform duration-300">
                <img 
                  src={tcx.imgage} 
                  alt={tcx.description}  
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <p className="text-white text-center font-bold">{tcx.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section 
        className="py-20 px-4 lg:px-20 bg-[#02090e]"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[4] = el;
        }}
      >
        <div className="text-center mb-16">
          <h1 className="text-white font-bold text-2xl lg:text-3xl" id="services">Mes services</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((tiif, index) => (
            <div
              key={index}
              className="border border-[#064eb9] rounded-lg shadow-lg shadow-[#064eb9] flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-[#064eb9] transition-all duration-300"
            >
              <div className="flex flex-col">
                <img src={tiif.Image} alt={tiif.texte} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h1 className="font-bold text-xl text-[#064eb9] mb-4">{tiif.texte}</h1>
                  <p className="text-white text-justify leading-relaxed">
                    {tiif.objet}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full p-3 text-white bg-[#064eb9] border border-[#064eb9] rounded-lg hover:bg-transparent hover:text-[#064eb9] transition-colors duration-300 font-bold">
                  {tiif.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section CTA */}
      <section 
        className="py-20 px-4 lg:px-20"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[5] = el;
        }}
      >
        <div className="bg-[#02090e] rounded-xl shadow-lg shadow-[#064eb9] p-8 lg:p-12 flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="mb-8 lg:mb-0 lg:mr-8">
            <h1 className="text-xl lg:text-2xl text-white font-bold mb-4">
              Travaillons ensemble sur votre prochain projet.
            </h1>
            <p className="text-white text-sm lg:text-base">
              De la réalisation de votre projet jusqu'à la fin je vous accompagne
            </p>
          </div>
          <div>
            <button className="bg-[#064eb9] text-white p-3 border border-[#064eb9] rounded-lg font-bold px-6 transform hover:scale-105 transition duration-300 hover:bg-white hover:text-[#064eb9]">
              Mon portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 px-4 lg:px-20 bg-[#02090e]"
        ref={(el: HTMLDivElement | null) => {
          if (el) sectionRefs.current[6] = el;
        }}
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