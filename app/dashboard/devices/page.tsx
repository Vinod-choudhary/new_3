"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Home,
  Lightbulb,
  Thermometer,
  Lock,
  Camera,
  Tv,
  Wind,
  Search,
  Plus,
  Settings,
  Power,
  Wifi,
  WifiOff,
} from "lucide-react"
import Link from "next/link"

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Living Room Lights",
      type: "light",
      status: "on",
      brightness: 75,
      power: 45,
      room: "Living Room",
      connected: true,
    },
    {
      id: 2,
      name: "Kitchen Thermostat",
      type: "thermostat",
      status: "auto",
      temperature: 72,
      power: 120,
      room: "Kitchen",
      connected: true,
    },
    {
      id: 3,
      name: "Front Door Lock",
      type: "security",
      status: "locked",
      power: 5,
      room: "Entrance",
      connected: true,
    },
    {
      id: 4,
      name: "Security Camera",
      type: "camera",
      status: "recording",
      power: 15,
      room: "Front Yard",
      connected: true,
    },
    {
      id: 5,
      name: "Smart TV",
      type: "entertainment",
      status: "off",
      power: 0,
      room: "Living Room",
      connected: false,
    },
    {
      id: 6,
      name: "Air Purifier",
      type: "air",
      status: "on",
      speed: 3,
      power: 35,
      room: "Bedroom",
      connected: true,
    },
  ])

  const toggleDevice = (id: number) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, status: device.status === "on" ? "off" : "on" } : device,
      ),
    )
  }

  const updateBrightness = (id: number, brightness: number) => {
    setDevices(devices.map((device) => (device.id === id ? { ...device, brightness } : device)))
  }

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.room.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "light":
        return <Lightbulb className="w-5 h-5" />
      case "thermostat":
        return <Thermometer className="w-5 h-5" />
      case "security":
        return <Lock className="w-5 h-5" />
      case "camera":
        return <Camera className="w-5 h-5" />
      case "entertainment":
        return <Tv className="w-5 h-5" />
      case "air":
        return <Wind className="w-5 h-5" />
      default:
        return <Home className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white">
              ← Back to Dashboard
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Device Management</h1>
              <p className="text-sm text-gray-300">Control and monitor all your smart devices</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search devices or rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center text-white">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{device.name}</CardTitle>
                      <CardDescription className="text-gray-300">{device.room}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {device.connected ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status and Power Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        device.status === "on" ||
                        device.status === "recording" ||
                        device.status === "locked" ||
                        device.status === "auto"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }
                    >
                      {device.status}
                    </Badge>
                    <span className="text-sm text-gray-400">{device.power}W</span>
                  </div>
                  <Switch
                    checked={device.status !== "off"}
                    onCheckedChange={() => toggleDevice(device.id)}
                    disabled={!device.connected}
                  />
                </div>

                {/* Device-specific Controls */}
                {device.type === "light" && device.brightness && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Brightness</span>
                      <span className="text-white">{device.brightness}%</span>
                    </div>
                    <Slider
                      value={[device.brightness]}
                      onValueChange={(value) => updateBrightness(device.id, value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                      disabled={device.status === "off" || !device.connected}
                    />
                  </div>
                )}

                {device.type === "thermostat" && device.temperature && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Temperature</span>
                      <span className="text-white">{device.temperature}°F</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                {device.type === "air" && device.speed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Fan Speed</span>
                      <span className="text-white">Level {device.speed}</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded ${level <= device.speed ? "bg-cyan-400" : "bg-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                    disabled={!device.connected}
                  >
                    <Power className="w-3 h-3 mr-1" />
                    Toggle
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No devices found</h3>
            <p className="text-gray-400">Try adjusting your search terms or add new devices.</p>
          </div>
        )}
      </div>
    </div>
  )
}
