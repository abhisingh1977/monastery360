"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"
import {
  Camera,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Globe,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SITES } from "@/components/sites-data"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const VirtualTourViewer = dynamic(() => import("@/components/VirtualTourViewer"), { ssr: false })

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "si", name: "Sikkimese", flag: "🏔️" },
]

export default function VirtualToursPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [progress, setProgress] = useState(35)
  const [activeStop, setActiveStop] = useState<string | number>(1)
  const [tourStops, setTourStops] = useState<Array<{ id: string | number; title: string; thumbnail: string; duration: string; description: string }>>([])
  const searchParams = useSearchParams()
  const selectedName = searchParams.get("site") || ""

  const selectedSite = useMemo(() => SITES.find((s) => s.name.toLowerCase() === selectedName.toLowerCase()), [selectedName])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/tours.json", { cache: "no-cache" })
        const data = await res.json()
        setTourStops(
          (data || []).map((d: any, idx: number) => ({
            id: d.id ?? idx + 1,
            title: d.title ?? `Stop ${idx + 1}`,
            thumbnail: d.thumbnailUrl || d.imageUrl || "/placeholder.jpg",
            duration: "3:00",
            description: (d.narration && (d.narration.en || d.narration.hi || d.narration.ne)) || "",
          }))
        )
        setActiveStop((data?.[0]?.id) ?? 1)
      } catch {}
    }
    load()
  }, [])

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
            <Link href="/tours" className="text-gray-900 font-medium">
              Virtual Tours
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
      <section className="pt-24 pb-8 bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-purple-600 text-white border-purple-500">Virtual Tours</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Immersive 360° Monastery Experience</h1>
            <p className="text-xl text-purple-100 text-balance">
              Step inside sacred spaces with our cutting-edge virtual reality tours, complete with AI-powered narration
              and interactive elements.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main 360° Viewer */}
          <div className="lg:col-span-3">
            <motion.div {...fadeInUp}>
              <Card className="border-amber-200 mb-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-gray-800">
                      {selectedSite ? `${selectedSite.name} - Main Prayer Hall` : "Rumtek Monastery - Main Prayer Hall"}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600 text-white">Live Tour</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        247 viewers
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <VirtualTourViewer />
                </CardContent>
              </Card>
            </motion.div>

            {/* Audio Narration Info */}
            <motion.div {...fadeInUp}>
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Volume2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Audio Guide</h3>
                      <p className="text-gray-600 mb-3">
                        "Welcome to the main prayer hall of Rumtek Monastery. This sacred space has witnessed centuries
                        of devotion and spiritual practice. Notice the intricate murals depicting the life of Buddha..."
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          3:45 duration
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />4 languages
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Expert narration
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tour Timeline Sidebar */}
          <div className="lg:col-span-1">
            <motion.div {...fadeInUp}>
              <Card className="sticky top-32 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Camera className="mr-2 h-5 w-5" />
                    Tour Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tourStops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        activeStop === stop.id
                          ? "bg-amber-100 border-2 border-amber-500"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                      onClick={() => setActiveStop(stop.id)}
                    >
                      <div className="flex space-x-3">
                        <img
                          src={stop.thumbnail || "/placeholder.svg"}
                          alt={stop.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-medium text-sm ${
                              activeStop === stop.id ? "text-amber-800" : "text-gray-800"
                            }`}
                          >
                            {stop.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{stop.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{stop.duration}</span>
                            {activeStop === stop.id && (
                              <Badge className="bg-amber-600 text-white text-xs">Playing</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Stop 1 of 5 • 16:35 total</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
