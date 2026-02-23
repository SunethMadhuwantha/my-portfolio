"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, X, ShieldCheck, Award } from 'lucide-react';
import { Certification } from '@/types';

interface CertsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertsProps) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const DISPLAY_LIMIT = 6;

  return (
    <section id="certifications" className="max-w-6xl mx-auto px-6 py-8 bg-[#030712]">
      
      {/* --- NEW DYNAMIC HEADER (LEFT ALIGNED) --- */}
      <div className="relative mb-24 flex flex-col items-start text-left">
        {/* Large Decorative Background Label (Positioned Left) */}
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/2 select-none pointer-events-none hidden md:block uppercase">
          Cert.
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <ShieldCheck size={14} className="text-blue-500" /> 
          Verified_Credentials / 
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Licensing & <span className="text-slate-700 italic font-light">Awards.</span>
          </h2>
          
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <Award size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              {certifications.length} Authenticated
            </span>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {certifications.slice(0, showAllCerts ? undefined : DISPLAY_LIMIT).map((cert, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={index} 
              onClick={() => setSelectedCert(cert)}
              className="flex items-stretch rounded-2xl bg-slate-900/20 border border-slate-800/50 hover:border-blue-500/60 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Badge Image Sidebar - Full Color Default */}
              <div className="relative w-24 shrink-0 bg-slate-950/40 border-r border-slate-800/50 overflow-hidden">
                <Image 
                  src={cert.image} 
                  alt={cert.issuer} 
                  fill 
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-115" 
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-5 min-w-0 flex flex-col justify-center relative z-10">
                <h3 className="text-sm font-black text-white truncate group-hover:text-blue-400 transition-colors tracking-tight">
                  {cert.title}
                </h3>
                
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{cert.issuer}</p>
                <p className="text-[10px] text-slate-600 mb-3 font-mono">{cert.date}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills?.slice(0, 3).map((skill, sIndex) => (
                    <span key={sIndex} className="text-[8px] px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-bold uppercase tracking-tighter group-hover:border-blue-500/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- TOGGLE BUTTON --- */}
      {certifications.length > DISPLAY_LIMIT && (
        <div className="mt-16 flex justify-center">
            <button 
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all px-10 py-4 border border-slate-800/50 rounded-full hover:bg-slate-900 hover:border-blue-500/50"
            >
                <div className={`transition-transform duration-300 ${showAllCerts ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                  {showAllCerts ? <ChevronUp size={14} className="text-blue-500"/> : <ChevronDown size={14} className="text-blue-500"/>} 
                </div>
                {showAllCerts ? "Minimize Archive" : "Expand Full Registry"}
            </button>
        </div>
      )}

      {/* --- MODAL --- */}
{/* --- MODAL --- */}
<AnimatePresence>
  {selectedCert && (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 md:p-10">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={() => setSelectedCert(null)} 
        className="absolute inset-0 bg-black/95 backdrop-blur-md" 
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-6xl max-h-[95vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
      >
        {/* Close Button - Moved to corner with higher contrast */}
        <button 
          onClick={() => setSelectedCert(null)} 
          className="absolute top-5 right-5 z-50 p-2 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-lg"
        >
          <X size={24}/>
        </button>
        
        {/* Image Container - This is the fix */}
        <div className="flex-1 overflow-y-auto bg-white p-2 md:p-6 flex justify-center items-start custom-scrollbar"> 
          {selectedCert.fullCertificate ? (
            <div className="relative w-full min-h-full">
               <img 
                src={selectedCert.fullCertificate} 
                alt="Official Certificate" 
                className="w-full h-auto object-contain rounded-sm"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-400 font-mono text-xs uppercase">Source_Not_Found</div>
          )}
        </div>

        {/* Footer - Slightly more compact to give image more room */}
        <div className="p-5 md:p-8 bg-slate-900 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-black text-white tracking-tighter">{selectedCert.title}</h4>
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">
              {selectedCert.issuer} • {selectedCert.date}
            </p>
          </div>
          <a 
            href={selectedCert.verifyLink} 
            target="_blank" 
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
          >
            Verify Online <ExternalLink size={14}/>
          </a>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </section>
  );
}