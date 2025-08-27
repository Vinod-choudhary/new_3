"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Car,
  Bike,
  BatteryCharging,
  Truck,
  AlertTriangle,
  Gauge,
  Search,
  Star,
  Clock,
  Shield,
  ArrowLeft,
  Wrench,
} from "lucide-react"
import Link from "next/link"

export default function VehicleServicePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      id: 1,
      name: "Car Repair",
      icon: <Car className="w-8 h-8" />,
      description: "Comprehensive car repair and maintenance services",
      services: ["Engine repair", "Brake service", "AC service", "Oil change"],
      price: "Starting from $99",
      rating: 4.9,
      reviews: 1283,
      image: "/placeholder.svg?height=200&width=300&text=Car+Repair",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Bike Service",
      icon: <Bike className="w-8 h-8" />,
      description: "Two-wheeler maintenance, repair, and inspection",
      services: ["Chain lubrication", "Brake tuning", "Battery check", "Engine tuning"],
      price: "Starting from $49",
      rating: 4.8,
      reviews: 984,
      image: "/placeholder.svg?height=200&width=300&text=Bike+Service",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      name: "Towing Service",
      icon: <Truck className="w-8 h-8" />,
      description: "24/7 towing for all vehicles and breakdowns",
      services: ["Emergency towing", "Flatbed towing", "Long-distance", "Local recovery"],
      price: "Starting from $79",
      rating: 4.7,
      reviews: 1132,
      image: "/placeholder.svg?height=200&width=300&text=Towing+Service",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      name: "On-Road Assistance",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Stuck on the road? We’ll get you moving again.",
      services: ["Flat tire fix", "Fuel delivery", "Minor repairs", "Lockout service"],
      price: "Starting from $59",
      rating: 4.6,
      reviews: 743,
      image: "/placeholder.svg?height=200&width=300&text=On-Road+Assistance",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "Battery Jumpstart",
      icon: <BatteryCharging className="w-8 h-8" />,
      description: "Dead battery? Quick and safe jumpstart anywhere.",
      services: ["Jumpstart", "Battery test", "Battery replacement", "Terminal cleaning"],
      price: "Starting from $39",
      rating: 4.5,
      reviews: 456,
      image: "/placeholder.svg?height=200&width=300&text=Jumpstart+Service",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 6,
      name: "Engine Diagnostics",
      icon: <Gauge className="w-8 h-8" />,
      description: "Advanced computer diagnostics for all vehicles",
      services: ["OBD scans", "Error code analysis", "Performance checks", "Sensor check"],
      price: "Starting from $65",
      rating: 4.4,
      reviews: 321,
      image: "/placeholder.svg?height=200&width=300&text=Diagnostics",
      color: "from-amber-500 to-yellow-500",
    },
  ]

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Vehicle Service</h1>
              <p className="text-sm text-gray-300">Reliable vehicle repairs & roadside support</p>
            </div>
          </div>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              Book Service
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vehicle
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Services
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Complete care for your vehicle – repair, service, and emergency help from trusted experts.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search services... (Car, Bike, Towing, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-300">Certified Mechanics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-300">Emergency Service</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">90 Days</div>
              <div className="text-gray-300">Service Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8★</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
            >
              <CardHeader>
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">{service.name}</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{service.price}</Badge>
                </div>
                <CardDescription className="text-gray-300">{service.description}</CardDescription>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white ml-1">{service.rating}</span>
                  </div>
                  <span className="text-gray-400">({service.reviews} reviews)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Services Include:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.services.map((item, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Same day service
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    90-day warranty
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Link href={`/services/request?type=vehicle&service=${service.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                      <Wrench className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
            <p className="text-gray-400">Try adjusting your search terms.</p>
          </div>
        )}

        <section className="py-16 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Vehicle Services?</h2>
            <p className="text-gray-300 text-lg">Trusted experts, fast support, and peace of mind on the road</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Certified Mechanics</h3>
                <p className="text-gray-300">Experienced professionals ready to handle your vehicle issues</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                <p className="text-gray-300">We aim for same-day service and rapid roadside assistance</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Service Guarantee</h3>
                <p className="text-gray-300">Enjoy peace of mind with our 90-day post-service warranty</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
