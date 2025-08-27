"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Tv,
  Refrigerator,
  Wind,
  WashingMachineIcon as Washing,
  Microwave,
  Coffee,
  Search,
  Star,
  Clock,
  Shield,
  ArrowLeft,
  Wrench,
} from "lucide-react"
import Link from "next/link"

export default function CommercialServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const appliances = [
    {
      id: 1,
      name: "Office Maintenance",
      icon: <Tv className="w-8 h-8" />,
      description: "Electrical, plumbing, and HVAC upkeep for commercial buildings",
      services: ["HVAC servicing", "Plumbing", "Lighting repair", "Facility checks"],
      price: "Starting from $149",
      rating: 4.8,
      reviews: 1247,
      image: "/placeholder.svg?height=200&width=300&text=Office+Maintenance",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Commercial Cleaning",
      icon: <Refrigerator className="w-8 h-8" />,
      description: "Professional cleaning services for offices, buildings, and shops",
      services: ["Floor cleaning", "Carpet vacuuming", "Window washing", "Sanitization"],
      price: "Starting from $99",
      rating: 4.9,
      reviews: 892,
      image: "/placeholder.svg?height=200&width=300&text=Commercial+Cleaning",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const filteredAppliances = appliances.filter(
    (appliance) =>
      appliance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Commercial Services</h1>
              <p className="text-sm text-gray-300">Professional commercial service solutions</p>
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Commercial
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Service Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Expert professionals for your commercial space needs. Reliable and efficient service you can trust.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search services... (Office maintenance, Cleaning, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-300">Expert Technicians</div>
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
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAppliances.map((appliance) => (
            <Card
              key={appliance.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
            >
              <CardHeader>
                <div className="relative">
                  <img
                    src={appliance.image || "/placeholder.svg"}
                    alt={appliance.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${appliance.color} rounded-xl flex items-center justify-center`}
                  >
                    <div className="text-white">{appliance.icon}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">{appliance.name}</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{appliance.price}</Badge>
                </div>
                <CardDescription className="text-gray-300">{appliance.description}</CardDescription>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white ml-1">{appliance.rating}</span>
                  </div>
                  <span className="text-gray-400">({appliance.reviews} reviews)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Services List */}
                <div>
                  <h4 className="text-white font-medium mb-2">Services Include:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {appliance.services.map((service, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
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

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Link href={`/services/request?type=appliance&service=${appliance.id}`} className="flex-1">
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

        {filteredAppliances.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
            <p className="text-gray-400">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Why Choose Us Section */}
        <section className="py-16 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Commercial Services?</h2>
            <p className="text-gray-300 text-lg">Professional, reliable, and affordable solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Certified Technicians</h3>
                <p className="text-gray-300">All our technicians are certified and experienced professionals</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                <p className="text-gray-300">Same-day service available for urgent repairs</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality Guarantee</h3>
                <p className="text-gray-300">90-day warranty on all repairs and replacements</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
