import React from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface StatsCardProps {
  icon: LucideIcon
  count: number
  label: string
  index: number
}

export default function StatsCard({ icon: Icon, count, label, index } : StatsCardProps)  {
  const [ref, isVisible] = useScrollAnimation(0.3)
  const animatedCount = useCountUp(count, 2000, isVisible)
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="bg-[rgba(24,24,24,0.6)] border border-purple-500/20 rounded-2xl p-8 text-center backdrop-blur-custom hover:border-purple-500/50 hover:shadow-[0_15px_30px_rgba(124,58,237,0.2)]"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 text-purple-500 flex justify-center">
        <Icon size={40} />
      </div>
      
      <motion.h3 
        className="text-3xl md:text-5xl font-bold text-gradient mb-2"
        key={animatedCount}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {animatedCount}
      </motion.h3>
      
      <p className="text-white/80 text-sm font-semibold tracking-wider opacity-80">
        {label}
      </p>
    </motion.div>
  )
}
