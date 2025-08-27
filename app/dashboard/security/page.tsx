"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Camera,
  Lock,
  AlertTriangle,
  Eye,
  Bell,
  Smartphone,
  Wifi,
  Battery,
  Clock,
  Home,
  DoorOpen,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const [systemArmed, setSystemArmed] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const securityStatus = {
    armed: systemArmed,
    cameras: { active: 4, total: 4 },
    sensors: { active: 12, total: 12 },
    alerts: 0,
    lastArmed: "2024-01-15 22:30:00",
  }

  const cameras = [
    {
      id: 1,
      name: "Front Door",
      location: "Entrance",
      status: "recording",
      battery: 85,
      lastMotion: "2 hours ago",
    },
    {
      id: 2,
      name: "Backyard",
      location: "Garden",
      status: "recording",
      battery: 92,
      lastMotion: "5 minutes ago",
    },
    {
      id: 3,
      name: "Living Room",
      location: "Indoor",
      status: "recording",
      battery: 78,
      lastMotion: "1 hour ago",
    },
    {
      id: 4,
      name: "Garage",
      location: "Garage",
      status: "standby",
      battery: 65,
      lastMotion: "6 hours ago",
    },
  ]

  const sensors = [
    { name: "Front Door", type: "door", status: "closed", battery: 95 },
    { name: "Back Door", type: "door", status: "closed", battery: 88 },
    { name: "Living Room Window", type: "window", status: "closed", battery: 92 },
    { name: "Kitchen Window", type: "window", status: "closed", battery: 85 },
    { name: "Bedroom Window", type: "window", status: "closed", battery: 90 },
    { name: "Motion Sensor - Hallway", type: "motion", status: "active", battery: 82 },
    { name: "Motion Sensor - Kitchen", type: "motion", status: "active", battery: 87 },
    { name: "Glass Break - Living Room", type: "glass", status: "active", battery: 94 },
    { name: "Smoke Detector - Kitchen", type: "smoke", status: "active", battery: 76 },
    { name: "Smoke Detector - Bedroom", type: "smoke", status: "active", battery: 81 },
    { name: "Carbon Monoxide - Garage", type: "co", status: "active", battery: 89 },
    { name: "Water Leak - Basement", type: "water", status: "active", battery: 93 },
  ]

  const recentActivity = [
    { time: "2:30 PM", event: "Front Door opened", user: "John Doe", type: "access" },
    { time: "1:45 PM", event: "Motion detected in backyard", user: "System", type: "motion" },
    { time: "12:15 PM", event: "System armed", user: "Jane Doe", type: "system" },
    { time: "11:30 AM", event: "Garage door opened", user: "John Doe", type: "access" },
    { time: "10:20 AM", event: "Motion detected in living room", user: "System", type: "motion" },
  ]

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "door":
        return <DoorOpen className="w-4 h-4" />
      case "window":
        return <Home className="w-4 h-4" />
      case "motion":
        return <Activity className="w-4 h-4" />
      case "glass":
        return <AlertTriangle className="w-4 h-4" />
      case "smoke":
        return <AlertTriangle className="w-4 h-4" />
      case "co":
        return <AlertTriangle className="w-4 h-4" />
      case "water":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
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
              <h1 className="text-xl font-bold text-white">Security Center</h1>
              <p className="text-sm text-gray-300">Monitor and control your home security</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge
              className={
                systemArmed
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }
            >
              <Shield className="w-3 h-3 mr-1" />
              {systemArmed ? "Armed" : "Disarmed"}
            </Badge>
            <Button
              className={
                systemArmed
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
              }
              onClick={() => setSystemArmed(!systemArmed)}
            >
              {systemArmed ? "Disarm System" : "Arm System"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">System Status</CardTitle>
              <Shield className={`h-4 w-4 ${systemArmed ? "text-green-400" : "text-red-400"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${systemArmed ? "text-green-400" : "text-red-400"}`}>
                {systemArmed ? "Armed" : "Disarmed"}
              </div>
              <p className="text-xs text-gray-400">Last armed: {new Date(securityStatus.lastArmed).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Cameras</CardTitle>
              <Camera className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {securityStatus.cameras.active}/{securityStatus.cameras.total}
              </div>
              <p className="text-xs text-gray-400">All cameras online</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Sensors</CardTitle>
              <Activity className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {securityStatus.sensors.active}/{securityStatus.sensors.total}
              </div>
              <p className="text-xs text-gray-400">All sensors active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStatus.alerts}</div>
              <p className="text-xs text-gray-400">No active alerts</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Security Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="cameras" className="space-y-6">
              <TabsList className="bg-white/10 w-full">
                <TabsTrigger value="cameras" className="text-white flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Cameras
                </TabsTrigger>
                <TabsTrigger value="sensors" className="text-white flex-1">
                  <Activity className="w-4 h-4 mr-2" />
                  Sensors
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-white flex-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cameras">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Security Cameras</CardTitle>
                    <CardDescription className="text-gray-300">Monitor all camera feeds and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cameras.map((camera) => (
                        <div key={camera.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{camera.name}</h4>
                                <p className="text-sm text-gray-400">{camera.location}</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                camera.status === "recording"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                              }
                            >
                              {camera.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-300 flex items-center">
                                <Battery className="w-3 h-3 mr-1" />
                                Battery
                              </span>
                              <span className="text-white">{camera.battery}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-300 flex items-center">
                                <Activity className="w-3 h-3 mr-1" />
                                Last Motion
                              </span>
                              <span className="text-white">{camera.lastMotion}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Live
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              Settings
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sensors">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Security Sensors</CardTitle>
                    <CardDescription className="text-gray-300">
                      Monitor all sensor status and battery levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sensors.map((sensor, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white">
                              {getSensorIcon(sensor.type)}
                            </div>
                            <div>
                              <p className="text-white font-medium">{sensor.name}</p>
                              <p className="text-sm text-gray-400 capitalize">{sensor.type} sensor</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <Badge
                                className={
                                  sensor.status === "active" || sensor.status === "closed"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }
                              >
                                {sensor.status}
                              </Badge>
                              <p className="text-xs text-gray-400 mt-1">
                                <Battery className="w-3 h-3 inline mr-1" />
                                {sensor.battery}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-300">
                      Latest security events and system activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                            {activity.type === "access" && <Lock className="w-5 h-5 text-white" />}
                            {activity.type === "motion" && <Activity className="w-5 h-5 text-white" />}
                            {activity.type === "system" && <Shield className="w-5 h-5 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.event}</p>
                            <p className="text-sm text-gray-400">
                              {activity.user} • {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Controls */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">System Armed</span>
                  <Switch checked={systemArmed} onCheckedChange={setSystemArmed} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Notifications</span>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <Button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile App
                </Button>
                <Button className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30">
                  <Bell className="w-4 h-4 mr-2" />
                  Alert Settings
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                  🚨 Emergency Services
                </Button>
                <Button className="w-full justify-start bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                  🏠 Security Company
                </Button>
                <Button className="w-full justify-start bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                  👨‍💼 Property Manager
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center">
                    <Wifi className="w-4 h-4 mr-2" />
                    Network
                  </span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center">
                    <Battery className="w-4 h-4 mr-2" />
                    Backup Battery
                  </span>
                  <span className="text-white">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Last Test
                  </span>
                  <span className="text-white">2 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
