import React, { useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import clsx from 'clsx'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

type SubmitStatus = {
  type: 'success' | 'error'
  message: string
} | null

interface FormData {
  name: string
  email: string
  message: string
}

emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  blockHeadless: true,
  limitRate: {
    id: "contact-form",
    throttle: 10000
  }
});

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the CAPTCHA before sending.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          'g-recaptcha-response': captchaToken
        }
      );

      setSubmitStatus({
        type: 'success',
        message: "Message sent Successfully! I'll get back to you soon."
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus({
        type: 'error',
        message: "Unable to send your message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.reset();
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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
  };

  return (
    <section
      id="contact"
      className="min-h-[calc(100vh-70px)] pt-10 bg-gradient-to-b from-[rgba(11,11,11,0.9)] to-[rgba(24,24,24,0.8)]"
    >
      <div className="mx-auto px-5 md:px-10 lg:px-20">
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
            className="max-w-xl mx-auto p-5 sm:p-8 bg-[rgba(24,24,24,0.6)] border border-purple-500/20 rounded-2xl backdrop-blur-custom space-y-6"
          >
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-purple-200/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-purple-200/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-purple-200/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="How can I help you?"
              />
            </div>

            {/* ReCAPTCHA */}
            <div className="flex justify-center max-w-full overflow-hidden">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                'w-full btn-gradient text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 relative overflow-visible transform-gpu',
                isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
              )}
              style={{ backfaceVisibility: 'hidden', transformPerspective: 1000 }}
              variants={itemVariants}
              whileHover={!isSubmitting ? { y: -2, boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)' } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="flex items-center justify-center gap-2">
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
              </span>
            </motion.button>

            {/* Status Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  'flex items-center justify-center gap-2 p-4 rounded-lg text-sm font-medium',
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                )}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}

                {submitStatus.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        <div className="border-t border-white/10 py-4 text-center">
          {/* Privacy Notice */}
          <p className="text-center text-xs text-white/40 leading-relaxed">
            This site uses Google reCAPTCHA to help prevent span and abuse.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_black"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white/70"
            >
              Google Privacy Policy
            </a>{' '}and {' '}
            <a
              href="https://policies.google.com/terms"
              target="_black"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white/70"
            >
              Terms of Service
            </a>{' '}apply.
          </p>

          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Sumit Kumar Naik. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}