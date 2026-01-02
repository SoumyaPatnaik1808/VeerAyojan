import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isDark, setIsDark] = useState(true);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [showOrgPassword, setShowOrgPassword] = useState(false);
  const [showPartPassword, setShowPartPassword] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"organizer" | "participant">("organizer");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  relative overflow-hidden bg-background">
      {/* Sambalpuri-inspired geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
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

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex justify-center pt-16 pb-4 px-4 relative z-10">
        <div className="glass-card p-1 rounded-2xl flex gap-1">
          <button
            onClick={() => setActiveTab("organizer")}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "organizer"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Organizer
          </button>
          <button
            onClick={() => setActiveTab("participant")}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "participant"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Participant
          </button>
        </div>
      </div>
      

      {/* Left Section - Organizers */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 flex items-center justify-center p-8 relative"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Left background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredSide === "left" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Organizer copper accent */}
        <div className="absolute top-0 left-0 w-48 lg:w-64 h-48 lg:h-64 bg-gradient-to-br from-blue-600/20 to-amber-600/10 rounded-full blur-[100px] opacity-50" />

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8 lg:mb-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-3">
              For <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Organizers</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Manage clubs. Preserve legacy.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 lg:space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email / Username</label>
              <Input
                type="text"
                placeholder="Enter your email or username"
                className="h-11 lg:h-12 bg-secondary/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showOrgPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 lg:h-12 bg-secondary/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl pr-12 transition-all duration-300"
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
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-11 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Login as Organizer
              </Button>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground">
              New organizer?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Request access
              </a>
            </p>
          </motion.form>
        </div>
      </motion.div>

      {/* Center Divider */}
      <div className="hidden lg:flex relative w-px items-center justify-center z-20">
        {/* Animated line drawing from top to bottom */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 origin-top"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-400 blur-sm animate-pulse" />
          
          {/* Core line */}
          <motion.div 
            className="absolute inset-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-blue-400 via-accent to-primary"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute w-[3px] h-20 -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-full"
            animate={{
              y: ["-100%", "500%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
        </motion.div>

        {/* Center orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="relative z-10"
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-primary shadow-lg shadow-primary/50" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-primary"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Right Section - Participants */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`flex-1 flex items-center justify-center p-6 lg:p-8 relative ${
          activeTab !== "participant" ? "hidden lg:flex" : "flex"
        }`}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Right background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredSide === "right" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Participant cyan accent */}
        <div className="absolute bottom-0 right-0 w-48 lg:w-64 h-48 lg:h-64 bg-gradient-to-tl from-cyan-500/20 to-indigo-500/10 rounded-full blur-[100px] opacity-50" />

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8 lg:mb-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-3">
              For <span className="bg-gradient-to-r from-cyan-400 to-accent bg-clip-text text-transparent">Participants</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Discover events. Follow what matters.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 lg:space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email / Roll Number</label>
              <Input
                type="text"
                placeholder="Enter your email or roll number"
                className="h-11 lg:h-12 bg-secondary/50 border-border/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPartPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 lg:h-12 bg-secondary/50 border-border/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl pr-12 transition-all duration-300"
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
              <Button
                type="submit"
                className="w-full h-11 lg:h-12 bg-gradient-to-r from-cyan-500 to-accent hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                Login as Participant
              </Button>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground">
              New to VeerAyojans?{" "}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                Create account
              </a>
            </p>
          </motion.form>
        </div>
      </motion.div>

      {/* Back to Home Link */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={() => navigate("/")}
        className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        ← Back to Home
      </motion.button>
    </div>
  );
};

export default Auth;
