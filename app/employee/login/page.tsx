"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Wrench,
  ClipboardList,
  CheckSquare,
  Clock,
  Users,
  Search,
  Zap,
  Sparkles,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function TechnicianPortal() {
  const [currentSpotlight, setCurrentSpotlight] = useState(0)

  const features = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Assigned Jobs",
      description: "View and manage your current job assignments",
      color: "from-blue-500 to-cyan-500",
      href: "/technician/assigned-jobs",
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Job History",
      description: "Track completed services and performance",
      color: "from-green-500 to-emerald-500",
      href: "/technician/job-history",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Schedule",
      description: "Manage availability and time slots",
      color: "from-purple-500 to-pink-500",
      href: "/technician/schedule",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Tools & Resources",
      description: "Access technical documentation and support",
      color: "from-orange-500 to-red-500",
      href: "/technician/resources",
    },
  ]

  const spotlights = [
    {
      name: "Rajesh Kumar",
      role: "Electrical Technician",
      rating: 5,
      comment: "ServiceFuture helped me grow my client base and work flexibly.",
      avatar: "/placeholder.svg?height=60&width=60&text=RK",
    },
    {
      name: "Anita Rao",
      role: "Cleaning Specialist",
      rating: 5,
      comment: "The technician tools and scheduling make my work easy and efficient.",
      avatar: "/placeholder.svg?height=60&width=60&text=AR",
    },
    {
      name: "Vikram Singh",
      role: "Mechanic",
      rating: 5,
      comment: "On-time payments and great customer interaction platform.",
      avatar: "/placeholder.svg?height=60&width=60&text=VS",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpotlight((prev) => (prev + 1) % spotlights.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [spotlights.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Only inner content replaced — layout and appearance are preserved */}
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 animate-bounce">
            <Sparkles className="w-4 h-4 mr-2" />👨‍🔧 Technician Portal
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Work,
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              
              Simplified
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Access your job assignments, history, resources, and tools in one place. Stay connected, stay productive.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search jobs, schedules, documents..."
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-full">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="text-gray-300 hover:text-white flex items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 py-4"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              <Phone className="mr-2 w-5 h-5" />
              Support: 1-800-TECHHELP
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technician Tools</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your control center to manage tasks, access help, and optimize your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-white">{tool.icon}</div>
                    </div>
                    <CardTitle className="text-white text-xl">{tool.title}</CardTitle>
                    <CardDescription className="text-gray-300">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:border-transparent transition-all"
                    >
                      Open Tool
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technician Spotlights</h2>
            <p className="text-gray-300 text-lg">Real stories from top performers</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center">
                  <img
                    src="/placeholder.png"
                    alt={spotlights[currentSpotlight].name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(spotlights[currentSpotlight].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 mb-4 italic">"{spotlights[currentSpotlight].comment}"</p>
                  <div className="text-white font-bold">{spotlights[currentSpotlight].name}</div>
                  <div className="text-gray-400">{spotlights[currentSpotlight].role}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {spotlights.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSpotlight ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentSpotlight(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
