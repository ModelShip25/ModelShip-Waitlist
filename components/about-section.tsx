"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#6F42C1]/10 to-[#4F46E5]/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] mx-auto rounded-full mb-16"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto"
          >
            {/* First Co-founder */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] p-1 mb-4">
                <img
                  src="/shinaayomi.jpg"
                  alt="Olanrewaju Shinaayomi"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl text-white font-medium mb-1">Olanrewaju Shinaayomi</h3>
              <p className="text-[#8C52FF]">Co-Founder</p>
            </div>

            {/* Second Co-founder */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] p-1 mb-4">
                <img
                  src="/BroD.jpg"
                  alt="Daramola Daniel"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl text-white font-medium mb-1">Daramola Daniel</h3>
              <p className="text-[#8C52FF]">Co-Founder</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
