"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Logo from "./logo"
import { Users, Clock, Zap, Award } from "lucide-react"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleScrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist-form")
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced from 30 to 20
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Reduced from 0.8 to 0.6
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Enhanced background with multiple layers */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1F] via-[#1a1a3a] to-[#0B0B1F] opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#6F42C1]/20 via-transparent to-transparent"></div>
      </motion.div>

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] opacity-20 blur-3xl"
          animate={{
            x: [0, 20, 0], // Reduced from 30 to 20
            y: [0, -15, 0], // Reduced from -20 to -15
            scale: [1, 1.05, 1], // Reduced from 1.1 to 1.05
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8, // Reduced from 12 to 8
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#4F46E5] to-[#8C52FF] opacity-15 blur-3xl"
          animate={{
            x: [0, -15, 0], // Reduced from -25 to -15
            y: [0, 15, 0], // Reduced from 25 to 15
            scale: [1, 0.95, 1], // Reduced from 0.9 to 0.95
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10, // Reduced from 15 to 10
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-conic from-[#6F42C1]/10 via-[#4F46E5]/5 to-[#8C52FF]/10 blur-3xl" // Reduced from 800px to 600px
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 40, // Reduced from 60 to 40
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles - Reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => ( // Reduced from 20 to 10 particles
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0], // Reduced from -100 to -80
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2 + Math.random() * 3, // Reduced duration
              delay: Math.random() * 1.5, // Reduced delay
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="flex justify-center mb-8" variants={floatingVariants} animate="animate">
          <Logo variant="hero" />
        </motion.div>

        {/* Early Access Badge */}
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-[#6F42C1]/20 to-[#4F46E5]/20 backdrop-blur-sm rounded-full px-4 py-2 border border-[#6F42C1]/30">
            <span className="text-[#6F42C1] font-medium flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Limited Beta Access Now Available
            </span>
          </div>
        </motion.div>

        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
            variants={itemVariants}
          >
            <span className="block">Be First to Simplify</span>
            <span className="block bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] bg-clip-text text-transparent">
              AI Data Labeling
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            ModelShip helps AI teams label data <span className="text-[#6F42C1] font-semibold">70% faster</span> with AI-powered auto-labeling, 
            easy review flows, and instant export — finally making data prep less painful.
          </motion.p>

          {/* Social Proof Section */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-10"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <Users className="w-6 h-6 text-[#6F42C1] mr-2" />
              <span className="text-gray-300">500+ Teams Joined</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-[#4F46E5] mr-2" />
              <span className="text-gray-300">70% Faster Labeling</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[#8C52FF] mr-2" />
              <span className="text-gray-300">5min Setup Time</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            className="mb-10"
            variants={itemVariants}
          >
            <div className="flex justify-center gap-4">
              <div className="bg-[#1a1a3a]/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3B3A58]/30">
                <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="bg-[#1a1a3a]/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3B3A58]/30">
                <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="bg-[#1a1a3a]/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3B3A58]/30">
                <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="bg-[#1a1a3a]/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#3B3A58]/30">
                <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
            <div className="text-gray-400 mt-2">Until Beta Access Closes</div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleScrollToWaitlist}
              className="group relative bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] text-white font-semibold py-4 px-10 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(111, 66, 193, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center" onClick={handleScrollToWaitlist}>
                Join The Waitlist Now
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8C52FF] to-[#6F42C1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
