"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import shinaayomi from "@/public/shinaayomi.jpg"
import daramola from "@/public/daramola.jpg"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Why We're Building ModelShip
          </h2>

          <motion.div
            className="bg-gradient-to-br from-[#1a1a3a] to-[#0B0B1F] p-8 rounded-xl border border-[#3B3A58]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <blockquote className="text-lg md:text-xl text-gray-300 italic">
              "We've lived the pain of labeling data manually while trying to train AI models. ModelShip is our solution
              to make data prep dramatically faster — but still keep humans in control."
            </blockquote>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] flex items-center justify-center mb-4">
                <img src="/shinaayomi.jpg" alt="Shinaayomi" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-medium">Olanrewaju Shinaayomi</h3>
              <p className="text-gray-400">Co-Founder</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] flex items-center justify-center mb-4">
                <img src="/daramola.jpg" alt="Daramola" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-medium">Daramola Daniel</h3>
              <p className="text-gray-400">Co-Founder</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
