# 🎓 VeerAyojan - Campus Event Management Platform

<div align="center">

![VeerAyojan Banner](https://img.shields.io/badge/VeerAyojan-Campus%20Events-blue?style=for-the-badge)
[![Made for VSSUT Students](https://img.shields.io/badge/Made%20for-VSSUT-orange?style=for-the-badge)](https://www.vssut.ac.in/)

**Unifying Campus Life, All Events at One Place**

A modern, feature-rich platform designed specifically for Veer Surendra Sai University of Technology (VSSUT) students to discover, organize, and participate in club activities and events.

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

VeerAyojan is a comprehensive event management ecosystem that transforms how students and clubs interact on campus. Say goodbye to scattered announcements and missed opportunities—everything you need is now in one beautiful, intuitive platform.

### 🎯 Problem We Solve

- **For Students**: Never miss club events, workshops, or competitions across campus
- **For Organizers**: Streamlined event creation, management, and student engagement
- **For Clubs**: Centralized hub for visibility and member communication

---

## ✨ Key Features

### 🗓️ **Event Discovery & Management**
- Browse upcoming events from all campus clubs in one feed
- Advanced filtering by category, date, club, and interests
- Real-time event updates and notifications
- RSVP and attendance tracking

### 📢 **Dynamic News Feed**
- Club organizers can post announcements, updates, and achievements
- Rich media support (images, videos, documents)
- Engagement through likes, comments, and shares
- Trending events and popular activities spotlight

### 💬 **Interactive Communication**
- Direct messaging between students and organizers
- Club-specific discussion forums
- Real-time chat for event participants
- Q&A sections for events

### 🎥 **Video Conferencing Integration**
- Built-in video conferencing for virtual events
- Seamless integration for hybrid (online + offline) events
- Screen sharing and collaborative features
- Support for workshops, seminars, and club meetings

### 👥 **User Management**
- Role-based access (Student, Organizer, Admin)
- Customizable user profiles with interests and clubs
- Follow favorite clubs for personalized updates
- Achievement badges and participation tracking

### 🎨 **Modern, User-Friendly Interface**
- Clean, intuitive design that feels native
- Fully responsive across desktop, tablet, and mobile
- Dark mode support for comfortable browsing
- Fast loading times and smooth animations

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI architecture
- **Tailwind CSS** - Modern, utility-first styling
- **Redux/Context API** - State management
- **React Router** - Seamless navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data models
- **Socket.io** - Real-time bidirectional communication

### Additional Technologies
- **JWT** - Secure authentication
- **WebRTC** - Video conferencing capabilities
- **Cloudinary/AWS S3** - Media storage and CDN
- **Nodemailer** - Email notifications

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sush2007/VeerAyojan-Website.git
   cd VeerAyojan-Website
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` files in both backend and frontend directories:
   
   **Backend `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email
   EMAIL_PASS=your_password
   ```

   **Frontend `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. **Run the application**
   ```bash
   # Run backend (from backend directory)
   npm run dev

   # Run frontend (from frontend directory)
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

---

## 📸 Screenshots

<div align="center">

### Home Page
*Modern landing page with upcoming events and featured clubs*

### Event Dashboard
*Comprehensive view of all campus events with smart filters*

### Video Conference
*Integrated video calling for virtual and hybrid events*

### Club Management
*Intuitive interface for organizers to manage their club activities*

</div>

---

## 🗺️ Roadmap

- [x] Core event management system
- [x] Video conferencing integration
- [x] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Analytics dashboard for organizers
- [ ] Payment gateway for paid events
- [ ] QR code-based attendance
- [ ] AI-powered event recommendations

---

## 🤝 Contributing

We welcome contributions from the VSSUT community and beyond! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

- GitHub: [@Sush2007](https://github.com/Sush2007)
- Project Link: [VeerAyojan-Website](https://github.com/Sush2007/VeerAyojan-Website)

---

## 🙏 Acknowledgments

- VSSUT community for inspiration and feedback
- All club coordinators who provided valuable insights
- Open source community for amazing tools and libraries

---

## 📞 Contact & Support

Have questions or suggestions? We'd love to hear from you!

- **Issues**: [GitHub Issues](https://github.com/Sush2007/VeerAyojan-Website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Sush2007/VeerAyojan-Website/discussions)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ for VSSUT by Team Codevengerz

**[Back to Top](#-veerayojan---campus-event-management-platform)**

</div>
