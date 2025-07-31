"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Logo from "./logo"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Reduced from 2500ms to 1500ms for faster loading

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Reduced from 20 to 15
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced from 0.6 to 0.4
        ease: "easeOut",
      },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5, // Reduced from 2 to 1.5
        ease: "easeInOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B1F]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#6F42C1]/20 to-[#4F46E5]/20 blur-3xl" // Reduced from w-96 h-96 to w-80 h-80
              animate={{
                scale: [1, 1.1, 1], // Reduced from 1.2 to 1.1
                opacity: [0.3, 0.5, 0.3], // Reduced from 0.6 to 0.5
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5, // Reduced from 3 to 2.5
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-[#8C52FF]/20 to-[#6F42C1]/20 blur-3xl" // Reduced from w-96 h-96 to w-80 h-80
              animate={{
                scale: [1, 0.9, 1], // Reduced from 0.8 to 0.9
                opacity: [0.3, 0.5, 0.3], // Reduced from 0.6 to 0.5
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3, // Reduced from 4 to 3
                ease: "easeInOut",
                delay: 0.5, // Reduced from 1 to 0.5
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div variants={itemVariants} className="mb-8">
              <Logo variant="loading" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to ModelShip</h1>
              <p className="text-gray-400">Preparing your AI data labeling experience...</p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-64 h-2 bg-[#1a1a3a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] rounded-full"
                variants={progressVariants}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#6F42C1] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
