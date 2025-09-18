"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Search, 
  Star, 
  DollarSign, 
  Calendar, 
  Plane, 
  Train, 
  Hotel, 
  Map,
  Filter,
  ExternalLink,
  Navigation
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamic imports for components
const HotelCard = dynamic(() => import("@/components/travel/HotelCard"), { ssr: false })
const FlightSearch = dynamic(() => import("@/components/travel/FlightSearch"), { ssr: false })
const ItineraryCards = dynamic(() => import("@/components/travel/ItineraryCards"), { ssr: false })
const TravelMap = dynamic(() => import("@/components/travel/TravelMap"), { ssr: false })

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function TravelPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("hotels")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    // Search logic will be handled by individual components
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Monastery360</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-gray-900 transition-colors">
              Map
            </Link>
            <Link href="/travel" className="text-gray-900 font-medium">
              Hotels & Travel
            </Link>
            <Link href="/calendar" className="text-gray-700 hover:text-gray-900 transition-colors">
              Calendar
            </Link>
            <Link href="/archives" className="text-gray-700 hover:text-gray-900 transition-colors">
              Archives
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-blue-600 text-white border-blue-500">Travel & Accommodation</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Hotels & Travel Booking</h1>
            <p className="text-xl text-blue-100 text-balance">
              Plan your perfect monastery pilgrimage with our comprehensive travel booking platform. 
              Find hotels, flights, and curated itineraries for your spiritual journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div className="mb-8" {...fadeInUp}>
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for monasteries, cities, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div {...fadeInUp}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="hotels" className="flex items-center space-x-2">
                <Hotel className="h-4 w-4" />
                <span>🏨 Hotels Nearby</span>
              </TabsTrigger>
              <TabsTrigger value="flights" className="flex items-center space-x-2">
                <Plane className="h-4 w-4" />
                <span>✈️ Flights & Trains</span>
              </TabsTrigger>
              <TabsTrigger value="itineraries" className="flex items-center space-x-2">
                <Map className="h-4 w-4" />
                <span>🗺️ Itineraries</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hotels" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Hotel className="mr-2 h-5 w-5 text-blue-600" />
                        Hotels Near Monasteries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <HotelCard searchTerm={searchTerm} isLoading={isLoading} />
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-1">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Map className="mr-2 h-5 w-5 text-blue-600" />
                        Map View
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TravelMap searchTerm={searchTerm} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flights" className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Plane className="mr-2 h-5 w-5 text-blue-600" />
                    Flights & Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FlightSearch />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itineraries" className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Map className="mr-2 h-5 w-5 text-blue-600" />
                    Recommended Travel Packages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ItineraryCards />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Disclaimer */}
        <motion.div className="mt-12" {...fadeInUp}>
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ℹ</span>
                </div>
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Booking Information</p>
                  <p>
                    This service is powered by free APIs (OpenTripMap, Amadeus). Some links may redirect to external booking providers. 
                    Prices and availability are subject to change. Please verify details before booking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

