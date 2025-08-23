import { ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import type { Project } from '../data/portfolio'

const badge = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm'

export default function ProjectDetail({ project } : { project: Project }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
      {/* Left text */}
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          {project.title}
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4" />
        <p className="text-white/75 leading-relaxed mb-6">{project.description}</p>

        {/* Stats chips (like the screenshot row with numbers) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {project.stats?.map((s, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text-white text-lg font-semibold">{s.value}</div>
              <div className="text-white/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className={badge}>
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className={badge}>
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right preview + key features */}
      <div className="space-y-6">
        <div className="rounded-xl overflow-hidden bg-black/40 border border-white/10">
          <img src={project.cover} alt={project.title} className="w-full h-auto object-cover" />
        </div>

        {project.features?.length ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-white/75">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}