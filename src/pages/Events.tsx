import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Sparkles, ChevronDown, ExternalLink } from "lucide-react";


import ClickSpark from "@/components/Animations/ClickSpark";
import FeedToggle from "@/components/Feed/FeedToggle";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  club: string;
  clubLogo: string;
  date: string;
  time: string;
  venue: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  organizer: string;
  category: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Hackathon 2026",
    club: "IEEE",
    clubLogo: "/IEEE.jpeg",
    date: "2024-02-15",
    time: "9:00 AM",
    venue: "Main Auditorium",
    duration: "24 hours",
    shortDescription: "Annual coding marathon with exciting prizes",
    fullDescription: "Join us for the biggest hackathon of the year! Teams of up to 4 members will compete to build innovative solutions. Categories include AI/ML, Web Development, IoT, and Social Impact. Prizes worth ₹1,00,000 to be won!",
    organizer: "IEEE Student Branch",
    category: "Technical"
  },
  {
    id: "2",
    title: "Cultural Night",
    club: "Vibranz",
    clubLogo: "/Vibranz.jpeg",
    date: "2024-02-20",
    time: "6:00 PM",
    venue: "Open Air Theatre",
    duration: "4 hours",
    shortDescription: "A night of music, dance, and celebration",
    fullDescription: "Experience the vibrant culture of VSSUT with performances from talented students. The evening will feature classical and contemporary dance, live music, drama, and a fashion show. Food stalls and photo booths available!",
    organizer: "Vibranz Cultural Committee",
    category: "Cultural"
  },
  {
    id: "3",
    title: "Robotics Workshop",
    club: "Robotics",
    clubLogo: "/Robotics.jpeg",
    date: "2024-02-18",
    time: "10:00 AM",
    venue: "Robotics Lab, Block C",
    duration: "6 hours",
    shortDescription: "Hands-on workshop on building autonomous robots",
    fullDescription: "Learn the fundamentals of robotics in this intensive workshop. Topics covered include Arduino programming, sensor integration, motor control, and basic AI for navigation. All materials will be provided. Limited seats available!",
    organizer: "Robotics Club VSSUT",
    category: "Technical"
  },
  {
    id: "4",
    title: "Poetry Slam",
    club: "Litsoc",
    clubLogo: "/Litsoc.jpeg",
    date: "2024-02-22",
    time: "5:00 PM",
    venue: "Seminar Hall 2",
    duration: "3 hours",
    shortDescription: "Express yourself through the power of words",
    fullDescription: "An open mic event for poets and spoken word artists. Share your original work or perform pieces that move you. Categories include Hindi, English, and Odia poetry. Winners get published in the annual literary magazine!",
    organizer: "Literary Society",
    category: "Literary"
  },
  {
    id: "5",
    title: "Startup Pitch Competition",
    club: "E-Cell",
    clubLogo: "/E-CELL.jpeg",
    date: "2024-02-25",
    time: "2:00 PM",
    venue: "Conference Hall",
    duration: "5 hours",
    shortDescription: "Pitch your startup idea to investors",
    fullDescription: "Got a brilliant business idea? Present it to a panel of investors and industry experts. Top 3 teams receive seed funding and mentorship. Registration includes a pre-event workshop on pitching and business model canvas.",
    organizer: "Entrepreneurship Cell",
    category: "Business"
  }
];

const EventCard = ({ event, isExpanded, onToggle, onOtherExpanded }: { 
  event: Event; 
  isExpanded: boolean; 
  onToggle: () => void;
  onOtherExpanded: boolean;
}) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSummarizing(true);
    // Simulate AI summarization
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSummary(`• ${event.category} event by ${event.club}\n• Duration: ${event.duration} at ${event.venue}\n• Key highlight: ${event.shortDescription}\n• Don't miss the exciting activities and networking opportunities!`);
    setIsSummarizing(false);
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startDate = new Date(event.date + 'T' + event.time.replace(' AM', ':00').replace(' PM', ':00'));
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.fullDescription)}&location=${encodeURIComponent(event.venue)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: onOtherExpanded && !isExpanded ? 0.5 : 1, 
        y: 0,
        scale: onOtherExpanded && !isExpanded ? 0.98 : 1
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        relative overflow-hidden rounded-2xl 
        bg-card/60 backdrop-blur-xl border border-border/30
        transition-all duration-300 cursor-pointer
        ${isExpanded ? 'shadow-2xl shadow-primary/10' : 'shadow-lg hover:shadow-xl hover:-translate-y-1'}
      `}
      onClick={onToggle}
    >
      {/* Collapsed State */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Club Logo */}
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted/50 flex-shrink-0">
            <img 
              src={event.clubLogo} 
              alt={event.club}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {event.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{event.club}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
              {event.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-1">
              {event.shortDescription}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {event.time}
              </span>
            </div>
          </div>

          {/* Expand Indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border/20">
              {/* Full Description */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                {event.fullDescription}
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Venue</p>
                    <p className="text-foreground">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-foreground">{event.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Organized by</p>
                    <p className="text-foreground">{event.organizer}</p>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <AnimatePresence>
                {summary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">AI Summary</span>
                    </div>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">
                      {summary}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleSummarize}
                  disabled={isSummarizing || !!summary}
                  className="relative overflow-hidden bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-primary-foreground"
                >
                  {isSummarizing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                      </motion.div>
                      Summarizing...
                    </>
                  ) : summary ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Summarized
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Summarise with Gemini
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleAddToCalendar}
                  className="border-border/50 hover:bg-muted/50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Google Calendar
                  <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ClickSpark>
      
        <div className="min-h-screen bg-background">
         
          
          <main className="pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="flex justify-center mb-8">
                <FeedToggle 
                  mode="upcomingevents" 
                  onModeChange={(mode) => {
                    if (mode === "feed") navigate("/feed");
                  }} 
                />
              </div>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  Upcoming Events
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Discover what's happening on campus. Expand any event to learn more.
                </p>
              </motion.div>

              {/* Events List */}
              <div className="space-y-4">
                {mockEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <EventCard
                      event={event}
                      isExpanded={expandedId === event.id}
                      onToggle={() => handleToggle(event.id)}
                      onOtherExpanded={expandedId !== null && expandedId !== event.id}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Empty State Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-sm text-muted-foreground mt-8"
              >
                Click on any event to expand and see details
              </motion.p>
            </div>
          </main>

          
        </div>
    
    </ClickSpark>
  );
};

export default Events;