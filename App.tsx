import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Layout, Cpu, Terminal, ChevronDown } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import AIChat from './components/AIChat';
import { PORTFOLIO_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend': return <Layout className="text-accent" />;
      case 'backend': return <Database className="text-accent2" />;
      case 'languages': return <Code2 className="text-purple-400" />;
      case 'tools': return <Terminal className="text-green-400" />;
      default: return <Cpu className="text-orange-400" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-primary/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-display font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            TAMIZH.dev
          </a>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-accent transition-colors relative group"
                onClick={() => setActiveSection(link.name.toLowerCase())}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in-up">
            <span className="text-accent font-medium">Hello, I'm</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight">
            <span className="text-white">{PORTFOLIO_DATA.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Full-Stack Developer & AI Enthusiast specializing in building
            <span className="text-accent"> futuristic</span>, scalable digital experiences.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a href={PORTFOLIO_DATA.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-800/50 hover:bg-accent hover:text-primary transition-all duration-300 border border-white/10 hover:scale-110">
              <Github size={24} />
            </a>
            <a href={`https://${PORTFOLIO_DATA.linkedin}`} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-800/50 hover:bg-accent2 hover:text-primary transition-all duration-300 border border-white/10 hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.email}`} className="p-3 rounded-full bg-slate-800/50 hover:bg-purple-500 hover:text-primary transition-all duration-300 border border-white/10 hover:scale-110">
              <Mail size={24} />
            </a>
          </div>

          <a href="#about" className="inline-flex items-center gap-2 text-sm text-slate-500 animate-bounce mt-12">
            Scroll Down <ChevronDown size={16} />
          </a>
        </div>

        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10 animate-blob"></div>
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent2 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-primary/90 p-8 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-display font-bold mb-4 text-white">Professional Profile</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {PORTFOLIO_DATA.bio}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/50 rounded-xl">
                      <h4 className="text-accent font-bold text-lg mb-1">{PORTFOLIO_DATA.age}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Years Old</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-xl">
                      <h4 className="text-accent2 font-bold text-lg mb-1">Chennai</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-display font-bold mb-8 text-white">Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">Experience</span></h2>
              <div className="space-y-8">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-accent"></div>
                      <div className="w-0.5 h-full bg-slate-800 my-2"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                      <p className="text-accent text-sm mb-1">{edu.degree}</p>
                      <p className="text-slate-400 text-sm mb-2">{edu.year}</p>
                      <p className="text-slate-500 text-sm">{edu.details}</p>
                    </div>
                  </div>
                ))}
                {PORTFOLIO_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-accent2"></div>
                      <div className="w-0.5 h-full bg-slate-800 my-2"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                      <p className="text-accent2 text-sm mb-1">{exp.company} - {exp.project}</p>
                      <ul className="list-disc list-inside text-slate-500 text-sm mt-2 space-y-1">
                        {exp.responsibilities.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center text-white">Technical <span className="text-accent">Arsenal</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.skills.map((category, idx) => (
              <div key={idx} className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-slate-800/80">
                    {getIconForCategory(category.category)}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-white/5 hover:bg-slate-700 hover:text-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">Projects</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <div key={idx} className={`group relative bg-primary rounded-2xl border border-white/10 overflow-hidden flex flex-col ${project.isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                    FEATURED
                  </div>
                )}

                {/* Decoration for cards */}
                <div className="h-2 w-full bg-gradient-to-r from-accent to-accent2"></div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-slate-400">{project.description}</p>
                  </div>

                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-accent2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {project.links?.github && (
                      <a href={project.links.github} className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors">
                        <Github size={16} /> Code
                      </a>
                    )}
                    {project.links?.demo && (
                      <a href={project.links.demo} className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Interests & Hobbies */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Technical Interests</h3>
              <div className="space-y-4">
                {PORTFOLIO_DATA.interests.map((interest, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-slate-300">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Hobbies & Activities</h3>
              <div className="space-y-4">
                {PORTFOLIO_DATA.hobbies.map((hobby, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-slate-300">{hobby}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="py-20 bg-black/40 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Ready to Collaborate?</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            I'm currently open to freelance and full-time opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
          </p>

          <a href={`mailto:${PORTFOLIO_DATA.email}`} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent2 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:-translate-y-1">
            <Mail size={20} />
            Say Hello
          </a>

          <div className="mt-16 pt-8 border-t border-white/5 flex justify-center items-center text-slate-500 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</p>
          </div>
        </div>
      </section>

      { <AIChat /> } 
    </div>
  );
};

export default App;
