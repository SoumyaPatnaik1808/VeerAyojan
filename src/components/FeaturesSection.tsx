import { motion } from "framer-motion";
import {
  Calendar,
  Video,
  Users,
  Bell,
  LayoutDashboard,
  Newspaper
} from "lucide-react";

const FeaturesSection = () => {
  // Shared animation variant to keep code clean
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="clubs" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={cardVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything Campus Life <span className="text-gradient-primary">Needs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From event discovery to club management, Veer Aayojans brings all campus activities together in one beautiful platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Club Channels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Club Channels</h3>
            <p className="text-muted-foreground leading-relaxed">
              Each club gets its own channel, like YouTube for campus. Follow your favorites and never miss updates.
            </p>
          </motion.div>

          {/* Card 2: Event Timelines */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Event Timelines</h3>
            <p className="text-muted-foreground leading-relaxed">
              Browse past highlights, catch ongoing events, and plan for upcoming ones—all in one view.
            </p>
          </motion.div>

          {/* Card 3: Video Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Video Highlights</h3>
            <p className="text-muted-foreground leading-relaxed">
              Watch event recaps, performances, and behind-the-scenes content from campus activities.
            </p>
          </motion.div>

          {/* Card 4: Newsletter Feed */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Newsletter Feed</h3>
            <p className="text-muted-foreground leading-relaxed">
              Personalized announcements and updates that matter to you, filtered by your interests.
            </p>
          </motion.div>

          {/* Card 5: Smart Notifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Notifications</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get reminded about events you care about. No spam, just timely campus alerts.
            </p>
          </motion.div>

          {/* Card 6: Organizer Dashboard */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card-hover p-6 group rounded-2xl border border-white/5 bg-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Organizer Dashboard</h3>
            <p className="text-muted-foreground leading-relaxed">
              Club leads can manage events, post content, and engage with members effortlessly.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 