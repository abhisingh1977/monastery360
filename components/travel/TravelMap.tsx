"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false }) as any
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false }) as any
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false }) as any
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false }) as any

import L from "leaflet"

interface MapLocation {
  id: string
  name: string
  position: [number, number]
  type: "hotel" | "monastery" | "attraction"
  rating?: number
  price?: string
  description?: string
}

interface TravelMapProps {
  searchTerm: string
}

// Ensure Leaflet CSS is available on client
const ensureLeafletCss = () => {
  if (typeof window === "undefined") return
  const id = "leaflet-css"
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  link.crossOrigin = ""
  document.head.appendChild(link)
}

// Custom icons for different location types
const createCustomIcon = (type: string) => {
  const colors = {
    hotel: "#3B82F6", // blue
    monastery: "#EF4444", // red
    attraction: "#10B981" // green
  }
  
  const icons = {
    hotel: "🏨",
    monastery: "🏛️", 
    attraction: "📍"
  }

  return new L.DivIcon({
    html: `<div style="
      background-color: ${colors[type as keyof typeof colors] || '#6B7280'};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${icons[type as keyof typeof icons] || '📍'}</div>`,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

export default function TravelMap({ searchTerm }: TravelMapProps) {
  const mapRef = useRef<any>(null)
  const [locations, setLocations] = useState<MapLocation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration
  const mockLocations: MapLocation[] = [
    {
      id: "1",
      name: "Hotel Rumtek Palace",
      position: [27.338, 88.555],
      type: "hotel",
      rating: 4.2,
      price: "₹3,000",
      description: "Luxury hotel near Rumtek Monastery"
    },
    {
      id: "2",
      name: "Rumtek Monastery",
      position: [27.338, 88.555],
      type: "monastery",
      rating: 4.8,
      description: "Seat of the Karmapa, largest monastery in Sikkim"
    },
    {
      id: "3",
      name: "Gangtok Heritage Hotel",
      position: [27.341, 88.612],
      type: "hotel",
      rating: 4.5,
      price: "₹2,500",
      description: "Heritage hotel in Gangtok city center"
    },
    {
      id: "4",
      name: "Enchey Monastery",
      position: [27.341, 88.613],
      type: "monastery",
      rating: 4.6,
      description: "Beautiful monastery overlooking Gangtok"
    },
    {
      id: "5",
      name: "Pemayangtse Monastery",
      position: [27.287, 88.255],
      type: "monastery",
      rating: 4.7,
      description: "One of the oldest monasteries in Sikkim"
    },
    {
      id: "6",
      name: "Monastery View Guesthouse",
      position: [27.287, 88.255],
      type: "hotel",
      rating: 4.0,
      price: "₹1,800",
      description: "Budget guesthouse near Pemayangtse"
    },
    {
      id: "7",
      name: "Khecheopalri Lake",
      position: [27.362, 88.240],
      type: "attraction",
      rating: 4.9,
      description: "Sacred wish-fulfilling lake"
    },
    {
      id: "8",
      name: "Sikkim Spiritual Retreat",
      position: [27.362, 88.240],
      type: "hotel",
      rating: 4.7,
      price: "₹4,500",
      description: "Luxury retreat near sacred lake"
    }
  ]

  useEffect(() => {
    ensureLeafletCss()
  }, [])

  useEffect(() => {
    if (searchTerm.trim()) {
      setIsLoading(true)
      // Filter locations based on search term
      const filtered = mockLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setLocations(filtered)
      setIsLoading(false)
    } else {
      setLocations(mockLocations)
    }
  }, [searchTerm])

  const center: [number, number] = [27.338, 88.555] // Rumtek Monastery area
  const zoom = 10

  const getLocationTypeCount = (type: string) => {
    return locations.filter(loc => loc.type === type).length
  }

  return (
    <div className="space-y-4">
      {/* Map Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-blue-100 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-800">
            {getLocationTypeCount("hotel")}
          </div>
          <div className="text-xs text-blue-600">Hotels</div>
        </div>
        <div className="bg-red-100 rounded-lg p-2">
          <div className="text-lg font-bold text-red-800">
            {getLocationTypeCount("monastery")}
          </div>
          <div className="text-xs text-red-600">Monasteries</div>
        </div>
        <div className="bg-green-100 rounded-lg p-2">
          <div className="text-lg font-bold text-green-800">
            {getLocationTypeCount("attraction")}
          </div>
          <div className="text-xs text-green-600">Attractions</div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-200">
        {typeof window !== "undefined" && (
          <MapContainer
            center={center}
            zoom={zoom}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                icon={createCustomIcon(location.type)}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {location.type === "hotel" ? "🏨" : 
                         location.type === "monastery" ? "🏛️" : "📍"}
                      </span>
                      <h3 className="font-semibold text-gray-800">
                        {location.name}
                      </h3>
                    </div>
                    
                    {location.description && (
                      <p className="text-sm text-gray-600 mb-2">
                        {location.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      {location.rating && (
                        <div className="flex items-center text-yellow-600">
                          <span>⭐</span>
                          <span className="ml-1">{location.rating}</span>
                        </div>
                      )}
                      {location.price && (
                        <div className="text-green-600 font-semibold">
                          {location.price}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <button
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        onClick={() => {
                          const url = `https://www.google.com/maps?q=${location.position[0]},${location.position[1]}`
                          window.open(url, '_blank')
                        }}
                      >
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading locations...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Hotels</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Monasteries</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Attractions</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button
          className="flex-1 text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.flyTo(center, 12)
            }
          }}
        >
          Reset View
        </button>
        <button
          className="flex-1 text-xs bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
          onClick={() => {
            const url = `https://www.google.com/maps?q=${center[0]},${center[1]}`
            window.open(url, '_blank')
          }}
        >
          Open in Google Maps
        </button>
      </div>
    </div>
  )
}

