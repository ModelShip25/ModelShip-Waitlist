"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LogoProps {
  variant?: "default" | "loading" | "hero"
  animated?: boolean
  className?: string
}

export default function Logo({ className, variant = "default", animated = true }: LogoProps) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  const getSize = () => {
    switch (variant) {
      case "hero":
        return { width: 180, height: 45 }
      case "loading":
        return { width: 200, height: 50 }
      default:
        return { width: 120, height: 30 }
    }
  }

  const size = getSize()

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      variants={animated ? logoVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      whileHover={animated ? "hover" : undefined}
    >
      <Image
        src="/MODEL_NEW_L-removebg-preview.png"
        alt="ModelShip Logo"
        width={size.width}
        height={size.height}
        priority
      />
    </motion.div>
  )
}
