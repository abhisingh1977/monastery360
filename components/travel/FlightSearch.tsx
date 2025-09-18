"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plane, 
  Train, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  ExternalLink,
  Search,
  Loader2
} from "lucide-react"

interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: string
  stops: number
  type: "flight" | "train"
}

export default function FlightSearch() {
  const [searchForm, setSearchForm] = useState({
    from: "Delhi",
    to: "Gangtok",
    departureDate: "",
    returnDate: "",
    passengers: 1
  })
  const [searchResults, setSearchResults] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState<"flights" | "trains">("flights")

  // Mock flight data
  const mockFlights: Flight[] = [
    {
      id: "1",
      airline: "IndiGo",
      flightNumber: "6E-1234",
      departure: "Delhi (DEL)",
      arrival: "Bagdogra (IXB)",
      departureTime: "06:30",
      arrivalTime: "09:15",
      duration: "2h 45m",
      price: "₹8,500",
      stops: 0,
      type: "flight"
    },
    {
      id: "2", 
      airline: "SpiceJet",
      flightNumber: "SG-5678",
      departure: "Delhi (DEL)",
      arrival: "Bagdogra (IXB)",
      departureTime: "14:20",
      arrivalTime: "17:05",
      duration: "2h 45m",
      price: "₹7,200",
      stops: 0,
      type: "flight"
    },
    {
      id: "3",
      airline: "Air India",
      flightNumber: "AI-9012",
      departure: "Delhi (DEL)",
      arrival: "Bagdogra (IXB)",
      departureTime: "11:45",
      arrivalTime: "14:30",
      duration: "2h 45m",
      price: "₹9,100",
      stops: 0,
      type: "flight"
    }
  ]

  // Mock train data
  const mockTrains: Flight[] = [
    {
      id: "4",
      airline: "Indian Railways",
      flightNumber: "12345",
      departure: "New Delhi (NDLS)",
      arrival: "New Jalpaiguri (NJP)",
      departureTime: "22:45",
      arrivalTime: "14:30+1",
      duration: "15h 45m",
      price: "₹1,200",
      stops: 3,
      type: "train"
    },
    {
      id: "5",
      airline: "Indian Railways", 
      flightNumber: "12346",
      departure: "New Delhi (NDLS)",
      arrival: "New Jalpaiguri (NJP)",
      departureTime: "12:15",
      arrivalTime: "08:20+1",
      duration: "20h 5m",
      price: "₹800",
      stops: 5,
      type: "train"
    }
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const results = searchType === "flights" ? mockFlights : mockTrains
      setSearchResults(results)
      setIsLoading(false)
    }, 1500)
  }

  const getStopsText = (stops: number) => {
    if (stops === 0) return "Direct"
    if (stops === 1) return "1 stop"
    return `${stops} stops`
  }

  const getTransportIcon = (type: string) => {
    return type === "flight" ? <Plane className="h-4 w-4" /> : <Train className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant={searchType === "flights" ? "default" : "outline"}
              onClick={() => setSearchType("flights")}
              className="flex items-center space-x-2"
            >
              <Plane className="h-4 w-4" />
              <span>Flights</span>
            </Button>
            <Button
              variant={searchType === "trains" ? "default" : "outline"}
              onClick={() => setSearchType("trains")}
              className="flex items-center space-x-2"
            >
              <Train className="h-4 w-4" />
              <span>Trains</span>
            </Button>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchForm.from}
                  onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                  className="pl-10"
                  placeholder="City or airport"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchForm.to}
                  onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                  className="pl-10"
                  placeholder="City or airport"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchForm.departureDate}
                  onChange={(e) => setSearchForm({...searchForm, departureDate: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passengers
              </label>
              <Input
                type="number"
                min="1"
                max="9"
                value={searchForm.passengers}
                onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                className="text-center"
              />
            </div>

            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              {searchResults.length} {searchType} found
            </h3>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {searchForm.from} → {searchForm.to}
            </Badge>
          </div>

          <div className="space-y-3">
            {searchResults.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTransportIcon(flight.type)}
                          <div>
                            <div className="font-semibold text-gray-800">
                              {flight.airline}
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.flightNumber}
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-gray-800">
                            {flight.departureTime}
                          </div>
                          <div className="text-xs text-gray-600">
                            {flight.departure}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            {flight.duration}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getStopsText(flight.stops)}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-gray-800">
                            {flight.arrivalTime}
                          </div>
                          <div className="text-xs text-gray-600">
                            {flight.arrival}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {flight.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            per person
                          </div>
                        </div>

                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            const bookingUrl = flight.type === "flight" 
                              ? `https://www.makemytrip.com/flight/search?from=${searchForm.from}&to=${searchForm.to}`
                              : `https://www.irctc.co.in/nget/train-search?from=${searchForm.from}&to=${searchForm.to}`
                            window.open(bookingUrl, '_blank')
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Train Information */}
      {searchType === "trains" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Train className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Train Booking Information</p>
                <p>
                  Train bookings are handled by Indian Railways. Click "Book" to redirect to IRCTC website. 
                  For the best monastery access, book to New Jalpaiguri (NJP) station, then take a taxi to Gangtok (4-5 hours).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchResults.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            {searchType === "flights" ? "✈️" : "🚂"}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Search for {searchType}
          </h3>
          <p className="text-gray-600">
            Enter your travel details above to find available {searchType}.
          </p>
        </div>
      )}
    </div>
  )
}

