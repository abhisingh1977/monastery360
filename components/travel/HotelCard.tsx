"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Hotel, 
  Wifi, 
  Car, 
  Coffee,
  Loader2
} from "lucide-react"

interface Hotel {
  xid: string
  name: string
  dist?: number
  rate?: string
  osm?: string
  kinds?: string
  point?: {
    lon: number
    lat: number
  }
  preview?: {
    source: string
    height: number
    width: number
  }
}

interface HotelCardProps {
  searchTerm: string
  isLoading: boolean
}

export default function HotelCard({ searchTerm, isLoading }: HotelCardProps) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demonstration (replace with actual API calls)
  const mockHotels: Hotel[] = [
    {
      xid: "1",
      name: "Hotel Rumtek Palace",
      dist: 0.5,
      rate: "4.2",
      kinds: "accommodations,hotels",
      point: { lon: 88.555, lat: 27.338 },
      preview: {
        source: "/placeholder.jpg",
        height: 200,
        width: 300
      }
    },
    {
      xid: "2", 
      name: "Gangtok Heritage Hotel",
      dist: 2.1,
      rate: "4.5",
      kinds: "accommodations,hotels",
      point: { lon: 88.612, lat: 27.341 },
      preview: {
        source: "/placeholder.jpg",
        height: 200,
        width: 300
      }
    },
    {
      xid: "3",
      name: "Monastery View Guesthouse", 
      dist: 1.8,
      rate: "4.0",
      kinds: "accommodations,guesthouses",
      point: { lon: 88.255, lat: 27.287 },
      preview: {
        source: "/placeholder.jpg",
        height: 200,
        width: 300
      }
    },
    {
      xid: "4",
      name: "Sikkim Spiritual Retreat",
      dist: 3.2,
      rate: "4.7",
      kinds: "accommodations,resorts",
      point: { lon: 88.240, lat: 27.362 },
      preview: {
        source: "/placeholder.jpg",
        height: 200,
        width: 300
      }
    }
  ]

  useEffect(() => {
    if (searchTerm.trim()) {
      setLoading(true)
      setError(null)
      
      // Simulate API call delay
      setTimeout(() => {
        // Filter mock data based on search term
        const filtered = mockHotels.filter(hotel => 
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.kinds?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setHotels(filtered)
        setLoading(false)
      }, 1000)
    } else {
      setHotels(mockHotels)
    }
  }, [searchTerm])

  const getPriceRange = (rate?: string) => {
    if (!rate) return "Contact for price"
    const rating = parseFloat(rate)
    if (rating >= 4.5) return "₹3,000 - ₹8,000"
    if (rating >= 4.0) return "₹2,000 - ₹5,000"
    if (rating >= 3.5) return "₹1,500 - ₹3,500"
    return "₹1,000 - ₹2,500"
  }

  const getAmenities = (kinds?: string) => {
    const amenities = []
    if (kinds?.includes("hotels")) amenities.push("Restaurant", "Room Service")
    if (kinds?.includes("guesthouses")) amenities.push("Shared Kitchen", "Laundry")
    if (kinds?.includes("resorts")) amenities.push("Spa", "Pool", "Gym")
    return amenities.slice(0, 3) // Show max 3 amenities
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Searching hotels...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {hotels.length} hotels found
        </h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <MapPin className="h-3 w-3 mr-1" />
            Near Monasteries
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.xid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-200">
              <CardContent className="p-0">
                {/* Hotel Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={hotel.preview?.source || "/placeholder.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg"
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {hotel.rate || "4.0"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-blue-600 text-white">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hotel.dist?.toFixed(1)} km
                    </Badge>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {hotel.name}
                    </h4>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                    <span>Near monastery area</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {getPriceRange(hotel.rate)}
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.rate || "4.0"}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {getAmenities(hotel.kinds).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // Open booking link or modal
                        window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name)}`, '_blank')
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        // Show on map or get directions
                        if (hotel.point) {
                          const url = `https://www.google.com/maps?q=${hotel.point.lat},${hotel.point.lon}`
                          window.open(url, '_blank')
                        }
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {hotels.length === 0 && !loading && (
        <div className="text-center py-12">
          <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No hotels found</h3>
          <p className="text-gray-600">Try searching for a different location or check back later.</p>
        </div>
      )}
    </div>
  )
}

