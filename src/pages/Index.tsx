import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LogoSection from "@/components/LogoSection";
import WhySection from "@/components/WhySection";
import Footer from "@/components/Footer";
import ClickSpark from '@/components/Animations/ClickSpark';
import { Clubs } from "@/components/Clubs";
import { ParticleTextEffect } from "@/components/Animations/particle-text-effect";


const Index = () => {
  return (
     <> 
  
      <div className="min-h-screen bg-background">
      

 <ClickSpark
  sparkColor='#786401ff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
  

     <div className="relative z-10">
      <ParticleTextEffect />
      <main>
        
        <HeroSection />
        <LogoSection />
        <Clubs/>
        <FeaturesSection />
        <WhySection />
       
      </main>
      <Footer />
    </div>
    </ClickSpark>
     </div>
   
     </>

   
  );
};

export default Index;
