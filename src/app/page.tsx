"use client"; // This must be the first line

import Image from 'next/image';
import data from '../data/portfolio.json';
import { ChevronDown, ChevronUp, Award, Code2, Github, Linkedin, Mail, ExternalLink, Menu, X, FileDown} from 'lucide-react';
import { AnimatePresence,motion } from 'framer-motion';      // Added for animations


import { useState } from 'react'; // For mobile menu toggle


export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  // Constants
  const DISPLAY_LIMIT = 6;
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Name */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {data.name.split(' ')[0]}.dev
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            
            <div className="h-4 w-px bg-slate-800" />

            {/* Social Quick Links */}
            <div className="flex items-center gap-4">
              <a href={data.socials.github} target="_blank" className="hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={data.socials.linkedin} target="_blank" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Icon (Simple version) */}
          <div className="md:hidden text-slate-400">
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </nav>
      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full" />
        
        {/* Profile Photo - Now correctly placed inside the centered section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
          <Image
            src="/me.jpg" 
            alt="Profile Picture"
            width={150} 
            height={150}
            className="relative rounded-full border-2 border-slate-800 object-cover shadow-2xl"
            priority // This helps the image load faster
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          I'm <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {data.name}
          </span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl">
          {data.role} — {data.about}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
  <a 
    href="/resume.pdf" 
    download="YourName_Resume.pdf" // This forces the browser to download it
    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-semibold hover:bg-blue-400 transition-all hover:-translate-y-1 shadow-lg shadow-white/10"
  >
    <FileDown className="w-5 h-5" />
    Download CV
  </a>
  
  <a 
    href="#projects"
    className="px-6 py-3 rounded-full border border-slate-800 hover:border-slate-600 transition-all"
  >
    View Work
  </a>
</div>
      </section>

{/* 2. Projects Grid */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
          Recent Work <div className="h-px flex-1 bg-slate-800" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.slice(0, showAllProjects ? undefined : DISPLAY_LIMIT).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {data.projects.length > DISPLAY_LIMIT && (
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="mt-12 mx-auto flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 hover:bg-slate-900 transition-all text-slate-400 hover:text-white"
          >
            {showAllProjects ? <>Show Less <ChevronUp /></> : <>Show All Projects <ChevronDown /></>}
          </button>
        )}
      </section>

      {/* 3. Certifications Section */}
      <section id="certifications" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
          Certifications <div className="h-px flex-1 bg-slate-800" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.certifications.slice(0, showAllCerts ? undefined : DISPLAY_LIMIT).map((cert, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedCert(cert)}
              className="flex items-center p-4 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="relative w-12 h-12 shrink-0 mr-4 rounded-lg overflow-hidden border border-slate-700">
                <Image src={cert.image} alt={cert.issuer} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{cert.title}</h3>
                <p className="text-xs text-slate-500">{cert.issuer}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600" />
            </div>
          ))}
        </div>

        {data.certifications.length > DISPLAY_LIMIT && (
          <button 
            onClick={() => setShowAllCerts(!showAllCerts)}
            className="mt-8 mx-auto flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-all"
          >
            {showAllCerts ? <ChevronUp /> : <ChevronDown />} {showAllCerts ? "Collapse" : "View More Certificates"}
          </button>
        )}
      </section>

      {/* Certificate Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            >
              <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-red-500/20 text-white transition-all"><X /></button>
              <div className="relative aspect-video w-full bg-slate-950">
                <Image src={selectedCert.image} alt="Full Certificate" fill className="object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{selectedCert.title}</h3>
                <p className="text-slate-400 mb-6">{selectedCert.issuer} • Issued {selectedCert.date}</p>
                <a href={selectedCert.verifyLink} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full font-bold">Verify Credential <ExternalLink size={18}/></a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      
  



     {/* 4. Skills Section - Animated */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
          Tech Stack <div className="h-px flex-1 bg-slate-800" />
        </h2>

        <div className="flex flex-wrap gap-4">
          {data.skills.map((skill, index) => (
            <motion.div 
              key={index}
              // 1. Initial State (Hidden)
              initial={{ opacity: 0, y: 20 }}
              // 2. Animate into view
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // 3. Staggered delay (first skill 0s, second 0.1s, etc.)
              transition={{ duration: 0.4, delay: index * 0.1 }}
              // 4. Hover effect
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(30, 41, 59, 0.7)",
                borderColor: "#3b82f6" 
              }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-medium transition-all cursor-default shadow-lg shadow-blue-500/5"
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              {skill}
            </motion.div>
          ))}
        </div>
      </section>
      {/* 5. Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="relative p-12 rounded-3xl bg-linear-to-b from-slate-900/50 to-slate-950 border border-slate-800 text-center overflow-hidden">
          {/* Subtle background glow for the contact card */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Let's build something together</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">
              I'm currently open to new opportunities and collaborations. 
              Feel free to reach out via email or connect on social media!
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {/* Email Button */}
              <a 
                href={`mailto:${data.socials.email}`}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a 
                  href={data.socials.github} 
                  target="_blank" 
                  className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:border-slate-400 transition-colors text-slate-400 hover:text-white"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href={data.socials.linkedin} 
                  target="_blank" 
                  className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:border-slate-400 transition-colors text-slate-400 hover:text-white"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} {data.name}. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}

// Sub-component for Project Cards to handle individual description expansion
function ProjectCard({ project }: { project: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
        
        <div className="relative mt-2">
          <p className={`text-sm text-slate-400 leading-relaxed transition-all ${!isExpanded && "line-clamp-2"}`}>
            {project.description}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-400 mt-1 hover:underline flex items-center gap-1"
          >
            {isExpanded ? <>Read Less <ChevronUp size={12}/></> : <>Read More <ChevronDown size={12}/></>}
          </button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tag: string, i: number) => (
            <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">{tag}</span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <a href={project.link} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-blue-400 transition-colors"><ExternalLink className="w-3.5 h-3.5" /> Demo</a>
          <a href={project.github} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"><Github className="w-3.5 h-3.5" /> Source</a>
        </div>
      </div>
    </div>
  );
}