import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Eye, X, Bookmark, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClubPost, postsData } from "./ClubPostsTab";
import { toast } from "sonner";

interface ActivityPost {
  post: ClubPost;
  clubId: string;
  uniqueId: string;
}

export const YourActivities = ({ onBack }: { onBack?: () => void }) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'liked'>('saved');
  const [savedPosts, setSavedPosts] = useState<ActivityPost[]>([]);
  const [likedPosts, setLikedPosts] = useState<ActivityPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ActivityPost | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const loadActivities = () => {
      const likes = JSON.parse(localStorage.getItem('user_likes') || '{}');
      const saves = JSON.parse(localStorage.getItem('user_saved') || '{}');
      
      const saved: ActivityPost[] = [];
      const liked: ActivityPost[] = [];

      Object.entries(postsData).forEach(([clubId, posts]) => {
        posts.forEach(post => {
          const uniqueId = `${clubId}-${post.id}`;
          if (saves[uniqueId]) saved.push({ post, clubId, uniqueId });
          if (likes[uniqueId]) liked.push({ post, clubId, uniqueId });
        });
      });

      setSavedPosts(saved);
      setLikedPosts(liked);
    };

    loadActivities();
    // Listen for storage changes in case other tabs update it
    window.addEventListener('storage', loadActivities);
    return () => window.removeEventListener('storage', loadActivities);
  }, []);

  const displayPosts = activeTab === 'saved' ? savedPosts : likedPosts;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="h-full overflow-y-auto p-4 md:p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold">Your Activities</h1>
          <p className="text-muted-foreground text-sm">Manage your saved and liked posts</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 bg-secondary/30 p-1 rounded-lg w-fit">
        {(['saved', 'liked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Posts
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((item) => (
          <motion.div
            key={item.uniqueId}
            layoutId={item.uniqueId}
            onClick={() => setSelectedPost(item)}
            className="group cursor-pointer overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={item.post.coverImage}
                alt={item.post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                {item.clubId.toUpperCase()}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold line-clamp-1">{item.post.title}</h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.post.excerpt}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>{formatDate(item.post.date)}</span>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {item.post.likes}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {displayPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No {activeTab} posts found.</p>
        </div>
      )}

      {/* Expanded Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              layoutId={selectedPost.uniqueId}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-64 w-full overflow-hidden">
                <img src={selectedPost.post.coverImage} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold">{selectedPost.post.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{formatDate(selectedPost.post.date)}</span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    {selectedPost.clubId.toUpperCase()}
                  </span>
                </div>

                <div className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                  {selectedPost.post.content.split('\n\n').map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};