"use client"; // This must be the first line

import Image from 'next/image';
import data from '../data/portfolio.json';
import { Award, Code2, Github, Linkedin, Mail, ExternalLink ,Menu, X} from 'lucide-react';
import { motion } from 'framer-motion';      // Added for animations
import { FileDown } from 'lucide-react'; // Add this to your lucide imports

import { useState } from 'react'; // For mobile menu toggle


export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Name */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
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

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {data.projects.map((project, index) => (
      <div 
        key={index} 
        className="group relative flex flex-col rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
      >
        {/* Project Cover Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image || "/api/placeholder/400/200"} // Fallback if image is missing
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Card Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-4 text-slate-400 leading-relaxed">
            {project.description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tag, tagIndex) => (
              <span key={`${tag}-${tagIndex}`} className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Icons/Links */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-6">
            <a 
              href={project.link} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            <a 
              href={project.github} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
      {/* 3. Certifications Section */}
<section id="certifications" className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
    Certifications <div className="h-px flex-1 bg-slate-800" />
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.certifications.map((cert, index) => (
      <div 
        key={index} 
        className="p-6 rounded-2xl bg-slate-900/20 border border-slate-800 hover:bg-slate-900/60 transition-colors group"
      >
        <div className="flex flex-col gap-1">
          
          {/* NEW SECTION: Icon + Issuer */}
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-xs font-mono tracking-widest uppercase">
              {cert.issuer}
            </span>
          </div>

          <h3 className="text-lg font-bold group-hover:text-white transition-colors">
            {cert.name}
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Issued: {cert.date}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
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