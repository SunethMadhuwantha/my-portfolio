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
import { Code2 } from 'lucide-react';
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
    <section id="skills" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex flex-col">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-3">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Tech Stack.</h2>
        </div>
      </div>

      {/* The Container with relative positioning for the shades */}
      <div className="relative flex flex-col gap-8 w-full overflow-hidden">
        
        {/* Left Side Shade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Right Side Shade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {rows.map((row, idx) => (
          <div key={idx} className="flex">
            <motion.div 
              animate={{ x: row.dir === -100 ? [0, -1500] : [-1500, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex flex-nowrap gap-4 px-2"
            >
              {[...row.items, ...row.items, ...row.items, ...row.items, ...row.items].map((skill, i) => {
                const tech = iconMap[skill] || { icon: <Code2 size={18}/>, color: "#94a3b8" };
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm group hover:border-blue-500/50 transition-all cursor-default"
                  >
                    <span style={{ color: tech.color }} className="text-2xl transition-transform group-hover:scale-110">
                      {tech.icon}
                    </span>
                    <span className="text-slate-300 text-sm font-bold tracking-tight whitespace-nowrap">
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