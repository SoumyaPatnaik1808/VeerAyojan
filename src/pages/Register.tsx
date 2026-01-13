import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Moon, Sun, ArrowLeft, Check, User, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Particles from "@/components/Animations/Particles";
import { Link } from "react-router-dom";
import MistBackground from "@/components/Animations/MistBackground";

const interestOptions = [
  { id: "robotics", label: "Robotics", icon: "🤖" },
  { id: "cultural", label: "Cultural", icon: "🎭" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "literary", label: "Literary", icon: "📚" },
  { id: "technical", label: "Technical", icon: "💻" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "art", label: "Art & Design", icon: "🎨" },
  { id: "entrepreneurship", label: "E-Cell", icon: "💡" },
];

const Register = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (password.length < 8) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    }
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { strength: 100, label: "Strong", color: "bg-green-500" };
    }
    return { strength: 50, label: "Fair", color: "bg-yellow-500" };
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email or Roll Number is required";
    } else if (formData.email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);

    // Redirect after success animation
    setTimeout(() => {
      navigate("/feed");
    }, 2000);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  const chipVariants = {
    unselected: { scale: 1, backgroundColor: "rgba(255,255,255,0.05)" },
    selected: {
      scale: 1.05,
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      transition: { type: "spring" as const, stiffness: 400, damping: 20 }
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <MistBackground />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-card/50 backdrop-blur-md border border-border/30 hover:bg-card/70 transition-all duration-300 group"
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Back to Home */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border/30 hover:bg-card/70 transition-all duration-300 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Home</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          {/* Registration Card */}
          <div className="relative">
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/30 shadow-2xl p-8 md:p-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-400">Join the Community</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">VeerAayojans</span>
                </h1>
                <p className="text-muted-foreground">
                  Your gateway to VSSUT campus life
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                    >
                      <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-foreground mb-2"
                    >
                      Welcome Aboard!
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-muted-foreground"
                    >
                      Redirecting...
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Full Name */}
                    <motion.div
                      custom={0}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="pl-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-sm mt-1.5"
                          >
                            {errors.fullName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>


                    <motion.div
                      custom={1}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Enter your Email
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                        <Input
                          type="text"
                          placeholder="Enter your email "
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-sm mt-1.5"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      custom={2}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-12 pr-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {/* Password Strength */}
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength.strength}%` }}
                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{passwordStrength.label}</span>
                          </div>
                        </motion.div>
                      )}
                      <AnimatePresence>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-sm mt-1.5"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                      custom={3}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-12 pr-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-sm mt-1.5"
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>



                    {/* Submit Button */}
                    <motion.div
                      custom={5}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-70"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Creating Account...</span>
                            </motion.div>
                          ) : (
                            <Link to="/feed">
                              <motion.span
                                key="text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                Join VeerAayojans
                              </motion.span>
                            </Link>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>

                    {/* Login Link */}
                    <motion.p
                      custom={6}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-center text-muted-foreground pt-2"
                    >
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/auth")}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        Login
                      </button>
                    </motion.p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
