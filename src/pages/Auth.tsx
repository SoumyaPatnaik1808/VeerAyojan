import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Particles from "@/components/Animations/Particles";

const Auth = () => {
  const [isDark, setIsDark] = useState(true);
  const [showOrgPassword, setShowOrgPassword] = useState(false);
  const [showPartPassword, setShowPartPassword] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={4000}
          particleSpread={12}
          speed={0.05}
          particleColors={isOrganizer ? ['#1e40af', '#3b82f6', '#d97706', '#f59e0b'] : ['#0891b2', '#06b6d4', '#6366f1', '#818cf8']
          }
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={0.8}
          cameraDistance={20}
          className="w-full h-full"
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-secondary/50 backdrop-blur-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? <Moon className="w-4 h-4 lg:w-5 lg:h-5" /> : <Sun className="w-4 h-4 lg:w-5 lg:h-5" />}
        </motion.div>
      </motion.button>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 p-6 lg:p-8 rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl"
      >
        {/* Slider Toggle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs h-14 bg-secondary/50 rounded-2xl p-1.5 backdrop-blur-lg border border-border/30">
            {/* Slider Indicator */}
            <motion.div
              className="absolute top-1.5 h-11 w-[calc(50%-6px)] rounded-xl"
              animate={{
                x: isOrganizer ? 0 : "calc(100% + 6px)",
                background: isOrganizer 
                  ? "linear-gradient(135deg, #1e40af, #f6573bff)" 
                  : "linear-gradient(135deg, #f6573bff, #1e40af)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                boxShadow: isOrganizer 
                  ? "0 4px 20px rgba(59, 130, 246, 0.4)" 
                  : "0 4px 20px rgba(6, 182, 212, 0.4)",
              }}
            />
            
            {/* Toggle Buttons */}
            <div className="relative flex h-full">
              <button
                onClick={() => setIsOrganizer(true)}
                className={`flex-1 flex items-center justify-center text-sm font-semibold transition-colors duration-300 rounded-xl ${
                  isOrganizer ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Organizer
              </button>
              <button
                onClick={() => setIsOrganizer(false)}
                className={`flex-1 flex items-center justify-center text-sm font-semibold transition-colors duration-300 rounded-xl ${
                  !isOrganizer ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Participant
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Content */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={isOrganizer ? 1 : -1}>
            {isOrganizer ? (
              <motion.div
                key="organizer"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                {/* Organizer Form */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    For <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Organizers</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Manage clubs. Preserve legacy.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Organizer ID</label>
                    <Input
                      type="text"
                      placeholder="Enter your Organizer ID"
                      className="h-11 bg-secondary/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Organizer's Password</label>
                    <div className="relative">
                      <Input
                        type={showOrgPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-11 bg-secondary/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl pr-12 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOrgPassword(!showOrgPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showOrgPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      Remember me
                    </label>
                    
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Login as Organizer
                    </Button>
                    
                    
                  </motion.div>

                  
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="participant"
                custom={-1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                {/* Participant Form */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    For <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Participants</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Discover events. Follow what matters.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Participant Email</label>
                    <Input
                      type="text"
                      placeholder="Enter your email "
                      className="h-11 bg-secondary/50 border-border/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Input
                        type={showPartPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-11 bg-secondary/50 border-border/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl pr-12 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPartPassword(!showPartPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPartPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      Remember me
                    </label>
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/feed">
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                    >
                      Login as Participant
                    </Button>
                     </Link>
                  </motion.div>

                  <p className="text-center text-sm text-muted-foreground">
                    New to VeerAyojan?{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                      Create account
                    </a>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to Home Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate("/")}
          className="w-full text-center text-muted-foreground hover:text-foreground text-sm transition-colors border border-border/50 hover:border-foreground/50 rounded-xl p-2 mt-6"
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
