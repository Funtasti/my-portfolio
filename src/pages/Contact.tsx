import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import clsx from 'clsx'

type SubmitStatus = 'success' | 'error' | null

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 3000)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: 'easeOut' }
    }
  }

  return (
    <section
      id="contact"
      className="h-[calc(100vh-70px)] pt-10 bg-gradient-to-b from-[rgba(11,11,11,0.9)] to-[rgba(24,24,24,0.8)]"
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-purple-500 text-lg font-semibold mb-2 uppercase tracking-wide">
              Get In Touch
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-8 bg-[rgba(24,24,24,0.6)] border border-purple-500/20 rounded-2xl backdrop-blur-custom space-y-6"
          >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Your name"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="you@example.com"
              />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants}>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="How can I help you?"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                'w-full btn-gradient text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden',
                isSubmitting && 'opacity-80 cursor-not-allowed'
              )}
              variants={itemVariants}
              whileHover={
                !isSubmitting
                  ? { y: -2, boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)' }
                  : {}
              }
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={clsx(
                  'flex items-center justify-center gap-2 p-4 rounded-lg text-sm font-medium',
                  submitStatus === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                )}
              >
                {submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Failed to send message. Please try again.
                  </>
                )}
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        <div className="border-t border-white/10 py-4 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Sumit Kumar Naik. All rights reserved.
        </div>
      </div>
    </section>
  )
}
