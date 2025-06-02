"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, Sparkles } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number is required" })
    .regex(/^[+]?[1-9][\d]{0,15}$/, { message: "Invalid phone number format" }),
  company: z.string().min(1, { message: "Company name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  labelingMethod: z.string().min(1, { message: "Current labeling method is required" }),
  datasetSize: z.string().min(1, { message: "Dataset size is required" }),
  painPoint: z.string().optional(),
  betaAccess: z.enum(["yes", "no"], {
    required_error: "Please select if you're interested in beta access",
  }),
  feedbackCall: z.enum(["yes", "no"], {
    required_error: "Please select if you're interested in a feedback call",
  }),
})

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      industry: "",
      labelingMethod: "",
      datasetSize: "",
      painPoint: "",
      betaAccess: "yes",
      feedbackCall: "yes",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Submit to your Formspree endpoint
      const response = await fetch("https://formspree.io/f/mnnvqvwr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  return (
    <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#6F42C1]/10 to-[#4F46E5]/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-8 w-8 text-[#6F42C1] mr-2" />
            <span className="text-[#6F42C1] font-medium">Early Access</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
            Join Early Access
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6F42C1]/20 to-[#4F46E5]/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-[#1a1a3a]/90 to-[#0B0B1F]/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-[#3B3A58]/30">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key="success"
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      scale: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                      rotate: { duration: 1 },
                    }}
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thanks for joining the ModelShip waitlist!
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    You'll hear from us very soon.
                  </motion.p>
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] rounded-full mx-1"
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
                </motion.div>
              ) : (
                <Form {...form} key="form">
                  <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] focus:ring-[#6F42C1]/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john@example.com"
                                  type="email"
                                  {...field}
                                  className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] focus:ring-[#6F42C1]/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  type="tel"
                                  {...field}
                                  className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] focus:ring-[#6F42C1]/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Company / Startup Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Acme Inc."
                                  {...field}
                                  className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] focus:ring-[#6F42C1]/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Role</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] text-white">
                                    <SelectValue placeholder="Select your role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1a1a3a] border-[#3B3A58]/50">
                                  <SelectItem value="founder">Founder</SelectItem>
                                  <SelectItem value="ml-engineer">ML Engineer</SelectItem>
                                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                                  <SelectItem value="product-manager">Product Manager</SelectItem>
                                  <SelectItem value="developer">Developer</SelectItem>
                                  <SelectItem value="investor">Investor</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Industry</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] text-white">
                                    <SelectValue placeholder="Select your industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1a1a3a] border-[#3B3A58]/50">
                                  <SelectItem value="fintech">Fintech</SelectItem>
                                  <SelectItem value="healthtech">HealthTech</SelectItem>
                                  <SelectItem value="saas">SaaS</SelectItem>
                                  <SelectItem value="ecommerce">Ecommerce</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="labelingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Current Labeling Method</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] text-white">
                                    <SelectValue placeholder="Select your method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1a1a3a] border-[#3B3A58]/50">
                                  <SelectItem value="spreadsheets">Spreadsheets</SelectItem>
                                  <SelectItem value="labeling-tools">Labeling Tools</SelectItem>
                                  <SelectItem value="outsourcing">Outsourcing</SelectItem>
                                  <SelectItem value="not-started">Haven't started yet</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="datasetSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Dataset Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] text-white">
                                  <SelectValue placeholder="Select your dataset size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1a1a3a] border-[#3B3A58]/50">
                                <SelectItem value="less-than-1k">{"<1,000 rows"}</SelectItem>
                                <SelectItem value="1k-10k">1K–10K</SelectItem>
                                <SelectItem value="10k-100k">10K–100K</SelectItem>
                                <SelectItem value="more-than-100k">100K+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="painPoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">
                              Biggest Data Labeling Pain Point? (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your challenges with data labeling..."
                                {...field}
                                className="bg-[#1a1a3a]/50 border-[#3B3A58]/50 focus:border-[#6F42C1] focus:ring-[#6F42C1]/20 text-white placeholder:text-gray-400 min-h-[120px] transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="betaAccess"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-white font-medium">Beta Access Interest</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="yes"
                                      id="beta-yes"
                                      className="border-[#6F42C1] text-[#6F42C1]"
                                    />
                                    <Label htmlFor="beta-yes" className="text-white">
                                      Yes
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="no"
                                      id="beta-no"
                                      className="border-[#6F42C1] text-[#6F42C1]"
                                    />
                                    <Label htmlFor="beta-no" className="text-white">
                                      No
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="feedbackCall"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-white font-medium">Feedback Call Interest</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="yes"
                                      id="feedback-yes"
                                      className="border-[#6F42C1] text-[#6F42C1]"
                                    />
                                    <Label htmlFor="feedback-yes" className="text-white">
                                      Yes
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="no"
                                      id="feedback-no"
                                      className="border-[#6F42C1] text-[#6F42C1]"
                                    />
                                    <Label htmlFor="feedback-no" className="text-white">
                                      No
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="pt-4">
                      <motion.button
                        type="submit"
                        className="group relative w-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center overflow-hidden"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(111, 66, 193, 0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#8C52FF] to-[#6F42C1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Join The Waitlist
                              <motion.svg
                                className="ml-2 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </motion.svg>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                </Form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
