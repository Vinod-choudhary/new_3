"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wrench,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Navigation,
  MessageSquare,
} from "lucide-react"

export default function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const assignedJobs = [
    {
      id: "SF-2024-001234",
      service: "AC Repair",
      customer: "John Doe",
      address: "123 Main St, Downtown",
      phone: "+1 (555) 123-4567",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      status: "assigned",
      priority: "normal",
      description: "AC not cooling properly, making strange noises",
      estimatedDuration: "2 hours",
      customerRating: 4.8,
    },
    {
      id: "SF-2024-001235",
      service: "TV Repair",
      customer: "Sarah Wilson",
      address: "456 Oak Ave, Uptown",
      phone: "+1 (555) 987-6543",
      date: "2024-01-20",
      time: "4:30 PM - 6:30 PM",
      status: "in_progress",
      priority: "urgent",
      description: "TV screen flickering, no sound output",
      estimatedDuration: "1.5 hours",
      customerRating: 4.9,
    },
  ]

  const completedJobs = [
    {
      id: "SF-2024-001230",
      service: "Washing Machine Repair",
      customer: "Mike Johnson",
      date: "2024-01-19",
      status: "completed",
      rating: 5,
      earnings: "$89.00",
      duration: "1.5 hours",
    },
    {
      id: "SF-2024-001228",
      service: "Refrigerator Service",
      customer: "Emily Davis",
      date: "2024-01-18",
      status: "completed",
      rating: 4,
      earnings: "$125.00",
      duration: "2 hours",
    },
  ]

  const stats = {
    todayJobs: 3,
    weeklyEarnings: 450,
    rating: 4.8,
    completionRate: 98,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "normal":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "low":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleAcceptJob = (jobId: string) => {
    console.log("Accepting job:", jobId)
    // Handle job acceptance
  }

  const handleRejectJob = (jobId: string) => {
    console.log("Rejecting job:", jobId)
    // Handle job rejection
  }

  const handleCompleteJob = (jobId: string) => {
    console.log("Completing job:", jobId)
    // Handle job completion
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=MT" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white">MT</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome, Mike Thompson!</h1>
              <p className="text-sm text-gray-300">
                Technician ID: EMP-001 • {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Today's Jobs</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.todayJobs}</div>
              <p className="text-xs text-gray-400">2 pending, 1 completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Weekly Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.weeklyEarnings}</div>
              <p className="text-xs text-gray-400">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.rating}</div>
              <p className="text-xs text-gray-400">Based on 47 reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completionRate}%</div>
              <p className="text-xs text-gray-400">Excellent performance</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="assigned" className="space-y-6">
              <TabsList className="bg-white/10 w-full">
                <TabsTrigger value="assigned" className="text-white flex-1">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Assigned Jobs ({assignedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-white flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed Jobs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="assigned">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Assigned Jobs</CardTitle>
                    <CardDescription className="text-gray-300">
                      Jobs assigned to you that need attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {assignedJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-white font-bold text-lg">{job.service}</h3>
                              <p className="text-sm text-gray-400">Job ID: {job.id}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Badge className={getStatusColor(job.status)}>{job.status.replace("_", " ")}</Badge>
                              <Badge className={getPriorityColor(job.priority)}>{job.priority}</Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div className="space-y-3">
                              <div className="flex items-center text-gray-300">
                                <User className="w-4 h-4 mr-2" />
                                <span>{job.customer}</span>
                                <div className="flex items-center ml-2">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-white ml-1">{job.customerRating}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>{job.phone}</span>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{job.address}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center text-gray-300">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{job.date}</span>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{job.time}</span>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Wrench className="w-4 h-4 mr-2" />
                                <span>Est. {job.estimatedDuration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Problem Description:</h4>
                            <p className="text-gray-300 bg-white/5 p-3 rounded-lg">{job.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.status === "assigned" && (
                              <>
                                <Button
                                  onClick={() => handleAcceptJob(job.id)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Accept Job
                                </Button>
                                <Button
                                  onClick={() => handleRejectJob(job.id)}
                                  variant="outline"
                                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Decline
                                </Button>
                              </>
                            )}
                            {job.status === "in_progress" && (
                              <Button
                                onClick={() => handleCompleteJob(job.id)}
                                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark Complete
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Navigation className="w-4 h-4 mr-2" />
                              Get Directions
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contact Customer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Completed Jobs</CardTitle>
                    <CardDescription className="text-gray-300">Your recent completed services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {completedJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{job.service}</h4>
                              <p className="text-sm text-gray-400">
                                {job.customer} • {job.date} • {job.duration}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(job.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <p className="text-white font-medium">{job.earnings}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">AC Repair</p>
                    <p className="text-sm text-gray-400">2:00 PM - 4:00 PM</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Assigned</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">TV Repair</p>
                    <p className="text-sm text-gray-400">4:30 PM - 6:30 PM</p>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Jobs This Month</span>
                  <span className="text-white font-bold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-bold">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">On-Time Rate</span>
                  <span className="text-white font-bold">96%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Customer Satisfaction</span>
                  <span className="text-white font-bold">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                  📍 Update Location
                </Button>
                <Button className="w-full justify-start bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                  📋 View Inventory
                </Button>
                <Button className="w-full justify-start bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30">
                  💰 View Earnings
                </Button>
                <Button className="w-full justify-start bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30">
                  📞 Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
