"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, Share2, Copy, Twitter } from "lucide-react"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select your company size"),
  role: z.string().min(2, "Please specify your role"),
  teamSize: z.string().min(1, "Please specify your team size"),
  currentTools: z.string().min(1, "Please specify your current tools"),
  useCase: z.string().min(10, "Please provide more details about your use case"),
  dataType: z.string().min(1, "Please specify your data type"),
  dataVolume: z.string().min(1, "Please specify your data volume"),
  timeline: z.string().min(1, "Please specify your timeline"),
  budget: z.string().min(1, "Please specify your budget"),
  decisionMaker: z.string().min(1, "Please specify your decision-making role"),
  urgency: z.string().min(1, "Please specify your urgency level"),
  currentProcess: z.string().min(10, "Please describe your current process"),
  challenges: z.string().min(10, "Please describe your challenges"),
  integrations: z.string().min(1, "Please specify desired integrations"),
  expectations: z.string().min(10, "Please describe your expectations"),
  referralSource: z.string().min(1, "Please specify how you heard about us"),
  location: z.string().min(1, "Please specify your location"),
})

type FormData = z.infer<typeof formSchema>

export default function WaitlistForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null)
  const [referralCode, setReferralCode] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      company: "",
      industry: "",
      companySize: "",
      role: "",
      teamSize: "",
      currentTools: "",
      useCase: "",
      dataType: "",
      dataVolume: "",
      timeline: "",
      budget: "",
      decisionMaker: "",
      urgency: "",
      currentProcess: "",
      challenges: "",
      integrations: "",
      expectations: "",
      referralSource: "",
      location: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Send form data to Formspree
      const response = await fetch('https://formspree.io/f/mnnvqvwr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          phone: data.phone,
          company: data.company,
          industry: data.industry,
          companySize: data.companySize,
          role: data.role,
          teamSize: data.teamSize,
          currentTools: data.currentTools,
          useCase: data.useCase,
          dataType: data.dataType,
          dataVolume: data.dataVolume,
          timeline: data.timeline,
          budget: data.budget,
          decisionMaker: data.decisionMaker,
          urgency: data.urgency,
          currentProcess: data.currentProcess,
          challenges: data.challenges,
          integrations: data.integrations,
          expectations: data.expectations,
          referralSource: data.referralSource,
          location: data.location,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Generate referral code and position for user experience
      const position = Math.floor(Math.random() * 100) + 1
      const code = `MODELSHIP${Math.random().toString(36).substring(2, 8).toUpperCase()}`

      setWaitlistPosition(position)
      setReferralCode(code)
      setIsSubmitted(true)

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      })

      // Reset form
      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    const currentStepData = form.getValues()
    
    // Validate current step
    let isValid = true
    let errorMessage = ""
    
    if (step === 1) {
      if (!currentStepData.email || !currentStepData.name || !currentStepData.phone || !currentStepData.company) {
        isValid = false
        errorMessage = "Please fill in all required fields."
      }
    } else if (step === 2) {
      if (!currentStepData.industry || !currentStepData.companySize || !currentStepData.role || !currentStepData.teamSize || !currentStepData.currentTools) {
        isValid = false
        errorMessage = "Please fill in all required fields."
      }
    } else if (step === 3) {
      if (!currentStepData.useCase || !currentStepData.dataType || !currentStepData.dataVolume || !currentStepData.timeline || !currentStepData.budget || !currentStepData.decisionMaker || !currentStepData.urgency) {
        isValid = false
        errorMessage = "Please fill in all required fields."
      }
    }
    
    if (!isValid) {
      toast({
        title: "Required Fields",
        description: errorMessage,
        variant: "destructive",
      })
      return
    }
    
    setStep(step + 1)
  }

  const copyReferralCode = async () => {
    if (referralCode) {
      await navigator.clipboard.writeText(referralCode)
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard.",
      })
    }
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `🚀 Just joined the @ModelShipAI waitlist! Can't wait to try their AI-powered data labeling platform. Join me using my referral code: ${referralCode}`
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#1a1a3a]/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-[#3B3A58]/30">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            You're on the list!
          </h3>
          <p className="text-gray-400">
            Your position: #{waitlistPosition}
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#0B0B1F] rounded-lg">
              <span className="text-gray-400">Your referral code:</span>
              <div className="flex items-center gap-2">
                <code className="text-[#8C52FF]">{referralCode}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyReferralCode}
                  className="hover:bg-[#3B3A58]/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
                onClick={shareOnTwitter}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#3B3A58]/50 text-white hover:bg-[#3B3A58]/20"
                onClick={copyReferralCode}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="waitlist-form" className="w-full max-w-xl mx-auto bg-[#1a1a3a]/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-[#3B3A58]/30">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-[#0B0B1F] rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm">Step {step} of {totalSteps}</p>
        </div>

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: -15 }} // Reduced from -20 to -15
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }} // Reduced from 20 to 15
            className="space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Basic Information
              </h3>
              <p className="text-gray-400">
                Let's start with your contact details and company information.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                {...form.register("email")}
                placeholder="Email address *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
              
              <Input
                {...form.register("name")}
                placeholder="Full name *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
              
              <Input
                type="tel"
                {...form.register("phone")}
                placeholder="Phone number *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.phone.message}
                </p>
              )}
              
              <Input
                {...form.register("company")}
                placeholder="Company name *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.company && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.company.message}
                </p>
              )}
              
              <Button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            initial={{ opacity: 0, x: 15 }} // Reduced from 20 to 15
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }} // Reduced from -20 to -15
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Company & Role Details
              </h3>
              <p className="text-gray-400">
                Help us understand your organization and current setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select onValueChange={(value) => form.setValue("industry", value)} value={form.watch("industry")}>
                  <SelectTrigger className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white">
                    <SelectValue placeholder="Industry *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0B1F] border-[#3B3A58]/50">
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="media">Media & Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.industry.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Select onValueChange={(value) => form.setValue("companySize", value)} value={form.watch("companySize")}>
                  <SelectTrigger className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white">
                    <SelectValue placeholder="Company size *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0B1F] border-[#3B3A58]/50">
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.companySize && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.companySize.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("role")}
                  placeholder="Your role *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.role && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.role.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...form.register("teamSize")}
                  placeholder="Team size *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.teamSize && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Input
                {...form.register("currentTools")}
                placeholder="Current tools/platforms you use *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.currentTools && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.currentTools.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-[#3B3A58]/50 text-white hover:bg-[#3B3A58]/20"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        ) : step === 3 ? (
          <motion.div
            initial={{ opacity: 0, x: 15 }} // Reduced from 20 to 15
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }} // Reduced from -20 to -15
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Project Requirements
              </h3>
              <p className="text-gray-400">
                Tell us about your data labeling needs and timeline.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                {...form.register("useCase")}
                placeholder="Describe your use case *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.useCase && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.useCase.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("dataType")}
                  placeholder="Type of data to label *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.dataType && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.dataType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...form.register("dataVolume")}
                  placeholder="Monthly data volume *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.dataVolume && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.dataVolume.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("timeline")}
                  placeholder="When do you want to start? *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.timeline && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.timeline.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...form.register("budget")}
                  placeholder="Monthly budget *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.budget && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.budget.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select onValueChange={(value) => form.setValue("decisionMaker", value)} value={form.watch("decisionMaker")}>
                  <SelectTrigger className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white">
                    <SelectValue placeholder="Decision maker role *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0B1F] border-[#3B3A58]/50">
                    <SelectItem value="decision-maker">Primary Decision Maker</SelectItem>
                    <SelectItem value="influencer">Influencer/Recommender</SelectItem>
                    <SelectItem value="evaluator">Evaluator/Researcher</SelectItem>
                    <SelectItem value="user">End User</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.decisionMaker && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.decisionMaker.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select onValueChange={(value) => form.setValue("urgency", value)} value={form.watch("urgency")}>
                  <SelectTrigger className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white">
                    <SelectValue placeholder="Urgency level *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0B1F] border-[#3B3A58]/50">
                    <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                    <SelectItem value="soon">Soon (1-2 months)</SelectItem>
                    <SelectItem value="planning">Planning (3-6 months)</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.urgency && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.urgency.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 border-[#3B3A58]/50 text-white hover:bg-[#3B3A58]/20"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                Next Step
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 15 }} // Reduced from 20 to 15
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }} // Reduced from -20 to -15
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Additional Details
              </h3>
              <p className="text-gray-400">
                Help us understand your current process and how you found us.
              </p>
            </div>

            {/* Current Process */}
            <div className="space-y-2">
              <Textarea
                {...form.register("currentProcess")}
                placeholder="Describe your current data labeling process *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.currentProcess && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.currentProcess.message}
                </p>
              )}
            </div>

            {/* Challenges */}
            <div className="space-y-2">
              <Textarea
                {...form.register("challenges")}
                placeholder="What challenges are you facing with your current process? *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.challenges && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.challenges.message}
                </p>
              )}
            </div>

            {/* Integrations */}
            <div className="space-y-2">
              <Input
                {...form.register("integrations")}
                placeholder="What tools/platforms would you like ModelShip to integrate with? *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.integrations && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.integrations.message}
                </p>
              )}
            </div>

            {/* Expectations */}
            <div className="space-y-2">
              <Textarea
                {...form.register("expectations")}
                placeholder="What are your expectations from ModelShip? *"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.expectations && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.expectations.message}
                </p>
              )}
            </div>

            {/* Referral Source and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select onValueChange={(value) => form.setValue("referralSource", value)} value={form.watch("referralSource")}>
                  <SelectTrigger className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white">
                    <SelectValue placeholder="How did you hear about us? *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0B1F] border-[#3B3A58]/50">
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="blog">Blog/Article</SelectItem>
                    <SelectItem value="conference">Conference/Event</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.referralSource && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.referralSource.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...form.register("location")}
                  placeholder="Your location *"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.location && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => setStep(3)}
                variant="outline"
                className="flex-1 border-[#3B3A58]/50 text-white hover:bg-[#3B3A58]/20"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#6F42C1] to-[#4F46E5] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}
