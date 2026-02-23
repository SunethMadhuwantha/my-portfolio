"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Globe, Clock, Phone, ArrowUpRight, Send, Hash } from 'lucide-react';

export default function Contact({ socials }: { socials: any }) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hour12: true 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MediumIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2.846 6.887c.03-.173-.051-.347-.21-.439L.48 5.145V4.82h6.697l5.203 11.412 4.704-11.412h6.326v.325l-1.923 1.84a.432.432 0 0 0-.164.415v10.869a.43.43 0 0 0 .164.415l1.89 1.815v.325h-9.09v-.325l1.923-1.84a.432.432 0 0 0 .164-.415V8.529l-5.334 13.111h-.627L4.22 8.529v8.44c-.012.23.069.457.227.62l2.365 2.862v.325H1.411v-.325l2.365-2.862a.647.647 0 0 0 .15-.469V6.887z"/>
    </svg>
  );

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24 relative bg-[#030712]">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 space-y-8"
      >
        {/* --- COMPACT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-500 font-mono text-[9px] uppercase tracking-[0.3em]">
              <Hash size={10} /> Contact / Index
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Let's build <span className="text-slate-500 font-light italic">something.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-slate-500 font-mono text-[8px] uppercase tracking-widest">Availability</p>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                   <span className="text-white text-[11px] font-bold">READY FOR HIRE</span>
                </div>
             </div>
          </div>
        </div>

        {/* --- MAIN HUB GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* EMAIL COMPONENT (Larger but Sleeker) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-1">Electronic Mail</p>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {socials.email}
                </h3>
                <p className="mt-2 text-slate-500 text-[11px] italic">Send a brief or just say hi—usually active daily.</p>
              </div>
              <button onClick={copyEmail} className="p-2 text-slate-500 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
            
            <div className="mt-8">
              <a href={`mailto:${socials.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all">
                Initiate Conversation <Send size={14} />
              </a>
            </div>
          </div>

          {/* SOCIALS - SCALED DOWN TAB DESIGN */}
          <div className="flex flex-col gap-2">
            {[
              { label: 'LINKEDIN', icon: <Linkedin size={14} />, link: socials.linkedin },
              { label: 'GITHUB', icon: <Github size={14} />, link: socials.github },
              { label: 'MEDIUM', icon: <MediumIcon className="w-3.5 h-3.5" />, link: `https://medium.com/@${socials.medium}` }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/20 border border-slate-800/40 hover:border-slate-700 hover:bg-slate-800/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 group-hover:text-blue-500 transition-colors">{social.icon}</span>
                  <span className="text-slate-400 font-bold text-[10px] tracking-widest group-hover:text-white transition-colors">{social.label}</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-700 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
            
            {/* Phone as a Social Tab */}
            <a href="tel:+947XXXXXXXX" className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-all group">
               <Phone size={14} className="text-blue-500" />
               <span className="text-blue-200 font-bold text-[10px] tracking-widest">+94 78 373 7040</span>
            </a>
          </div>
        </div>

        {/* --- MINIMALIST SYSTEM INFO --- */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 text-slate-500 border-t border-slate-800/60 font-mono text-[9px] uppercase tracking-widest">
           <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Globe size={12} /> <span className="text-slate-400">COLOMBO, LK</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} /> <span className="text-slate-400">{time}</span>
              </div>
           </div>
           
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="fixed bottom-8 right-8 z-[300] px-5 py-2.5 bg-slate-900 border border-slate-700 text-white rounded-xl text-[10px] font-bold tracking-widest flex items-center gap-3 shadow-2xl"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            COPIED_TO_CLIPBOARD
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}