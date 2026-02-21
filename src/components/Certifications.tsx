"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react';
import { Certification } from '@/types';

interface CertsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertsProps) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const DISPLAY_LIMIT = 6;

  return (
    <section id="certifications" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
        Certifications <div className="h-px flex-1 bg-slate-800" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.slice(0, showAllCerts ? undefined : DISPLAY_LIMIT).map((cert, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedCert(cert)}
            className="flex items-stretch rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/40 transition-all cursor-pointer group overflow-hidden"
          >
            {/* Badge Image Sidebar */}
            <div className="relative w-24 shrink-0 bg-slate-950/50 border-r border-slate-800">
              <Image 
                src={cert.image} 
                alt={cert.issuer} 
                fill 
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
              <p className="text-[10px] text-slate-500 mb-2 italic">{cert.date}</p>
              
              <div className="flex flex-wrap gap-1">
                {cert.skills?.map((skill, sIndex) => (
                  <span key={sIndex} className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length > DISPLAY_LIMIT && (
        <button 
          onClick={() => setShowAllCerts(!showAllCerts)}
          className="mt-8 mx-auto flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-all px-4 py-2 border border-slate-800 rounded-lg"
        >
          {showAllCerts ? <ChevronUp size={16}/> : <ChevronDown size={16}/>} 
          {showAllCerts ? "Show Less" : "View All Certifications"}
        </button>
      )}

      {/* Modal logic moved here to keep page.tsx clean */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            >
              <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/40 transition-all"><X size={20}/></button>
              <div className="relative aspect-[1.414/1] w-full bg-white"> 
                {selectedCert.fullCertificate ? (
                  <Image src={selectedCert.fullCertificate} alt="Official Certificate" fill className="object-contain" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">No Image Available</div>
                )}
              </div>
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-white font-bold">{selectedCert.title}</p>
                  <p className="text-xs text-slate-400">{selectedCert.issuer}</p>
                </div>
                <a href={selectedCert.verifyLink} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors flex items-center gap-2">
                  Verify <ExternalLink size={14}/>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}