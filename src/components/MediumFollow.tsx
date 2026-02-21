"use client";
import { motion } from 'framer-motion';

export default function MediumFollow({ username }: { username: string }) {
  // The high-fidelity Solid Medium Monogram to match your Navbar/Contact sections
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
    <motion.a
      href={`https://medium.com/@${username}`}
      target="_blank"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05, x: -5 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex items-center gap-3 pl-4 pr-6 py-3 bg-[#0a0a0a] border-y border-l border-slate-800 rounded-l-full shadow-2xl group hover:border-white/30 transition-all"
    >
      {/* Immersive Glow Effect */}
      <div className="absolute inset-0 bg-white/5 blur-xl rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-2.5 rounded-full bg-slate-900 border border-slate-800 group-hover:bg-white group-hover:text-black transition-all duration-300">
        <MediumIcon className="w-4 h-4" />
      </div>
      
      <div className="flex flex-col relative z-10">
        <span className="text-[10px] uppercase tracking-[0.1em] text-slate-500 font-bold group-hover:text-slate-300 transition-colors">Follow on</span>
        <span className="text-sm font-bold text-white leading-none">Medium</span>
      </div>
    </motion.a>
  );
}