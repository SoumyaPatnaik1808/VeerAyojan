import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, Users, Calendar, FileText, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClubEventsTab from "./ClubEventsTab";
import ClubPostsTab from "./ClubPostsTab";

export interface ClubData {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  memberCount: number;
  foundedYear: number;
  category: string;
}

// Sample club data - in production, this would come from an API
const clubsData: Record<string, ClubData> = {
  ieee: {
    id: "ieee",
    name: "IEEE VSSUT",
    logo: "/IEEE.jpeg",
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&q=80",
    description: "IEEE VSSUT Student Branch is one of the most active student branches in India. We organize technical workshops, hackathons, and seminars to bridge the gap between academia and industry. Our mission is to foster technological innovation and excellence among students.",
    memberCount: 450,
    foundedYear: 2008,
    category: "Technical"
  },
  vibranz: {
    id: "vibranz",
    name: "Vibranz",
    logo: "/Vibranz.jpeg",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    description: "Vibranz is the official cultural club of VSSUT, dedicated to nurturing artistic talents and celebrating cultural diversity. From dance to drama, music to fine arts, we provide a platform for creative expression.",
    memberCount: 320,
    foundedYear: 2010,
    category: "Cultural"
  },
  robotics: {
    id: "robotics",
    name: "Robotics Club",
    logo: "/Robotics.jpeg",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    description: "The Robotics Club at VSSUT is where innovation meets engineering. We build autonomous robots, participate in national competitions, and conduct hands-on workshops on Arduino, ROS, and AI in robotics.",
    memberCount: 180,
    foundedYear: 2012,
    category: "Technical"
  },
  enigma: {
    id: "enigma",
    name: "Enigma",
    logo: "/Enigma.jpeg",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    description: "Enigma is the official coding club of VSSUT. We organize coding contests, hackathons, and development workshops to foster a competitive programming culture and software development skills.",
    memberCount: 250,
    foundedYear: 2013,
    category: "Technical"
  },
  ecell: {
    id: "ecell",
    name: "E-Cell VSSUT",
    logo: "/E-CELL.jpeg",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    description: "E-Cell VSSUT is the entrepreneurship cell fostering startup culture on campus. We organize E-Summit, pitch competitions, and mentorship programs to help students transform ideas into ventures.",
    memberCount: 280,
    foundedYear: 2014,
    category: "Entrepreneurship"
  },
  souls: {
    id: "souls",
    name: "Souls",
    logo: "/Souls.jpeg",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    description: "Souls is the music club of VSSUT, home to talented vocalists, instrumentalists, and music enthusiasts. We perform at college events, organize jam sessions, and nurture musical talents.",
    memberCount: 150,
    foundedYear: 2009,
    category: "Cultural"
  },
  litsoc: {
    id: "litsoc",
    name: "Literary Society",
    logo: "/Litsoc.jpeg",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    description: "The Literary Society promotes the art of words through debates, creative writing, poetry slams, and literary festivals. We believe in the power of expression and critical thinking.",
    memberCount: 200,
    foundedYear: 2007,
    category: "Literary"
  },
  pixels: {
    id: "pixels",
    name: "Pixels",
    logo: "/Assets/Pixels.jpeg",
    coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
    description: "Pixels is the official photography and videography club. We capture campus memories, conduct photography walks, and train students in professional photography and video production.",
    memberCount: 120,
    foundedYear: 2015,
    category: "Creative"
  },
  quizine: {
    id: "quizine",
    name: "Quizine",
    logo: "/Quizine.jpeg",
    coverImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80",
    description: "Quizine is the quiz club that challenges minds and rewards knowledge. We organize inter-college quiz competitions and represent VSSUT at national quizzing events.",
    memberCount: 100,
    foundedYear: 2011,
    category: "Academic"
  },
  sports: {
    id: "sports",
    name: "Sports Society",
    logo: "/Sports_Society.jpeg",
    coverImage: "https://images.unsplash.com/photo-1461896836934- voices-8c0016fc-4ba4-4fc4-b9a5-8f2a2d3df74c?w=1200&q=80",
    description: "The Sports Society coordinates all athletic activities at VSSUT. From cricket to athletics, we promote physical fitness and sportsmanship among students.",
    memberCount: 500,
    foundedYear: 2005,
    category: "Sports"
  }
};

interface ClubChannelPageProps {
  clubId: string;
  onBack: () => void;
}

const ClubChannel = ({ clubId, onBack }: ClubChannelPageProps) => {
  const [activeTab, setActiveTab] = useState("events");
  const club = clubsData[clubId];

  if (!club) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Club not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
    >
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src={club.coverImage}
          alt={`${club.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Club Info Section */}
      <div className="relative px-4 md:px-8 -mt-16">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          {/* Club Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-background shadow-xl bg-card flex-shrink-0"
          >
            <img
              src={club.logo}
              alt={club.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Club Details */}
          <div className="flex-1 pt-2 md:pt-8">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              {club.name}
            </motion.h1>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {club.memberCount} members
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {club.category}
              </span>
              <span>Est. {club.foundedYear}</span>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">About</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {club.description}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-1">
              <TabsTrigger 
                value="events" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="posts"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="w-4 h-4" />
                Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-4">
              <ClubEventsTab clubId={clubId} clubName={club.name} />
            </TabsContent>

            <TabsContent value="posts" className="mt-4">
              <ClubPostsTab clubId={clubId} clubName={club.name} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8" />
    </motion.div>
  );
};

export default ClubChannel;
