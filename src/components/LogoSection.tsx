import LogoLoop from './Animations/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "Aerotech.png", alt: "Aerotech", href: "#" },
  { src: "ASME.png", alt: "ASME", href: "https://www.asme.org" },
  { src: "Badminton_club.jpeg", alt: "Badminton Club", href: "#" },
  { src: "Cricket.jpeg", alt: "Cricket Club", href: "#" },
  { src: "E-CELL.jpeg", alt: "E-CELL", href: "#" },
  { src: "Emotica.jpeg", alt: "Emotica", href: "#" },
  { src: "Enigma.jpeg", alt: "Enigma", href: "https://enigma-dev-web.web.app" },
  { src: "Football.jpeg", alt: "Football", href: "#" },
  { src: "IEEE.jpeg", alt: "IEEE", href: "https://www.ieee.org" },
  { src: "IIC.jpeg", alt: "IIC", href: "https://idea-innovation-cell-vssut.github.io/version_1" },
  { src: "ISTE.jpeg", alt: "ISTE", href: "#" },
  { src: "Kabbadi.jpeg", alt: "Kabbadi", href: "#" },
  { src: "Litsoc.jpeg", alt: "Litsoc", href: "#" },
  { src: "NSS.jpeg", alt: "NSS", href: "#" },
  { src: "Quizine.jpeg", alt: "Quizine", href: "#" },
  { src: "Sanskar_Kendra.jpeg", alt: "Sanskar Kendra", href: "https://vssut.ac.in/nss.php" },
  { src: "Souls.jpeg", alt: "Souls", href: "https://www.facebook.com/soulsvssutburla" },
  { src: "Sports_Society.jpeg", alt: "Sports Society", href: "#" },
  { src: "SSS.jpeg", alt: "Social Service", href: "https://www.linkedin.com/in/social-service-society-vssut/?originalSubdomain=in" },
  { src: "VeerRacers.jpeg", alt: "VeerRacers", href: "#" },
  { src: "Vibranz.jpeg", alt: "Vibranz", href: "#" },
  { src: "Volleyball.jpeg", alt: "Volleyball", href: "#" },
  { src: "VRE.jpeg", alt: "VRE", href: "https://veerracersselectric.netlify.app/about" },
  { src: "Yoga.jpeg", alt: "Yoga", href: "#" },
  
];

function LogoSection() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={imageLogos}
        speed={100}
        direction="left"
        logoHeight={120}
        gap={100}
        hoverSpeed={10}
        scaleOnHover
        fadeOut
        ariaLabel="Technology partners"
      />
     
    </div>
  );
}

export default LogoSection;