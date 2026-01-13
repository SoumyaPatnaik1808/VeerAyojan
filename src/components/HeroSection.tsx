import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (

    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">



      <div className="w-full h-full absolute inset-0 z-0 ">

      </div>
      <div className="absolute z-10 inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-gradient-orb w-[600px] h-[600px] bg-primary/30 top-[-10%] left-[-10%] animate-pulse-glow"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="hero-gradient-orb w-[400px] h-[400px] bg-accent/20 bottom-[10%] right-[-5%] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="hero-gradient-orb w-[300px] h-[300px] bg-primary/20 top-[50%] left-[50%] animate-pulse-glow"
          style={{ animationDelay: "4s" }}
        />
      </div>


      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">




          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            One Platform.{" "}
            <span className="text-gradient-primary">All Clubs.</span>
            <br />
            <span className="text-gradient-accent">Endless Campus Energy.</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Veer Aayojans connects every student to every club and event at VSSUT.
            Discover, participate, and never miss what's happening on campus.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button variant="hero-outline" size="lg" className="group">
                <Play className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
          </motion.div>




        </div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
