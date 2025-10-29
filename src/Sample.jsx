import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Linkedin, Github, User, Briefcase, Download, ArrowRight, Menu, X, Code, Database, Server, Monitor, Zap } from 'lucide-react';

// Placeholder for your Resume PDF. IMPORTANT: Update this URL to your actual resume file!
const RESUME_PDF_URL = 'https://example.com/your-resume.pdf'; 

// --- Animated Typing Component for Hero Text ---
const Typewriter = React.memo(({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    let timeoutDelay = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prev => prev + text[i]);
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 70); // Typing speed
      return () => clearInterval(typingInterval);
    }, delay);
    return () => clearTimeout(timeoutDelay);
  }, [text, delay]);

  return (
    <span className="font-mono relative">
      {displayText}
      <span className={`inline-block w-2 h-full bg-teal-400 absolute top-0 -right-1 transition-opacity duration-500 ${isTyping ? 'opacity-100 animate-blink' : 'opacity-0'}`}></span>
      <style jsx="true">{`
          @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
          }
          .animate-blink {
              animation: blink 1s step-end infinite;
          }
      `}</style>
    </span>
  );
});

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Smooth Scroll Function ---
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false); 
  };

  // --- Track Scroll Position for Active Link ---
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } 
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // --- Handle Resume Download ---
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF_URL;
    link.setAttribute('download', 'YourName_MERN_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Header/Navbar ---
  const Header = () => (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo/Name */}
        <h1 className="text-xl md:text-2xl font-extrabold text-white">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="text-teal-400">&lt;</span>Developer<span className="text-teal-400">/&gt;</span>
          </a>
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
              className={`capitalize text-sm font-medium transition duration-300 ${
                activeSection === section 
                  ? 'text-teal-400 border-b-2 border-teal-400 pb-1' 
                  : 'text-gray-400 hover:text-teal-300'
              }`}
            >
              {section}
            </a>
          ))}
          <button
            onClick={handleDownloadResume}
            className="flex items-center space-x-2 bg-teal-600 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm shadow-xl hover:bg-teal-500 transition duration-300 ml-4"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-800 shadow-xl py-4 transition-all duration-300 ease-in-out">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
              className={`block capitalize px-6 py-3 text-lg transition duration-300 ${
                activeSection === section 
                  ? 'text-teal-400 bg-gray-700/50' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {section}
            </a>
          ))}
          <div className="px-6 pt-4">
            <button
              onClick={handleDownloadResume}
              className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-gray-900 px-4 py-3 rounded-lg font-semibold text-base shadow-xl hover:bg-teal-500 transition duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume (PDF)</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );

  // --- Section Wrapper Component ---
  const Section = ({ id, children, className = '' }) => (
    <section id={id} className={`py-24 md:py-32 min-h-screen flex items-center ${className}`}>
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        {children}
      </div>
    </section>
  );

  // --- Interactive 3D Grid Background ---
  const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="grid-overlay"></div>
        <style jsx="true">{`
            .grid-overlay {
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(to right, rgba(29, 39, 48, 0.7) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(29, 39, 48, 0.7) 1px, transparent 1px);
                background-size: 50px 50px;
                transform: perspective(600px) rotateX(70deg);
                transform-origin: bottom;
                animation: grid-move 60s linear infinite;
                position: absolute;
                bottom: 0;
                left: 0;
                filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.5)); /* Subtle blue glow */
            }

            @keyframes grid-move {
                from { background-position-y: 0; }
                to { background-position-y: 50px; }
            }

            /* Fading effect at the top */
            .grid-overlay::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 50%;
                background: linear-gradient(to bottom, #0D1117, transparent);
                pointer-events: none;
            }
        `}</style>
    </div>
  );

  // --- Hero Section ---
  const Hero = () => (
    <Section id="home" className="bg-gray-900 relative pt-32 overflow-hidden">
        <GridBackground />
      <div className="relative z-10 grid grid-cols-1 gap-12 items-center">
        {/* Text Content (Left Side) */}
        <div className="max-w-3xl">
          <h2 className="text-xl font-medium text-teal-400 mb-2">
            <Typewriter text="Hello, I'm" delay={0} />
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            <Typewriter text="John Doe." delay={500} />
          </h1>
          <p className="text-3xl md:text-4xl font-semibold text-gray-300 mb-6">
            <span className="text-teal-400">
                <Typewriter text="Full Stack MERN Developer" delay={1800} />
            </span>
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-lg transition-opacity duration-1000 opacity-0 animate-fadeInUp delay-3000">
            I build scalable, modern, and high-performance web applications using MongoDB, Express, React, and Node.js. Focused on clean code and robust architecture.
          </p>
          <div className="flex space-x-4 transition-opacity duration-1000 opacity-0 animate-fadeInUp delay-3500">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="inline-flex items-center space-x-2 bg-teal-600 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-teal-500 transition duration-300 transform hover:scale-105"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5"/>
            </a>
            <button
                onClick={handleDownloadResume}
                className="inline-flex items-center space-x-2 border-2 border-teal-600 text-teal-400 px-6 py-3 rounded-lg font-bold hover:bg-teal-600/20 transition duration-300 transform hover:scale-105"
            >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
       {/* Ensure the text fade-in uses CSS keyframes for smooth reveal after typing */}
      <style jsx="true">{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-3000 { animation-delay: 3s; }
        .delay-3500 { animation-delay: 3.5s; }
      `}</style>
    </Section>
  );

  // --- About Section ---
  const About = () => (
    <Section id="about" className="bg-gray-800">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-white mb-2">
          <User className="inline-block w-8 h-8 mr-3 text-teal-400" /> About Me
        </h3>
        <p className="text-lg text-gray-400">Get to know my professional journey and passion.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            I am a dedicated **Full Stack MERN Developer** with **3+ years of experience** specializing in building modern, responsive, and highly efficient web applications. My expertise lies in architecting robust **Node.js/Express.js APIs** and creating dynamic, state-of-the-art user interfaces with **React**.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            I excel in translating complex business requirements into high-quality code. I'm proficient in state management using **Redux Toolkit/Context API**, database modeling with **MongoDB**, and deployment strategies. I am committed to continuous learning and applying **best practices** in software development.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="inline-flex items-center space-x-2 text-teal-400 font-bold hover:text-teal-300 transition duration-300"
            >
              <span>Ready for a chat?</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Skills List */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-teal-400"/> My Tech Stack
            </h4>
            <ul className="space-y-3 text-gray-300">
                {['React.js (Hooks, Router)', 'Node.js & Express.js', 'MongoDB & Mongoose', 'Redux Toolkit & Context', 'JavaScript (ES6+)', 'RESTful API Design', 'Tailwind CSS / SCSS', 'Git & GitHub/GitLab'].map((skill, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <span className="text-teal-400">&bull;</span>
                        <span>{skill}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </Section>
  );

  // --- Project Card Component ---
  const ProjectCard = ({ title, description, techStack, githubLink, demoLink }) => (
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transition duration-500 hover:shadow-teal-500/20 transform hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-2xl font-bold text-white mb-3">{title}</h4>
        <p className="text-gray-400 text-md mb-4 flex-grow">{description}</p>
        
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {techStack.map(tech => (
            <span key={tech} className="bg-teal-600/20 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-600">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-600 transition duration-300">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center space-x-2 bg-teal-600 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-teal-500 transition duration-300">
              <Briefcase className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // --- Projects Data ---
  const projectsData = [
    {
      title: "Enterprise CRM Dashboard",
      description: "A comprehensive CRM solution built for managing sales pipelines, customer interactions, and generating performance reports. Features JWT authentication and role-based access.",
      techStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Chart.js"],
      githubLink: "https://github.com/yourusername/crm-dashboard",
      demoLink: "https://demo.crm.com"
    },
    {
      title: "Real-time Chat Application",
      description: "A multi-user chat platform with instant messaging, presence status, and group chat capabilities. Utilizes WebSockets for real-time bidirectional communication.",
      techStack: ["React", "Socket.IO", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/realtime-chat",
      demoLink: "https://chat-app.com"
    },
    {
      title: "MERN E-Commerce Store",
      description: "A scalable e-commerce site featuring a product catalog, secure payment integration (Stripe/PayPal), order management, and administrative panel.",
      techStack: ["React Router", "Redux", "Node.js", "Express", "Mongoose", "Stripe API"],
      githubLink: "https://github.com/yourusername/ecomm-store",
      demoLink: "https://store.demo-site.com"
    },
  ];

  // --- Projects Section ---
  const Projects = () => (
    <Section id="projects" className="bg-gray-900">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-white mb-2">
          <Briefcase className="inline-block w-8 h-8 mr-3 text-teal-400" /> My Work
        </h3>
        <p className="text-lg text-gray-400">Highlights of my Full Stack Development capabilities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => <ProjectCard key={index} {...project} />)}
      </div>
    </Section>
  );

  // --- Contact Section ---
  const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setStatus('Sending...');
      
      // --- START: Placeholder for API/Form Submission ---
      console.log('Form Data:', formData);
      setTimeout(() => { 
          setStatus('Message Sent! I will get back to you soon.');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus(''), 5000); 
      }, 1500);
      // --- END: Placeholder for API/Form Submission ---
    };

    return (
      <Section id="contact" className="bg-gray-800">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-2">
            <Mail className="inline-block w-8 h-8 mr-3 text-teal-400" /> Contact Me
          </h3>
          <p className="text-lg text-gray-400">I am currently open to new opportunities. Let's build something great.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Social Links / Info */}
          <div className="flex flex-col space-y-6 text-gray-300">
            <h4 className="text-xl font-semibold text-white">Contact Information</h4>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-teal-400" />
              <a href="mailto:your.email@example.com" className="hover:text-teal-400 transition">your.email@example.com</a>
            </div>
            <div className="flex items-center space-x-4">
              <Linkedin className="w-6 h-6 text-teal-400" />
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">/in/yourprofile</a>
            </div>
            <div className="flex items-center space-x-4">
              <Github className="w-6 h-6 text-teal-400" />
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">/yourusername</a>
            </div>
            [Image of abstract technology background]
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange}
                       className="w-full px-4 py-3 bg-gray-700 text-white border-none rounded-lg focus:ring-teal-500 focus:border-teal-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange}
                       className="w-full px-4 py-3 bg-gray-700 text-white border-none rounded-lg focus:ring-teal-500 focus:border-teal-500"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-700 text-white border-none rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none"></textarea>
              </div>
              <div className="pt-2">
                 <button type="submit"
                        className="w-full inline-flex items-center justify-center bg-teal-600 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-teal-500 transition duration-300 disabled:opacity-50"
                        disabled={status === 'Sending...'}
                >
                   <Mail className="w-5 h-5 mr-2"/>
                   {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                </button>
                {status && <p className={`mt-3 text-center text-sm ${status.includes('Sent') ? 'text-green-400' : 'text-red-400'}`}>{status}</p>}
              </div>
            </form>
          </div>
        </div>
      </Section>
    );
  }

  // --- Footer ---
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 py-6">
      <div className="container mx-auto px-4 sm:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        <p className="mt-1">Designed and Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );

  // --- Render the App ---
  return (
    <div className="font-sans min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
