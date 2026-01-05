import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut, Activity } from "lucide-react";
import FeedSidebar from "@/components/Feed/FeedSidebar";
import FeedToggle from "@/components/Feed/FeedToggle";
import FeedCard, { FeedItem } from "@/components/Feed/FeedCard";
import ClubChannel from "@/components/Feed/ClubChannel";
import { YourActivities } from "@/components/Feed/YourActivities";

// Mock data for demonstration
const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    clubId: "robotics",
    clubName: "Robotics Club",
    clubLogo: "/Robotics.jpeg",
    title: "VSSUT Robotics Challenge 2024",
    description: "The biggest robotics competition of the year is here! Register your team now for an electrifying experience.",
    fullContent: "We are thrilled to announce the VSSUT Robotics Challenge 2024. Categories include Line Follower, Maze Solver, and Robo War. Total prize pool of ₹50,000! Open to all branches and years. Workshop for beginners will be held this weekend at the Innovation Centre.",
    date: "Today",
    time: "2:00 PM",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?q=80&w=2070&auto=format&fit=crop",
    interested: 45,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    clubId: "souls",
    clubName: "Souls",
    clubLogo: "/Souls.jpeg",
    title: "Musical Evening: Unplugged",
    description: "Join us for a soulful evening of acoustic music and performances under the stars.",
    fullContent: "Souls invites you to 'Unplugged', an evening dedicated to acoustic music. Whether you sing or play an instrument, the stage is yours. Come and vibe with us at the OAT stairs. Refreshments will be provided.",
    date: "Yesterday",
    time: "6:30 PM",
    mediaType: "image",
    mediaSrc: "https://imgs.search.brave.com/P7VYyfasSVWEqeKWFjaXJxHNOhaFl131QzFx7D9spD0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/bGF0LWxheS1tdXNp/Yy1ub3Rlc18yMy0y/MTQ4MjAxNjc4Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA",
    interested: 120,
    isLiked: true,
    isSaved: true,
  },
  {
    id: 3,
    clubId: "ieee",
    clubName: "IEEE VSSUT",
    clubLogo: "/IEEE.jpeg",
    title: "Tech Talk: Future of AI",
    description: "An insightful session on the rapid advancements in Artificial Intelligence and its impact on engineering.",
    fullContent: "IEEE Student Branch VSSUT presents a Tech Talk on 'The Future of AI'. Our guest speaker, an industry expert, will discuss Generative AI, LLMs, and the ethical landscape of AI development. Don't miss this opportunity to learn and network with like-minded peers.",
    date: "2 days ago",
    time: "5:00 PM",
    mediaType: "video",
    mediaSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    interested: 85,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 4,
    clubId: "ecell",
    clubName: "E-Cell VSSUT",
    clubLogo: "/E-CELL.jpeg",
    title: "Startup Weekend Registration",
    description: "Have a business idea? Pitch it at Startup Weekend and win seed funding!",
    fullContent: "E-Cell brings you the annual Startup Weekend. 54 hours of no-talk, all-action. Pitch your idea, form a team, and build a prototype. Mentors from top incubators will be present to guide you. Winners get direct entry to the incubation program.",
    date: "3 days ago",
    time: "10:00 AM",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
    interested: 210,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 5,
    clubId: "enigma",
    clubName: "Enigma",
    clubLogo: "/Enigma.jpeg",
    title: "CodeWars 2024",
    description: "Battle of the bits! Join us for the ultimate competitive programming contest.",
    fullContent: "Enigma presents CodeWars 2024. A 3-hour intense coding battle on CodeChef. Solve algorithmic problems and win exciting prizes. Open to all branches and years. Workshop for beginners will be held this weekend.",
    date: "Today",
    time: "8:00 PM",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1515879490122-f804028b552c?q=80&w=2070&auto=format&fit=crop",
    interested: 150,
    isLiked: false,
    isSaved: true,
  }
];

const Feed = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [showActivities, setShowActivities] = useState(false);
  const [feedMode, setFeedMode] = useState<"feed" | "upcomingevents">("feed");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Filter items based on active channel
  const filteredItems = activeChannel
    ? MOCK_FEED_ITEMS.filter((item) => item.clubId === activeChannel)
    : MOCK_FEED_ITEMS;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block h-full shrink-0 relative">
        <FeedSidebar
          activeChannel={activeChannel}
          onChannelSelect={(id) => {
            setActiveChannel(id);
            setShowActivities(false);
          }}
        />
        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg text-muted-foreground hover:text-destructive hover:border-destructive/50 hover:bg-destructive/5 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {showActivities ? (
          <YourActivities onBack={() => setShowActivities(false)} />
        ) : activeChannel ? (
          <ClubChannel clubId={activeChannel} onBack={() => setActiveChannel(null)} />
        ) : (
          <>
            {/* Top Bar with Toggle */}
            <div className="sticky top-0 z-20 w-full flex flex-col bg-background/80 backdrop-blur-md border-b border-border/40">
              {/* Mobile Header: Menu & Profile */}
              <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-border/40">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 hover:bg-secondary/50 rounded-full transition-colors"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <div className="text-right">
                    <p className="text-sm font-medium leading-none">Soumya Patnaik</p>
                    <p className="text-xs text-muted-foreground">
                      Metallurgical and Materials Engineering, VSSUT
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden border border-border">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center p-3 md:p-4">
                <FeedToggle 
                  mode={feedMode} 
                  onModeChange={(mode) => {
                    if (mode === "upcomingevents") {
                      navigate("/events");
                    } else {
                      setFeedMode(mode);
                    }
                  }} 
                />

                <button
                  onClick={toggleTheme}
                  className="hidden md:flex absolute right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Scrollable Feed List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary/50 scrollbar-track-transparent">
              <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Feed Items */}
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <FeedCard key={item.id} item={item} index={index} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                      <span className="text-2xl">📭</span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">No updates yet</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mt-2">
                      Looks like there are no posts in this channel yet. Check back later!
                    </p>
                  </motion.div>
                )}

                {/* Bottom spacing */}
                <div className="h-20" />
              </div>
            </div>

            {/* Floating Activities Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowActivities(true)}
              className="absolute bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <Activity className="w-5 h-5" />
              <span className="font-medium">Your Activities</span>
            </motion.button>
          </>
        )}
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r border-border shadow-xl md:hidden flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-border/40">
                <span className="font-semibold text-lg">Clubs & Channels</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 hover:bg-secondary/50 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FeedSidebar activeChannel={activeChannel} onChannelSelect={(id) => { setActiveChannel(id); setShowActivities(false); setIsMobileMenuOpen(false); }} />
              </div>
              <div className="p-4 border-t border-border/40 space-y-2">
                <button
                  onClick={() => {
                    setShowActivities(true);
                    setActiveChannel(null);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${showActivities ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"}`}
                >
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">Your Activities</span>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;