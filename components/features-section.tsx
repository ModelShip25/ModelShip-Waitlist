"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Upload, Bot, Users, FileJson, Shield } from "lucide-react"

const features = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload datasets",
    description: "Easily upload CSV and JSON files to start your labeling process.",
    color: "from-[#FF4B5C] to-[#FF6B7A]",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI-powered auto-labeling",
    description: "Leverage GPT-3.5 turbo to automatically label your data with high accuracy.",
    color: "from-[#4F46E5] to-[#6366F1]",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Human-in-the-loop review",
    description: "Intuitive interface for reviewing and editing AI-generated labels.",
    color: "from-[#8C52FF] to-[#A855F7]",
  },
  {
    icon: <FileJson className="h-8 w-8" />,
    title: "Instant dataset export",
    description: "Export your labeled data in CSV or JSON format with a single click.",
    color: "from-[#6F42C1] to-[#8B5CF6]",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Private & secure by design",
    description: "Your data never leaves your control, with enterprise-grade security.",
    color: "from-[#10B981] to-[#34D399]",
  },
]

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  }

  const cardVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(111, 66, 193, 0.2)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#6F42C1]/10 to-[#4F46E5]/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Label smarter. Build faster.
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              <motion.div
                className="bg-gradient-to-br from-[#1a1a3a]/80 to-[#0B0B1F]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#3B3A58]/30 hover:border-[#6F42C1]/50 transition-all duration-500 h-full relative overflow-hidden"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Icon container */}
                <motion.div
                  className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl inline-block mb-6 relative z-10`}
                  variants={iconVariants}
                >
                  <motion.div className="text-white" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    {feature.icon}
                  </motion.div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 transition-colors duration-300 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]}) border-box`,
                    WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "exclude",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
