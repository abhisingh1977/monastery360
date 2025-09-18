"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Bell, Filter, ChevronLeft, ChevronRight, Star, Ticket } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

const events = [
  {
    id: 1,
    title: "Losar Festival",
    monastery: "Rumtek Monastery",
    date: "2025-02-15",
    time: "06:00 AM",
    duration: "3 days",
    type: "Festival",
    description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances",
    attendees: "500+ expected",
    booking: true,
    featured: true,
    image: "/placeholder.svg?height=200&width=300&text=Losar+Festival",
  },
  {
    id: 2,
    title: "Buddha Purnima",
    monastery: "Multiple Locations",
    date: "2025-05-12",
    time: "05:30 AM",
    duration: "Full day",
    type: "Religious",
    description: "Celebration of Buddha's birth, enlightenment, and death with special prayers and offerings",
    attendees: "1000+ expected",
    booking: true,
    featured: true,
    image: "/placeholder.svg?height=200&width=300&text=Buddha+Purnima",
  },
  {
    id: 3,
    title: "Chaam Dance Performance",
    monastery: "Pemayangtse Monastery",
    date: "2025-03-08",
    time: "10:00 AM",
    duration: "4 hours",
    type: "Cultural",
    description: "Sacred mask dance performed by monks depicting the victory of good over evil",
    attendees: "200+ expected",
    booking: true,
    featured: false,
    image: "/placeholder.svg?height=200&width=300&text=Chaam+Dance",
  },
  {
    id: 4,
    title: "Meditation Retreat",
    monastery: "Tashiding Monastery",
    date: "2025-04-20",
    time: "07:00 AM",
    duration: "7 days",
    type: "Retreat",
    description: "Silent meditation retreat for spiritual seekers and practitioners",
    attendees: "50 participants",
    booking: true,
    featured: false,
    image: "/placeholder.svg?height=200&width=300&text=Meditation+Retreat",
  },
  {
    id: 5,
    title: "Saga Dawa Festival",
    monastery: "Enchey Monastery",
    date: "2025-06-02",
    time: "06:00 AM",
    duration: "Full day",
    type: "Festival",
    description: "Celebration of Buddha's enlightenment with prayer flag ceremonies",
    attendees: "300+ expected",
    booking: true,
    featured: false,
    image: "/placeholder.svg?height=200&width=300&text=Saga+Dawa",
  },
  {
    id: 6,
    title: "Monastery Architecture Tour",
    monastery: "Dubdi Monastery",
    date: "2025-03-25",
    time: "09:00 AM",
    duration: "3 hours",
    type: "Tour",
    description: "Guided tour focusing on traditional Tibetan architecture and construction techniques",
    attendees: "30 participants",
    booking: true,
    featured: false,
    image: "/placeholder.svg?height=200&width=300&text=Architecture+Tour",
  },
]

const eventTypes = ["All", "Festival", "Religious", "Cultural", "Retreat", "Tour"]

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)

  const filteredEvents = events.filter((event) => selectedFilter === "All" || event.type === selectedFilter)

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50">
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
            <Link href="/tours" className="text-gray-700 hover:text-gray-900 transition-colors">
              Virtual Tours
            </Link>
            <Link href="/calendar" className="text-gray-900 font-medium">
              Calendar
            </Link>
            <Link href="/archives" className="text-gray-700 hover:text-gray-900 transition-colors">
              Archives
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-rose-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-orange-600 text-white border-orange-500">Cultural Calendar</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sacred Festivals & Events</h1>
            <p className="text-xl text-rose-100 text-balance">
              Stay connected with monastery festivals, ceremonies, and cultural events throughout the year.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters and Upcoming Events */}
          <div className="lg:col-span-1">
            <motion.div {...fadeInUp}>
              <Card className="sticky top-32 border-amber-200 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Filter className="mr-2 h-5 w-5" />
                    Event Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <Button
                        key={type}
                        size="sm"
                        variant={selectedFilter === type ? "default" : "outline"}
                        onClick={() => setSelectedFilter(type)}
                        className={
                          selectedFilter === type
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-600 text-amber-600 hover:bg-amber-50"
                        }
                      >
                        {type}
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">View Mode</h4>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={viewMode === "list" ? "default" : "outline"}
                        onClick={() => setViewMode("list")}
                        className={
                          viewMode === "list"
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-600 text-amber-600 hover:bg-amber-50"
                        }
                      >
                        List
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === "calendar" ? "default" : "outline"}
                        onClick={() => setViewMode("calendar")}
                        className={
                          viewMode === "calendar"
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-600 text-amber-600 hover:bg-amber-50"
                        }
                      >
                        Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Bell className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-amber-800 text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{event.monastery}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {viewMode === "calendar" ? (
              /* Calendar View */
              <motion.div {...fadeInUp}>
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl text-gray-800">
                        {monthNames[currentMonth]} {currentYear}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-amber-600 text-amber-600 bg-transparent">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-amber-600 text-amber-600 bg-transparent">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 6 + 1
                        const hasEvent = day > 0 && day <= 31 && Math.random() > 0.8
                        return (
                          <div
                            key={i}
                            className={`p-2 h-20 border rounded-lg ${
                              day > 0 && day <= 31 ? "bg-white hover:bg-amber-50 cursor-pointer" : "bg-gray-50"
                            }`}
                          >
                            {day > 0 && day <= 31 && (
                              <>
                                <div className="text-sm font-medium text-gray-800">{day}</div>
                                {hasEvent && <div className="w-2 h-2 bg-amber-500 rounded-full mt-1"></div>}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* List View */
              <motion.div className="space-y-6" variants={staggerContainer} initial="initial" animate="animate">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={fadeInUp}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-amber-200">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="relative">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-48 md:h-full object-cover rounded-l-lg"
                            />
                            {event.featured && (
                              <Badge className="absolute top-3 left-3 bg-amber-600 text-white">Featured</Badge>
                            )}
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.monastery}
                                </div>
                              </div>
                              <Badge
                                className={`${
                                  event.type === "Festival"
                                    ? "bg-purple-600"
                                    : event.type === "Religious"
                                      ? "bg-blue-600"
                                      : event.type === "Cultural"
                                        ? "bg-green-600"
                                        : event.type === "Retreat"
                                          ? "bg-indigo-600"
                                          : "bg-orange-600"
                                } text-white`}
                              >
                                {event.type}
                              </Badge>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                                <div>
                                  <div className="font-medium">Date</div>
                                  <div>{new Date(event.date).toLocaleDateString()}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                <div>
                                  <div className="font-medium">Time</div>
                                  <div>{event.time}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-2 text-amber-500" />
                                <div>
                                  <div className="font-medium">Duration</div>
                                  <div>{event.duration}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-amber-500" />
                                <div>
                                  <div className="font-medium">Attendees</div>
                                  <div>{event.attendees}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              {event.booking && (
                                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                                  <Ticket className="mr-2 h-4 w-4" />
                                  Book Now
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                              >
                                <Bell className="mr-2 h-4 w-4" />
                                Set Reminder
                              </Button>
                              <Button
                                variant="outline"
                                className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                              >
                                <MapPin className="mr-2 h-4 w-4" />
                                View Location
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
