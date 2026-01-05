import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeedMode = "feed" | "upcomingevents";

interface FeedToggleProps {
  mode: FeedMode;
  onModeChange: (mode: FeedMode) => void;
}

const FeedToggle = ({ mode, onModeChange }: FeedToggleProps) => {
  const tabs: { id: FeedMode; label: string }[] = [
    { id: "feed", label: "Feed" },
    { id: "upcomingevents", label: "Upcoming Events" },
  ];

  return (
    <div className="inline-flex items-center p-1.5 rounded-xl bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm border border-border/30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onModeChange(tab.id)}
          className={cn(
            "relative px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
            mode === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {mode === tab.id && (
            <motion.div
              layoutId="feedToggle"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 capitalize">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FeedToggle;
