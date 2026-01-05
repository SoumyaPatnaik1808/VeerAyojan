import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isUpcoming: boolean;
  image?: string;
}

// Sample events data
const eventsData: Record<string, ClubEvent[]> = {
  ieee: [
    {
      id: "1",
      title: "TechXplore 2024",
      description: "Annual technical symposium featuring workshops, hackathons, and guest lectures from industry experts.",
      date: "2024-02-15",
      time: "09:00",
      location: "E-Learning Centre, VSSUT",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      description: "3-day intensive bootcamp on modern web technologies including React, Node.js, and cloud deployment.",
      date: "2024-02-20",
      time: "10:00",
      location: "Computer Center, Block A",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
    },
    {
      id: "3",
      title: "AI/ML Workshop",
      description: "Hands-on workshop on machine learning fundamentals and practical applications.",
      date: "2025-01-10",
      time: "14:00",
      location: "Seminar Hall 2",
      isUpcoming: false,
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80"
    }
  ],
  vibranz: [
    {
      id: "1",
      title: "Vibranz Nite 2024",
      description: "The biggest cultural night of the year featuring performances from all cultural clubs.",
      date: "2024-03-01",
      time: "18:00",
      location: "Open Air Theatre",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
    },
    {
      id: "2",
      title: "Dance Workshop - Contemporary",
      description: "Learn contemporary dance forms from professional choreographers.",
      date: "2024-02-25",
      time: "16:00",
      location: "Cultural Complex",
      isUpcoming: true
    }
  ],
  robotics: [
    {
      id: "1",
      title: "RoboWars 2024",
      description: "Inter-college robotics competition with exciting bot battles and innovative showcases.",
      date: "2024-02-28",
      time: "10:00",
      location: "Mechanical Workshop",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    }
  ],
  ecell: [
    {
      id: "1",
      title: "E-Summit 2024",
      description: "Flagship entrepreneurship summit featuring startup pitches, investor meets, and keynote sessions.",
      date: "2024-03-15",
      time: "09:00",
      location: "Convention Center",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
    }
  ],
  souls: [
    {
      id: "1",
      title: "Unplugged Night",
      description: "Acoustic music night featuring soulful performances by club members.",
      date: "2024-02-18",
      time: "19:00",
      location: "Amphitheatre",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"
    }
  ],
  litsoc: [
    {
      id: "1",
      title: "Lit Fest 2024",
      description: "Annual literary festival with debates, creative writing, and poetry slam competitions.",
      date: "2024-02-22",
      time: "10:00",
      location: "Central Library Lawn",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"
    }
  ],
  pixels: [
    {
      id: "1",
      title: "Photo Walk: Heritage Trail",
      description: "Explore and capture the architectural heritage of Sambalpur through photography.",
      date: "2024-02-17",
      time: "06:00",
      location: "Campus Main Gate",
      isUpcoming: true
    }
  ],
  quizine: [
    {
      id: "1",
      title: "QuizMaster Championship",
      description: "Inter-college quiz competition with exciting rounds and prizes.",
      date: "2024-02-24",
      time: "14:00",
      location: "Seminar Hall 1",
      isUpcoming: true
    }
  ],
  sports: [
    {
      id: "1",
      title: "Annual Sports Meet 2024",
      description: "Week-long sports festival featuring athletics, team sports, and individual events.",
      date: "2024-03-10",
      time: "08:00",
      location: "Sports Complex",
      isUpcoming: true,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
    }
  ]
};

// Default events for clubs without specific data
const defaultEvents: ClubEvent[] = [
  {
    id: "default-1",
    title: "Club Meet & Greet",
    description: "Join us for our regular club meeting. New members welcome!",
    date: "2024-02-20",
    time: "17:00",
    location: "Club Room",
    isUpcoming: true
  }
];

interface ClubEventsTabProps {
  clubId: string;
  clubName: string;
}

const ClubEventsTab = ({ clubId, clubName }: ClubEventsTabProps) => {
  const events = eventsData[clubId] || defaultEvents;
  const upcomingEvents = events.filter(e => e.isUpcoming);
  const pastEvents = events.filter(e => !e.isUpcoming);

  const generateGoogleCalendarUrl = (event: ClubEvent) => {
    const startDate = new Date(`${event.date}T${event.time}:00`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${event.title} - ${clubName}`,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: event.description,
      location: event.location,
      sf: "true"
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = (event: ClubEvent) => {
    const url = generateGoogleCalendarUrl(event);
    window.open(url, "_blank");
    toast.success("Opening Google Calendar...", {
      description: `Adding "${event.title}" to your calendar`
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
              >
                {event.image && (
                  <div className="h-32 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToCalendar(event)}
                      className="flex-shrink-0 gap-1.5 bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add to Calendar</span>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(event.time)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-4">
            Past Events
          </h3>
          <div className="space-y-3">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-xl bg-card/30 border border-border/20 opacity-70"
              >
                <h4 className="font-medium text-foreground">{event.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No events scheduled yet</p>
        </div>
      )}
    </div>
  );
};

export default ClubEventsTab;
