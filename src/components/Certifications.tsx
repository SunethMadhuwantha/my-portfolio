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
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-150 flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)} className="absolute inset-0 bg-black/98 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl"
            >
              <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 z-20 p-3 bg-black/50 rounded-full text-white hover:bg-blue-600 transition-all backdrop-blur-md border border-white/10"><X size={20}/></button>
              
              <div className="relative aspect-[1.414/1] w-full bg-white"> 
                {selectedCert.fullCertificate ? (
                  <Image src={selectedCert.fullCertificate} alt="Official Certificate" fill className="object-contain p-2" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 font-mono text-xs uppercase">Source_Not_Found</div>
                )}
              </div>

              <div className="p-8 md:p-10 bg-slate-900 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-black text-white tracking-tighter mb-1">{selectedCert.title}</h4>
                  <p className="text-xs font-mono text-blue-500 uppercase tracking-[0.2em] font-bold">
                    {selectedCert.issuer} <span className="text-slate-700 mx-2">|</span> {selectedCert.date}
                  </p>
                </div>
                <a href={selectedCert.verifyLink} target="_blank" className="shrink-0 px-10 py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center gap-3">
                  Verify Authenticity <ExternalLink size={14}/>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}