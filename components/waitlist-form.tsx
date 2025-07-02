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
  company: z.string().min(2, "Company name must be at least 2 characters"),
  role: z.string().min(2, "Please specify your role"),
  teamSize: z.string().min(1, "Please specify your team size"),
  useCase: z.string().min(10, "Please provide more details about your use case"),
  dataType: z.string().min(1, "Please specify your data type"),
  dataVolume: z.string().min(1, "Please specify your data volume"),
  timeline: z.string().min(1, "Please specify your timeline"),
  budget: z.string().min(1, "Please specify your budget"),
  currentProcess: z.string().min(10, "Please describe your current process"),
  challenges: z.string().min(10, "Please describe your challenges"),
  integrations: z.string().min(1, "Please specify desired integrations"),
  expectations: z.string().min(10, "Please describe your expectations"),
})

type FormData = z.infer<typeof formSchema>

export default function WaitlistForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null)
  const [referralCode, setReferralCode] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      role: "",
      teamSize: "",
      useCase: "",
      dataType: "",
      dataVolume: "",
      timeline: "",
      budget: "",
      currentProcess: "",
      challenges: "",
      integrations: "",
      expectations: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate response
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
    const email = form.getValues("email")
    if (!email) {
      toast({
        title: "Required Field",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    setStep(2)
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
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Join the Waitlist
              </h3>
              <p className="text-gray-400">
                Be among the first to experience ModelShip's AI-powered data labeling.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                {...form.register("email")}
                placeholder="Enter your email"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
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
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Tell us about your needs
              </h3>
              <p className="text-gray-400">
                Help us understand how we can best serve you.
              </p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("name")}
                  placeholder="Your name"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...form.register("company")}
                  placeholder="Company name"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.company && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.company.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role and Team Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("role")}
                  placeholder="Your role"
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
                  placeholder="Team size"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.teamSize && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>

            {/* Use Case */}
            <div className="space-y-2">
              <Textarea
                {...form.register("useCase")}
                placeholder="Describe your use case"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.useCase && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.useCase.message}
                </p>
              )}
            </div>

            {/* Data Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("dataType")}
                  placeholder="Type of data to label"
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
                  placeholder="Monthly data volume"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.dataVolume && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.dataVolume.message}
                  </p>
                )}
              </div>
            </div>

            {/* Timeline and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...form.register("timeline")}
                  placeholder="When do you want to start?"
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
                  placeholder="Monthly budget"
                  className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500"
                />
                {form.formState.errors.budget && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.budget.message}
                  </p>
                )}
              </div>
            </div>

            {/* Current Process */}
            <div className="space-y-2">
              <Textarea
                {...form.register("currentProcess")}
                placeholder="Describe your current data labeling process"
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
                placeholder="What challenges are you facing with your current process?"
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
                placeholder="What tools/platforms would you like ModelShip to integrate with?"
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
                placeholder="What are your expectations from ModelShip?"
                className="bg-[#0B0B1F] border-[#3B3A58]/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
              {form.formState.errors.expectations && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.expectations.message}
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
