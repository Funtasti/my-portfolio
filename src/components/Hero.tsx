import React from 'react'
import { easeOut, motion } from 'framer-motion'
import { Github, Linkedin, Instagram,type LucideIcon } from 'lucide-react'
import { smoothScrollTo } from '../utils/smoothScroll'

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

export default function Hero()  {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/Funtasti', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  }

  const handleRippleEffect = (e: React.MouseEvent<HTMLAnchorElement>, callback?: () => void) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px'
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px'
    
    button.appendChild(ripple)
    
    setTimeout(() => {
      ripple.remove()
      if (callback) callback()
    }, 600)
  }

  return (
    <section id="home" className="min-h-screen hero-gradient flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      
      <div className="max-w-[1200px] mx-auto px-5 relative z-[2] w-full">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-3xl text-white mb-4"
          >
            Welcome To
          </motion.p>
          
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-gradient-white mb-10 leading-tight"
          >
            My Portfolio Website
          </motion.h1>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              onClick={() => smoothScrollTo('portfolio')}
              className="btn-gradient text-white px-8 py-3 rounded-lg font-semibold shadow-[0_4px_15px_rgba(124,58,237,0.4)] relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(124, 58, 237, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.button>
            
            <motion.button
              onClick={() => smoothScrollTo('contact')}
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 bg-purple-500/10 border-2 border-purple-500/30 rounded-full text-white/80 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white relative overflow-hidden"
                onClick={(e) => handleRippleEffect(e)}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
