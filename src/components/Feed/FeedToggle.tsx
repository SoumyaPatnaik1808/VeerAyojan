import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeedMode = "feed" | "newsletter";

interface FeedToggleProps {
  mode: FeedMode;
  onModeChange: (mode: FeedMode) => void;
}

const FeedToggle = ({ mode, onModeChange }: FeedToggleProps) => {
  return (
    <div className="inline-flex items-center p-1 rounded-full bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm border border-border/30">
      {(["feed", "newsletter"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onModeChange(option)}
          className={cn(
            "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200",
            mode === option
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {mode === option && (
            <motion.div
              layoutId="feedToggle"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 capitalize">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default FeedToggle;
