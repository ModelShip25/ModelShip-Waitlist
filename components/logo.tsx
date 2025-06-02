"use client"

import { motion } from "framer-motion"
import type { SVGProps } from "react"

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: "default" | "loading" | "hero"
  animated?: boolean
}

export default function Logo({ className, variant = "default", animated = true, ...props }: LogoProps) {
  const { onAnimationStart, ...restProps } = props;

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    loading: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
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
    <motion.svg
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      variants={animated ? logoVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      whileHover={animated ? "hover" : undefined}
      {...restProps}
    >
      <motion.circle
        cx="15"
        cy="15"
        r="6"
        fill="#FF4B5C"
        variants={animated ? circleVariants : undefined}
        animate={variant === "loading" ? "loading" : undefined}
      />
      <motion.circle
        cx="6"
        cy="24"
        r="6"
        fill="#8C52FF"
        variants={animated ? circleVariants : undefined}
        animate={variant === "loading" ? "loading" : undefined}
        style={{ animationDelay: "0.2s" }}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="6"
        fill="#4F46E5"
        variants={animated ? circleVariants : undefined}
        animate={variant === "loading" ? "loading" : undefined}
        style={{ animationDelay: "0.4s" }}
      />
      <motion.text
        x="35"
        y="20"
        fontFamily="Inter, sans-serif"
        fontSize={variant === "hero" ? "20" : variant === "loading" ? "22" : "16"}
        fill="#FFFFFF"
        variants={animated ? textVariants : undefined}
        className="font-semibold tracking-wide"
      >
        ModelShip
      </motion.text>
    </motion.svg>
  )
}
