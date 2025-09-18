"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  Camera,
  Heart,
  ExternalLink,
  Navigation
} from "lucide-react"

interface Itinerary {
  id: string
  title: string
  duration: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  price: string
  rating: number
  reviews: number
  image: string
  description: string
  highlights: string[]
  itinerary: {
    day: number
    title: string
    activities: string[]
    accommodation: string
  }[]
  included: string[]
  bestFor: string[]
}

const itineraries: Itinerary[] = [
  {
    id: "1",
    title: "Sikkim Monastery Discovery",
    duration: "3 Days",
    difficulty: "Easy",
    price: "₹15,000",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.jpg",
    description: "Explore the most sacred monasteries of Sikkim with guided tours, meditation sessions, and cultural experiences.",
    highlights: [
      "Visit Rumtek Monastery - Seat of Karmapa",
      "Explore Pemayangtse Monastery",
      "Meditation session with monks",
      "Traditional Sikkimese cuisine"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Gangtok Exploration",
        activities: [
          "Arrive in Gangtok",
          "Visit Enchey Monastery",
          "Explore MG Marg",
          "Traditional dinner"
        ],
        accommodation: "Hotel in Gangtok"
      },
      {
        day: 2,
        title: "Rumtek Monastery & Surroundings",
        activities: [
          "Morning prayers at Rumtek",
          "Guided monastery tour",
          "Visit Namgyal Institute",
          "Evening meditation"
        ],
        accommodation: "Hotel in Gangtok"
      },
      {
        day: 3,
        title: "West Sikkim Monasteries",
        activities: [
          "Drive to Pemayangtse",
          "Visit Tashiding Monastery",
          "Explore Pelling",
          "Return to Gangtok"
        ],
        accommodation: "Hotel in Gangtok"
      }
    ],
    included: [
      "All transportation",
      "Accommodation (2 nights)",
      "Meals (breakfast & dinner)",
      "English speaking guide",
      "Monastery entry fees"
    ],
    bestFor: ["First-time visitors", "Spiritual seekers", "Cultural enthusiasts"]
  },
  {
    id: "2",
    title: "Himalayan Monastery Trek",
    duration: "5 Days",
    difficulty: "Moderate",
    price: "₹25,000",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.jpg",
    description: "A comprehensive journey through Sikkim's monasteries with trekking, meditation, and cultural immersion.",
    highlights: [
      "Trek to remote monasteries",
      "Stay in monastery guesthouses",
      "Learn Buddhist philosophy",
      "Mountain views and nature"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok Arrival",
        activities: [
          "Arrive in Gangtok",
          "City orientation",
          "Visit Enchey Monastery",
          "Preparation for trek"
        ],
        accommodation: "Hotel in Gangtok"
      },
      {
        day: 2,
        title: "Rumtek & Phodong",
        activities: [
          "Morning at Rumtek Monastery",
          "Trek to Phodong Monastery",
          "Meditation session",
          "Cultural program"
        ],
        accommodation: "Monastery guesthouse"
      },
      {
        day: 3,
        title: "West Sikkim Journey",
        activities: [
          "Drive to Pelling",
          "Visit Pemayangtse Monastery",
          "Trek to Tashiding",
          "Evening prayers"
        ],
        accommodation: "Monastery guesthouse"
      },
      {
        day: 4,
        title: "Sacred Lakes & Monasteries",
        activities: [
          "Visit Khecheopalri Lake",
          "Trek to Dubdi Monastery",
          "Explore Yuksom",
          "Meditation by lake"
        ],
        accommodation: "Guesthouse in Yuksom"
      },
      {
        day: 5,
        title: "Return & Departure",
        activities: [
          "Morning meditation",
          "Return to Gangtok",
          "Shopping for souvenirs",
          "Departure"
        ],
        accommodation: "Not included"
      }
    ],
    included: [
      "All transportation",
      "Accommodation (4 nights)",
      "All meals",
      "Trekking guide",
      "Monastery donations",
      "Trekking permits"
    ],
    bestFor: ["Adventure seekers", "Experienced travelers", "Fitness enthusiasts"]
  },
  {
    id: "3",
    title: "Monastery Photography Tour",
    duration: "2 Days",
    difficulty: "Easy",
    price: "₹8,500",
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.jpg",
    description: "Capture the beauty of Sikkim's monasteries with professional photography guidance and cultural insights.",
    highlights: [
      "Professional photography tips",
      "Golden hour monastery shoots",
      "Portrait sessions with monks",
      "Cultural documentation"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok Monasteries",
        activities: [
          "Early morning Enchey Monastery",
          "Rumtek Monastery photography",
          "Street photography in Gangtok",
          "Sunset at Tashi Viewpoint"
        ],
        accommodation: "Hotel in Gangtok"
      },
      {
        day: 2,
        title: "West Sikkim Photography",
        activities: [
          "Sunrise at Pemayangtse",
          "Tashiding Monastery shoot",
          "Village life documentation",
          "Return to Gangtok"
        ],
        accommodation: "Not included"
      }
    ],
    included: [
      "Professional photographer guide",
      "Transportation",
      "Monastery entry fees",
      "Basic photo editing session",
      "Digital photo package"
    ],
    bestFor: ["Photography enthusiasts", "Content creators", "Short trips"]
  }
]

export default function ItineraryCards() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200"
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Challenging": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Curated Monastery Tours
        </h3>
        <p className="text-gray-600">
          Choose from our handpicked itineraries designed for different interests and fitness levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {itineraries.map((itinerary, index) => (
          <motion.div
            key={itinerary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-blue-200 group">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg"
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getDifficultyColor(itinerary.difficulty)}>
                      {itinerary.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {itinerary.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {itinerary.title}
                    </h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {itinerary.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        per person
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {itinerary.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {itinerary.reviews} reviews
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {itinerary.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Highlights:</h5>
                    <div className="space-y-1">
                      {itinerary.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Best For:</h5>
                    <div className="flex flex-wrap gap-1">
                      {itinerary.bestFor.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // Open booking or details modal
                        alert(`Booking ${itinerary.title} - Contact us for details!`)
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        // Show detailed itinerary
                        alert(`Detailed itinerary for ${itinerary.title}`)
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Custom Itinerary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-dashed border-2 border-blue-300 bg-blue-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Don't see what you're looking for?
            </h3>
            <p className="text-gray-600 mb-4">
              We can create a custom itinerary tailored to your interests, schedule, and budget.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Navigation className="h-4 w-4 mr-2" />
              Create Custom Itinerary
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

