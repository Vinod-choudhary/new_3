"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, MapPin, Phone, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Helpers for date logic
const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const addDays = (d: Date, days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days)

export default function ServiceRequestPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    serviceType: "",
    issue: "",
    urgency: "normal", // low | normal | urgent
    preferredTime: "",
    arrivalWindow: "", // used for urgent only
    address: "",
    phone: "",
    additionalNotes: "",
    agreedToTerms: false,
  })

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
    "7:00 PM - 9:00 PM",
  ]

  const urgentWindows = ["Within 60 minutes", "60–90 minutes", "90–120 minutes"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(4) // Success step
    }, 1200)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  // Dynamic helpers
  const today = stripTime(new Date())

  const canProceedStep2 = (() => {
    if (formData.urgency === "urgent") {
      return !!(formData.arrivalWindow && formData.address && formData.phone)
    }
    return !!(selectedDate && formData.preferredTime && formData.address && formData.phone)
  })()

  const pricing = (() => {
    // Base fees
    const items: { label: string; amount: number }[] = [
      { label: "Service Call Fee", amount: 49 },
      { label: "Diagnostic Fee", amount: 25 },
    ]

    if (formData.urgency === "urgent") items.push({ label: "Urgent Service Fee", amount: 30 })
    if (formData.urgency === "low") items.push({ label: "Flex Scheduling Discount", amount: -10 })

    const total = items.reduce((sum, i) => sum + i.amount, 0)
    return { items, total }
  })()

  const UrgencyBadge = () => (
    <Badge
      className={`ml-2 ${
        formData.urgency === "urgent"
          ? "bg-red-500/20 text-red-400 border-red-500/30"
          : formData.urgency === "normal"
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-green-500/20 text-green-400 border-green-500/30"
      }`}
    >
      {formData.urgency}
    </Badge>
  )

  const SchedulingSection = () => {
    if (formData.urgency === "urgent") {
      return (
        <>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
            <div className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4 text-red-400" />
              <p>
                <span className="font-semibold text-white">Urgent:</span> We'll dispatch the nearest technician in
                <span className="mx-1 font-medium text-white">1–2 hours</span>. Pick an arrival window and keep your
                phone available.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <Label className="text-white">Arrival Window</Label>
              <Select
                value={formData.arrivalWindow}
                onValueChange={(value) => setFormData({ ...formData, arrivalWindow: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select arrival window" />
                </SelectTrigger>
                <SelectContent>
                  {urgentWindows.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="address" className="text-white">
              Service Address
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Gate code, parking info, special instructions..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </>
      )
    }

    if (formData.urgency === "normal") {
      return (
        <>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
            <div className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4 text-yellow-400" />
              <p>
                <span className="font-semibold text-white">Same Day:</span> Choose a slot for <span className="font-medium text-white">today</span>.
                We'll match you to a nearby pro for the selected window.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <Label className="text-white">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick today"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => !isSameDay(stripTime(date), today)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Preferred Time (Today)</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="address" className="text-white">
              Service Address
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </>
      )
    }

    // LOW PRIORITY
    return (
      <>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
          <div className="flex items-start">
            <AlertCircle className="mr-2 h-4 w-4 text-green-400" />
            <p>
              <span className="font-semibold text-white">Low Priority:</span> Flexible scheduling within
              <span className="mx-1 font-medium text-white">1–2 days</span>. Enjoy a small discount for flexible timing.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label className="text-white">Preferred Date (Next 2 days)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const d = stripTime(date)
                    return d < today || d > addDays(today, 2)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Preferred Time</Label>
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="address" className="text-white">
            Service Address
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address..."
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-white">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional information or special instructions..."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </>
    )
  }
 
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
              <h1 className="text-xl font-bold text-white">Request Service</h1>
              <p className="text-sm text-gray-300">Book your service request</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? "bg-gradient-to-r from-cyan-500 to-purple-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Service Details</CardTitle>
                <CardDescription className="text-gray-300">
                  Tell us about the issue you're experiencing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-white">
                    Service Type
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue" className="text-white">
                    Describe the Issue
                  </Label>
                  <Textarea
                    id="issue"
                    placeholder="Please describe the problem you're experiencing..."
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Urgency Level</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, urgency: value, preferredTime: "", arrivalWindow: "" })
                      setSelectedDate(undefined)
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-white cursor-pointer">
                        <div className="font-medium">Low Priority</div>
                        <div className="text-sm text-gray-400">Within 1–2 days</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal" className="text-white cursor-pointer">
                        <div className="font-medium">Normal</div>
                        <div className="text-sm text-gray-400">Same day</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="text-white cursor-pointer">
                        <div className="font-medium">Urgent</div>
                        <div className="text-sm text-gray-400">In 1–2 hours</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    disabled={!formData.serviceType || !formData.issue}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{formData.urgency === "urgent" ? "ASAP Scheduling & Contact" : formData.urgency === "normal" ? "Same‑Day Scheduling & Contact" : "Flexible Scheduling & Contact"}</CardTitle>
                <CardDescription className="text-gray-300">
                  {formData.urgency === "urgent"
                    ? "Pick an arrival window within the next 1–2 hours and share your contact details."
                    : formData.urgency === "normal"
                    ? "Choose today's time slot and provide your contact details."
                    : "Choose a slot within the next 2 days and provide your contact details."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SchedulingSection />

                <div className="flex justify-between">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    disabled={!canProceedStep2}
                  >
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Review & Confirm</CardTitle>
                <CardDescription className="text-gray-300">
                  Please review your request details before confirming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Summary */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-4">Service Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Service Type:</span>
                      <span className="text-white ml-2 capitalize">{formData.serviceType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400">Urgency:</span>
                      <UrgencyBadge />
                    </div>
                    {formData.urgency === "urgent" ? (
                      <div>
                        <span className="text-gray-400">Arrival Window:</span>
                        <span className="text-white ml-2">{formData.arrivalWindow}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-gray-400">Date & Time:</span>
                        <span className="text-white ml-2">
                          {selectedDate ? format(selectedDate, "PPP") : ""} at {formData.preferredTime}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-400">Issue Description:</span>
                    <p className="text-white mt-1">{formData.issue}</p>
                  </div>
                </div>

                {/* Contact & Address */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-4">Contact & Address</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-white">{formData.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-white">{formData.address}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-4">Pricing</h3>
                  <div className="space-y-2">
                    {pricing.items.map((i) => (
                      <div key={i.label} className="flex justify-between">
                        <span className="text-gray-400">{i.label}</span>
                        <span className={`text-white ${i.amount < 0 ? "text-green-300" : ""}`}>
                          {i.amount < 0 ? "-" : ""}${Math.abs(i.amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total Estimate</span>
                        <span className="text-white">${pricing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">* Final cost may vary based on actual work required.</p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                    className="border-white/20 mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                    I agree to the {" "}
                    <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                      Terms of Service
                    </Link>{" "}
                    and {" "}
                    <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                      Privacy Policy
                    </Link>
                    . I understand that the final cost may vary based on the actual service requirements.
                  </Label>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    disabled={!formData.agreedToTerms || isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Booking"}
                    <CreditCard className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Your request has been submitted. We'll match you with the best available technician.
                </p>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
                  <h3 className="text-white font-bold mb-4">Booking Reference</h3>
                  <div className="text-2xl font-mono text-cyan-400 mb-4">#SF-2024-001234</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {formData.urgency === "urgent" ? (
                      <div>
                        <span className="text-gray-400">Arrival Window:</span>
                        <div className="text-white">{formData.arrivalWindow}</div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="text-gray-400">Service Date:</span>
                          <div className="text-white">{selectedDate ? format(selectedDate, "PPP") : ""}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Time Slot:</span>
                          <div className="text-white">{formData.preferredTime}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center text-gray-300">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {formData.urgency === "urgent"
                      ? "You'll receive a confirmation call within 10 minutes."
                      : formData.urgency === "normal"
                      ? "You'll receive a confirmation call within 30 minutes."
                      : "We'll confirm your flexible slot within a few hours."}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard">
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                        View Dashboard
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        Book Another Service
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
