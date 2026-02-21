"use client";

import data from '@/data/portfolio.json';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* 1. Navigation */}
      <Navbar 
        name={data.name} 
        socials={data.socials} 
      />

      {/* 2. Hero Section */}
      <Hero 
        name={data.name} 
        role={data.role} 
        about={data.about} 
      />

      {/* 3. Projects Section */}
      <Projects 
        projects={data.projects} 
      />

      {/* 4. Certifications Section */}
      <Certifications 
        certifications={data.certifications} 
      />

      {/* 5. Tech Stack Section */}
      <Skills 
        skills={data.skills} 
      />

      {/* 6. Contact Section */}
      <Contact 
        socials={data.socials} 
      />

      {/* 7. Footer */}
      <footer className="py-20 border-t border-slate-900/50 text-center text-slate-600 text-sm">
        <p>
          © {new Date().getFullYear()} {data.name}. 
          Built with Next.js, Tailwind & Framer Motion.
        </p>
      </footer>
    </main>
  );
}