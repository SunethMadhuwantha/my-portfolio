"use client";
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FileDown, ArrowRight, Sparkles, Terminal, Code2 } from 'lucide-react';

interface HeroProps {
  name: string;
  role: string;
  about: string;
}

export default function Hero({ name, role, about }: HeroProps) {
  // Correctly typed Variants to remove the red underline error
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 lg:px-24 bg-[#030712] overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT CONTENT --- */}
        <div className="order-2 lg:order-1 space-y-8">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-500/50" />
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase">
              PORTFOLIO
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              I am <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-slate-500">
                {name}
              </span>
            </motion.h1>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
              <Terminal size={12} className="text-blue-400" />
              <span className="text-blue-100 font-mono text-xs font-bold tracking-wider uppercase">{role}</span>
            </motion.div>
          </div>

          <motion.p 
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-medium border-l-2 border-slate-800 pl-6"
          >
            {about}
          </motion.p>
          
          <motion.div 
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-5 pt-4"
          >
            {/* Action-Oriented Buttons */}
            <a href="/resume.pdf" className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-white text-black font-black text-xs tracking-widest transition-all hover:pr-12">
              <span className="relative z-10 flex items-center gap-2">
                DOWNLOAD_CV <FileDown size={16} />
              </span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                 <ArrowRight size={16} />
              </div>
            </a>

            <a href="#projects" className="group relative px-8 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md text-white font-bold text-xs tracking-widest hover:border-blue-500/50 transition-all flex items-center gap-2">
              VIEW_PROJECTS
              <Code2 size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
              {/* Subtle bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 lg:order-2 relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-[500px] aspect-[4/5] group">
            {/* Animated Background Aura */}
            <div className="absolute -inset-4 bg-blue-500/10 rounded-[4rem] blur-3xl animate-pulse" />
            
            {/* The Image Container */}
            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <Image
                src="/me.jpg"
                alt={name}
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                priority
              />
              
              {/* Modern Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3.5rem]" />
            </div>

            {/* Floating Specialist Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:-left-8 p-5 bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-[9px] text-blue-400 font-black tracking-widest uppercase">Expertise</p>
                  <p className="text-white font-bold text-base leading-none">AI & DevOps</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}