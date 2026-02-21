"use client";
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Skills({ skills }: { skills: string[] }) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
        Tech Stack <div className="h-px flex-1 bg-slate-800" />
      </h2>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-300 text-sm font-medium transition-all"
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
