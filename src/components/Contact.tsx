"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Globe, Clock, Phone, ArrowUpRight, Cpu, Zap } from 'lucide-react';

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
    <section id="contact" className="max-w-6xl mx-auto px-6 py-32 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-16"
      >
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase">
            <Zap size={12} className="fill-current" /> available for hire
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            GET IN <br /> <span className="text-slate-800 outline-text">TOUCH.</span>
          </h2>
        </div>

        {/* --- MAIN GRID HUB --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main CTA: Email */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-8 p-10 rounded-[2.5rem] bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Mail size={320} />
            </div>
            
            <div>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-8">Drop a message</p>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight break-all">
                {socials.email}
              </h3>
            </div>

            <div className="flex flex-wrap gap-4 mt-16">
              <a href={`mailto:${socials.email}`} className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-blue-500 hover:text-white transition-all">
                Write Email
              </a>
              <button onClick={copyEmail} className="px-8 py-4 bg-slate-800/50 text-white rounded-2xl font-bold text-sm hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700/50">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy Email"}
              </button>
            </div>
          </motion.div>

          {/* Socials Block */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {[
              { label: 'LinkedIn', icon: <Linkedin size={20} />, link: socials.linkedin, color: 'hover:text-blue-400' },
              { label: 'GitHub', icon: <Github size={20} />, link: socials.github, color: 'hover:text-white' },
              { label: 'Medium', icon: <MediumIcon className="w-5 h-5" />, link: `https://medium.com/@${socials.medium}`, color: 'hover:text-slate-200' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                whileHover={{ x: 10 }}
                className={`p-6 rounded-[2rem] bg-slate-900/30 border border-slate-800/50 flex items-center justify-between group transition-all ${social.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-slate-500 group-hover:text-inherit transition-colors">
                    {social.icon}
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight">{social.label}</span>
                </div>
                <ArrowUpRight size={18} className="text-slate-700 group-hover:text-inherit" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* --- REFINED INFO BAR (Smaller & Sleeker) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/50">
          <div className="col-span-1">
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em] mb-2">Location</p>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Globe size={14} className="text-blue-500" /> Colombo, LK
            </div>
          </div>
          
          <div className="col-span-1">
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em] mb-2">Current Time</p>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Clock size={14} className="text-blue-500" /> {time}
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 flex md:justify-end items-center">
            <a href="tel:+947XXXXXXXX" className="group flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em]">Contact Number</p>
                <p className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">+94 7X XXX XXXX</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Success Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-xs shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center gap-2 border border-blue-400/50"
          >
            <Check size={14} /> Copied to Clipboard
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #1e293b;
          text-stroke: 1px #1e293b;
        }
      `}</style>
    </section>
  );
}