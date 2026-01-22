import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LogoSection from "@/components/LogoSection";
import WhySection from "@/components/WhySection";
import Footer from "@/components/Footer";
import ClickSpark from '@/components/Animations/ClickSpark';
import { Clubs } from "@/components/Clubs";
import { ParticleTextEffect } from "@/components/Animations/particle-text-effect";
import { Navnew } from "@/components/Navnew";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ClickSpark
        sparkColor="#786401ff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="relative z-10">
          <div className="hidden md:block">
            <ParticleTextEffect />
          </div>
          <main>
            <div className="hidden md:block">
              <Navnew />
            </div>
            <div className="md:hidden fixed top-0 left-0 w-full z-20">
              <Navbar />
            </div>
            <HeroSection />
            <LogoSection />
            <div id="clubs" className="pt-16 md:pt-0">
              <Clubs />
            </div>
            <div id="features">
              <FeaturesSection />
            </div>
            <div id="about">
              <WhySection />
            </div>
          </main>

        </div>
      </ClickSpark>
    </div>
  );
};

export default Index;
