import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Database,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  GraduationCap,
  User,
  Award,
  Trophy,
  Brain,
  MessageSquare,
  Share2,
  Heart,
  Sparkles,
  MapPin,
  Atom,
  Calendar,
  Zap,
  Rocket,
  Medal,
  Lightbulb
} from 'lucide-react';

// --- Utility Components & Hooks ---

const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Background Particle/Gradient Effect
const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-slate-950">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse delay-1000"></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-900/10 blur-[100px] animate-pulse delay-700"></div>
      
      {/* Stars/Dust (CSS Radial Gradients) */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', 
        backgroundSize: '50px 50px' 
      }}></div>
    </div>
  );
};

// --- Main Components ---

const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Awards', href: '#awards' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Updates', href: '#updates' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-5xl mx-auto px-6 ${scrolled ? 'bg-slate-900/80' : 'bg-transparent'} backdrop-blur-xl rounded-full border border-white/10 shadow-2xl transition-all duration-500`}>
        <div className="flex items-center justify-between h-12">
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter cursor-pointer group">
            <a href="#" className="flex items-center gap-2 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-500">
                Siri.Dev
              </span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.substring(1) 
                    ? 'bg-white/10 text-white shadow-lg shadow-purple-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 p-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-5">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2 text-center md:text-left z-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8 animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Looking for Jobs / Internships
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
              Lakshmi Siri <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                Appalaneni
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 text-slate-300 leading-relaxed font-light">
              <span className="text-white font-semibold">2x Hackathon Winner & AI Researcher</span> bridging the gap between Quantum Computing and interactive web experiences. 
              Currently building intelligent systems at the intersection of Deep Learning and Full Stack Engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  View Work <Rocket size={18} />
                </span>
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105">
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 justify-center md:justify-start">
              {[
                { icon: Github, href: "https://github.com/Siriapps" },
                { icon: Linkedin, href: "https://linkedin.com/in/a-lakshmi-siri" },
                { icon: Mail, href: "mailto:lakshmisiri783@gmail.com" },
                { icon: Globe, href: "https://siriapps.github.io/" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm justify-center md:justify-start">
              <MapPin size={16} /> Based in Dallas, TX
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative z-10 mt-10 md:mt-0 perspective-1000">
             {/* Floating 3D Card Effect */}
             <div className="relative w-80 h-96 md:w-96 md:h-[30rem] animate-float">
                {/* Back Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl transform rotate-6 opacity-40 blur-lg transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl transform transition-transform hover:rotate-1">
                   
                   {/* Card Header (Code Window Style) */}
                   <div className="flex items-center gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     <div className="ml-auto px-2 py-1 rounded bg-white/5 text-xs text-slate-500 font-mono">dev_status.tsx</div>
                   </div>

                   {/* Card Content */}
                   <div className="font-mono text-sm leading-relaxed space-y-4 text-slate-300">
                     <div className="flex">
                       <span className="text-purple-400 mr-2">const</span>
                       <span className="text-blue-400 mr-2">siri</span>
                       <span className="text-white">=</span>
                       <span className="text-yellow-300 ml-2">{`{`}</span>
                     </div>
                     <div className="pl-4">
                       <span className="text-slate-500 mr-2">education:</span>
                       <span className="text-green-400">"UT Dallas, Honors, AES Scholar"</span>,
                     </div>
                     <div className="pl-4">
                       <span className="text-slate-500 mr-2">expertise:</span>
                       <span className="text-yellow-300">[</span>
                       <span className="text-green-400">"Quantum Encryption"</span>, <span className="text-green-400">"AI Agents"</span>, <span className="text-green-400">"React"</span>
                       <span className="text-yellow-300">]</span>,
                     </div>
                     <div className="pl-4">
                        <span className="text-slate-500 mr-2">hackathonsWon:</span>
                        <span className="text-orange-400">2</span>,
                     </div>
                     <div className="pl-8 text-slate-400 italic">
                        // Ready to ship code 🚀
                     </div>
                     <div className="pl-4">
                        <span className="text-yellow-300">{'}'}</span>
                     </div>
                     <div>
                       <span className="text-yellow-300">{'}'}</span>;
                     </div>
                   </div>

                   <div className="mt-auto pt-6 border-t border-white/5">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded bg-blue-500/20 text-blue-400">
                         <Zap size={20} />
                       </div>
                       <div>
                         <div className="text-xs text-slate-500">Latest Achievement</div>
                         <div className="text-sm font-medium text-white">1st Place - ACM Research Symposium</div>
                       </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection className="delay-100">
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
              <p>
                I’m a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">self-taught developer</span> and a <span className="text-white font-semibold">Computer Science Honors student at UT Dallas</span> who learns best by building things that feel meaningful.
              </p>
              <p>
                Most of my work sits at the intersection of AI, quantum computing, and practical product design, and I’ve grown through hackathons, research teams, and student organizations where I get to experiment, iterate, and actually ship ideas.
              </p>
              <p>
                I’ve worked on projects ranging from post-quantum cryptography research to AI-powered tools built in fast-paced environments like HackUTD. I enjoy creating systems that solve real problems, collaborating with people who are just as curious, and finding ways to turn complex technical ideas into something useful and accessible.
              </p>
              <p>
                Currently, I'm particularly interested in <span className="text-white font-medium">AI Agents</span> and building autonomous systems that can perform complex tasks.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
               <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors cursor-default">
                 Quantum Enthusiast
               </div>
               <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors cursor-default">
                 AI Enthusiast
               </div>
               <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors cursor-default">
                 Competitive Hacker
               </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="delay-200">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex flex-col items-center justify-center text-center">
                   <Trophy size={40} className="text-yellow-400 mb-4" />
                   <h3 className="text-3xl font-bold text-white">2x</h3>
                   <p className="text-slate-400 text-sm">Hackathon Winner</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-white/10 flex flex-col items-center justify-center text-center">
                   <Code2 size={40} className="text-emerald-400 mb-4" />
                   <h3 className="text-3xl font-bold text-white">10+</h3>
                   <p className="text-slate-400 text-sm">Projects Shipped</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-white/10 flex flex-col items-center justify-center text-center">
                   <Briefcase size={40} className="text-orange-400 mb-4" />
                   <h3 className="text-3xl font-bold text-white">4+</h3>
                   <p className="text-slate-400 text-sm">Research Roles</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                   <Lightbulb size={40} className="text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                   <h3 className="text-3xl font-bold text-white">AI</h3>
                   <p className="text-slate-400 text-sm">Agent Innovator</p>
                </div>
             </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// --- New Dedicated Hackathon Section ---
const Awards = () => {
  return (
    <section id="awards" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
           <div className="text-center mb-16">
              <span className="text-yellow-400 font-bold tracking-wider text-sm uppercase mb-2 block">Hall of Fame</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Hackathons & Awards</h2>
           </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Card 1 */}
           <AnimatedSection className="delay-0">
             <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-500">
                <div className="absolute top-0 right-0 p-3 bg-yellow-500/20 text-yellow-400 rounded-bl-2xl">
                   <Trophy size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">1st Place Winner</h3>
                <p className="text-blue-400 font-medium mb-4">ACM Research Symposium 2025</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Awarded for "Qryptik" - A Deep Learning-Driven tamper detection system for Post-Quantum Cryptography. Beating out dozens of other research teams.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
             </div>
           </AnimatedSection>

           {/* Card 2 */}
           <AnimatedSection className="delay-100">
             <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute top-0 right-0 p-3 bg-blue-500/20 text-blue-400 rounded-bl-2xl">
                   <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">BlueQubit Winner</h3>
                <p className="text-purple-400 font-medium mb-4">Yale YQHack 2025</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Recognized for excellence in the Quantum Computing Challenge. Developed a hybrid quantum-classical solution for optimization problems.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
             </div>
           </AnimatedSection>

           {/* Card 3 */}
           <AnimatedSection className="delay-200">
             <div className="group relative h-full p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-500">
                <div className="absolute top-0 right-0 p-3 bg-pink-500/20 text-pink-400 rounded-bl-2xl">
                   <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">3rd Place (T-Mobile)</h3>
                <p className="text-pink-400 font-medium mb-4">HackUTD 2025</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Built "HarmoniQ", an AI-powered dashboard. Recognized by T-Mobile judges for best use of predictive analytics and user experience.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
             </div>
           </AnimatedSection>
        </div>
        
        <div className="mt-8 text-center">
           <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm">
             <span className="flex items-center gap-2"><Trophy size={14} className="text-yellow-500"/> ICPC AlgoQueen Gold Medal</span>
             <span className="w-1 h-1 rounded-full bg-slate-600"></span>
             <span className="flex items-center gap-2"><Atom size={14} className="text-blue-500"/> Qiskit Advocate</span>
             <span className="w-1 h-1 rounded-full bg-slate-600"></span>
             <span className="flex items-center gap-2"><Code2 size={14} className="text-purple-500"/> IBM Quantum Challenge</span>
           </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState('2025');

  const experiences = [
    // 2025 Data
    {
      year: '2025',
      company: "Qiskit Advocate",
      role: "Community Contributor",
      period: "Sep 2025 – Present",
      description: "Supporting localization and documentation. Assisting learners in workshops and participating in yearly IBM Quantum challenges."
    },
    {
      year: '2025',
      company: "ACM Research (Qryptik)",
      role: "Researcher / Cryptography + AI Developer",
      period: "Aug 2024 – Dec 2025 (Completed)",
      description: "Developed a Deep Learning-Driven tamper detection system for RLCE. Implemented GF(2^8) Gauss-Jordan inverses and built a CNN-based validator. Won 1st Place at Fall 2025 ACM Research Symposium."
    },
    {
      year: '2025',
      company: "Nebula Labs",
      role: "Engineering Division",
      period: "2024 - 2025",
      description: "Developed 'Notebook', a knowledge-sharing platform, and contributed to 'HarmoniQ', an AI productivity dashboard using React, Next.js, and Auth0."
    },
    {
      year: '2025',
      company: "Collective Qubits",
      role: "Project Associate (Quantum + ML)",
      period: "2024 - 2025",
      description: "Worked on quantum-enhanced DNA sequence classification using Quanvolutional Neural Networks. Developed hybrid quantum-classical frameworks."
    },
    {
      year: '2025',
      company: "QAMP 2025",
      role: "Quantum Materials Researcher",
      period: "2025",
      description: "Built Q-UCSpec, a simulator for photonic upconversion materials. Modeled defect-level energy transitions and provided visualization outputs."
    },
    // 2024 Data
    {
      year: '2024',
      company: "Quantum High School Organization",
      role: "Research Assistant",
      period: "Feb 2024 – Present",
      description: "Explored Quantum Generative Adversarial Networks (QGANs) and simulated calorimeter work using ATLAS dataset. Curated datasets and trained hybrid QGAN models."
    },
    {
      year: '2024',
      company: "University of Texas at Dallas",
      role: "Research Intern (Quantum Lab)",
      period: "June 2024 – Aug 2024",
      description: "Worked with latest Qiskit 1.x under Dr. Basu. Researched solutions for critical bugs in pyZX (ZX Calculus software) and added configurations for missing gates."
    },
    {
      year: '2024',
      company: "The Coding School",
      role: "AI Research Cohort",
      period: "2023 – 2024",
      description: "Selected among top global applicants. Built 'StreamSign', an AI pipeline converting video speech into Indian Sign Language animations."
    },
    // 2023 Data
    {
      year: '2023',
      company: "Incognito Blueprints",
      role: "Safe-navigation Researcher",
      period: "May 2023 – July 2023",
      description: "Collaborated with international team to develop a safety model for travelers. Implemented Ax Algorithm to predict safest routes based on crime rate and lighting."
    },
    {
      year: '2023',
      company: "New York Academy of Sciences",
      role: "Young Researcher",
      period: "2023 – 2024",
      description: "Built 'WasteWatch', an AI project for efficient waste sorting. Led data processing and dataset creation meetings for international team."
    }
  ];

  const filteredExperiences = experiences.filter(exp => exp.year === activeTab);

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Experience</h2>
            
            {/* Tab Navigation */}
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10">
               {['2025', '2024', '2023'].map((year) => (
                 <button
                   key={year}
                   onClick={() => setActiveTab(year)}
                   className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                     activeTab === year 
                     ? 'bg-blue-600 text-white shadow-lg' 
                     : 'text-slate-400 hover:text-white hover:bg-white/5'
                   }`}
                 >
                   {year === '2025' ? 'Recent / 2025' : year}
                 </button>
               ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-8 min-h-[400px]">
          {filteredExperiences.map((exp, index) => (
            <AnimatedSection key={`${activeTab}-${index}`} className={`delay-${index * 100}`}>
              <div className="relative pl-8 md:pl-0">
                {/* Timeline Line (Desktop) */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                   
                   {/* Center Dot */}
                   <div className="absolute left-[-5px] md:left-[50%] top-0 w-3 h-3 rounded-full bg-blue-500 transform md:-translate-x-1/2 mt-2 z-10 group-hover:scale-150 group-hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                   {/* Content Card */}
                   <div className="md:w-[45%] mb-2 md:mb-0">
                      <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-xl relative overflow-hidden group-hover:-translate-y-1">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full">
                          {exp.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="text-purple-400 font-medium mb-3">{exp.company}</div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                   </div>
                   
                   {/* Empty space for the other side */}
                   <div className="md:w-[45%]"></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: Terminal,
      skills: ["Python", "Java", "C++", "JavaScript", "Dart", "SQL"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Libraries & Frameworks",
      icon: Code2,
      skills: ["React", "Next.js", "Flutter", "TailwindCSS", "Flask", "Playwright", "PyTorch", "NumPy", "Pandas", "Plotly", "Dash"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Domains & Tools",
      icon: Brain,
      skills: ["AI/ML", "Deep Learning", "Cryptography (RLCE)", "Quantum Algorithms", "LLM Integration", "Git/GitHub", "Figma", "Linux CLI"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Arsenal</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index} className={`delay-${index * 100}`}>
              <div className="group h-full p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <category.icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Qryptik (ACM Research)",
      subtitle: "Quantum-Safe Encryption",
      description: "RLCE cryptosystem with Deep Learning-driven tamper detection system. Includes GF(2^8) linear algebra and Reed–Solomon support.",
      tags: ["Python", "NumPy", "PyTorch", "Deep Learning"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-indigo-600 to-purple-600"
    },
    {
      title: "HarmoniQ (Nebula Labs)",
      subtitle: "AI Productivity Dashboard",
      description: "Productivity dashboard for PM workflows integrating LLMs to predict outcomes and streamline tasks.",
      tags: ["Next.js", "Tailwind", "Auth0", "Gemini API"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "SmartCart AI",
      subtitle: "Auto Grocery Agent",
      description: "Autonomous agent converting grocery lists to real-time orders using Playwright automation and NLP for context-aware parsing.",
      tags: ["Flask", "Playwright", "Gemini/OpenRouter"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "ChatCycle",
      subtitle: "Public AI Repo",
      description: "Platform where AI conversations are public, searchable, and reusable. Reduces redundancy in student queries.",
      tags: ["Flutter", "API Integration"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-orange-500 to-pink-600"
    },
    {
      title: "Notebook (Nebula Labs)",
      subtitle: "Knowledge Sharing",
      description: "UTD-wide student note-sharing platform with uploads, search, and tagging capabilities.",
      tags: ["React", "Next.js", "Tailwind"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-slate-600 to-slate-800"
    },
    {
      title: "StreamSign",
      subtitle: "Sign Language Translator",
      description: "ML pipeline converting video speech into Indian Sign Language animations, enhancing accessibility.",
      tags: ["Python", "MediaPipe", "NLP", "Flask"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-purple-600 to-pink-600"
    },
     {
      title: "DataOnWheels",
      subtitle: "Automotive Analytics",
      description: "Interactive dashboard using Dash and Plotly to visualize automotive sales insights with automated Elasticsearch querying.",
      tags: ["Python", "Dash", "Plotly", "Elasticsearch"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-red-500 to-orange-600"
    },
    {
      title: "Q-UCSpec",
      subtitle: "Quantum Simulator",
      description: "Simulator for photonic upconversion materials. Modeled defect-level energy transitions and photon emission pathways.",
      tags: ["Python", "Scientific Computing", "Quantum"],
      links: { demo: "#", code: "#" },
      imageGradient: "from-blue-900 to-slate-900"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index} className={`delay-${index * 100}`}>
              <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
                {/* Image Placeholder with Gradient */}
                <div className={`h-40 w-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden shrink-0`}>
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <Code2 size={48} className="text-white/80 drop-shadow-lg" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-sm font-medium text-blue-400/80">{project.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={project.links.demo} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-all">
                        <ExternalLink size={16} />
                      </a>
                      <a href={project.links.code} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-all">
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- New Social Feed Section ---
const SocialUpdates = () => {
  const posts = [
    {
      id: 1,
      author: "Lakshmi Siri Appalaneni",
      role: "Student @ UTD",
      date: "1 week ago",
      content: `Thrilled to share that I had an amazing time at the IBM Developer Conference! 🚀 The sessions on Quantum Computing and AI Ethics were incredibly insightful. It was great connecting with industry leaders and discussing the future of secure encryption. Can't wait to apply these learnings to my research on RLCE schemes! #IBM #QuantumComputing #AI #Developer

#IBMDeveloper #QuantumSafe #Networking`,
      likes: 245,
      comments: 42,
      tags: ["#IBMDeveloper", "#QuantumSafe", "#Networking"]
    },
    {
      id: 2,
      author: "Lakshmi Siri Appalaneni",
      role: "Student @ UTD",
      date: "1 month ago",
      content: `Just wrapped up an intense 36 hours at HackUTD! 💻 Proud to announce that our team took home 3rd place in the T-Mobile challenge. We built an IoT solution that helps optimize network traffic using edge computing. Huge shoutout to my teammates! 🏆 #HackUTD #Hackathon #Innovation

#HackUTD2025 #Winner #TeamWork`,
      likes: 189,
      comments: 28,
      tags: ["#HackUTD", "#TMobile", "#TeamHarmoniQ", "#AI"]
    },
    {
      id: 3,
      author: "Lakshmi Siri Appalaneni",
      role: "Student @ UTD",
      date: "1 day ago",
      content: `🌟 Qryptik Wins 1st Place at the Fall 2025 @ACM Research Symposium! 🌟

I am excited to share that our project on Deep Learning-Driven Decoding in Post-Quantum Cryptography scheme won 1st Place at the Fall 2025 ACM UTD Research presentations. Presenting months of work to the judges, our mentors, and the whole ACM community was an incredible way to close the semester.

Our project focused on improving reliability in Random Linear Code-based Encryption (RLCE), a classical post-quantum system. We designed a Graph Recurrent Neural Network (R-GNN) that learns structural patterns to identify error positions in ciphertext syndromes.

Highlights:
🔹 Built a custom R-GNN model using RLCE parity-check matrix features.
🔹 Demonstrated error identification beyond classical bounds without changing public parameters.

Special thank you to our team lead Sai Chauhan and my teammates! Onward. 🚀💜`,
      likes: 33,
      comments: 3,
      tags: ["#ACMResearch", "#QuantumSafe", "#DeepLearning"]
    }
  ];

  return (
    <section id="updates" className="py-24 relative bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
             <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">Social Feed</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white mt-2">Latest Updates</h2>
            <p className="text-slate-400">Highlights from my professional journey</p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <AnimatedSection key={index}>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-all">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{post.author}</h3>
                    <p className="text-xs text-slate-400">{post.role} • {post.date}</p>
                  </div>
                  <div className="ml-auto">
                    <Linkedin size={20} className="text-blue-500" />
                  </div>
                </div>
                
                {/* Content */}
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                   {post.tags.map((tag, i) => (
                     <span key={i} className="text-blue-400 text-xs hover:underline cursor-pointer">{tag}</span>
                   ))}
                </div>

                {/* Footer/Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-slate-400 text-sm">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <Heart size={18} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <MessageSquare size={18} /> {post.comments}
                    </button>
                  </div>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                     <Share2 size={18} /> Share
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
          
          <div className="text-center mt-8">
             <a href="https://www.linkedin.com/in/a-lakshmi-siri/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
               View more on LinkedIn <ExternalLink size={16} />
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <AnimatedSection>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Connect</h2>
              <p className="text-lg mb-8 text-slate-400 leading-relaxed">
                I'm currently looking for new opportunities in AI/ML and Full Stack Engineering. 
                Whether you have a question about my research or just want to say hi, my inbox is always open!
              </p>
              
              <div className="space-y-6">
                <a href="mailto:lakshmisiri783@gmail.com" className="flex items-center gap-4 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                  <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 group-hover:text-blue-400 transition-colors">Email Me</div>
                    <div className="text-lg text-white">lakshmisiri783@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                  <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 group-hover:text-purple-400 transition-colors">Connect</div>
                    <div className="text-lg text-white">linkedin.com/in/a-lakshmi-siri</div>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="delay-200">
            <div className="rounded-3xl p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 resize-none"
                    placeholder="Hello, I'd like to discuss..."
                  ></textarea>
                </div>
                <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Send Message <Sparkles size={18} />
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-slate-500 flex items-center justify-center gap-2">
          Made with <Heart size={14} className="text-red-500 fill-current" /> by Lakshmi Siri Appalaneni
        </p>
        <p className="text-slate-600 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'updates', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white">
      <Background />
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Awards />
        <Skills />
        <Experience />
        <Projects />
        <SocialUpdates />
        <Contact />
      </main>
      <Footer />
      
      {/* Global Styles for Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default App;