"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';

export default function Navbar({ name, socials }: { name: string, socials: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-blue-400">
          {name.split(' ')[0]}.dev
        </motion.div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <div className="flex gap-4 border-l border-slate-800 pl-8">
            <a href={socials.github} target="_blank"><Github className="w-5 h-5" /></a>
            <a href={socials.linkedin} target="_blank"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4">
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#certifications" onClick={() => setIsOpen(false)}>Certifications</a>
          <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
        </div>
      )}
    </nav>
  );
}
