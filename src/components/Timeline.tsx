"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronDown, FileText, X } from 'lucide-react';

export default function Timeline({ experience, education }: { experience: any[], education: any[] }) {
  const [activeTab, setActiveTab] = useState<'exp' | 'edu'>('exp');
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const POINT_LIMIT = 3;

  return (
    <section id="resume" className="max-w-6xl mx-auto px-6 py-20">
      {/* 1. SECTION TOPIC (The missing piece!) */}
      <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
        Experience & Education <div className="h-px flex-1 bg-slate-800" />
      </h2>

      {/* 2. TAB TOGGLES */}
      <div className="flex justify-center mb-16">
        <div className="flex p-1 bg-slate-900/50 border border-slate-800 rounded-xl">
          <button 
            onClick={() => setActiveTab('exp')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'exp' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Briefcase size={16} /> Experience
          </button>
          <button 
            onClick={() => setActiveTab('edu')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'edu' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <GraduationCap size={16} /> Education
          </button>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="max-w-3xl mx-auto relative border-l-2 border-slate-800 ml-4 md:ml-6">
        <AnimatePresence mode="wait">
          {activeTab === 'exp' ? (
            <motion.div key="exp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
              {experience.map((item, idx) => {
                const isExpanded = expandedExp === idx;
                const displayedPoints = isExpanded ? item.description : item.description.slice(0, POINT_LIMIT);
                const hasMore = item.description.length > POINT_LIMIT;

                return (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{item.duration}</span>
                    <h4 className="text-xl font-bold text-white mt-1">{item.role}</h4>
                    <p className="text-slate-400 font-medium mb-4">{item.company}</p>
                    
                    <ul className="space-y-2">
                      {displayedPoints.map((bullet: string, i: number) => (
                        <li key={i} className="text-sm text-slate-400 flex gap-2">
                          <span className="text-blue-500 shrink-0">•</span> {bullet}
                        </li>
                      ))}
                    </ul>
                    
                    {hasMore && (
                      <button 
                        onClick={() => setExpandedExp(isExpanded ? null : idx)}
                        className="text-xs text-blue-400 mt-3 flex items-center gap-1 hover:text-blue-300 font-semibold"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'} 
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2 mt-5">
                      {item.tech?.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] bg-blue-500/5 border border-blue-500/20 text-blue-300 rounded uppercase font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div key="edu" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
              {education.map((item, idx) => {
                const isExpanded = expandedEdu === idx;
                const points = Array.isArray(item.description) ? item.description : [item.description];
                const displayedPoints = isExpanded ? points : points.slice(0, POINT_LIMIT);
                const hasMore = points.length > POINT_LIMIT;

                return (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{item.year}</span>
                    <h4 className="text-xl font-bold text-white mt-1">{item.degree}</h4>
                    <p className="text-slate-400 mb-3">{item.school}</p>
                    
                    <ul className="space-y-2">
                      {displayedPoints.map((bullet: string, i: number) => (
                        <li key={i} className="text-sm text-slate-400 flex gap-2">
                          <span className="text-blue-500 shrink-0">•</span> {bullet}
                        </li>
                      ))}
                    </ul>
                    
                    {hasMore && (
                      <button 
                        onClick={() => setExpandedEdu(isExpanded ? null : idx)}
                        className="text-xs text-blue-400 mt-3 flex items-center gap-1 hover:text-blue-300 font-semibold"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'} 
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    {item.transcript && (
                      <button 
                        onClick={() => setSelectedTranscript(item.transcript)}
                        className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white hover:border-blue-500 transition-all"
                      >
                        <FileText size={14} className="text-blue-400" /> View Transcript
                      </button>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MODAL */}
      <AnimatePresence>
        {selectedTranscript && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTranscript(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-4xl w-full h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button onClick={() => setSelectedTranscript(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"><X size={20}/></button>
              <iframe src={selectedTranscript} className="w-full h-full border-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}