"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Globe, Clock, Phone, ArrowUpRight, Cpu } from 'lucide-react';

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

  // High-fidelity Solid Medium Monogram
  const MediumIcon = ({ className }: { className?: string }) => (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.846 6.887c.03-.173-.051-.347-.21-.439L.48 5.145V4.82h6.697l5.203 11.412 4.704-11.412h6.326v.325l-1.923 1.84a.432.432 0 0 0-.164.415v10.869a.43.43 0 0 0 .164.415l1.89 1.815v.325h-9.09v-.325l1.923-1.84a.432.432 0 0 0 .164-.415V8.529l-5.334 13.111h-.627L4.22 8.529v8.44c-.012.23.069.457.227.62l2.365 2.862v.325H1.411v-.325l2.365-2.862a.647.647 0 0 0 .15-.469V6.887z"/>
    </svg>
  );

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-32 relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[grid-white_40px]" />

      <div className="flex flex-col gap-12">
        {/* --- HEADER PART --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 font-mono text-xs mb-4">
              <Cpu size={14} className="animate-spin-slow" /> // CONNECTION_ESTABLISHED
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              Let's build <span className="text-slate-500">the next</span> big thing.
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs text-sm leading-relaxed border-l border-slate-800 pl-6">
            Currently looking for ambitious projects where I can push the limits of modern web tech.
          </p>
        </div>

        {/* --- THE BENTO HUB --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Email Card (Interactive) */}
          <motion.div 
            className="md:col-span-8 p-8 md:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between group hover:border-blue-500/30 transition-all overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
               <Mail size={180} />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Direct Inbox</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mt-4 tracking-tight group-hover:text-blue-400 transition-colors">
                {socials.email}
              </h3>
            </div>
            <div className="flex gap-4 mt-12 relative z-10">
              <a href={`mailto:${socials.email}`} className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg">Send Email</a>
              <button onClick={copyEmail} className="px-6 py-3 bg-slate-800 text-white rounded-full font-bold text-sm hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </motion.div>

          {/* Socials Column */}
          <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-4">
            <a href={socials.linkedin} target="_blank" className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-center justify-center md:justify-between group hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <Linkedin size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-white font-bold hidden md:block">LinkedIn</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-700 hidden md:block group-hover:text-white transition-colors" />
            </a>

            <a href={socials.github} target="_blank" className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-center justify-center md:justify-between group hover:border-white/50 transition-all">
              <div className="flex items-center gap-4">
                <Github size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-white font-bold hidden md:block">GitHub</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-700 hidden md:block group-hover:text-white transition-colors" />
            </a>

            <a href={`https://medium.com/@${socials.medium}`} target="_blank" className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-center justify-center md:justify-between group hover:border-slate-100 transition-all">
              <div className="flex items-center gap-4">
                {/* Updated Solid Medium Icon */}
                <MediumIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-white font-bold hidden md:block">Medium</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-700 hidden md:block group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Location & Contact Info Footer Cards */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-slate-900/20 border border-slate-800 flex items-center gap-6">
             <div className="p-4 rounded-2xl bg-blue-500/5 text-blue-500"><Globe size={24}/></div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Colombo</p>
                <p className="text-white font-medium">Sri Lanka</p>
             </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl bg-slate-900/20 border border-slate-800 flex items-center gap-6">
             <div className="p-4 rounded-2xl bg-blue-500/5 text-blue-500"><Clock size={24}/></div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Local Time</p>
                <p className="text-white font-medium">{time}</p>
             </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl bg-slate-900/20 border border-slate-800 flex items-center gap-6 group cursor-pointer hover:border-blue-500/30 transition-all">
             <div className="p-4 rounded-2xl bg-blue-500/5 text-blue-500 group-hover:scale-110 transition-transform"><Phone size={24}/></div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">WhatsApp / Call</p>
                <p className="text-white font-medium">+94 7X XXX XXXX</p>
             </div>
          </div>

        </div>
      </div>

      {/* Modern success toast */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 20, opacity: 0 }} 
            className="fixed bottom-10 right-10 z-[200] px-6 py-4 bg-white text-black rounded-2xl font-bold shadow-2xl flex items-center gap-3 border border-slate-200"
          >
            <Check size={20} className="text-green-600" /> System: Email Copied
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}