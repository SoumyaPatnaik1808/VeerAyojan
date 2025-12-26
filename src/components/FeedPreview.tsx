import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";

const feedPosts = [
  {
    club: "Innovision",
    clubColor: "from-primary to-orange-400",
    username: "@innovision_vssut",
    time: "2h ago",
    content: "🎉 Day 1 of Innovision 2024 was EPIC! Over 500 students participated in the hackathon. Stay tuned for Day 2 updates!",
    likes: 234,
    comments: 45,
    image: true,
  },
  {
    club: "Dramatics Society",
    clubColor: "from-accent to-blue-400",
    username: "@dramatics_vssut",
    time: "4h ago",
    content: "Auditions for the Annual Theatre Fest are NOW OPEN! 🎭 Show us your talent. Register by Friday.",
    likes: 156,
    comments: 28,
    image: false,
  },
  {
    club: "Coding Club",
    clubColor: "from-emerald-500 to-teal-400",
    username: "@codingclub_vssut",
    time: "6h ago",
    content: "New workshop alert! 🚀 Learn React & TypeScript this weekend. Free for all VSSUT students. Limited seats!",
    likes: 312,
    comments: 67,
    image: false,
  },
  {
    club: "Music Society",
    clubColor: "from-pink-500 to-rose-400",
    username: "@music_vssut",
    time: "8h ago",
    content: "Our acoustic night was magical! 🎸 Thank you everyone who came. Watch the highlights on our channel.",
    likes: 189,
    comments: 34,
    image: true,
  },
];

const FeedPreview = () => {
  return (
    <section id="feed" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your <span className="text-gradient-accent">Campus Feed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Like a mini Twitter for VSSUT—updates, announcements, and highlights from all clubs in one scrollable feed.
          </p>
        </motion.div>

        {/* Feed Container */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Feed Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-foreground font-semibold pb-2 border-b-2 border-primary">
                  For You
                </button>
                <button className="text-muted-foreground font-medium pb-2 hover:text-foreground transition-colors">
                  Following
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
              {feedPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.clubColor} flex-shrink-0`}
                    />

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">
                            {post.club}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {post.username}
                          </span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">
                            {post.time}
                          </span>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-foreground mb-3 leading-relaxed">
                        {post.content}
                      </p>

                      {/* Image Placeholder */}
                      {post.image && (
                        <div className="mb-3 rounded-2xl bg-secondary/50 h-40 flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            📸 Event Photo
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
                          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-emerald-500 transition-colors group">
                          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors group ml-auto">
                          <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedPreview;
