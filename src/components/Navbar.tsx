"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';

export default function Navbar({ name, socials }: { name: string, socials: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // The high-fidelity Medium M logo you approved
  const MediumIcon = ({ size = 18 }: { size?: number }) => (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.846 6.887c.03-.173-.051-.347-.21-.439L.48 5.145V4.82h6.697l5.203 11.412 4.704-11.412h6.326v.325l-1.923 1.84a.432.432 0 0 0-.164.415v10.869a.43.43 0 0 0 .164.415l1.89 1.815v.325h-9.09v-.325l1.923-1.84a.432.432 0 0 0 .164-.415V8.529l-5.334 13.111h-.627L4.22 8.529v8.44c-.012.23.069.457.227.62l2.365 2.862v.325H1.411v-.325l2.365-2.862a.647.647 0 0 0 .15-.469V6.887z"/>
    </svg>
  );

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Name Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-blue-400">
          {name.split(' ')[0]}.dev
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#writing" className="hover:text-white transition-colors">Blogs</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          
          <div className="flex gap-5 border-l border-slate-800 pl-8 items-center h-5">
            <a href={socials.github} target="_blank" className="hover:text-white transition-all">
              <Github size={18} />
            </a>
            <a href={socials.linkedin} target="_blank" className="hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href={`https://medium.com/@${socials.medium}`} target="_blank" className="hover:text-white transition-all flex items-center">
              <MediumIcon />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 text-slate-400 font-medium">
              <a href="#hero" onClick={() => setIsOpen(false)}>About</a>
              <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
              <a href="#writing" onClick={() => setIsOpen(false)}>Blogs</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
            
            <div className="flex gap-6 pt-4 border-t border-slate-800">
              <a href={socials.github} target="_blank" className="text-slate-400"><Github size={22} /></a>
              <a href={socials.linkedin} target="_blank" className="text-slate-400"><Linkedin size={22} /></a>
              <a href={`https://medium.com/@${socials.medium}`} target="_blank" className="text-slate-400 flex items-center">
                <MediumIcon size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}