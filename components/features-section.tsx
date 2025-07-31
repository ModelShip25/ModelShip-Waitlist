"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Upload, Bot, Users, FileJson, Shield, Clock, DollarSign, ChartBar, Sparkles, ArrowRight, Network } from "lucide-react"

const features = [
  // Data Ingestion & Cleaning Group
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Easy Data Upload",
    description: "Upload CSV and JSON files in seconds. No complex setup required.",
    color: "from-[#FF4B5C] to-[#FF6B7A]",
    metrics: {
      before: "30+ mins setup",
      after: "5 mins setup",
      improvement: "6x faster"
    }
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Smart Data Cleaning",
    description: "Automated data cleaning with anomaly detection, deduplication, and standardization.",
    color: "from-[#00B4D8] to-[#48CAE4]",
    metrics: {
      before: "Hours cleaning small datasets",
      after: "Mins cleaning large datasets",
      improvement: "16x faster"
    }
  },
  
  // AI & Review Process Group
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI-powered Labeling",
    description: "ModelShip auto-labels your data with 95%+ accuracy.",
    color: "from-[#4F46E5] to-[#6366F1]",
    metrics: {
      before: "100% manual work",
      after: "70% automated",
      improvement: "3.3x faster"
    }
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Smart Review Flow",
    description: "Intuitive interface for quick validation of AI-generated labels.",
    color: "from-[#8C52FF] to-[#A855F7]",
    metrics: {
      before: "5 mins per review",
      after: "1 min per review",
      improvement: "5x faster"
    }
  },

  // Team & Analytics Group
  {
    icon: <Network className="h-8 w-8" />,
    title: "Team Collaboration",
    description: "Real-time collaboration, role-based access, audit logs, and workflow management.",
    color: "from-[#F59E0B] to-[#FBBF24]",
    metrics: {
      before: "Siloed workflows",
      after: "Unified platform",
      improvement: "4x productivity"
    }
  },
  {
    icon: <ChartBar className="h-8 w-8" />,
    title: "Analytics Dashboard",
    description: "Track labeling progress, team performance, and quality metrics in real-time.",
    color: "from-[#EC4899] to-[#F472B6]",
    metrics: {
      before: "No insights",
      after: "Full visibility",
      improvement: "100% clarity"
    }
  },

  // Output & Security Group
  {
    icon: <FileJson className="h-8 w-8" />,
    title: "Instant Export",
    description: "Export labeled data in CSV, JSON, and more formats with one click.",
    color: "from-[#6F42C1] to-[#8B5CF6]",
    metrics: {
      before: "Manual formatting",
      after: "Auto formatting",
      improvement: "10x faster"
    }
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption with SOC 2 Type II compliance and advanced access controls.",
    color: "from-[#10B981] to-[#34D399]",
    metrics: {
      before: "Basic security",
      after: "Enterprise-grade",
      improvement: "100% secure"
    }
  }
]

const stats = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Saved",
    value: "70%",
    description: "Reduction in labeling time"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Cost Saved",
    value: "60%",
    description: "Lower operational costs"
  },
  {
    icon: <ChartBar className="h-6 w-6" />,
    title: "Accuracy",
    value: "95%+",
    description: "AI labeling accuracy"
  }
]

const workflowSteps = [
  {
    title: "Data Upload",
    description: "Upload your raw data in CSV, JSON, or Excel format",
    color: "from-[#FF4B5C] to-[#FF6B7A]"
  },
  {
    title: "Automated Cleaning",
    description: "AI detects and fixes data quality issues",
    color: "from-[#00B4D8] to-[#48CAE4]"
  },
  {
    title: "AI Labeling",
    description: "Smart labeling with advanced ML models",
    color: "from-[#4F46E5] to-[#6366F1]"
  },
  {
    title: "Human Review",
    description: "Quick validation of AI-generated labels",
    color: "from-[#8C52FF] to-[#A855F7]"
  },
  {
    title: "Export",
    description: "Download clean, labeled data in your preferred format",
    color: "from-[#6F42C1] to-[#8B5CF6]"
  }
]

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleScrollToWaitlist = () => {
    const waitlistForm = document.getElementById('waitlist-form')
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stop wasting time on manual labeling. Our AI-powered platform helps you label data in minutes, not hours.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-[#1a1a3a]/80 to-[#0B0B1F]/80 backdrop-blur-sm p-6 rounded-xl border border-[#3B3A58]/30"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-[#3B3A58]/30 rounded-lg mr-4">
                  {stat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <p className="text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative group"
            >
              <motion.div
                variants={cardVariants}
                className="h-full bg-gradient-to-br from-[#1a1a3a]/80 to-[#0B0B1F]/80 backdrop-blur-sm p-6 rounded-xl border border-[#3B3A58]/30"
              >
                <motion.div
                  variants={iconVariants}
                  className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} w-fit mb-4`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="text-red-400">Before:</span>
                    <span className="ml-2 text-gray-400">{feature.metrics.before}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-400">After:</span>
                    <span className="ml-2 text-gray-400">{feature.metrics.after}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-purple-400">Result:</span>
                    <span className="ml-2 text-gray-400">{feature.metrics.improvement}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflow Visualization */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">How It Works</h3>
          <div className="flex flex-col md:flex-row items-center justify-between relative">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center mb-8 md:mb-0">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm max-w-[200px]">{step.description}</p>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] transform -translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add Join Waitlist Button */}
        <motion.div
          className="flex justify-center mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.button
            onClick={handleScrollToWaitlist}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] rounded-full overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#8C52FF] to-[#6F42C1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
