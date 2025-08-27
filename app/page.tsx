"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Wrench,
  Home,
  Car,
  Building,
  Star,
  Shield,
  Clock,
  Users,
  Search,
  Zap,
  Sparkles,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const serviceAvailability = {
  15: ["Electrician", "Plumber", "Carpenter", "Vehicle Service"],
  20: ["Home Appliances", "Vehicle Service"],
  30: ["Electrician", "Home Appliances"],
};
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("15");
  const [detected, setDetected] = useState(false);
   const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleDetectLocation = () => {
    setLocation("📍 Detected: Boisar, Palghar, Maharashtra")
    setDetected(true)
  }

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home Appliances",
      description: "TV, AC, Fridge, Washing Machine repair & maintenance",
      color: "from-blue-500 to-cyan-500",
      href: "/services/home-appliances",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "General Home Services",
      description: "Cleaning, Plumbing, Electrical, and maintenance",
      color: "from-green-500 to-emerald-500",
      href: "/services/home-services",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Services",
      description: "Car, Bike repair, Towing, On-road assistance",
      color: "from-purple-500 to-pink-500",
      href: "/services/vehicle-services",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Commercial Services",
      description: "Office maintenance, Commercial cleaning",
      color: "from-orange-500 to-red-500",
      href: "/services/commercial-services",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "AC Repair",
      rating: 5,
      comment: "Amazing service! Fixed my AC in 30 minutes. Highly professional technician.",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      name: "Mike Chen",
      service: "Car Repair",
      rating: 5,
      comment: "Quick response and excellent work. My car runs like new now!",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
    },
    {
      name: "Emily Davis",
      service: "Home Cleaning",
      rating: 5,
      comment: "Thorough cleaning service. They exceeded my expectations completely.",
      avatar: "/placeholder.svg?height=60&width=60&text=ED",
    },
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Expert Technicians" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Success Rate" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ServiceFuture</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/employee/login" className="text-gray-300 hover:text-white transition-colors">
              Technician Portal
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 animate-bounce">
            <Sparkles className="w-4 h-4 mr-2" />🚀 Future of Home & Vehicle Services
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Expert Services
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> On Demand</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get professional help for your home appliances, cleaning, vehicle repairs, and more. Our certified
            technicians are ready to serve you 24/7 with cutting-edge solutions.
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for services... (AC repair, car service, cleaning, etc.)"
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-full">
                Search
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 py-4"
              >
                Book Service Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              <Phone className="mr-2 w-5 h-5" />
              Emergency: 1-800-SERVICE
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Professional solutions for all your home and vehicle needs with certified technicians
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:border-transparent transition-all"
                    >
                      Explore Services
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Location & Radius Section */}
      <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white">
        <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Set Your Service Location & Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Your Location</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter city, pincode, or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/20 text-white placeholder:text-gray-300"
                />
                <Button onClick={handleDetectLocation} variant="secondary">
                  Detect
                </Button>
              </div>
            </div>

            {/* Service Radius Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Range</label>
              <Select value={radius} onValueChange={setRadius}>
                <SelectTrigger className="bg-white/20 text-white">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="15">15 km</SelectItem>
                  <SelectItem value="20">20 km</SelectItem>
                  <SelectItem value="30">30 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Showcase Result */}
            <div className="p-4 rounded-xl bg-white/10 text-center border border-white/20">
              {location ? (
                <p>
                  ✅ Services will be shown for <strong>{location}</strong> within{" "}
                  <strong>{radius} km</strong>.
                </p>
              ) : (
                <p className="text-gray-300">Please enter or detect your location.</p>
              )}
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-600">
              Search Services in My Area
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-300 text-lg">Simple steps to get expert help</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">1. Choose Service</h3>
              <p className="text-gray-300">Browse our services and select what you need help with</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">2. Get Matched</h3>
              <p className="text-gray-300">We connect you with the best available technician nearby</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">3. Job Done</h3>
              <p className="text-gray-300">Professional service completed to your satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose ServiceFuture?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Verified Technicians</h3>
                    <p className="text-gray-300">All our technicians are background-checked and certified professionals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">24/7 Availability</h3>
                    <p className="text-gray-300">Emergency services available round the clock for urgent repairs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Quality Guarantee</h3>
                    <p className="text-gray-300">100% satisfaction guarantee with warranty on all services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">

              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <img
                  src="why-choose-servicefuture.png?height=400&width=500&text=Technician+at+Work"
                  alt="Professional technician"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-gray-300 text-lg">Real reviews from satisfied customers</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center">
                  <img
                    src="/placeholder.png"
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 mb-4 italic">"{testimonials[currentTestimonial].comment}"</p>
                  <div className="text-white font-bold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-400">{testimonials[currentTestimonial].service}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-black mb-4">Ready to Get Started?</h2>
              <p className="text-black-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust ServiceFuture for all their home and vehicle needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8"
                  >
                    Book Your First Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-black border-blue-900 text-lg px-8 py-3 border-2 rounded-xl bg-white hover:text-white hover:bg-blue-900 hover:shadow-lg active:scale-95 active:bg-blue-950 active:border-transparent transition-all duration-300 ease-in-out"
                    >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ServiceFuture</span>
              </div>
              <p className="text-gray-300 mb-4">Professional home and vehicle services at your fingertips.</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/services/home-appliances" className="hover:text-white">
                    Home Appliances
                  </Link>
                </li>
                <li>
                  <Link href="/services/home-services" className="hover:text-white">
                    Home Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/vehicle-services" className="hover:text-white">
                    Vehicle Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/commercial-services" className="hover:text-white">
                    Commercial
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/employee/login" className="hover:text-white">
                    Technician Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 ServiceFuture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
