"use client";
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Experience, Education } from '@/types';

interface TimelineProps {
  experience: Experience[];
  education: Education[];
}

export default function Timeline({ experience, education }: TimelineProps) {
  return (
    <section id="resume" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-semibold mb-16 flex items-center gap-4">
        Experience & Education <div className="h-px flex-1 bg-slate-800" />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Central Decorative Line for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

        {/* --- EXPERIENCE COLUMN --- */}
        <div className="space-y-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Experience</h3>
          </div>

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-slate-800 hover:border-blue-500/50 transition-colors"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-blue-500 transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{item.duration}</span>
              <h4 className="text-lg font-bold text-white mt-1">{item.role}</h4>
              <p className="text-slate-400 text-sm">{item.company}</p>
            </motion.div>
          ))}
        </div>

        {/* --- EDUCATION COLUMN --- */}
        <div className="space-y-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Education</h3>
          </div>

          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-slate-800 hover:border-cyan-500/50 transition-colors"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-cyan-500 transition-all shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">{item.year}</span>
              <h4 className="text-lg font-bold text-white mt-1">{item.degree}</h4>
              <p className="text-slate-400 text-sm">{item.school}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}