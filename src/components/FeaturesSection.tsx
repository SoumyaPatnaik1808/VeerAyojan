import { motion } from "framer-motion";
import {
  Calendar,
  Video,
  Users,
  Bell,
  LayoutDashboard,
  Newspaper
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Club Channels",
    description: "Each club gets its own channel, like YouTube for campus. Follow your favorites and never miss updates.",
    color: "from-primary to-orange-400",
  },
  {
    icon: Calendar,
    title: "Event Timelines",
    description: "Browse past highlights, catch ongoing events, and plan for upcoming ones—all in one view.",
    color: "from-accent to-blue-400",
  },
  {
    icon: Video,
    title: "Video Highlights",
    description: "Watch event recaps, performances, and behind-the-scenes content from campus activities.",
    color: "from-pink-500 to-rose-400",
  },
  {
    icon: Newspaper,
    title: "Newsletter Feed",
    description: "Personalized announcements and updates that matter to you, filtered by your interests.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get reminded about events you care about. No spam, just timely campus alerts.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: LayoutDashboard,
    title: "Organizer Dashboard",
    description: "Club leads can manage events, post content, and engage with members effortlessly.",
    color: "from-indigo-500 to-violet-400",
  },
];

const FeaturesSection = () => {
  return (
    <section id="clubs" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
