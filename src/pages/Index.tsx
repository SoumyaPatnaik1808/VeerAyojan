import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LogoSection from "@/components/LogoSection";
import WhySection from "@/components/WhySection";
import Footer from "@/components/Footer";


const Index = () => {
  return (
     <> 
  
      <div className="min-h-screen bg-background">
     
     <div className="relative z-10">
      <Navbar />
      <main>
        <HeroSection />
        <LogoSection />
        <FeaturesSection />
        <WhySection />
       
      </main>
      <Footer />
    </div>
     </div>
   
     </>

   
  );
};

export default Index;
