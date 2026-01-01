import { AnimatedCards } from "./Animations/AnimatedCards";


function Clubs() {
  const testimonials = [
    {
      quote:
        "Igniting passion for aerospace innovation by turning curiosity into hands-on engineering, from drones to flight systems 🚀",
      name: "Aerotech",
      designation: "Fly above and beyond! 🚀",
      src: "./Assets/Aerotech.jpeg",
    },
    {
      quote:
        "Empowering future mechanical engineers through innovation, collaboration, and hands-on projects. Join us to build, create, and inspire! ⚙️",
      name: "American Society of Mechanical Engineers",
      designation: "Setting the Standard ⚙️ ",
      src: "./Assets/ASME.jpeg",
    },
    {
      quote:
        "To amplify unseen stories and unheard voices through powerful visuals and immersive sound 🎬.",
      name: "Audio  Visual Club",
      designation: "Capturing Moments, Creating Memories 🎥✨",
      src: "./Assets/Audio-Visual.jpeg",
    },
    {
      quote:
        "The official Chess Club of VSSUT Burla, where sharp minds are forged and champions are built through mastery of strategy, patience, and precision ♟️. ",
      name: "Veer Titans",
      designation: "Where Strategy Meets Strength ♟️🔥",
      src: "./Assets/Chess.jpeg",
    },
    {
      quote:
        "To shape resilient players and a winning mindset through teamwork, skill, and relentless practice 💪🏏The VSSUT Cricket Club plays with heart ❤️, fights till the last ball 🔥, and carries the pride of the campus onto the field 🏆🎓"
,
      name: "VSSUT Cricket Club",
      designation: "Driven by Grit, United by Cricket 🏏⚡",
      src: "./Assets/Cricket.jpeg",
    },
    {
      quote:
        "To inspire innovators and risk-takers by turning ideas into impactful ventures 💵🚀 The VSSUT E-Cell empowers students to think big, start bold, and lead the change through entrepreneurship💰.",
      name: "Entrepreneurship Cell (VSSUT E-Cell)",
      designation: "Igniting Ideas, Building Futures 🚀💡",
      src: "./Assets/E-cell.jpeg",
    },
    {
      quote:
        "To explore human emotions and bold ideas through expressive performance and storytelling 🎭✨",
      name: "Emotica",
      designation: "Unleashing Voices, Owning the Stage 🎭🔥",
      src: "./Assets/Emotica.jpeg",
    },
    {
      quote:
        "To explore every layer of technology, from elegant interfaces to intelligent systems and secure architectures.💻🙎 ",
      name: "Enigma-The offical Coding club of VSSUT Burla",
      designation: "Decoding Ideas, Engineering the Future 💻✨",
      src: "./Assets/Enigma.jpeg",
    },
    {
      quote:
        "Building fearless players and unbreakable teamwork through discipline, passion, and relentless drive 💪⚽🔥 ",
      name: "VSSUT FC",
      designation: "One Goal. One Team. One Legacy ⚽🔥",
      src: "./Assets/Football.jpeg",
    },
    {
      quote:
        "Driving innovation that applies engineering and technology to solve real-world problems and improve lives for the better 🌍⚡"
,
      name: "Institute of Electrical and Electronics Engineers - Student Branch VSSUT",
      designation: "Advancing Technologies for Humanity 🌐⚡",
      src: "./Assets/IEEE.jpeg",
    },
    {
      quote:
        "IIC empowers young visionaries to explore beyond limits, backed by ISRO (Indian Space Reasearch Organisation) support and driven by a passion for the stars 🌌✨",
      name: "Idea and Innovation Club",
      designation: "From Campus Ideas to Cosmic Frontiers 🚀✨",
      src: "./Assets/IIC.jpeg",
    },
    {
      quote:
        "Promotes quality in technical education and provides guidance for career development. 📚🎓",
      name: "Indian Society for Technical Education",
      designation: "Shaping Minds, Building Futures 📚✨",
      src: "./Assets/ISTE.jpeg",
    },
    {
      quote:
        "The VSSUT Kabaddi Club plays with heart, defends with pride, and fights for every point on the mat 💪🏆",
      name: "VSSUT Kabaddi Club",
      designation: "Strength in Every Breath, Courage in Every Raid 🤼🔥",
      src: "./Assets/Kabbadi.jpeg",
    },
    {
      quote:
        "To ignite a love for literature and creative expression through storytelling, poetry, and critical thinking 📖✨",
      name: "Litreary Society",
      designation: "Where Words Spark Worlds ✍️📚",
      src: "./Assets/Litsoc.jpeg",
    },
    {
      quote:
        "To serve communities with dedication, compassion, and a spirit of volunteerism 🤝🌱"
,
      name: "National Service Scheme (NSS) VSSUT Unit",
      designation: "Serving with Purpose, Leading with Compassion 🤝🌱",
      src: "./Assets/NSS.jpeg",
    },
    {
      quote:
        "Where curiosity meets competition, and knowledge turns into confidence.. ⭐️🏆",
      name: "Quizzine - The Quiz Club of VSSUT Burla",
      designation: "Fueling Curiosity, Sparking Brilliance 🧠✨",
      src: "./Assets/Quizine.jpeg",
    },
    {
      quote:
        "Sanskar Kendra is a self-motivated and independent group driven by the desire to serve society and educate, underprivileged children, nurturing values, knowledge, and hope for a better future 🌱✨",
      name: "Sanskar Kendra",
      designation: "Bidya Dadati Binayam📘",
      src: "./Assets/Sanskar-kendra.jpeg",
    },
    {
      quote:
        "Where speed meets precision and passion turns every rally into a fight for excellence. 🏸 ",
      name: "Shuttlers — The Badminton Club of VSSUT Burla 🏸🔥",
      designation: "Smash the Limits 🏸⚡",
      src: "./Assets/Shuttlers.jpeg",
    },
    {
      quote:
        "Where melodies meet emotions, and every note speaks from the heart. ",
      name: "Souls — The Music Club of VSSUT Burla 🎶✨",
      designation: "Where Music Breathes Emotion 🎵🔥",
      src: "./Assets/Souls.jpeg",
    },
    {
      quote:
        "To foster physical fitness, teamwork, and sportsmanship among students through diverse athletic activities and competitions 🏅⚽🏀"
,
      name: "Sports Club of VSSUT Burla",
      designation: "Empowering Athletes, Inspiring Excellence 🏅🔥",
      src: "./Assets/Sports.jpeg",
    },
    {
      quote:
        "The club works towards social awareness, welfare, and positive change by supporting those in need and encouraging students to give back to society 🌱🌍 ",
      name: "SSS - Social Service Society of VSSUT Burla",
      designation: "Serving Society, Strengthening Humanity 🌍🤝",
      src: "./Assets/SSS.jpeg",
    },
    {
      quote:
        "Where speed meets strategy, and every race is a pursuit of perfection. 🏎️💨",
      name: "VeerRacers - The Motorsport Club of VSSUT Burla",
      designation: "Racing Towards Innovation 🏎️🔥",
      src: "./Assets/VeerRacers.jpeg",
    },
    {
      quote:
        "To ignite the spirit of dance and self-expression through rhythm, movement, and cultural celebration 💃🌟",
      name: "Vibranz - The offcial Dance Club of VSSUT Burla",
      designation: "Dancing to the Rhythm of Passion 💃🔥",
      src: "./Assets/Vibranz.jpeg",
    },
    {
      quote:
        "Building agile players and unstoppable teamwork through strategy, skill, and relentless practice 🏐💪",
      name: "Volleyball Club of VSSUT Burla",
      designation: "Spiking Excellence, Building Team Spirit 🏐🔥",
      src: "./Assets/Volleyball.jpeg",
    },
    {
      quote:
        "Driving electric innovation and sustainable mobility through cutting-edge technology and teamwork ⚡🏎️",
      name: "VeerRacers Electric",
      designation: "Electrifying Innovation on Wheels ⚡🏎️",
      src: "./Assets/VRE.jpeg",
    },
    {
      quote:
        "To promote physical and mental well-being through the practice of yoga, fostering a healthy lifestyle among students and staff 🧘‍♂️🌿",
      name: "Yoga Club of VSSUT Burla",
      designation: "Balance. Breathe. Build Within 🧘‍♂️🌿",
      src: "./Assets/Yoga.jpeg",
    },
  ];
  return <AnimatedCards testimonials={testimonials} />;
}

export { Clubs };
