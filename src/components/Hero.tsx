"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileDown, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  name: string;
  role: string;
  about: string;
}

export default function Hero({ name, role, about }: HeroProps) {
  // Fade + Slide animation for text
  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: 0.2 + i * 0.15,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    }),
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center py-20 px-6 lg:px-24 bg-[#020617] overflow-hidden">
      
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#3b82f610_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT CONTENT: Fading Text --- */}
        <div className="order-2 lg:order-1">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase mb-4 block">
              Portfolio 2026
            </span>
          </motion.div>

          <motion.h1 
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter"
          >
            I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-slate-500 animate-gradient-x">
              {name}
            </span>
          </motion.h1>

          <motion.p 
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-8 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mix-blend-plus-lighter"
          >
            <span className="text-white font-medium">{role}</span> — {about}
          </motion.p>
          
          <motion.div 
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-12 flex flex-wrap gap-4"
          >
            <a href="/resume.pdf" className="group relative px-8 py-4 rounded-full bg-white text-black font-black transition-all hover:bg-blue-500 hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <span className="flex items-center gap-2">
                DOWNLOAD CV <FileDown size={18} />
              </span>
            </a>
            <a href="#projects" className="px-8 py-4 rounded-full border border-slate-800 text-white font-bold hover:bg-white/5 backdrop-blur-sm transition-all flex items-center gap-2">
              MY WORK <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* --- RIGHT CONTENT: Soft Blended Photo --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="order-1 lg:order-2 relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-[480px] aspect-square group">
            {/* The "Glow" behind the photo that mixes with the background */}
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[80px] animate-pulse" />
            
            {/* Image Mask Wrapper */}
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden">
              <Image
                src="/me.jpg"
                alt={name}
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                priority
              />
              
              {/* This is the key: The mix-blend overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/20 mix-blend-multiply" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem]" />
            </div>

            {/* Floating Element that mixes in */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:right-0 p-6 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <Sparkles className="text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Specialty</p>
                  <p className="text-white font-black text-lg leading-none">UI Design</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}