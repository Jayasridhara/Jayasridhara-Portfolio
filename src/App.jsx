import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Linkedin, Github, User, Briefcase, Download, ArrowRight, Menu, X, Code, Database, Server, Monitor, Zap } from 'lucide-react';
import heroimg from "../src/assets/heroimage.png";
import project1 from "../src/assets/Project1.png";
import Projects from './Projects';
// Placeholder for your Resume PDF. IMPORTANT: Update this URL to your actual resume file!
const RESUME_PDF_URL = 'https://drive.google.com/file/d/1-IHQUHvdN7HFOe0st39L16Hj1xoz-nmp/view'; 

// --- Animated Typing Component for Hero Text ---
const Typewriter = React.memo(({ text = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) {
      // if text is empty or undefined, skip typing
      setDisplayText('');
      setIsTyping(false);
      return;
    }

    setDisplayText('');
    setIsTyping(true);

    const timeoutDelay = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text[i]);
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 70);

      // cleanup for typingInterval
      return () => clearInterval(typingInterval);
    }, delay);

    // cleanup for timeoutDelay
    return () => clearTimeout(timeoutDelay);

  }, [text, delay]);

  return (
    <span className="font-mono relative">
      {displayText}
      <span
        className={`inline-block w-2 h-full bg-teal-400 absolute top-0 -right-1 transition-opacity duration-500 ${
          isTyping ? 'opacity-100 animate-blink' : 'opacity-0'
        }`}
      ></span>
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
    
  const handleOpenResume = () => {
  const newTab = window.open(RESUME_PDF_URL, "_blank", "noopener,noreferrer");
  // Optionally, if you also want to trigger a download in that tab:
  // newTab.location.href = RESUME_PDF_URL;
};
  // --- Component to handle Fade-In Animation on Scroll ---
  const FadeInOnScroll = ({ children, animation = 'fadeInUp', delay = 0, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Trigger once when the element enters the viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Element is considered visible when 10% is in view
        });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const style = {
        animationDelay: `${delay}ms`,
        animationName: isVisible ? animation : 'none',
        animationDuration: '0.8s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'both',
    };

    return (
        <div 
            ref={domRef} 
            style={style} 
            className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}`}
        >
            {children}
        </div>
    );
  };


  // --- Header/Navbar ---
  const Header = () => (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo/Name */}
        <h1 className="text-xl md:text-2xl font-extrabold text-white">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="text-teal-400">&lt;</span>MERN Developer<span className="text-teal-400">/&gt;</span>
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
            onClick={handleOpenResume}
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
              onClick={handleOpenResume}
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
// --- Hero Section (Modern Developer Style) ---
const Hero = () => (
  <Section
    id="home"
    className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden pt-20 pb-12 sm:pt-32 sm:pb-24"
  >
    {/* Animated Background Grid */}
    <GridBackground />

    <div className="relative z-10 container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
      {/* LEFT SIDE - Text Content */}
      <div className="max-w-2xl">
        <h2 className="text-xl font-medium text-teal-400 mb-3 tracking-wide">
          👋 Hello, I'm
        </h2>
        <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-3">
          Jayasridhara.B
        </h1>
        <h3 className="text-2xl md:text-3xl font-semibold text-teal-400 mb-6">
          Full Stack MERN Developer
        </h3>

        <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
          I design and build high-performance, scalable web applications with
          clean UI, strong architecture, and seamless user experiences using
          MongoDB, Express, React, and Node.js.
        </p>

        <div className="flex space-x-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            className="inline-flex items-center space-x-2 bg-teal-600 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-teal-500 transition duration-300 transform hover:scale-105"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-5" />
          </a>

          <button
            onClick={handleOpenResume}
            className="inline-flex items-center space-x-2 border-2 border-teal-600 text-teal-400 px-6 py-3 rounded-lg font-bold hover:bg-teal-600/20 transition duration-300 transform hover:scale-105"
          >
            <Download className="w-4 h-5" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Floating Tech Icons */}
        <div className="flex space-x-6 mt-10">
          {["react", "nodejs", "mongodb", "express"].map((tech) => (
            <img
              key={tech}
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
              alt={tech}
              className="w-10 h-10 hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Animated Developer Image */}
   <div className="relative flex justify-center items-center overflow-hidden">
  <div className="hidden md:block absolute w-96 md:w-md h-full bg-teal-500/20 blur-4xl rounded-full animate-pulse" />
  <img
    src={heroimg}
    alt="Developer illustration"
    className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl h-auto drop-shadow-2xl animate-float object-contain"
  />
</div>

    </div>

    {/* Floating Animation Keyframes */}
    <style>{`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
    `}</style>
  </Section>
);

  // --- About Section ---
  const About = () => (
    <Section id="about" className="bg-gray-800">
      <FadeInOnScroll animation="fadeInUp" className="text-center mb-16">
        <h3 className="text-4xl font-bold text-white mb-2">
          <User className="inline-block w-8 h-8 mr-3 text-teal-400" /> About Me
        </h3>
        <p className="text-lg text-gray-400">Get to know my professional journey and passion.</p>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <FadeInOnScroll animation="fadeInLeft" delay={200} className="lg:col-span-2">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            I am a dedicated Full Stack MERN Developer with 2+ years of experience specializing in building modern, responsive, and highly efficient web applications. My expertise lies in architecting robust Node.js/Express.js APIs and creating dynamic, state-of-the-art user interfaces with React.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            I excel in translating complex business requirements into high-quality code. I'm proficient in state management using Redux Toolkit/Context API, database modeling with MongoDB, and deployment strategies. I am committed to continuous learning and applying best practices in software development.
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
        </FadeInOnScroll>

        {/* Skills List */}
        <FadeInOnScroll animation="fadeInRight" delay={400} className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700">
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
        </FadeInOnScroll>
      </div>
    </Section>
  );


  // --- Projects Data ---
  const projectsData = [
  {
    title: "MERN E-Commerce Store",
    description: "A scalable e-commerce site featuring a product catalog, secure payment integration (Stripe), Order management and Seller Dashboard to manage daily reports.",
    techStack: ["React Router", "Redux", "Node.js", "Express", "Mongoose", "Stripe API"],
    githubLink: "https://github.com/Jayasridhara/ecommerce-frontend",
    demoLink: "https://shopversein.netlify.app/",
    image: project1
  },
];


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
        <FadeInOnScroll animation="fadeInUp" className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-2">
            <Mail className="inline-block w-8 h-8 mr-3 text-teal-400" /> Contact Me
          </h3>
          <p className="text-lg text-gray-400">I am currently open to new opportunities. Let's build something great.</p>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Social Links / Info */}
          <FadeInOnScroll animation="fadeInLeft" delay={200} className="flex flex-col space-y-6 text-gray-300">
            <h4 className="text-xl font-semibold text-white">Contact Information</h4>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-teal-400" />
              <a href="mailto:jayasridharasubramaniyan@gmail.com" className="hover:text-teal-400 transition">jayasridharasubramaniyan@gmail.com</a>
            </div>
            <div className="flex items-center space-x-4">
              <Linkedin className="w-6 h-6 text-teal-400" />
              <a href="https://www.linkedin.com/in/jayasridhara-b-4931a8220/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">https://www.linkedin.com/in/jayasridhara-b-4931a8220/</a>
            </div>
            <div className="flex items-center space-x-4">
              <Github className="w-6 h-6 text-teal-400" />
              <a href="https://github.com/Jayasridhara" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">https://github.com/Jayasridhara</a>
            </div>
           
            
          </FadeInOnScroll>

          {/* Contact Form */}
          <FadeInOnScroll animation="fadeInRight" delay={400} className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
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
          </FadeInOnScroll>
        </div>
      </Section>
    );
  }

  // --- Footer ---
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 py-6">
      <div className="container mx-auto px-4 sm:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} jayasridhara.com. All rights reserved.</p>
        <p className="mt-1">@copyrights my portfolio.</p>
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
        <Projects projectsData={projectsData} />
        <Contact />
      </main>
      <Footer />
      
      {/* Global CSS for Animations */}

      <style jsx="true">{`
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        .animate-blink {
            animation: blink 1s step-end infinite;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .delay-3000 { animation-delay: 3s; }
        .delay-3500 { animation-delay: 3.5s; }
      `}</style>
    </div>
  );
}

export default App;
