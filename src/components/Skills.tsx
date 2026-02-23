"use client";
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, 
  SiTailwindcss, SiMui, SiSpringboot, SiDotnet, SiPython, 
  SiDocker, SiKubernetes, SiAmazon, SiMongodb, 
  SiPostgresql, SiMysql, SiGit, SiPostman, SiFigma, SiAngular,
  SiSass, SiHtml5, SiCss3, SiExpress, SiBootstrap, SiSap
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb'; 
import { Code2, Cpu, Terminal } from 'lucide-react';
import { JSX } from 'react';

const iconMap: Record<string, { icon: JSX.Element, color: string }> = {
  "Java": { icon: <FaJava />, color: "#ED8B00" },
  "JavaScript": { icon: <SiJavascript />, color: "#F7DF1E" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
  "Python": { icon: <SiPython />, color: "#3776AB" },
  "React": { icon: <SiReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
  "Spring Boot": { icon: <SiSpringboot />, color: "#6DB33F" },
  "Tailwind": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Docker": { icon: <SiDocker />, color: "#2496ED" },
  "AWS": { icon: <SiAmazon />, color: "#FF9900" },
  "PostgreSQL": { icon: <SiPostgresql />, color: "#4169E1" },
  "MongoDB": { icon: <SiMongodb />, color: "#47A248" },
  "Angular": { icon: <SiAngular />, color: "#DD0031" },
  "Figma": { icon: <SiFigma />, color: "#F24E1E" },
  "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
  "SAP HANA": { icon: <SiSap />, color: "#008FD3" },
  "Sass": { icon: <SiSass />, color: "#CC6699" },
  "HTML": { icon: <SiHtml5 />, color: "#E34F26" },
  "CSS": { icon: <SiCss3 />, color: "#1572B6" },
  "Express.js": { icon: <SiExpress />, color: "#FFFFFF" },
  "Bootstrap": { icon: <SiBootstrap />, color: "#7952B3" },
  "C#": { icon: <TbBrandCSharp />, color: "#512BD4" }
};

export default function Skills({ skills }: { skills: any }) {
  const rows = [
    { items: skills?.languages || [], dir: -100 },
    { items: skills?.web || [], dir: 100 },
    { items: [...(skills?.devops || []), ...(skills?.database || [])], dir: -100 },
    { items: [...(skills?.tools || []), ...(skills?.others || [])], dir: 100 }
  ];

  return (
    <section id="skills" className="py-32 bg-[#030712] overflow-hidden">
      
      {/* --- NEW DYNAMIC HEADER (LEFT ALIGNED) --- */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start text-left">
        {/* Large Decorative Background Label */}
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none hidden md:block uppercase">
          Stack
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <Terminal size={14} className="text-blue-500" /> 
          System_Capabilities / Core_v.4
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Technical <span className="text-slate-700 italic font-light">Stack.</span>
          </h2>
          
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <Cpu size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Ready for Deployment
            </span>
          </div>
        </div>
      </div>

      {/* --- MARQUEE CONTENT --- */}
      <div className="relative flex flex-col gap-8 w-full">
        
        {/* Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        {rows.map((row, idx) => (
          <div key={idx} className="flex">
            <motion.div 
              animate={{ x: row.dir === -100 ? [0, -1500] : [-1500, 0] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="flex flex-nowrap gap-6 px-3"
            >
              {[...row.items, ...row.items, ...row.items, ...row.items].map((skill, i) => {
                const tech = iconMap[skill] || { icon: <Code2 size={18}/>, color: "#94a3b8" };
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-slate-900/20 border border-slate-800/40 backdrop-blur-md group hover:border-blue-500/40 hover:bg-slate-900/50 transition-all cursor-default"
                  >
                    <span style={{ color: tech.color }} className="text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {tech.icon}
                    </span>
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest whitespace-nowrap group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}