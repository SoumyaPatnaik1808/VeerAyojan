import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Bookmark, MessageCircle, Eye, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface ClubPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
}

// Sample posts data
export const postsData: Record<string, ClubPost[]> = {
  ieee: [
    {
      id: "1",
      title: "IEEE VSSUT Wins Best Student Branch Award",
      excerpt: "Proud moment for our team as we receive recognition at the IEEE India Council meeting.",
      content: `We are thrilled to announce that IEEE VSSUT Student Branch has been awarded the "Best Student Branch Award" at the IEEE India Council Annual Meeting 2024.

This recognition is a testament to the hard work and dedication of our team members, advisors, and the entire VSSUT community who have supported us throughout the year.

Key achievements that led to this recognition:
• Organized 25+ technical workshops and seminars
• Hosted TechXplore 2023 with 500+ participants
• Published 15 research papers in IEEE conferences
• Conducted outreach programs in 10 nearby schools
• Established industry partnerships with 5 leading tech companies

We thank our faculty advisor Dr. Priya Sharma and all our members for making this possible. This award motivates us to continue pushing boundaries and creating more opportunities for technical learning and innovation.

Looking forward to an even more impactful year ahead!`,
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      date: "2024-01-28",
      likes: 234,
      comments: 45,
      views: 1200
    },
    {
      id: "2",
      title: "Recap: Web Development Bootcamp Success",
      excerpt: "Over 150 students learned React and Node.js in our intensive 3-day bootcamp.",
      content: `The Web Development Bootcamp organized by IEEE VSSUT was a massive success with over 150 participants.

The bootcamp covered:
• HTML5, CSS3, and JavaScript fundamentals
• React.js with hooks and modern patterns
• Node.js and Express.js backend development
• MongoDB database integration
• Deployment on cloud platforms

Participants built real projects including a todo app, weather dashboard, and a mini social media platform. The hands-on approach helped students gain practical skills that are directly applicable in the industry.

Special thanks to our speakers from Google and Microsoft who shared valuable insights about industry practices.`,
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      date: "2024-01-15",
      likes: 189,
      comments: 32,
      views: 890
    }
  ],
  vibranz: [
    {
      id: "1",
      title: "Vibranz Nite 2024 - Theme Revealed!",
      excerpt: "Get ready for 'Ethereal Dreams' - the most magical cultural night ever!",
      content: `We are excited to reveal the theme for Vibranz Nite 2024: "Ethereal Dreams"!

This year's cultural extravaganza will transport you to a world of fantasy and wonder. Expect breathtaking performances, stunning visual effects, and unforgettable moments.

What to expect:
• Grand opening ceremony with 100+ dancers
• Live music performances by Souls
• Drama performances exploring mythological themes
• Fashion show with ethereal costume designs
• Surprise celebrity guest appearance
• Interactive art installations
• Food stalls with themed delicacies

Mark your calendars for March 1st, 2024. Tickets will be available from February 15th.

Let's make this the most memorable Vibranz Nite ever!`,
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      date: "2024-01-30",
      likes: 456,
      comments: 78,
      views: 2100
    }
  ],
  robotics: [
    {
      id: "1",
      title: "Our Robot 'Veer-1' Qualifies for Nationals",
      excerpt: "Autonomous navigation robot advances to the finals of Robocon 2024.",
      content: `Exciting news! Our autonomous robot 'Veer-1' has qualified for the national finals of Robocon 2024.

The robot features:
• Advanced LIDAR-based navigation
• Computer vision for object detection
• Custom-designed chassis with 4-wheel drive
• ROS2-based control system
• 6-DOF robotic arm for manipulation tasks

The team worked tirelessly for 6 months, iterating through multiple prototypes. We thank the Mechanical and Electrical Engineering departments for their support and resources.

Next stop: The national finals in Delhi!`,
      coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "2024-01-25",
      likes: 312,
      comments: 56,
      views: 1500
    }
  ],
  ecell: [
    {
      id: "1",
      title: "5 VSSUT Startups Selected for TIDE 2.0",
      excerpt: "Our incubated startups receive government funding under TIDE 2.0 scheme.",
      content: `We are proud to announce that 5 startups incubated at E-Cell VSSUT have been selected for the TIDE 2.0 funding scheme by MeitY.

Selected startups:
1. AgriTech Solutions - Smart farming IoT devices
2. EduLearn - Personalized learning platform
3. HealthPlus - Telemedicine for rural areas
4. CleanEnergy - Solar panel optimization
5. FinTrack - Personal finance management

Each startup will receive funding up to ₹4 lakhs for prototype development. This is a huge validation of our entrepreneurship ecosystem.

Interested in starting up? Join our next Startup Bootcamp!`,
      coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      date: "2024-01-20",
      likes: 267,
      comments: 41,
      views: 980
    }
  ],
  souls: [
    {
      id: "1",
      title: "New Song Release: 'Veer Anthem'",
      excerpt: "Our original composition celebrating VSSUT spirit is now on Spotify!",
      content: `Souls is thrilled to release our original composition 'Veer Anthem' - a song celebrating the indomitable spirit of VSSUT.

The song features:
• Vocals by 5 talented club members
• Original music composition by Rahul Das
• Lyrics capturing campus life and friendships
• Professional recording at Sambalpur Studios

The song is now available on:
• Spotify
• Apple Music
• YouTube Music
• JioSaavn

Listen, share, and let us know what you think! This is just the beginning of our journey to put VSSUT music on the map.`,
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
      date: "2024-01-22",
      likes: 534,
      comments: 89,
      views: 2500
    }
  ],
  litsoc: [
    {
      id: "1",
      title: "Lit Fest 2024 - Registrations Open",
      excerpt: "Participate in debates, poetry slams, and creative writing competitions.",
      content: `The Literary Society announces Lit Fest 2024 - the biggest literary festival of Eastern India!

Events:
• Parliamentary Debate Championship
• Poetry Slam
• Creative Writing Competition
• Extempore Speaking
• Book Review Competition
• Storytelling Session

Prizes worth ₹1 Lakh!

Registration is free for all VSSUT students. External participants can register for ₹100.

Register now at our website. Limited slots available!`,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      date: "2024-01-29",
      likes: 178,
      comments: 34,
      views: 750
    }
  ],
  pixels: [
    {
      id: "1",
      title: "Photo Exhibition: 'Campus Through Our Lens'",
      excerpt: "50 stunning photographs showcasing the beauty of VSSUT campus.",
      content: `Pixels presents 'Campus Through Our Lens' - a photo exhibition featuring 50 stunning photographs of VSSUT campus.

Themes covered:
• Architecture and heritage buildings
• Campus life and candid moments
• Nature and landscapes
• Sports and activities
• Festivals and celebrations

The exhibition will be held at the Central Library Gallery from February 10-17.

All photographs will be available for purchase. Proceeds will go to the campus beautification fund.`,
      coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
      date: "2024-01-27",
      likes: 223,
      comments: 28,
      views: 650
    }
  ],
  quizine: [
    {
      id: "1",
      title: "Quizine Triumphs at IIT Bombay Mood Indigo",
      excerpt: "Our team wins the general quiz at India's largest college cultural festival.",
      content: `Quizine VSSUT has made history by winning the General Quiz at IIT Bombay's Mood Indigo!

Our winning team:
• Amit Kumar (4th Year, CSE)
• Sneha Patel (3rd Year, ECE)
• Rohit Sharma (2nd Year, Mechanical)

The team defeated 64 teams from premier institutions across India. The finals featured intense rounds on science, history, literature, and pop culture.

This is the first time a team from Odisha has won this prestigious quiz. We are proud of our members!`,
      coverImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
      date: "2024-01-18",
      likes: 345,
      comments: 67,
      views: 1100
    }
  ],
  sports: [
    {
      id: "1",
      title: "VSSUT Wins Inter-University Cricket Championship",
      excerpt: "Our cricket team brings home the trophy after an unbeaten run.",
      content: `The VSSUT Cricket Team has won the Inter-University Cricket Championship 2024!

Tournament highlights:
• 5 matches, 5 victories
• Best Batsman: Rajesh Kumar (327 runs)
• Best Bowler: Sunil Yadav (15 wickets)
• Player of the Tournament: Rajesh Kumar

The final against Berhampur University was a nail-biter, with VSSUT winning by 3 wickets in the last over.

Congratulations to Coach Mr. Panda and the entire team for this historic achievement!`,
      coverImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
      date: "2024-01-24",
      likes: 567,
      comments: 123,
      views: 3200
    }
  ]
};

const defaultPosts: ClubPost[] = [
  {
    id: "default-1",
    title: "Welcome to Our Club!",
    excerpt: "Stay tuned for updates, events, and more from our club.",
    content: "We're excited to have you here! Follow us for the latest updates about our activities, events, and achievements. Join us in building a vibrant community!",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    date: "2024-01-01",
    likes: 50,
    comments: 5,
    views: 200
  }
];

interface ClubPostsTabProps {
  clubId: string;
  clubName: string;
}

const ClubPostsTab = ({ clubId, clubName }: ClubPostsTabProps) => {
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  
  // Helper to generate unique IDs for global storage
  const getUniqueId = (postId: string) => `${clubId}-${postId}`;

  // Initialize state from localStorage
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('user_likes') || '{}'); } 
    catch { return {}; }
  });

  const [isSaved, setIsSaved] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('user_saved') || '{}'); } 
    catch { return {}; }
  });

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const posts = postsData[clubId] || defaultPosts;

  const handleLike = (postId: string) => {
    const uid = getUniqueId(postId);
    setIsLiked(prev => {
      const next = { ...prev, [uid]: !prev[uid] };
      localStorage.setItem('user_likes', JSON.stringify(next));
      return next;
    });
  };

  const handleSave = (postId: string) => {
    const uid = getUniqueId(postId);
    setIsSaved(prev => {
      const next = { ...prev, [uid]: !prev[uid] };
      localStorage.setItem('user_saved', JSON.stringify(next));
      return next;
    });
    toast.success(isSaved[uid] ? "Removed from saved" : "Post saved!");
  };

  const handleShare = (post: ClubPost) => {
    navigator.clipboard.writeText(`Check out "${post.title}" by ${clubName} on Veer Aayojans!`);
    toast.success("Link copied to clipboard!");
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary(null);
    
    // Simulate AI summarization - in production, this would call an AI API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (selectedPost) {
      // Generate a mock summary based on the content
      const mockSummary = `📝 **Summary**: This post discusses ${selectedPost.title.toLowerCase()}. Key points include the main announcement and its impact on the ${clubName} community. The post has received significant engagement with ${selectedPost.likes} likes and ${selectedPost.comments} comments.`;
      setSummary(mockSummary);
    }
    
    setIsSummarizing(false);
    toast.success("Summary generated!");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              setSelectedPost(post);
              setSummary(null);
            }}
            className="group cursor-pointer overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            {/* Cover Image */}
            <div className="h-40 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No posts yet</p>
          </div>
        )}
      </div>

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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border/50 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="h-56 md:h-72 overflow-hidden">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {selectedPost.title}
                </h2>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span>{formatDate(selectedPost.date)}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedPost.views} views
                  </span>
                </div>

                {/* AI Summary */}
                {summary && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">AI Summary</span>
                    </div>
                    <p className="text-sm text-foreground">{summary}</p>
                  </motion.div>
                )}

                {/* Post Content */}
                <div className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(selectedPost.id)}
                      className={isLiked[getUniqueId(selectedPost.id)] ? "text-red-500" : "text-muted-foreground"}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isLiked[getUniqueId(selectedPost.id)] ? "fill-current" : ""}`} />
                      {selectedPost.likes + (isLiked[getUniqueId(selectedPost.id)] ? 1 : 0)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(selectedPost)}
                      className="text-muted-foreground"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(selectedPost.id)}
                      className={isSaved[getUniqueId(selectedPost.id)] ? "text-primary" : "text-muted-foreground"}
                    >
                      <Bookmark className={`w-4 h-4 mr-1 ${isSaved[getUniqueId(selectedPost.id)] ? "fill-current" : ""}`} />
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Summarize Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70"
              >
                {isSummarizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Summarizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">Summarize with Gemini</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClubPostsTab;
