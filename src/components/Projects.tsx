"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code2, LayoutGrid } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

export default function Projects({ projects }: { projects: any[] }) {
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 6;

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-8 bg-[#030712]">
      
      {/* --- NEW DYNAMIC HEADER --- */}
      <div className="relative mb-24 flex flex-col items-center text-center md:items-start md:text-left">
        {/* Decorative Background Element */}
        <span className="absolute -left-4 -top-12 text-[120px] font-black text-white/2 select-none pointer-events-none hidden md:block">
          02
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <Code2 size={14} className="animate-pulse" /> 
          Selected_Works /
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Recent <span className="text-slate-700 italic font-light">Work.</span>
          </h2>
          
          <div className="hidden md:flex flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-xl backdrop-blur-sm">
            <LayoutGrid size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Index: {projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.slice(0, showAll ? undefined : LIMIT).map((project, i) => (
            <motion.div
              key={project.id || i} // Use project.id if available
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- VIEW ALL BUTTON --- */}
      {projects.length > LIMIT && (
        <motion.div layout className="mt-20 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)} 
            className="group relative flex items-center gap-3 px-10 py-4 bg-slate-950 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors">
              {showAll ? 'Collapse Gallery' : 'Explore All Projects'}
            </span>
            
            <div className={`relative transition-transform duration-500 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
              {showAll ? <ChevronUp size={16} className="text-blue-500" /> : <ChevronDown size={16} className="text-blue-500" />}
            </div>
          </button>
        </motion.div>
      )}
    </section>
  );
}