"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Filter, Camera, Navigation, Calendar, Star, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { SITES, type Site as HeritageSite } from "@/components/sites-data"
import L from "leaflet"

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false }) as any
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false }) as any
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false }) as any
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false }) as any

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Helper to normalize Next static imports to string URLs
const getImageSrc = (img: HeritageSite["image"]): string => {
  if (typeof img === "string") return img
  return (img as any)?.src ?? "/placeholder.jpg"
}

export default function MapPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [centuryFilter, setCenturyFilter] = useState("all")
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null)
  const mapRef = useRef<any>(null)
  const markerRefs = useRef<Record<string, any>>({})

  useEffect(() => {
    const id = "leaflet-css"
    if (!document.getElementById(id)) {
      const link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.crossOrigin = ""
      document.head.appendChild(link)
    }

    const defaultIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      iconSize: [25, 41],
      shadowSize: [41, 41],
    })
    ;(L as any).Marker.prototype.options.icon = defaultIcon
  }, [])

  // Derive searchable, display-friendly objects from SITES
  const derivedSites = SITES.map((s): HeritageSite & {
    location: string
    century: string
    rating?: number
    visitors?: string
    featured?: boolean
    festivals?: string[]
    description?: string
  } => ({
    ...s,
    location: s.location || "Sikkim",
    century: s.century || "17th Century",
    rating: s.rating || 4.6,
    visitors: s.visitors || "1.2k+ monthly",
    festivals: s.festivals || [s.festival].filter(Boolean) as string[],
    description: s.info,
  }))

  const filteredSites = derivedSites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (site.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || site.location === locationFilter
    const matchesCentury = centuryFilter === "all" || site.century === centuryFilter
    return matchesSearch && matchesLocation && matchesCentury
  })

  const focusSiteOnMap = (site: HeritageSite) => {
    try {
      if (mapRef.current) {
        console.log('Flying to:', site.name, site.position)
        mapRef.current.flyTo(site.position, 12, { duration: 1.2 })
        // Also set the view to ensure it works
        mapRef.current.setView(site.position, 12)
      }
      const marker = markerRefs.current[site.name]
      if (marker) {
        marker.openPopup()
      }
    } catch (error) {
      console.error('Error focusing on site:', error)
    }
  }

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return
    
    // Add a small delay to ensure map is ready
    const timer = setTimeout(() => {
      const exact = derivedSites.find((s) => s.name.toLowerCase() === term)
      const first = exact || derivedSites.find((s) => s.name.toLowerCase().includes(term))
      if (first) {
        focusSiteOnMap(first)
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [searchTerm])

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
            <Link href="/map" className="text-gray-900 font-medium">
              Map
            </Link>
            <Link href="/travel" className="text-gray-700 hover:text-gray-900 transition-colors">
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
      <section className="pt-24 pb-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-amber-600 text-white border-amber-500">Interactive Map</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Discover Sacred Locations</h1>
            <p className="text-xl text-slate-300 text-balance">
              Explore Sikkim's monasteries through our interactive map with detailed information and virtual tour
              access.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative">
        {/* Background Leaflet Map */}
        <div className="fixed inset-0 top-40 -z-10">
          <MapContainer whenCreated={(m:any)=> (mapRef.current = m)} center={[27.533, 88.512]} zoom={8} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {SITES.map((s) => (
              <Marker
                key={s.name}
                position={s.position}
                ref={(ref:any)=>{ if(ref) markerRefs.current[s.name]=ref }}
                eventHandlers={{ mouseover: (e: any) => e.target.openPopup(), mouseout: (e: any) => e.target.closePopup() }}
              >
                <Popup>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-8 overflow-hidden rounded bg-gray-200">
                      <img src={getImageSrc(s.image)} alt={s.name} className="object-cover w-full h-full" onError={(e: any) => (e.currentTarget.src = "/placeholder.jpg")} />
                    </div>
                    <div className="font-medium">{s.name}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with Search and Filters */}
          <div className="lg:col-span-1">
            <motion.div {...fadeInUp}>
              <Card className="sticky top-32 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Filter className="mr-2 h-5 w-5" />
                    Search & Filter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search monasteries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="East Sikkim">East Sikkim</SelectItem>
                        <SelectItem value="West Sikkim">West Sikkim</SelectItem>
                        <SelectItem value="North Sikkim">North Sikkim</SelectItem>
                        <SelectItem value="South Sikkim">South Sikkim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Century</label>
                    <Select value={centuryFilter} onValueChange={setCenturyFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All centuries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Centuries</SelectItem>
                        <SelectItem value="16th Century">16th Century</SelectItem>
                        <SelectItem value="17th Century">17th Century</SelectItem>
                        <SelectItem value="18th Century">18th Century</SelectItem>
                        <SelectItem value="19th Century">19th Century</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-800 mb-3">Top 3 Upcoming Events</h4>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="font-medium text-amber-600">Losar Festival</div>
                        <div className="text-gray-600">Rumtek Monastery • Feb 15</div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-amber-600">Buddha Purnima</div>
                        <div className="text-gray-600">Multiple Locations • May 12</div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-amber-600">Chaam Dance</div>
                        <div className="text-gray-600">Pemayangtse • Mar 8</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Interactive Map Section */}
            <motion.div className="mb-8" {...fadeInUp}>
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <MapPin className="mr-2 h-5 w-5 text-amber-600" />
                    Interactive Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[380px] rounded-lg overflow-hidden">
          <MapContainer whenCreated={(m:any)=> (mapRef.current = m)} center={[27.533, 88.512]} zoom={8} className="h-full w-full">
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {SITES.map((s) => (
                        <Marker
                          key={s.name}
                          position={s.position}
                          ref={(ref:any)=>{ if(ref) markerRefs.current[s.name]=ref }}
                          eventHandlers={{
                            mouseover: (e: any) => e.target.openPopup(),
                            mouseout: (e: any) => e.target.closePopup(),
                            click: () => setSelectedSite(s),
                          }}
                        >
                          <Popup>
                            <div className="flex items-center space-x-2">
                              <div className="w-12 h-8 overflow-hidden rounded bg-gray-200">
                                <img src={getImageSrc(s.image)} alt={s.name} className="object-cover w-full h-full" onError={(e: any) => (e.currentTarget.src = "/placeholder.jpg")} />
                              </div>
                              <div className="font-medium">{s.name}</div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Removed legacy Selected Monastery block; using selectedSite below */}

            {/* Selected Heritage Site Details (from map marker) */}
            {selectedSite && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <Card className="border-amber-200">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img src={getImageSrc(selectedSite.image)} alt={selectedSite.name} className="w-full h-48 object-cover rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedSite.name}</h3>
                            {(selectedSite.location || selectedSite.century) && (
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {selectedSite.location || "Sikkim"}
                                {selectedSite.century ? ` • ${selectedSite.century}` : ""}
                              </div>
                            )}
                            {(selectedSite.rating || selectedSite.visitors) && (
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                {selectedSite.rating && (
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                                    {selectedSite.rating}
                                  </div>
                                )}
                                {selectedSite.visitors && (
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {selectedSite.visitors}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{selectedSite.info}</p>

                        <div className="mb-4 text-sm text-gray-700 space-y-1">
                          <div><span className="font-medium">Speciality:</span> {selectedSite.speciality}</div>
                          <div><span className="font-medium">Festival:</span> {selectedSite.festival}</div>
                        </div>

                        {selectedSite.festivals && selectedSite.festivals.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-800 mb-2">Upcoming Festivals</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedSite.festivals.map((festival, idx) => (
                                <Badge key={idx} variant="outline" className="text-amber-600 border-amber-600">
                                  {festival}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => router.push(`/tours?site=${encodeURIComponent(selectedSite.name)}`)}>
                            <Camera className="mr-2 h-4 w-4" />
                            Start Virtual Tour
                          </Button>
                          <Button
                            variant="outline"
                            className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>
                          <Button
                            variant="outline"
                            className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                            onClick={() => setSelectedSite(null)}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Locations Grid (25 sites) */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="initial"
              animate="animate"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredSites.map((site) => (
                <motion.div key={site.name} variants={fadeInUp}>
                  <Card
                    className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-amber-200 cursor-pointer"
                    onMouseEnter={() => {
                      if (mapRef.current) {
                        mapRef.current.flyTo(site.position, 9, { duration: 0.6 })
                      }
                      const mk = markerRefs.current[site.name]
                      mk?.openPopup()
                    }}
                    onMouseLeave={() => {
                      const mk = markerRefs.current[site.name]
                      mk?.closePopup()
                    }}
                    onClick={() => setSelectedSite(site)}
                  >
                    <CardContent className="p-0">
                       <img src={getImageSrc(site.image)} alt={site.name} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{site.name}</h3>
                          {site.featured && <Badge className="bg-amber-600 text-white text-xs">Featured</Badge>}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {site.location} • {site.century}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{site.info}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-amber-500 mr-1" />
                              {site.rating}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {site.visitors}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-amber-600 border-amber-600 hover:bg-amber-50 bg-transparent"
                          >
                            Explore
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredSites.length === 0 && (
              <motion.div {...fadeInUp}>
                <Card className="border-amber-200">
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No monasteries found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}