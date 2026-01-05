import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, ChevronDown, Menu, X, Sparkles, Calendar as CalendarIcon, Clock, MapPin, Loader2, LogOut, Activity, Sun, Moon } from "lucide-react";

import Footer from "@/components/Footer";
import FeedCard from "@/components/Feed/FeedCard";
import FeedToggle from "@/components/Feed/FeedToggle";
import ClickSpark from "@/components/Animations/ClickSpark";
import FeedSidebar from "@/components/Feed/FeedSidebar";
import ClubChannel from "@/components/Feed/ClubChannel";
import { YourActivities } from "@/components/Feed/YourActivities";

import { cn } from "@/lib/utils";

// Mock feed data
const feedData = [
  {
    id: 1,
    clubId: "enigma",
    clubName: "Enigma",
    clubLogo: "/Enigma.jpeg",
    title: "Hackathon 2024 Registration Open",
    description: "Join our annual 24-hour hackathon! Build innovative solutions, win prizes, and connect with fellow developers.",
    fullContent: "Join our annual 24-hour hackathon! Build innovative solutions, win prizes, and connect with fellow developers. This year's theme focuses on sustainable technology solutions. Teams of 2-4 members can participate. Registration closes on December 15th.",
    date: "Dec 20, 2024",
    time: "9:00 AM",
    mediaType: "image" as const,
    mediaSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    interested: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    clubId: "robotics",
    clubName: "Robotics Club",
    clubLogo: "/Robotics.jpeg",
    title: "Workshop: Introduction to Arduino",
    description: "Learn the basics of Arduino programming and build your first circuit in this hands-on workshop.",
    fullContent: "Learn the basics of Arduino programming and build your first circuit in this hands-on workshop. No prior experience required. All materials will be provided. Limited seats available - register now!",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    mediaType: "image" as const,
    mediaSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    interested: 67,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    clubId: "ieee",
    clubName: "IEEE",
    clubLogo: "/IEEE.jpeg",
    title: "Tech Talk: Future of AI",
    description: "Industry expert discusses the latest trends in artificial intelligence and machine learning.",
    fullContent: "Industry expert discusses the latest trends in artificial intelligence and machine learning. Learn about real-world applications and career opportunities in AI. Q&A session included.",
    date: "Dec 22, 2024",
    time: "4:00 PM",
    mediaType: "image" as const,
    mediaSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    interested: 156,
    isLiked: false,
    isSaved: true,
  },
];

// Upcoming events data
const upcomingEvents = [
  {
    id: "e1",
    title: "Annual Tech Fest 2024",
    club: "Enigma",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    venue: "Main Auditorium",
    description: "The biggest tech festival of the year featuring coding competitions, workshops, and keynotes.",
  },
  {
    id: "e2",
    title: "Robotics Competition",
    club: "Robotics Club",
    date: "Dec 28, 2024",
    time: "11:00 AM",
    venue: "Engineering Block",
    description: "Inter-college robotics competition with exciting challenges.",
  },
];

const Organizer = () => {
  const navigate = useNavigate();
  const [feedMode, setFeedMode] = useState<"feed" | "upcomingevents">("feed");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [showActivities, setShowActivities] = useState(false);
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

  const handleSummarize = async (eventId: string) => {
    setSummarizing(eventId);
    // Simulate AI summarization
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSummaries((prev) => ({
      ...prev,
      [eventId]: "This event brings together students for an engaging experience focused on skill development and networking. Key highlights include hands-on activities and expert sessions.",
    }));
    setSummarizing(null);
  };

  const handleAddToCalendar = (event: typeof upcomingEvents[0]) => {
    const startDate = new Date(event.date + " " + event.time).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(new Date(event.date + " " + event.time).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, "_blank");
  };

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
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowActivities(true);
              setActiveChannel(null);
            }}
            className={`flex items-center justify-center p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 ${showActivities ? "bg-primary text-primary-foreground border-primary" : "bg-background/90 border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5"}`}
            title="Your Activities"
          >
            <Activity className="w-5 h-5" />
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
          <ClickSpark sparkColor="#786401ff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-secondary/50 rounded-full transition-colors">
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              <main className="pt-6 pb-12 flex-1">
              <div className="max-w-4xl mx-auto px-4">
                {/* Header with Club Indicator & Actions */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-0 z-30 py-4 bg-background/80 backdrop-blur-xl border-b border-border/30 -mx-4 px-4 mb-6"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Club Indicator */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-glow"
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src="/Enigma.jpeg" alt="Enigma" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-foreground">Enigma</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.button>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/createpost")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
                      >
                        <Plus className="w-4 h-4" />
                        Create Post
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/50 hover:border-primary/30 transition-all"
                      >
                        <FileText className="w-4 h-4" />
                        Your Posts
                      </motion.button>
                    </div>
                  </div>

                  {/* Feed Toggle */}
                  <div className="mt-4 flex justify-center">
                    <FeedToggle mode={feedMode} onModeChange={setFeedMode} />
                  </div>
                </motion.div>

                {/* Upcoming Events Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-8"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </h2>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        layout
                        className={cn(
                          "relative rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 overflow-hidden transition-all duration-300",
                          expandedEvent === event.id ? "shadow-glow" : "shadow-soft hover:shadow-glow hover:border-primary/30"
                        )}
                      >
                        <motion.button
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className="w-full p-4 text-left"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{event.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="w-3.5 h-3.5" />
                                  {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {event.time}
                                </span>
                              </div>
                            </div>
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 text-muted-foreground transition-transform",
                                expandedEvent === event.id && "rotate-180"
                              )}
                            />
                          </div>
                        </motion.button>

                        <AnimatePresence>
                          {expandedEvent === event.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-border/30"
                            >
                              <div className="p-4 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.venue}</span>
                                </div>
                                <p className="text-sm text-foreground/80">{event.description}</p>

                                {/* Summary Section */}
                                {summaries[event.id] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-xl bg-accent/10 border border-accent/20"
                                  >
                                    <p className="text-sm text-foreground/80">{summaries[event.id]}</p>
                                  </motion.div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 pt-2">
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSummarize(event.id)}
                                    disabled={summarizing === event.id || !!summaries[event.id]}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-foreground text-sm font-medium hover:border-accent/50 transition-all disabled:opacity-50"
                                  >
                                    {summarizing === event.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Sparkles className="w-4 h-4" />
                                    )}
                                    {summaries[event.id] ? "Summarized" : "Summarise with Gemini"}
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAddToCalendar(event)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border/50 text-foreground text-sm font-medium hover:border-primary/30 transition-all"
                                  >
                                    <CalendarIcon className="w-4 h-4" />
                                    Add to Calendar
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Feed Cards */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 space-y-6"
                >
                  <h2 className="text-lg font-semibold text-foreground">Latest Posts</h2>
                  {feedData.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FeedCard item={item} index={item.id} />
                    </motion.div>
                  ))}
                </motion.section>
              </div>
              </main>
              <Footer />
            </div>
          </ClickSpark>
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
                <button onClick={() => { setShowActivities(true); setActiveChannel(null); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${showActivities ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"}`}>
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">Your Activities</span>
                </button>
                <button onClick={() => navigate("/")} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground">
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

export default Organizer;