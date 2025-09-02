import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin, Instagram, type LucideIcon } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { smoothScrollTo } from '../utils/smoothScroll'

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

export default function Home() {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/Funtasti', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sumit-kumar-naik', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
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
    <section id="home" className="min-h-[calc(100vh-70px)] py-16 md:py-24 bg-[#0b0b0b]  relative">
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center h-full"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-500 text-shadow-xs text-shadow-neutral-200 mb-4 md:mb-6 leading-tight">
              Frontend Developer
            </h2>
            <p className="text-lg text-white/80 mb-6 md:mb-8 opacity-90 leading-relaxed">
              Entry-level developer with hands-on experience in building responsive, maintainable, user‑centric applications—strong in problem‑solving, communication, collaboration, and continuous learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
              <motion.button
                onClick={() => smoothScrollTo('portfolio')}
                className="btn-gradient text-white px-8 py-3 rounded-lg font-semibold"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
              </motion.button>
              
              <motion.button
                onClick={() => smoothScrollTo('contact')}
                className="bg-purple-500/10 text-purple-500 border-2 border-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/20"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 bg-purple-500/10 border-2 border-purple-500/30 rounded-full text-white/80 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
                  whileHover={{
                    y: -3,
                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <motion.img
              src="https://pplx-res.cloudinary.com/image/upload/v1755100993/pplx_project_search_images/8082cecccd215afe41352753f23dfc4b0ddd39b8.png"
              alt="Developer Workspace"
              className="max-w-[80%] sm:max-w-[70%] md:max-w-full h-auto rounded-2xl shadow-[0_20px_40px_rgba(124,58,237,0.2)] animate-float"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}