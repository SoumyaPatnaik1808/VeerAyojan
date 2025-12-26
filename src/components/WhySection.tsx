import { motion } from "framer-motion";
import { CheckCircle2, Zap, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: CheckCircle2,
    title: "No More Scattered Info",
    description: "Say goodbye to checking 10 different WhatsApp groups. Everything's here.",
  },
  {
    icon: Globe,
    title: "One Stop Campus Hub",
    description: "All clubs, all events, all updates—accessible from a single platform.",
  },
  {
    icon: Users,
    title: "Built by Students",
    description: "Created by VSSUT students who understand what campus life really needs.",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description: "Real-time updates ensure you never miss what's happening on campus.",
  },
];

const WhySection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-gradient-orb w-[500px] h-[500px] bg-accent/20 bottom-[-20%] left-[-10%]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why <span className="text-gradient-primary">Veer Aayojans</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Campus life is vibrant, but information is scattered. Veer Aayojans brings 
              everything together—making it effortless to discover events, connect with clubs, 
              and stay in the loop.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <Button variant="hero" size="lg">
                Join the Community
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
              
              {/* Stats Card */}
              <div className="relative z-10 space-y-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gradient-primary mb-2">
                    50+
                  </div>
                  <div className="text-muted-foreground">Active Clubs on Campus</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">200+</div>
                    <div className="text-sm text-muted-foreground">Events Per Year</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">5000+</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full border-2 border-card bg-gradient-to-br ${
                            i === 0
                              ? "from-primary to-orange-400"
                              : i === 1
                              ? "from-accent to-blue-400"
                              : i === 2
                              ? "from-emerald-500 to-teal-400"
                              : "from-pink-500 to-rose-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +2.5k joined this month
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
