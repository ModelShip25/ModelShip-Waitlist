"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Shield } from "lucide-react"

export default function TrustSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="flex items-center justify-center space-x-2 text-gray-400 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <Shield className="h-4 w-4" />
          <p className="text-sm">
            We respect your inbox. No spam. You'll only receive early access updates and product news.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
