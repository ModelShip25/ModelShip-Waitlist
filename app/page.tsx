"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import AboutSection from "@/components/about-section"
import WaitlistForm from "@/components/waitlist-form"
import TrustSection from "@/components/trust-section"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <>
      <LoadingScreen />
      <AnimatePresence>
        {isLoaded && (
          <motion.main
            className="min-h-screen bg-[#0B0B1F] text-white overflow-hidden"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <WaitlistForm />
            <TrustSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
