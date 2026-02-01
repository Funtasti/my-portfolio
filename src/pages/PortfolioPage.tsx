import React, { useState } from 'react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { ExternalLink, ChevronRight, ArrowLeft, Layers, Award, Wrench } from 'lucide-react'
import clsx from 'clsx'
import { projects, certificates, techStack, type Project } from '../data/portfolio'
import ProjectDetail from './ProjectDetail'

type TabKey = 'projects' | 'certificates' | 'tech'

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
  { key: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
  { key: 'tech', label: 'Tech Stack', icon: <Wrench className="w-4 h-4" /> },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.35, ease: easeOut } },
}

const CardShell: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={clsx(
    'rounded-2xl border border-white/10 bg-[rgba(24,24,24,0.6)] backdrop-blur-custom shadow-[0_20px_40px_rgba(124,58,237,0.12)]',
    className
  )}>
    {children}
  </div>
)

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({
  active, onClick, label, icon
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'group relative w-full md:w-auto min-w-[220px] px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all',
      'border border-white/10',
      active
        ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_10px_30px_rgba(124,58,237,0.25)]'
        : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
    )}
  >
    <span className="opacity-80 group-hover:opacity-100">{icon}</span>
    {label}
  </button>
)

const LoadingFull: React.FC<{ text?: string }> = ({ text = 'Loading Project...' }) => (
  <div className="h-[60vh] flex items-center justify-center">
    <div className="flex items-center gap-3 text-white/80">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-white/30 border-t-purple-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span className="text-lg">{text}</span>
    </div>
  </div>
)

export default function PortfolioPage() {
  const [active, setActive] = useState<TabKey>('projects')
  const [detail, setDetail] = useState<Project | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'

  const openDetail = (p: Project) => {
    setLoadingDetail(true)
    setDetail(p)
    setTimeout(() => setLoadingDetail(false), 700)
  }
  const closeDetail = () => setDetail(null)

  return (
    <section id="portfolio" className="min-h-screen py-14 md:py-8 bg-gradient-to-br from-[rgba(24,24,24,0.8)] to-[rgba(11,11,11,0.92)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-white tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Portfolio Showcase
            </span>
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Explore my journey through projects, certifications, and technical expertise. Each
            section represents a milestone in my continuous learning path.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 md:mb-12">
          <div className="mx-auto max-w-3xl justify-center bg-white/5 rounded-2xl p-2 flex flex-col md:flex-row gap-3 md:gap-4">
            {tabs.map(t => (
              <TabButton
                key={t.key}
                active={active === t.key}
                onClick={() => setActive(t.key)}
                label={t.label}
                icon={t.icon}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {active === 'projects' && (
            <motion.div
              key="tab-projects"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className={gridCols}
            >
              {projects.map(p => (
                <motion.div key={p.id} variants={item}>
                  <CardShell className="overflow-hidden">
                    {/* preview */}
                    <div className="aspect-[16/10] bg-black/40">
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover" loading='lazy'/>
                    </div>
                    {/* content */}
                    <div className="p-5">
                      <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-3 mb-4">{p.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-300 hover:text-blue-200 inline-flex items-center gap-1">
                          Live Demo <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openDetail(p)}
                          className="text-sm text-white/80 hover:text-purple-400 inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 border border-white/10"
                        >
                          Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardShell>
                </motion.div>
              ))}
            </motion.div>
          )}

          {active === 'certificates' && (
            <motion.div
              key="tab-certificates"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className={gridCols}
            >
              {certificates.map((c, i) => (
                <motion.div key={i} variants={item}>
                  <CardShell>
                    <div className="aspect-[16/10] bg-black/40 rounded-2xl overflow-hidden">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" loading='lazy'/>
                    </div>
                    <div className="p-4">
                      <p className="text-white/80 text-sm">{c.title}</p>
                    </div>
                  </CardShell>
                </motion.div>
              ))}
            </motion.div>
          )}

          {active === 'tech' && (
            <motion.div
              key="tab-tech"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
            >
              {techStack.map((t, i) => (
                <motion.div key={i} variants={item}>
                  <div className="h-28 rounded-xl border border-white/10 bg-white/5 backdrop-blur-custom flex flex-col items-center justify-center gap-2">
                    <img src={t.icon} alt={t.name} className="w-10 h-10 object-contain" loading='lazy'/>
                    <span className="text-white/80 text-sm">{t.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail overlay */}
        <AnimatePresence>
          {detail && (
            <motion.div
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 overflow-auto py-10 px-4">
                <div className="max-w-[1100px] mx-auto">
                  <CardShell className="p-6 md:p-8">
                    <div className="mb-6">
                      <button
                        onClick={closeDetail}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-purple-400"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    </div>

                    {loadingDetail ? (
                      <LoadingFull />
                    ) : (
                      <ProjectDetail project={detail} />
                    )}
                  </CardShell>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}