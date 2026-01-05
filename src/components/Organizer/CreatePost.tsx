import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Image as ImageIcon, Calendar as CalendarIcon, Clock, Loader2, Check } from "lucide-react";

import Footer from "@/components/Footer";
import ClickSpark from "@/components/Animations/ClickSpark";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    // Simulate publishing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPublishing(false);
    
    toast({
      title: "Post published!",
      description: "Your post has been published successfully.",
    });
    
    navigate("/organizer");
  };

  return (
   
      <div className="min-h-screen bg-background">
        <ClickSpark sparkColor="#786401ff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <div className="relative z-10">
            
            <main className="pt-20 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto px-4"
              >
                {/* Back Button */}
                <motion.button
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/organizer")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">Back to Feed</span>
                </motion.button>

                {/* Page Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold text-foreground mb-8"
                >
                  Create New Post
                </motion.h1>

                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">Upload Photo</Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={cn(
                        "relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden",
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/50 bg-card/30"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <AnimatePresence mode="wait">
                        {image ? (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative aspect-video"
                          >
                            <img
                              src={image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setImage(null)}
                              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="aspect-video flex flex-col items-center justify-center gap-4 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <motion.div
                              animate={{ y: isDragging ? -5 : 0 }}
                              className="p-4 rounded-full bg-secondary/50"
                            >
                              <Upload className="w-8 h-8 text-muted-foreground" />
                            </motion.div>
                            <div className="text-center">
                              <p className="text-foreground font-medium">
                                Drag & drop your image here
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                or click to browse
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground font-medium">
                      Post Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground font-medium">
                      Post Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Write your post description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground resize-none leading-relaxed"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left h-12 rounded-xl bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/70",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-border/50" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-foreground font-medium">
                        Event Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="pl-10 bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12 text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Publish Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <Button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-glow transition-all"
                    >
                      <AnimatePresence mode="wait">
                        {isPublishing ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Publishing...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="publish"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="w-5 h-5" />
                            Publish Post
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </main>
           
          </div>
        </ClickSpark>
      </div>
  
  );
};

export default CreatePost;