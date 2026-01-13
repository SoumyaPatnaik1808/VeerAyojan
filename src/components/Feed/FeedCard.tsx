import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Share2, Heart, Clock, Calendar, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedItem {
  id: number;
  clubId: string;
  clubName: string;
  clubLogo: string;
  title: string;
  description: string;
  fullContent: string;
  date: string;
  time: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  interested: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface FeedCardProps {
  item: FeedItem;
  index: number;
}

const FeedCard = ({ item, index }: FeedCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isSaved, setIsSaved] = useState(item.isSaved);
  const [interestedCount, setInterestedCount] = useState(item.interested);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setInterestedCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <motion.article
        layout
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-card/60 dark:bg-card/40 backdrop-blur-md",
          "border border-border/30 dark:border-white/5",
          "shadow-soft hover:shadow-glow",
          "transition-shadow duration-300"
        )}
      >
        {/* Card Header */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20"
          >
            <img
              src={item.clubLogo}
              alt={item.clubName}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {item.clubName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{item.date}</span>
              <span className="text-border">•</span>
              <Clock className="w-3 h-3" />
              <span>{item.time}</span>
            </div>
          </div>
        </div>

        {/* Media Preview with Parallax-lite */}
        <motion.div
          className="relative aspect-video overflow-hidden group cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <motion.img
            src={item.mediaSrc}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {item.mediaType === "video" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileHover={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-primary/80 transition-colors duration-300">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        <div className="p-4 pt-3 space-y-3">
          <h4 className="font-semibold text-foreground text-base leading-tight">
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  isLiked
                    ? "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <Heart className={cn("w-4 h-4 transition-transform", isLiked && "fill-current scale-110")} />
                <span>{interestedCount}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:bg-secondary/50 transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                isSaved
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              <Bookmark className={cn("w-4 h-4 transition-transform", isSaved && "fill-current scale-110")} />
            </motion.button>
          </div>
        </div>

        {/* Expanded Content Modal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-card/95 dark:bg-card/90 backdrop-blur-2xl border border-border/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.mediaSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                      <img
                        src={item.clubLogo}
                        alt={item.clubName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.clubName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.fullContent}</p>

                  <div className="flex items-center gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      I'm Interested
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSaved(!isSaved)}
                      className={cn(
                        "p-3 rounded-xl border transition-colors",
                        isSaved
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "border-border bg-secondary/50 hover:bg-secondary"
                      )}
                    >
                      <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
};

export default FeedCard;
