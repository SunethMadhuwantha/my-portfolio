"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectCard({ project }: { project: Project }) {
  const [curr, setCurr] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const images = Array.isArray(project.images) ? project.images : [project.images];

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => setCurr((c) => (c === images.length - 1 ? 0 : c + 1)), 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      {/* Slider Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${curr * 100}%)` }}>
          {images.map((img, i) => (
            <div key={i} className="relative min-w-full h-full">
              <Image src={img} alt={project.title} fill className="object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); setCurr(curr === 0 ? images.length - 1 : curr - 1)}} className="p-1 rounded-full bg-black/60 text-white hover:bg-blue-500"><ChevronLeft size={18}/></button>
            <button onClick={(e) => { e.stopPropagation(); setCurr(curr === images.length - 1 ? 0 : curr + 1)}} className="p-1 rounded-full bg-black/60 text-white hover:bg-blue-500"><ChevronRight size={18}/></button>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className={`text-sm text-slate-400 ${!isExpanded && "line-clamp-2"}`}>{project.description}</p>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-blue-400 mt-2 flex items-center gap-1">
          {isExpanded ? "Less" : "More"} <ChevronDown className={isExpanded ? "rotate-180" : ""} size={12}/>
        </button>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded border border-slate-700">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}