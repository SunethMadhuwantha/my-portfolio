"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

export default function Projects({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 6;

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
        Recent Work <div className="h-px flex-1 bg-slate-800" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, showAll ? undefined : LIMIT).map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {projects.length > LIMIT && (
        <button onClick={() => setShowAll(!showAll)} className="mt-12 mx-auto flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 hover:bg-slate-900 transition-all text-slate-400">
          {showAll ? <>Show Less <ChevronUp /></> : <>Show All Projects <ChevronDown /></>}
        </button>
      )}
    </section>
  );
}
