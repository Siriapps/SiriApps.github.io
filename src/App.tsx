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
  Lightbulb,
  Star,
  ArrowRight
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

// --- Visual Effects ---

const FloatingWords = () => {
  const words = [
    { text: "AI Agents", top: "15%", left: "10%", delay: "0s", color: "text-purple-500/20" },
    { text: "Quantum", top: "25%", left: "80%", delay: "2s", color: "text-blue-500/20" },
    { text: "React", top: "75%", left: "15%", delay: "4s", color: "text-cyan-500/20" },
    { text: "Innovation", top: "80%", left: "70%", delay: "1s", color: "text-purple-500/20" },
    { text: "Deep Learning", top: "45%", left: "5%", delay: "3s", color: "text-blue-500/20" },
    { text: "Cryptography", top: "15%", left: "50%", delay: "5s", color: "text-cyan-500/20" },
    { text: "Full Stack", top: "60%", left: "85%", delay: "2.5s", color: "text-purple-500/20" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {words.map((word, index) => (
        <div
          key={index}
          className={`absolute font-bold text-4xl md:text-6xl animate-float-random select-none ${word.color}`}
          style={{
            top: word.top,
            left: word.left,
            animationDelay: word.delay,
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#030014]">
      {/* Cosmic Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] animate-pulse delay-1000"></div>
      <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] animate-pulse delay-700"></div>
      
      {/* Stars/Dust */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
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

  // Add favicon dynamically
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    // Using a simple SVG globe as a placeholder for the logo you uploaded
    link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
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
      <div className={`max-w-6xl mx-auto px-6 ${scrolled ? 'bg-[#030014]/80 border-white/10' : 'bg-transparent border-transparent'} backdrop-blur-xl rounded-full border transition-all duration-500`}>
        <div className="flex items-center justify-between h-12">
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter cursor-pointer group flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                S
             </div>
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.substring(1) 
                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-white/10' 
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
        <div className="absolute top-24 left-4 right-4 p-4 bg-[#0a0a16]/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-5">
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
      <FloatingWords />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-8 animate-fade-in-up backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              Open to Work / Internships
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white leading-tight">
              Lakshmi Siri <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                Appalaneni
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 text-slate-300 leading-relaxed font-light">
              <span className="text-white font-semibold">AI & Quantum Researcher</span> building the future of intelligent systems.
              Currently focused on developing autonomous <span className="text-purple-400">AI Agents</span> and scalable Full Stack applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  View Work <Rocket size={18} />
                </span>
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20">
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
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-slate-500 text-sm justify-center md:justify-start">
              <MapPin size={16} className="text-purple-500" /> Based in Dallas, TX
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative z-10 mt-16 md:mt-0 perspective-1000">
             {/* Floating 3D Card Effect */}
             <div className="relative w-80 h-96 md:w-96 md:h-[32rem] animate-float">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl blur-[60px] opacity-30"></div>
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-[#0a0a16]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transform transition-transform hover:rotate-1 ring-1 ring-white/5">
                   
                   {/* Card Header */}
                   <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     <div className="ml-auto px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 font-mono">profile.tsx</div>
                   </div>

                   {/* Card Content */}
                   <div className="font-mono text-sm leading-loose space-y-2 text-slate-300">
                     <div className="flex">
                       <span className="text-purple-400 mr-2">const</span>
                       <span className="text-blue-400 mr-2">developer</span>
                       <span className="text-white">=</span>
                       <span className="text-yellow-300 ml-2">{`{`}</span>
                     </div>
                     <div className="pl-4 border-l border-white/5">
                       <span className="text-slate-500 mr-2">name:</span>
                       <span className="text-green-400">"Siri"</span>,
                     </div>
                     <div className="pl-4 border-l border-white/5">
                        <span className="text-slate-500 mr-2">education:</span>
                        <span className="text-green-400">"UT Dallas Honors"</span>,
                     </div>
                     <div className="pl-4 border-l border-white/5">
                        <span className="text-slate-500 mr-2">scholarship:</span>
                        <span className="text-green-400">"AES Merit Scholarship"</span>,
                     </div>
                     <div className="pl-4 border-l border-white/5">
                       <span className="text-slate-500 mr-2">interests:</span>
                       <span className="text-yellow-300">[</span>
                       <span className="text-green-400">"AI Agents"</span>, <span className="text-green-400">"Quantum"</span>
                       <span className="text-yellow-300">]</span>,
                     </div>
                     <div className="pl-4 border-l border-white/5">
                        <span className="text-slate-500 mr-2">status:</span>
                        <span className="text-blue-300">"Ready to Ship 🚀"</span>
                     </div>
                     <div className="pl-4">
                        <span className="text-yellow-300">{'}'}</span>;
                     </div>
                   </div>

                   <div className="mt-auto pt-6 border-t border-white/5">
                     <div className="flex items-center gap-4">
                       <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400 border border-white/5">
                         <Zap size={24} />
                       </div>
                       <div>
                         <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Latest Win</div>
                         <div className="text-sm font-medium text-white">1st Place - ACM Research</div>
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
    <section id="about" className="py-32 relative bg-[#030014]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Me</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection className="delay-100">
            <div className="space-y-8 text-lg text-slate-300 leading-relaxed font-light">
              <p className="text-2xl md:text-3xl font-medium text-white leading-snug">
                I’m a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">self-taught developer</span> and a <span className="text-white font-semibold decoration-purple-500/30 underline underline-offset-4">Computer Science Honors student at UT Dallas</span> who learns best by building things that feel meaningful.
              </p>
              <p>
                Most of my work sits at the intersection of AI, quantum computing, and practical product design, and I’ve grown through hackathons, research teams, and student organizations where I get to experiment, iterate, and actually ship ideas.
              </p>
              <p>
                I’ve worked on projects ranging from post-quantum cryptography research to AI-powered tools built in fast-paced environments like HackUTD. I enjoy creating systems that solve real problems, collaborating with people who are just as curious, and finding ways to turn complex technical ideas into something useful and accessible.
              </p>
              <p>
                Currently, I'm particularly interested in <span className="text-white font-medium border-b border-purple-500">AI Agents</span> and building autonomous systems that can perform complex tasks.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-10">
               {["AI Enthusiast", "Quantum Enthusiast", "Competitive Hacker"].map((tag, i) => (
                 <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-purple-200 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default backdrop-blur-sm">
                   {tag}
                 </div>
               ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="delay-200">
             <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Lightbulb, val: "Top", label: "Innovator", color: "text-yellow-400", from: "from-yellow-600/20", to: "to-orange-600/20" },
                  { icon: Code2, val: "10+", label: "Projects Shipped", color: "text-cyan-400", from: "from-cyan-600/20", to: "to-blue-600/20" },
                  { icon: Briefcase, val: "4+", label: "Research Roles", color: "text-purple-400", from: "from-purple-600/20", to: "to-pink-600/20" },
                  { icon: Trophy, val: "2x", label: "Hackathon Wins", color: "text-emerald-400", from: "from-emerald-600/20", to: "to-green-600/20" },
                ].map((stat, i) => (
                  <div key={i} className={`p-8 rounded-3xl bg-gradient-to-br ${stat.from} ${stat.to} border border-white/5 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 backdrop-blur-md`}>
                     <stat.icon size={40} className={`${stat.color} mb-4`} />
                     <h3 className="text-4xl font-bold text-white mb-1">{stat.val}</h3>
                     <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
             </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// --- New Redesigned Awards Section ---
const Awards = () => {
  const otherAwards = [
    "ICPC AlgoQueen Gold Medal",
    "Qiskit Advocate",
    "IBM Quantum Challenge",
    "AES Full Scholarship",
    "MIT iQuHack Participant",
    "Womanium Quantum Fellow"
  ];

  return (
    <section id="awards" className="py-32 relative bg-[#030014]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
           <div className="text-center mb-20">
              <span className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3 block">Achievements</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white">Hall of Fame</h2>
           </div>
        </AnimatedSection>

        {/* Top 3 Main Awards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           {[
             {
               icon: Trophy,
               title: "1st Place Winner",
               org: "ACM Research Symposium 2025",
               desc: "Awarded for 'Qryptik' - A Deep Learning-Driven tamper detection system for Post-Quantum Cryptography.",
               color: "yellow",
               gradient: "from-yellow-500 to-orange-500"
             },
             {
               icon: Award,
               title: "BlueQubit Winner",
               org: "Yale YQHack 2025",
               desc: "Recognized for excellence in the Quantum Computing Challenge. Developed a hybrid quantum-classical solution.",
               color: "blue",
               gradient: "from-blue-500 to-cyan-500"
             },
             {
               icon: Zap,
               title: "3rd Place (T-Mobile)",
               org: "HackUTD 2025",
               desc: "Largest 24hr hackathon in North America. Built 'HarmoniQ', an AI-powered dashboard. Recognized by T-Mobile judges for predictive analytics.",
               color: "pink",
               gradient: "from-pink-500 to-purple-500"
             }
           ].map((award, i) => (
             <AnimatedSection key={i} className={`delay-${i * 100}`}>
               <div className="group relative h-full p-8 rounded-3xl bg-[#0f0f1a] border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${award.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`inline-flex p-3 rounded-2xl bg-white/5 text-${award.color}-400 mb-6`}>
                     <award.icon size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{award.title}</h3>
                  <p className={`text-${award.color}-400 font-medium mb-4 text-sm uppercase tracking-wide`}>{award.org}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     {award.desc}
                  </p>
               </div>
             </AnimatedSection>
           ))}
        </div>
        
        {/* Floating Badge Cloud for Other Awards */}
        <AnimatedSection className="delay-300">
          <div className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden text-center">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50"></div>
             <h3 className="text-xl font-semibold text-white mb-8 relative z-10">More Recognitions & Honors</h3>
             
             <div className="flex flex-wrap justify-center gap-4 relative z-10">
                {otherAwards.map((item, i) => (
                  <div 
                    key={i} 
                    className="group px-6 py-3 rounded-full bg-[#0a0a16] border border-white/10 text-slate-300 text-sm font-medium hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-default animate-float-random"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <span className="mr-2 opacity-50 group-hover:opacity-100 group-hover:text-purple-400 transition-opacity">✦</span>
                    {item}
                  </div>
                ))}
             </div>
          </div>
        </AnimatedSection>
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
      company: "IBM Quantum",
      role: "Qiskit Advocate",
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
      description: "Collaborating on 2 open-source projects serving 10,000+ UTD students: UTD Trendz (professor rating platform) and UTD Notebook (academic note-sharing platform)."
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
    {
      year: '2025',
      company: "Yale Quantum Hackathon (YQHack)",
      role: "Challenge Winner",
      period: "Feb 2025",
      description: "Won the Blue Qubit Virtual Challenge by solving complex quantum problems using the BlueQubit platform. Developed a hybrid quantum-classical solution."
    },
    {
      year: '2025',
      company: "MIT iQuHack",
      role: "Hackathon Participant",
      period: "Jan 2025",
      description: "Participated in the MIT Quantum Hackathon, working on advanced quantum algorithms and optimizing ansatz structures."
    },
    // ... existing 2024 and 2023 data ...
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
    <section id="experience" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 text-white">Experience</h2>
            
            {/* Tab Navigation */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#13132b] border border-white/10 backdrop-blur-sm">
               {['2025', '2024', '2023'].map((year) => (
                 <button
                   key={year}
                   onClick={() => setActiveTab(year)}
                   className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                     activeTab === year 
                     ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20' 
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
              <div className="relative pl-8 md:pl-0 group">
                {/* Timeline Line (Desktop) */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-transparent transform -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                   
                   {/* Center Dot */}
                   <div className="absolute left-[-5px] md:left-[50%] top-8 w-4 h-4 rounded-full bg-[#0a0a16] border-2 border-purple-500 transform md:-translate-x-1/2 z-10 group-hover:scale-125 group-hover:bg-purple-500 group-hover:border-white transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                   {/* Content Card */}
                   <div className="md:w-[45%] mb-2 md:mb-0">
                      <div className="p-8 rounded-3xl bg-[#13132b] border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                           <Briefcase size={80} />
                        </div>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                          {exp.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="text-purple-400 font-medium mb-4">{exp.company}</div>
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
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Libraries & Frameworks",
      icon: Code2,
      skills: ["React", "Next.js", "Flutter", "TailwindCSS", "Flask", "Playwright", "PyTorch", "NumPy", "Pandas", "Plotly", "Dash"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Domains & Tools",
      icon: Brain,
      skills: ["AI/ML", "Deep Learning", "Cryptography (RLCE)", "Quantum Algorithms", "LLM Integration", "Git/GitHub", "Figma", "Linux CLI"],
      color: "from-cyan-500 to-emerald-500"
    }
  ];

  return (
    <section id="skills" className="py-32 relative bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index} className={`delay-${index * 100}`}>
              <div className="group h-full p-8 rounded-3xl bg-[#13132b] border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-[#13132b] rounded-[14px] flex items-center justify-center">
                    <category.icon size={28} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
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
      title: "HarmoniQ (HackUTD T-Mobile Challenge 3rd place)",
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
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <AnimatedSection key={index} className={`delay-${index * 100}`}>
              <div className="group relative rounded-3xl overflow-hidden bg-[#13132b] border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 h-full flex flex-col">
                {/* Image Placeholder with Gradient */}
                <div className={`h-48 w-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden shrink-0`}>
                  <div className="absolute inset-0 bg-[#13132b]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <Code2 size={56} className="text-white/90 drop-shadow-lg" />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-sm font-medium text-purple-400">{project.subtitle}</p>
                    </div>
                    <div className="flex gap-3">
                      <a href={project.links.demo} className="p-2.5 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-all border border-white/5">
                        <ExternalLink size={18} />
                      </a>
                      <a href={project.links.code} className="p-2.5 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-all border border-white/5">
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow font-light">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-lg bg-[#0a0a16] text-slate-300 border border-white/10">
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
    <section id="updates" className="py-32 relative bg-[#030014]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16 text-center">
             <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">Social Feed</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white mt-2">Latest Updates</h2>
            <p className="text-slate-400">Highlights from my professional journey</p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#13132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-purple-500/30 transition-all group">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{post.author}</h3>
                    <p className="text-sm text-slate-400">{post.role} • {post.date}</p>
                  </div>
                  <div className="ml-auto">
                    <Linkedin size={24} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                {/* Content */}
                <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line mb-6 font-light">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                   {post.tags.map((tag, i) => (
                     <span key={i} className="text-blue-400 text-sm hover:underline cursor-pointer font-medium">{tag}</span>
                   ))}
                </div>

                {/* Footer/Stats */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 text-slate-400 text-sm">
                  <div className="flex items-center gap-8">
                    <button className="flex items-center gap-2 hover:text-pink-500 transition-colors group/btn">
                      <Heart size={20} className="group-hover/btn:fill-current" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <MessageSquare size={20} /> {post.comments}
                    </button>
                  </div>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                     <Share2 size={20} /> Share
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
          
          <div className="text-center mt-12">
             <a href="https://www.linkedin.com/in/a-lakshmi-siri/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105">
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
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0a0a16]">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <AnimatedSection>
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">Let's Connect</h2>
              <p className="text-xl mb-12 text-slate-400 leading-relaxed font-light">
                I'm currently looking for new opportunities in AI/ML and Full Stack Engineering. 
                Whether you have a question about my research or just want to say hi, my inbox is always open!
              </p>
              
              <div className="space-y-6">
                <a href="mailto:lakshmisiri783@gmail.com" className="flex items-center gap-6 group p-6 rounded-3xl bg-[#13132b] hover:bg-[#1a1a35] transition-colors border border-white/5 hover:border-purple-500/30">
                  <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail size={28} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 group-hover:text-purple-400 transition-colors mb-1 uppercase tracking-wider">Email Me</div>
                    <div className="text-xl text-white">lakshmisiri783@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noreferrer" className="flex items-center gap-6 group p-6 rounded-3xl bg-[#13132b] hover:bg-[#1a1a35] transition-colors border border-white/5 hover:border-blue-500/30">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin size={28} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 group-hover:text-blue-400 transition-colors mb-1 uppercase tracking-wider">Connect</div>
                    <div className="text-xl text-white">linkedin.com/in/a-lakshmi-siri</div>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="delay-200">
            <div className="rounded-[2.5rem] p-10 bg-[#13132b]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-[#0a0a16] border border-white/10 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-700"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-2xl bg-[#0a0a16] border border-white/10 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-700"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full px-6 py-4 rounded-2xl bg-[#0a0a16] border border-white/10 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-700 resize-none"
                    placeholder="Hello, I'd like to discuss..."
                  ></textarea>
                </div>
                <button className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  Send Message <Sparkles size={20} />
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
    <footer className="py-10 bg-[#0a0a16] border-t border-white/5 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-slate-500 flex items-center justify-center gap-2 mb-2">
          Made with <Heart size={14} className="text-purple-500 fill-current" /> by Lakshmi Siri Appalaneni
        </p>
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'awards', 'experience', 'projects', 'updates', 'contact'];
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
    <div className="min-h-screen bg-[#0a0a16] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white">
      <Background />
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Awards />
        <Experience />
        <Projects />
        <Skills />
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
        
        @keyframes float-random {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(2deg); }
          66% { transform: translate(-5px, 15px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-float-random {
          animation: float-random 8s ease-in-out infinite;
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
