"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

interface HeroProps {
  name: string;
  role: string;
  about: string;
}

export default function Hero({ name, role, about }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full" />
      
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
        <Image
          src="/me.jpg" 
          alt="Profile"
          width={150} 
          height={150}
          className="relative rounded-full border-2 border-slate-800 object-cover shadow-2xl"
          priority 
        />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        I'm <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {name}
        </span>
      </h1>
      <p className="mt-6 text-lg text-slate-400 max-w-2xl">
        {role} — {about}
      </p>
      
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/resume.pdf" download className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-semibold hover:bg-blue-400 transition-all hover:-translate-y-1">
          <FileDown className="w-5 h-5" /> Download CV
        </a>
        <a href="#projects" className="px-6 py-3 rounded-full border border-slate-800 hover:border-slate-600 transition-all">
          View Work
        </a>
      </div>
    </section>
  );
}
