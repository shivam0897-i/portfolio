import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Terminal, 
  Database, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  ScanLine,
  BrainCircuit,
  Award,
  GraduationCap,
  Network
} from 'lucide-react';

/* --- DESIGN SYSTEM: COMPUTATIONAL BRUTALISM ---
  Colors:
  - Void: #0a0a0a (Background)
  - Paper: #e5e5e5 (Primary Text)
  - Signal: #ff4d00 (Accent - International Orange)
  - Graphite: #262626 (Secondary/Borders)
  
  Typography:
  - Headings: Serif (Editorial, Human)
  - UI/Specs: Mono (Technical, Machine)
*/

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate initial boot sequence
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return <BootSequence />;

  return (
    <div className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen selection:bg-[#ff4d00] selection:text-white overflow-x-hidden font-sans">
      <CustomCursor />
      
      {/* Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff4d00] origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <IdentitySection />
        <EducationSection />
        <WorkSection />
        <TechStackSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
      
      {/* Background Noise/Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay" 
           style={{ backgroundImage: `url("/noise.svg")` }}>
      </div>
    </div>
  );
};

/* --- COMPONENTS --- */

const BootSequence = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 font-mono text-xs md:text-sm text-[#ff4d00]">
      <div className="w-64 space-y-2">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "100%" }} 
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-1 bg-[#ff4d00] mb-4"
        />
        <Typewriter text="INITIALIZING NEURAL INTERFACE..." speed={30} />
        <Typewriter text="LOADING DATA: RESUME_SHIVAM.PDF..." speed={20} delay={400} />
        <Typewriter text="ESTABLISHING UPLINK..." speed={20} delay={800} />
      </div>
    </div>
  );
};

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const Typewriter = ({ text, speed = 50, delay = 0 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return <div>{displayedText}<span className="animate-pulse">_</span></div>;
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 border border-[#ff4d00] rounded-full pointer-events-none z-[100] -ml-2 -mt-2 hidden md:block mix-blend-difference"
    />
  );
};

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" style={{ filter: 'invert(1)' }} />
        
        <span className="font-mono text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse"/>
          System: Online
        </span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="font-mono text-xs tracking-widest hidden md:block"
      >
        MEERUT, INDIA [28.98° N, 77.70° E]
      </motion.div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative border-b border-[#262626]">
      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 font-mono text-xs md:text-sm text-[#444] hidden lg:block text-right"
        >
          <p>SHIVAM AGARWAL</p>
          <p>+91-6398105401</p>
          <p>STATUS: AVAILABLE</p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter mb-8"
        >
          Engineered <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5e5e5] to-[#777]">Intelligence</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-[#262626] pt-8"
        >
          <div className="max-w-xl">
            <p className="font-mono text-sm md:text-base text-[#888] mb-4">
              // ARCHITECTING THE FUTURE
            </p>
            <p className="text-lg md:text-2xl font-light leading-relaxed">
              AI & ML-focused Computer Science Undergraduate. Specializing in LLM-powered applications, Computer Vision systems, and multimodal platforms. 
              Delivering <span className="text-[#ff4d00]">production-ready AI solutions</span>.
            </p>
          </div>
          
          <div className="flex gap-4">
            <SocialLink href="https://github.com/shivamagarwal2211" icon={<Github />} label="GITHUB" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LINKEDIN" />
            <SocialLink href="mailto:shivamagarwal2211@gmail.com" icon={<Mail />} label="EMAIL" />
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute bottom-10 right-10 hidden md:grid grid-cols-4 gap-1 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-[#ff4d00]" />
        ))}
      </div>
    </section>
  );
};

const IdentitySection = () => {
  return (
    <section className="py-32 px-6 md:px-12 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 font-mono text-sm text-[#888] sticky top-32 h-fit">
          <p className="mb-2">[01] PROFILE_SUMMARY</p>
          <p className="text-[#ff4d00]">AI_RESEARCH_ENGINEER</p>
        </div>
        
        <div className="md:col-span-8 space-y-12">
          <RevealText>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              Bridging theoretical algorithms with scalable cloud infrastructure.
            </h2>
          </RevealText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
            <RevealText delay={0.2}>
              <p className="text-[#aaa] leading-relaxed">
                I am an AI & ML-focused Computer Science undergraduate with hands-on experience in developing LLM-powered applications and computer vision systems.
                My expertise lies in engineering advanced embedding pipelines, optimizing edge AI inference, and deploying scalable solutions on GCP and Firebase.
              </p>
            </RevealText>
            <RevealText delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-[#e5e5e5] border-b border-[#333] pb-2 inline-block">CORE COMPETENCIES</h3>
                <ul className="space-y-3 text-[#ccc]">
                  <li className="flex items-center gap-3">
                    <ScanLine size={16} className="text-[#ff4d00]" />
                    <span>LLM Application Development</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BrainCircuit size={16} className="text-[#ff4d00]" />
                    <span>Computer Vision & Deep Learning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Database size={16} className="text-[#ff4d00]" />
                    <span>MLOps & Cloud Deployment (GCP)</span>
                  </li>
                   <li className="flex items-center gap-3">
                    <Network size={16} className="text-[#ff4d00]" />
                    <span>Real-time Inference Optimization</span>
                  </li>
                </ul>
              </div>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 border-b border-[#262626] bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 font-mono text-sm text-[#888]">
          <p className="mb-2 text-[#ff4d00]">[02] ACADEMIC_RECORD</p>
        </div>
        
        <div className="md:col-span-8">
           <RevealText>
            <div className="border-l-2 border-[#ff4d00] pl-6 py-2">
              <h3 className="font-serif text-3xl md:text-4xl text-[#e5e5e5] mb-2">
                Bachelor of Technology in Computer Science
              </h3>
              <p className="font-mono text-[#ff4d00] mb-4">
                SPECIALIZATION IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm font-mono text-[#888]">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>Meerut Institute of Engineering and Technology</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-[#333] rounded-full" />
                <span>2023 — 2027</span>
                <div className="hidden md:block w-1 h-1 bg-[#333] rounded-full" />
                <span>Meerut, UP</span>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  const projects = [
    {
      id: "01",
      title: "ThinkPDF",
      subtitle: "AI-POWERED DOCUMENT INTELLIGENCE",
      desc: "Developed a scalable AI platform enabling semantic search and interactive querying across multi-document corpora. Leveraged Google Gemini and FAISS vector databases to engineer advanced embedding pipelines.",
      details: [
        "Achieved >92% precision with low-latency retrieval",
        "Implemented robust PDF parsing & chunking for long documents",
        "Supports multi-turn conversations & topic extraction"
      ],
      tags: ["Google Gemini", "FAISS", "React", "Semantic Search"],
      link: "#"
    },
    {
      id: "02",
      title: "MultiModal Suite",
      subtitle: "PRODUCTION-READY GEN-AI PLATFORM",
      desc: "Engineered a modular AI platform integrating foundation models like Gemini 2.5 Flash and Stable Diffusion XL. Features multi-language TTS and dynamic QR generation.",
      details: [
        "Sub-2 second API latency via asynchronous processing",
        "Integrated Hugging Face Inference & Google Translate API",
        "Utilized ColorThief for palette extraction & PIL for streaming"
      ],
      tags: ["Stable Diffusion XL", "Python", "AsyncIO", "ColorThief"],
      link: "#"
    },
    {
      id: "03",
      title: "Waste Classifier",
      subtitle: "RESNET50 COMPUTER VISION SYSTEM",
      desc: "Designed and fine-tuned a deep convolutional neural network based on ResNet50 architecture for multi-class waste sorting. Optimized for edge AI inference.",
      details: [
        "47.5% accuracy on TrashNet dataset",
        "Real-time on-device inference via Streamlit",
        "Implemented transfer learning & data augmentation"
      ],
      tags: ["TensorFlow", "ResNet50", "Streamlit", "Edge AI"],
      link: "#"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 border-b border-[#262626] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="font-serif text-5xl md:text-7xl">Selected Operations</h2>
          <span className="font-mono text-sm text-[#ff4d00] hidden md:block">[03] PROJECTS_DATABASE</span>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string[];
  tags: string[];
  link: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[#262626] pt-12"
    >
      <div className="md:col-span-2 font-mono text-6xl text-[#262626] group-hover:text-[#ff4d00] transition-colors duration-500">
        {project.id}
      </div>
      
      <div className="md:col-span-7 space-y-6">
        <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight group-hover:text-[#ff4d00] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="font-mono text-xs tracking-widest text-[#888] uppercase">{project.subtitle}</p>
        <p className="text-lg text-[#ccc] max-w-xl leading-relaxed">
          {project.desc}
        </p>
        <ul className="list-disc list-inside font-mono text-xs text-[#888] space-y-2 py-2">
          {project.details.map((detail, i) => (
             <li key={i}>{detail}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 border border-[#333] rounded-full text-xs font-mono text-[#888] hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-3 flex flex-col justify-between items-end text-right">
        <div className="mb-8">
           <span className="block font-mono text-xs text-[#666] mb-1">STATUS</span>
           <span className="text-xl font-bold text-[#e5e5e5]">DEPLOYED</span>
        </div>
        
        <a 
          href={project.link} 
          className="w-16 h-16 rounded-full border border-[#333] flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] group-hover:text-black transition-all duration-300"
        >
          <ArrowUpRight size={24} />
        </a>
      </div>
    </motion.div>
  );
};

const TechStackSection = () => {
  const categories = [
    { 
      title: "Languages", 
      items: ["Python", "JavaScript", "TypeScript", "SQL", "Git"] 
    },
    { 
      title: "Machine Learning", 
      items: ["TensorFlow", "Keras", "Scikit-learn", "ResNet50", "Hugging Face"] 
    },
    { 
      title: "Data Science", 
      items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "OpenCV", "Pillow", "Plotly", "FAISS", "PyPDF2"] 
    },
    { 
      title: "Gen AI & LLMs", 
      items: ["Google Gemini", "LangChain", "Stable Diffusion XL", "Prompt Engineering", "Fine-tuning"] 
    },
    { 
      title: "Cloud & Ops", 
      items: ["Google Cloud (GCP)", "Firebase", "Vercel", "Supabase", "Asynchronous Processing"] 
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-sm text-[#ff4d00] mb-16">[04] TECHNICAL_ARSENAL</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-2xl border-b border-[#262626] pb-4">{cat.title}</h3>
              <ul className="space-y-3 font-mono text-sm text-[#888]">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 hover:text-[#e5e5e5] transition-colors cursor-crosshair">
                    <span className="w-1 h-1 bg-[#333]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificationsSection = () => {
    return (
      <section className="py-20 px-6 md:px-12 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto">
             <h2 className="font-mono text-sm text-[#ff4d00] mb-12">[05] CERTIFICATIONS_&_AWARDS</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RevealText>
                    <div className="border border-[#262626] p-8 hover:border-[#ff4d00] transition-colors duration-300 bg-[#080808]">
                        <div className="flex justify-between items-start mb-4">
                            <Award className="text-[#ff4d00]" size={32} />
                            <span className="font-mono text-xs text-[#666]">MAY 2025</span>
                        </div>
                        <h3 className="font-serif text-2xl mb-2">Artificial Intelligence Fundamentals</h3>
                        <p className="font-mono text-sm text-[#888]">IBM Skills Build</p>
                    </div>
                </RevealText>

                 <RevealText delay={0.2}>
                    <div className="border border-[#262626] p-8 hover:border-[#ff4d00] transition-colors duration-300 bg-[#080808]">
                        <div className="flex justify-between items-start mb-4">
                            <Award className="text-[#ff4d00]" size={32} />
                            <span className="font-mono text-xs text-[#666]">OCT 2024</span>
                        </div>
                        <h3 className="font-serif text-2xl mb-2">Google Cloud Generative AI</h3>
                        <p className="font-mono text-sm text-[#888]">Virtual Internship • SmartBridge & SmartInternz</p>
                    </div>
                </RevealText>
             </div>
        </div>
      </section>
    );
};

const ContactSection = () => {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <h2 className="font-serif text-6xl md:text-9xl tracking-tighter hover:text-[#ff4d00] transition-colors duration-500 cursor-none selection:bg-white selection:text-black">
            <a href="mailto:shivamagarwal2211@gmail.com">Initialize<br/>Contact</a>
          </h2>
          <motion.div 
            className="absolute -right-8 top-0 text-[#ff4d00]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Terminal size={32} />
          </motion.div>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-sm">
          <a href="mailto:shivamagarwal2211@gmail.com" className="hover:text-[#ff4d00] transition-colors">
            shivamagarwal2211@gmail.com
          </a>
          <span className="text-[#333] hidden md:block">|</span>
          <span className="text-[#e5e5e5]">+91-6398105401</span>
          <span className="text-[#333] hidden md:block">|</span>
          <span className="text-[#666]">OPEN FOR COLLABORATION</span>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center font-mono text-xs text-[#444]">
      <p>&copy; 2024 SHIVAM AGARWAL. SYSTEM VERSION 2.1</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="https://linkedin.com" className="hover:text-[#e5e5e5] transition-colors">LINKEDIN</a>
        <a href="https://github.com/shivamagarwal2211" className="hover:text-[#e5e5e5] transition-colors">GITHUB</a>
        <a href="mailto:shivamagarwal2211@gmail.com" className="hover:text-[#e5e5e5] transition-colors">MAIL</a>
      </div>
    </footer>
  );
};

/* --- UTILS --- */

interface SocialLinkProps {
  href: string;
  icon: React.ReactElement<{ size?: number }>;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-2"
  >
    <div className="w-12 h-12 flex items-center justify-center border border-[#333] rounded-full group-hover:bg-[#e5e5e5] group-hover:text-black transition-all duration-300">
      {React.cloneElement(icon, { size: 18 } as { size: number })}
    </div>
    <span className="font-mono text-[10px] tracking-widest text-[#666] group-hover:text-[#ff4d00] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      {label}
    </span>
  </a>
);

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
}

const RevealText = ({ children, delay = 0 }: RevealTextProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default Portfolio;
