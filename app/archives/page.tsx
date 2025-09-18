"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Archive, ImageIcon, MapPin, Eye, Download, Share, Bookmark, Zap, Grid3X3, List } from "lucide-react"
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

const archiveItems = [
  {
    id: 1,
    title: "Lotus Sutra Manuscript",
    type: "Manuscript",
    century: "15th Century",
    monastery: "Rumtek Monastery",
    description: "Ancient handwritten Buddhist text on palm leaves with gold illuminations",
    image: "/placeholder.svg?height=300&width=400&text=Lotus+Sutra",
    resolution: "4K Ultra HD",
    pages: 108,
    language: "Sanskrit",
    condition: "Excellent",
    featured: true,
    tags: ["Buddhist Text", "Palm Leaf", "Gold Illumination"],
  },
  {
    id: 2,
    title: "Tara Deity Mural",
    type: "Mural",
    century: "17th Century",
    monastery: "Pemayangtse Monastery",
    description: "Exquisite wall painting depicting the Green Tara goddess in traditional Tibetan style",
    image: "/placeholder.svg?height=300&width=400&text=Tara+Mural",
    resolution: "8K Ultra HD",
    dimensions: "3m x 2m",
    medium: "Natural Pigments",
    condition: "Good",
    featured: true,
    tags: ["Deity", "Wall Art", "Tibetan Style"],
  },
  {
    id: 3,
    title: "Prayer Wheel Collection",
    type: "Artifact",
    century: "18th Century",
    monastery: "Enchey Monastery",
    description: "Set of ornate copper prayer wheels with intricate engravings and mantras",
    image: "/placeholder.svg?height=300&width=400&text=Prayer+Wheels",
    resolution: "4K Ultra HD",
    material: "Copper & Silver",
    quantity: 12,
    condition: "Very Good",
    featured: false,
    tags: ["Prayer Wheel", "Copper", "Mantras"],
  },
  {
    id: 4,
    title: "Monastery Blueprint",
    type: "Document",
    century: "19th Century",
    monastery: "Tashiding Monastery",
    description: "Original architectural drawings showing the monastery's construction plans",
    image: "/placeholder.svg?height=300&width=400&text=Blueprint",
    resolution: "High Resolution",
    material: "Paper & Ink",
    sheets: 24,
    condition: "Fair",
    featured: false,
    tags: ["Architecture", "Blueprint", "Construction"],
  },
  {
    id: 5,
    title: "Thangka Painting",
    type: "Artwork",
    century: "16th Century",
    monastery: "Dubdi Monastery",
    description: "Traditional Tibetan Buddhist painting on cotton depicting Buddha's life",
    image: "/placeholder.svg?height=300&width=400&text=Thangka",
    resolution: "6K Ultra HD",
    dimensions: "1.5m x 1m",
    medium: "Natural Dyes on Cotton",
    condition: "Excellent",
    featured: true,
    tags: ["Thangka", "Buddha", "Cotton Canvas"],
  },
  {
    id: 6,
    title: "Ritual Instruments",
    type: "Artifact",
    century: "17th Century",
    monastery: "Phensang Monastery",
    description: "Collection of traditional Buddhist ceremonial instruments including bells and dorjes",
    image: "/placeholder.svg?height=300&width=400&text=Ritual+Instruments",
    resolution: "4K Ultra HD",
    material: "Bronze & Brass",
    quantity: 8,
    condition: "Good",
    featured: false,
    tags: ["Ritual", "Bronze", "Ceremonial"],
  },
  {
    id: 7,
    title: "Medicinal Text",
    type: "Manuscript",
    century: "18th Century",
    monastery: "Rumtek Monastery",
    description: "Traditional Tibetan medicine manuscript with herbal remedies and treatments",
    image: "/placeholder.svg?height=300&width=400&text=Medicine+Text",
    resolution: "High Resolution",
    pages: 156,
    language: "Tibetan",
    condition: "Good",
    featured: false,
    tags: ["Medicine", "Herbal", "Tibetan Text"],
  },
  {
    id: 8,
    title: "Mandala Sand Art",
    type: "Artwork",
    century: "Modern Recreation",
    monastery: "Multiple Locations",
    description: "Digital preservation of intricate sand mandala created during ceremonies",
    image: "/placeholder.svg?height=300&width=400&text=Mandala",
    resolution: "8K Ultra HD",
    medium: "Colored Sand",
    creation: "7 days",
    condition: "Digital Archive",
    featured: true,
    tags: ["Mandala", "Sand Art", "Ceremony"],
  },
]

const itemTypes = ["All", "Manuscript", "Mural", "Artifact", "Document", "Artwork"]
const centuries = [
  "All",
  "15th Century",
  "16th Century",
  "17th Century",
  "18th Century",
  "19th Century",
  "Modern Recreation",
]
const monasteries = [
  "All",
  "Rumtek Monastery",
  "Pemayangtse Monastery",
  "Enchey Monastery",
  "Tashiding Monastery",
  "Dubdi Monastery",
  "Phensang Monastery",
  "Multiple Locations",
]

export default function ArchivesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [centuryFilter, setCenturyFilter] = useState("All")
  const [monasteryFilter, setMonasteryFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItem, setSelectedItem] = useState<(typeof archiveItems)[0] | null>(null)

  const filteredItems = archiveItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "All" || item.type === typeFilter
    const matchesCentury = centuryFilter === "All" || item.century === centuryFilter
    const matchesMonastery = monasteryFilter === "All" || item.monastery === monasteryFilter

    return matchesSearch && matchesType && matchesCentury && matchesMonastery
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
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
            <Link href="/calendar" className="text-gray-700 hover:text-gray-900 transition-colors">
              Calendar
            </Link>
            <Link href="/archives" className="text-gray-900 font-medium">
              Archives
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-amber-900 to-orange-900">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-amber-600 text-white border-amber-500">Digital Archives</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sacred Heritage Preserved</h1>
            <p className="text-xl text-amber-100 text-balance">
              Explore our comprehensive digital collection of manuscripts, murals, artifacts, and cultural treasures
              from Sikkim's monasteries.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div {...fadeInUp}>
          <Card className="bg-gray-800 border-amber-800 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Search className="mr-2 h-5 w-5" />
                AI-Powered Semantic Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search manuscripts, murals, artifacts... (e.g., 'golden Buddha statues' or 'palm leaf texts')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button size="sm" className="absolute right-2 top-2 bg-amber-600 hover:bg-amber-700">
                  <Zap className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {itemTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-gray-600">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Century</label>
                  <Select value={centuryFilter} onValueChange={setCenturyFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All centuries" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {centuries.map((century) => (
                        <SelectItem key={century} value={century} className="text-white hover:bg-gray-600">
                          {century}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Monastery</label>
                  <Select value={monasteryFilter} onValueChange={setMonasteryFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All monasteries" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {monasteries.map((monastery) => (
                        <SelectItem key={monastery} value={monastery} className="text-white hover:bg-gray-600">
                          {monastery}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">View</label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={viewMode === "grid" ? "default" : "outline"}
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid"
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : "border-amber-600 text-amber-400 hover:bg-amber-900/20 bg-transparent"
                      }
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "list" ? "default" : "outline"}
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : "border-amber-600 text-amber-400 hover:bg-amber-900/20 bg-transparent"
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{filteredItems.length} items found</span>
                <span>Total archive size: 2.3TB • 1,247 items</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Archive Items */}
        {viewMode === "grid" ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Card className="bg-gray-800 border-amber-800 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <ImageIcon
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {item.featured && (
                        <Badge className="absolute top-3 left-3 bg-amber-600 text-white">Featured</Badge>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10 bg-transparent"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10 bg-transparent"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white line-clamp-1">{item.title}</h3>
                        <Button size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300 p-1">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mb-2">
                        <Archive className="h-3 w-3 mr-1" />
                        {item.type} • {item.century}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.monastery}
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-amber-600 text-amber-400">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Resolution: {item.resolution} • Condition: {item.condition}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={staggerContainer} initial="initial" animate="animate">
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Card className="bg-gray-800 border-amber-800 hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="relative">
                        <ImageIcon
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {item.featured && (
                          <Badge className="absolute top-2 left-2 bg-amber-600 text-white text-xs">Featured</Badge>
                        )}
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                            <div className="flex items-center text-gray-400 text-sm mb-2">
                              <Archive className="h-4 w-4 mr-1" />
                              {item.type} • {item.century} • {item.monastery}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-400">Resolution:</span>
                            <div className="text-white">{item.resolution}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Condition:</span>
                            <div className="text-white">{item.condition}</div>
                          </div>
                          {item.pages && (
                            <div>
                              <span className="text-gray-400">Pages:</span>
                              <div className="text-white">{item.pages}</div>
                            </div>
                          )}
                          {item.material && (
                            <div>
                              <span className="text-gray-400">Material:</span>
                              <div className="text-white">{item.material}</div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-amber-600 text-amber-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-600 text-amber-400 hover:bg-amber-900/20 bg-transparent"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredItems.length === 0 && (
          <motion.div {...fadeInUp}>
            <Card className="bg-gray-800 border-amber-800">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No items found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
