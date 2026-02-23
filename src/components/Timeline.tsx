"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronDown, FileText, X, Terminal, Calendar, Clock, History } from 'lucide-react';

export default function Timeline({ experience, education }: { experience: any[], education: any[] }) {
  const [activeTab, setActiveTab] = useState<'exp' | 'edu'>('exp');
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const POINT_LIMIT = 2;

  return (
    <section id="resume" className="py-8 bg-[#030712] overflow-hidden">
      
      {/* --- NEW DYNAMIC HEADER (UNIFIED DESIGN) --- */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start text-left">
        {/* Large Decorative Background Label */}
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/2 select-none pointer-events-none hidden md:block uppercase">
          Path
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <History size={14} className="text-blue-500" /> 
          Registry_Logs / Career_Timeline
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Experience & <span className="text-slate-700 italic font-light">Education.</span>
          </h2>
          
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <Terminal size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              History_Loaded
            </span>
          </div>
        </div>
      </div>

      {/* --- TAB TOGGLES --- */}
      <div className="flex justify-center mb-24">
        <div className="inline-flex p-1.5 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-xl">
          {[
            { id: 'exp', label: 'Experience', icon: <Briefcase size={14} /> },
            { id: 'edu', label: 'Education', icon: <GraduationCap size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- TIMELINE AREA --- */}
      <div className="max-w-4xl mx-auto relative px-6">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/50 via-slate-800 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {(activeTab === 'exp' ? experience : education).map((item, idx) => {
              const isExp = activeTab === 'exp';
              const isExpanded = isExp ? expandedExp === idx : expandedEdu === idx;
              const points = Array.isArray(item.description) ? item.description : [item.description];
              const displayedPoints = isExpanded ? points : points.slice(0, POINT_LIMIT);
              const hasMore = points.length > POINT_LIMIT;

              return (
                <div key={idx} className="relative pl-10 md:pl-24 group">
                  <div className="absolute -left-1 md:left-7 top-10 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10" />

                  <div className="p-8 md:p-10 rounded-[2.5rem] bg-slate-900/10 border border-slate-800/40 hover:border-blue-500/20 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                    
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar size={12} className="text-blue-500" />
                        <span className="text-blue-500 font-mono text-[11px] font-black uppercase tracking-[0.2em]">
                            {isExp ? item.duration : item.year}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                          {isExp ? item.role : item.degree}
                        </h4>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                          {isExp ? item.company : item.school}
                        </p>
                      </div>
                      
                      {!isExp && item.transcript && (
                        <button 
                          onClick={() => setSelectedTranscript(item.transcript)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
                        >
                          <FileText size={14} /> TRANSCRIPT
                        </button>
                      )}
                    </div>

                    <div className="space-y-4 relative">
                      {displayedPoints.map((bullet: string, i: number) => (
                        <div key={i} className="flex gap-4 group/item">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                          <p className="text-slate-400 text-[15px] leading-relaxed font-medium">
                            {bullet}
                          </p>
                        </div>
                      ))}

                      {hasMore && (
                        <button 
                          onClick={() => isExp ? setExpandedExp(isExpanded ? null : idx) : setExpandedEdu(isExpanded ? null : idx)}
                          className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'View Full Details'}
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {isExp && item.tech && (
                      <div className="mt-10 pt-8 border-t border-slate-800/50">
                        <p className="text-slate-600 font-mono text-[9px] uppercase tracking-widest mb-4">Stack / Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t: string) => (
                            <span key={t} className="px-3 py-1 text-[9px] bg-slate-800/40 border border-slate-700/50 text-slate-400 rounded-lg font-black tracking-widest uppercase">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedTranscript && (
          <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTranscript(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
              <button onClick={() => setSelectedTranscript(null)} className="absolute top-6 right-6 z-10 p-2 text-slate-400 hover:text-white transition-colors"><X size={24}/></button>
              <iframe src={selectedTranscript} className="w-full h-full border-none" title="Transcript Viewer" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}