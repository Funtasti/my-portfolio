import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Code, Award, Calendar, type LucideIcon } from 'lucide-react' //Trophy,
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { smoothScrollTo } from '../utils/smoothScroll'
import StatsCard from '../components/StatusCard'
import resumePdf from '../assets/Sumit_kumar_naik_resume.pdf'

interface Stat {
  icon: LucideIcon
  count: number
  label: string
}

export default function AboutDetail() {
  const [contentRef, contentVisible] = useScrollAnimation(0.2)
  const [imageRef, imageVisible] = useScrollAnimation(0.2)

  const stats: Stat[] = [
    { icon: Code, count: 3, label: 'TOTAL PROJECTS' },
    { icon: Award, count: 5, label: 'CERTIFICATES' },
    { icon: Calendar, count: 1, label: 'YEARS OF EXPERIENCE' },
    // { icon: Trophy, count: 3, label: 'ACHIEVEMENTS' }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="about" className="min-h-[calc(100vh-70px)] py-16 md:py-20 bg-gradient-to-br from-[rgba(24,24,24,0.8)] to-[rgba(11,11,11,0.9)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            ref={contentRef as React.Ref<HTMLDivElement>}
            variants={containerVariants}
            initial="hidden"
            animate={contentVisible ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-purple-500 text-lg font-semibold mb-2 uppercase tracking-wide">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Transforming ideas into digital experiences
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl md:text-2xl text-white mb-4 font-bold">
                Sumit Kumar Naik
              </h3>
              <p className="text-lg text-white/80 mb-8 leading-relaxed opacity-90">
                Full-stack developer skilled in Spring Boot, PostgreSQL, and React; built role-based JWT authentication, RESTful APIs, and dynamic dashboards for user analytics.
                Interned at Hitachi Vantara (Jan–Aug 2023), contributed reusable components, responsive UIs, and accelerated onboarding through Agile collaboration and strong Git workflows.
              </p>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
                <motion.a
                  href={resumePdf}
                  className="btn-gradient text-white px-8 py-3 rounded-lg font-semibold inline-block"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
                <motion.button
                  onClick={() => smoothScrollTo('portfolio')}
                  className="text-purple-500 font-semibold hover:text-blue-500 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View Projects →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef as React.Ref<HTMLDivElement>}
            className="flex justify-center items-center lg:order-none order-first"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={imageVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px]">
              <motion.img
                src="https://pplx-res.cloudinary.com/image/upload/v1755100992/pplx_project_search_images/157dcbfece8af1e37a7fdbf6a841cd54196e51c3.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 p-1 shadow-[0_20px_40px_rgba(124,58,237,0.3)]"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                loading='lazy'
              />
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              count={stat.count}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
