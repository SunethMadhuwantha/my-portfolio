"use client";
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FileDown, ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
  name: string;
  role: string;
  about: string;
}

export default function Hero({ name, role, about }: HeroProps) {
  // Container to manage the sequence of letters
  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.06, // Slightly faster stagger for a "wave" effect
      },
    },
  };

  // High-bounce letter animation
  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -100, // Increased height for a more dramatic fall
      scale: 0.3 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,    // Balanced bounce
        stiffness: 200, // Snappier landing
      }
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 1.0 + i * 0.1, // Wait for the name bounce to complete
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-6 lg:px-24 bg-[#030712] overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.1]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* --- LEFT CONTENT --- */}
        <div className="order-2 lg:order-1 space-y-6">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-500/50" />
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase">
              PORTFOLIO
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              <motion.span 
                variants={fadeUp} 
                custom={1} 
                className="block text-4xl md:text-5xl text-slate-500 font-light mb-2"
              >
                I am
              </motion.span>
              
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-200 to-slate-500 flex flex-wrap">
                {name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
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
            <a href="/resume.pdf" className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-white text-black font-black text-xs tracking-widest transition-all hover:bg-blue-600 hover:text-white shadow-xl shadow-blue-500/10">
              <span className="relative z-10 flex items-center gap-2 uppercase">
                Download_CV <FileDown size={16} />
              </span>
            </a>

            <a href="#projects" className="group relative px-8 py-4 rounded-2xl border border-slate-800 bg-slate-900/20 text-white font-bold text-xs tracking-widest hover:border-blue-500/50 transition-all flex items-center gap-2">
              VIEW_PROJECTS
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="order-1 lg:order-2 relative flex justify-center items-center h-125 md:h-150"
        >
          <div className="absolute w-[80%] h-[80%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="relative w-full h-full">
            <Image
              src="/my.jpg"
              alt={name}
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
              style={{
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#030712] to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}