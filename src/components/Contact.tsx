"use client";
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact({ socials }: { socials: any }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <div className="relative p-12 rounded-3xl bg-gradient-to-b from-slate-900/50 to-slate-950 border border-slate-800 text-center overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-4 text-white">Let's build together</h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">Open to new opportunities and collaborations!</p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href={`mailto:${socials.email}`} className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all">
              <Mail className="w-5 h-5" /> Email Me
            </a>
            <div className="flex gap-4">
              <a href={socials.github} target="_blank" className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:text-white transition-colors"><Github /></a>
              <a href={socials.linkedin} target="_blank" className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}