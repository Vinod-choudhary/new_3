"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Wrench,
  Home,
  Car,
  Building,
  Plus,
  Bell,
  Settings,
  CreditCard,
  FileText,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const activeBookings = [
    {
      id: "SF-2024-001234",
      service: "AC Repair",
      technician: "Mike Johnson",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      address: "123 Main St, City",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
    },
    {
      id: "SF-2024-001235",
      service: "TV Repair",
      technician: "Sarah Wilson",
      date: "2024-01-22",
      time: "10:00 AM - 12:00 PM",
      status: "in_progress",
      address: "123 Main St, City",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
    },
  ]

  const recentServices = [
    {
      id: "SF-2024-001230",
      service: "Washing Machine Repair",
      technician: "John Smith",
      date: "2024-01-15",
      status: "completed",
      rating: 5,
      cost: "$89.00",
    },
    {
      id: "SF-2024-001228",
      service: "Refrigerator Service",
      technician: "Emily Davis",
      date: "2024-01-10",
      status: "completed",
      rating: 4,
      cost: "$125.00",
    },
    {
      id: "SF-2024-001225",
      service: "Car Oil Change",
      technician: "Robert Brown",
      date: "2024-01-05",
      status: "completed",
      rating: 5,
      cost: "$45.00",
    },
  ]

  const quickServices = [
    { name: "Home Appliances", icon: <Home className="w-6 h-6" />, href: "/services/home-appliances" },
    { name: "Vehicle Services", icon: <Car className="w-6 h-6" />, href: "/services/vehicle-services" },
    { name: "Home Services", icon: <Wrench className="w-6 h-6" />, href: "/services/home-services" },
    { name: "Commercial", icon: <Building className="w-6 h-6" />, href: "/services/commercial-services" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome back, John!</h1>
              <p className="text-sm text-gray-300">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <Link href="/profile">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeBookings.length}</div>
              <p className="text-xs text-gray-400">2 upcoming services</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Services</CardTitle>
              <Wrench className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +3 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.8</div>
              <p className="text-xs text-gray-400">Based on 12 reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$847</div>
              <p className="text-xs text-gray-400">This year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Bookings */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Active Bookings
                </CardTitle>
                <CardDescription className="text-gray-300">Your upcoming service appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-medium">{booking.service}</h3>
                          <p className="text-sm text-gray-400">Booking ID: {booking.id}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status.replace("_", " ")}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-300">
                            <User className="w-4 h-4 mr-2" />
                            {booking.technician}
                            <div className="flex items-center ml-2">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-white ml-1">{booking.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="w-4 h-4 mr-2" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            {booking.time}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-300">
                            <MapPin className="w-4 h-4 mr-2" />
                            {booking.address}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Phone className="w-4 h-4 mr-2" />
                            {booking.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                        >
                          Track Service
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          Contact Technician
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Services */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recent Services
                </CardTitle>
                <CardDescription className="text-gray-300">Your service history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{service.service}</h4>
                          <p className="text-sm text-gray-400">
                            {service.technician} • {service.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {[...Array(service.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-white font-medium">{service.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    View All Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Book</CardTitle>
                <CardDescription className="text-gray-300">Book a new service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickServices.map((service, index) => (
                  <Link key={index} href={service.href}>
                    <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white">
                      {service.icon}
                      <span className="ml-2">{service.name}</span>
                    </Button>
                  </Link>
                ))}
                <Link href="/services">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    View All Services
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Membership</span>
                  <Badge className="bg-gold-500/20 text-yellow-400 border-yellow-500/30">Premium</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Services Used</span>
                    <span className="text-white">8/15</span>
                  </div>
                  <Progress value={53} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next Billing</span>
                  <span className="text-white">Feb 15, 2024</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button className="w-full justify-start bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                  💬 Live Chat
                </Button>
                <Button className="w-full justify-start bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30">
                  📧 Email Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
