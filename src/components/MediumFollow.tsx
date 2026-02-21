"use client";
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function MediumFollow({ username }: { username: string }) {
  return (
    <motion.a
      href={`https://medium.com/@${username}`}
      target="_blank"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05, x: -5 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex items-center gap-3 pl-4 pr-6 py-3 bg-[#121212] border-y border-l border-slate-800 rounded-l-full shadow-2xl group hover:border-blue-500/50 transition-all"
    >
      {/* The Glow Effect */}
      <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:bg-blue-600 transition-colors">
        <BookOpen size={18} className="text-white" />
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Follow on</span>
        <span className="text-sm font-bold text-white leading-none">Medium</span>
      </div>
    </motion.a>
  );
}