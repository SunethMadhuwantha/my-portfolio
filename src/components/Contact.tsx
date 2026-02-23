"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Globe, Clock, Phone, ArrowUpRight, Send, Hash, MessageSquare } from 'lucide-react';

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
    <section id="contact" className="py-8 bg-[#030712] overflow-hidden">
      
      {/* --- NEW DYNAMIC HEADER (UNIFIED DESIGN) --- */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start text-left">
        {/* Large Decorative Background Label */}
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none hidden md:block uppercase">
          Link
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <MessageSquare size={14} className="text-blue-500" /> 
          Comm_Channels / v.1.0
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Let's <span className="text-slate-700 italic font-light">Build.</span>
          </h2>
          
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Ready for Hire
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-8"
        >
          {/* --- MAIN HUB GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* EMAIL COMPONENT */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/20 border border-slate-800/40 backdrop-blur-md flex flex-col justify-between group transition-all hover:border-blue-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-2">Electronic Mail</p>
                  <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {socials.email}
                  </h3>
                  <p className="mt-3 text-slate-500 text-xs italic">Usually active daily. Response within 24 hours.</p>
                </div>
                <button onClick={copyEmail} className="p-3 rounded-xl bg-slate-800/40 text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
              
              <div className="mt-12">
                <a href={`mailto:${socials.email}`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                  Initiate Conversation <Send size={16} />
                </a>
              </div>
            </div>

            {/* SOCIALS - TAB DESIGN */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'LINKEDIN', icon: <Linkedin size={16} />, link: socials.linkedin },
                { label: 'GITHUB', icon: <Github size={16} />, link: socials.github },
                { label: 'MEDIUM', icon: <MediumIcon className="w-4 h-4" />, link: `https://medium.com/@${socials.medium}` }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/10 border border-slate-800/40 hover:border-blue-500/40 hover:bg-slate-900/40 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 group-hover:text-blue-500 transition-colors">{social.icon}</span>
                    <span className="text-slate-400 font-black text-[11px] tracking-[0.2em] group-hover:text-white transition-colors">{social.label}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-700 group-hover:text-white transition-all" />
                </a>
              ))}
              
              <a href="tel:+947XXXXXXXX" className="flex items-center gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-all group">
                 <Phone size={16} className="text-blue-500" />
                 <span className="text-blue-200 font-black text-[11px] tracking-[0.2em]">+94 78 373 7040</span>
              </a>
            </div>
          </div>

          {/* --- SYSTEM INFO FOOTER --- */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-10 text-slate-600 border-t border-slate-800/40 font-mono text-[9px] uppercase tracking-[0.4em]">
             <div className="flex gap-10">
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-blue-500/50" /> <span className="text-slate-500">COLOMBO, LK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-blue-500/50" /> <span className="text-slate-500">{time}</span>
                </div>
             </div>
             <div className="text-slate-700 italic">
               © 2026 / All Rights Reserved
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="fixed bottom-8 right-8 z-[300] px-6 py-3 bg-slate-900 border border-slate-700 text-white rounded-2xl text-[10px] font-black tracking-widest flex items-center gap-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e]" />
            COPIED_TO_CLIPBOARD
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}