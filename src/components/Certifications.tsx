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
      
      {/* --- HEADER --- */}
      <div className="relative mb-24 flex flex-col items-start text-left">
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

              {/* Grid Thumbnail uses the Badge Icon */}
              <div className="relative w-24 shrink-0 bg-slate-950/40 border-r border-slate-800/50 overflow-hidden">
                <Image 
                  src={cert.image} 
                  alt={cert.issuer} 
                  fill 
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex-1 p-5 min-w-0 flex flex-col justify-center relative z-10">
                <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors tracking-tight leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cert.issuer}</p>
                <p className="text-[10px] text-slate-600 mb-3 font-mono">{cert.date}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cert.skills?.slice(0, 4).map((skill, sIndex) => (
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

      {/* --- TOGGLE --- */}
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

      {/* --- MODAL (Full Certificate Image Version) --- */}
      {/* --- MODAL (Full Certificate + Description) --- */}
<AnimatePresence>
  {selectedCert && (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={() => setSelectedCert(null)} 
        className="absolute inset-0 bg-black/98 backdrop-blur-xl" 
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ y: "100%", opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full h-dvh md:h-auto md:max-h-[90vh] md:max-w-6xl bg-[#0a0a0c] md:rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/5"
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelectedCert(null)} 
          className="absolute top-4 right-4 z-180 p-3 bg-black/50 text-white rounded-full backdrop-blur-md border border-white/10 hover:bg-red-500 transition-colors"
        >
          <X size={24}/>
        </button>

        {/* Content Body: Flex-col on mobile, Flex-row on desktop */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT/TOP: Certificate Image Area */}
          <div className="flex-[1.5] bg-slate-950 p-4 md:p-12 overflow-y-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
            <img 
              src={selectedCert.fullCertificate} 
              alt={selectedCert.title} 
              className="w-full h-auto max-h-full object-contain rounded shadow-2xl"
            />
          </div>

          {/* RIGHT/BOTTOM: Details & Description */}
          <div className="flex-1 p-6 md:p-10 bg-[#0d0d0f] overflow-y-auto flex flex-col">
            <div className="mb-8">
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] block mb-2">Detailed_Curriculum</span>
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight mb-2">
                {selectedCert.title}
              </h4>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {selectedCert.issuer} • {selectedCert.date}
              </p>
            </div>

            {/* DESCRIPTION BOX */}
            <div className="relative group mb-8">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-600 rounded-full" />
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium pl-2">
                {selectedCert.description || "No description provided for this credential."}
              </p>
            </div>

            {/* SKILLS TAGS IN POPUP */}
            <div className="mt-auto pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-4">Acquired_Skills:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Verify Button */}
        <div className="p-5 md:p-6 bg-[#050507] border-t border-white/5 flex justify-end items-center shrink-0">
          <a 
            href={selectedCert.verifyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            Authenticate Credential <ExternalLink size={14}/>
          </a>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </section>
  );
}