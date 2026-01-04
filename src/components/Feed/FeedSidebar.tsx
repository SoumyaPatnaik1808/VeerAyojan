import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Cpu, 
  Music, 
  Palette, 
  Trophy, 
  Lightbulb,
  BookOpen,
  Camera,
  Mic2
} from "lucide-react";

interface ClubChannel {
  id: string;
  name: string;
  icon: React.ElementType;
  logo?: string;
  unread?: number;
}

const clubChannels: ClubChannel[] = [
  { id: "ieee", name: "IEEE VSSUT", icon: Cpu, logo: "/IEEE.jpeg", unread: 3 },
  { id: "vibranz", name: "Vibranz", icon: Palette, logo: "/Vibranz.jpeg", unread: 1 },
  { id: "robotics", name: "Robotics Club", icon: Cpu, logo: "/Robotics.jpeg" },
  { id: "ecell", name: "E-Cell VSSUT", icon: Lightbulb, logo: "/E-CELL.jpeg", unread: 2 },
  { id: "souls", name: "Souls", icon: Music, logo: "/Souls.jpeg" },
  { id: "litsoc", name: "Literary Society", icon: BookOpen, logo: "/Litsoc.jpeg" },
  { id: "pixels", name: "Pixels", icon: Camera, logo: "/Assets/Pixels.jpeg" },
  { id: "quizine", name: "Quizine", icon: Mic2, logo: "/Quizine.jpeg" },
  { id: "sports", name: "Sports Society", icon: Trophy, logo: "/Sports_Society.jpeg" },
];

interface FeedSidebarProps {
  activeChannel: string | null;
  onChannelSelect: (channelId: string | null) => void;
  className?: string;
}

const FeedSidebar = ({ activeChannel, onChannelSelect, className }: FeedSidebarProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "w-72 h-full flex flex-col",
        "bg-card/50 dark:bg-card/30 backdrop-blur-xl",
        "border-r border-border/30 dark:border-white/5",
        className
      )}
    >
      {/* Profile Section */}
      <div className="p-5 border-b border-border/30 dark:border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=soumya" 
                alt="Profile"
                className="w-full h-full object-cover bg-secondary"
              />
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">
              Soumya Patnaik
            </h3>
            <p className="text-xs text-muted-foreground">
              Mettalurgical and Materials Engineering, 1st Year
            </p>
          </div>
        </motion.div>
      </div>

      {/* Club Channels */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <div className="px-4 mb-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Club Channels
          </h4>
        </div>

        <nav className="space-y-1 px-2">
          {/* All Channels Option */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChannelSelect(null)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              "group relative overflow-hidden",
              activeChannel === null
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {activeChannel === null && (
              <motion.div
                layoutId="activeChannel"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
              />
            )}
            <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">All Channels</span>
          </motion.button>

          {/* Club List */}
          {clubChannels.map((club, index) => (
            <motion.button
              key={club.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChannelSelect(club.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                "group relative overflow-hidden",
                activeChannel === club.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {activeChannel === club.id && (
                <motion.div
                  layoutId="activeChannel"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
              
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center">
                {club.logo ? (
                  <img 
                    src={club.logo} 
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <club.icon className="w-4 h-4" />
                )}
              </div>
              
              <span className="flex-1 font-medium text-sm text-left truncate">
                {club.name}
              </span>
              
              {club.unread && club.unread > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                  {club.unread}
                </span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      
    </motion.aside>
  );
};

export default FeedSidebar;
