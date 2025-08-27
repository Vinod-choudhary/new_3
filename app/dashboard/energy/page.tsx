"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, TrendingUp, TrendingDown, DollarSign, Leaf, BarChart3, PieChart, Target } from "lucide-react"
import Link from "next/link"

export default function EnergyPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const energyData = {
    current: {
      usage: 2.4, // kW
      cost: 12.45, // $
      efficiency: 85, // %
      carbon: 1.2, // kg CO2
    },
    today: {
      total: 45.6, // kWh
      cost: 12.45,
      peak: 3.2,
      average: 1.9,
    },
    week: {
      total: 298.4,
      cost: 81.3,
      peak: 4.1,
      average: 2.1,
    },
    month: {
      total: 1247.8,
      cost: 287.3,
      peak: 4.5,
      average: 2.0,
    },
  }

  const deviceUsage = [
    { name: "HVAC System", usage: 45, cost: 5.4, percentage: 38 },
    { name: "Water Heater", usage: 28, cost: 3.36, percentage: 24 },
    { name: "Lighting", usage: 15, cost: 1.8, percentage: 13 },
    { name: "Kitchen Appliances", usage: 12, cost: 1.44, percentage: 10 },
    { name: "Entertainment", usage: 8, cost: 0.96, percentage: 7 },
    { name: "Other", usage: 10, cost: 1.2, percentage: 8 },
  ]

  const hourlyUsage = [
    { hour: "00:00", usage: 1.2 },
    { hour: "01:00", usage: 1.1 },
    { hour: "02:00", usage: 1.0 },
    { hour: "03:00", usage: 0.9 },
    { hour: "04:00", usage: 0.8 },
    { hour: "05:00", usage: 0.9 },
    { hour: "06:00", usage: 1.5 },
    { hour: "07:00", usage: 2.1 },
    { hour: "08:00", usage: 2.8 },
    { hour: "09:00", usage: 2.4 },
    { hour: "10:00", usage: 2.2 },
    { hour: "11:00", usage: 2.0 },
    { hour: "12:00", usage: 2.3 },
    { hour: "13:00", usage: 2.5 },
    { hour: "14:00", usage: 2.7 },
    { hour: "15:00", usage: 2.9 },
    { hour: "16:00", usage: 3.2 },
    { hour: "17:00", usage: 3.1 },
    { hour: "18:00", usage: 2.8 },
    { hour: "19:00", usage: 2.6 },
    { hour: "20:00", usage: 2.4 },
    { hour: "21:00", usage: 2.1 },
    { hour: "22:00", usage: 1.8 },
    { hour: "23:00", usage: 1.5 },
  ]

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
              <h1 className="text-xl font-bold text-white">Energy Management</h1>
              <p className="text-sm text-gray-300">Monitor and optimize your energy consumption</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Leaf className="w-3 h-3 mr-1" />
              Eco Mode Active
            </Badge>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Usage</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{energyData.current.usage} kW</div>
              <p className="text-xs text-gray-400">
                <TrendingDown className="inline w-3 h-3 mr-1 text-green-400" />
                12% below average
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Today's Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${energyData.current.cost}</div>
              <p className="text-xs text-gray-400">
                <TrendingUp className="inline w-3 h-3 mr-1 text-red-400" />
                +5% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Efficiency</CardTitle>
              <Target className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{energyData.current.efficiency}%</div>
              <Progress value={energyData.current.efficiency} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Carbon Footprint</CardTitle>
              <Leaf className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{energyData.current.carbon} kg</div>
              <p className="text-sm text-gray-400">CO₂ today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Usage Analytics */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Usage Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-300">Energy consumption over time</CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <TabsList className="bg-white/10">
                      <TabsTrigger value="today" className="text-white">
                        Today
                      </TabsTrigger>
                      <TabsTrigger value="week" className="text-white">
                        Week
                      </TabsTrigger>
                      <TabsTrigger value="month" className="text-white">
                        Month
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedPeriod}>
                  <TabsContent value="today">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-white">{energyData.today.total}</p>
                          <p className="text-sm text-gray-400">kWh Total</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{energyData.today.peak}</p>
                          <p className="text-sm text-gray-400">kW Peak</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{energyData.today.average}</p>
                          <p className="text-sm text-gray-400">kW Average</p>
                        </div>
                      </div>

                      {/* Hourly Usage Chart Simulation */}
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Hourly Usage</h4>
                        <div className="grid grid-cols-12 gap-1 h-32">
                          {hourlyUsage.map((data, index) => (
                            <div key={index} className="flex flex-col justify-end">
                              <div
                                className="bg-gradient-to-t from-cyan-500 to-purple-500 rounded-sm"
                                style={{ height: `${(data.usage / 4) * 100}%` }}
                              />
                              <p className="text-xs text-gray-400 mt-1 text-center">{data.hour.split(":")[0]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="week">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.week.total}</p>
                        <p className="text-sm text-gray-400">kWh Total</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.week.peak}</p>
                        <p className="text-sm text-gray-400">kW Peak</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.week.average}</p>
                        <p className="text-sm text-gray-400">kW Average</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="month">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.month.total}</p>
                        <p className="text-sm text-gray-400">kWh Total</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.month.peak}</p>
                        <p className="text-sm text-gray-400">kW Peak</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{energyData.month.average}</p>
                        <p className="text-sm text-gray-400">kW Average</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Device Breakdown */}
          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Device Breakdown
                </CardTitle>
                <CardDescription className="text-gray-300">Energy usage by device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceUsage.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{device.name}</span>
                      <span className="text-white">{device.percentage}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{device.usage} kWh</span>
                      <span>${device.cost}</span>
                    </div>
                    <Progress value={device.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Energy Saving Tips */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Energy Saving Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 font-medium">💡 Tip of the Day</p>
                  <p className="text-xs text-gray-300 mt-1">
                    Lower your thermostat by 2°F to save up to 10% on heating costs.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Potential Monthly Savings</span>
                    <span className="text-green-400 font-medium">$24.50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">CO₂ Reduction</span>
                    <span className="text-green-400 font-medium">15.2 kg</span>
                  </div>
                </div>
                <Button className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                  View All Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
