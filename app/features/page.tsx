"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Headphones,
  Archive,
  Search,
  Download,
  Calendar,
  MapPin,
  Smartphone,
  Globe,
  Users,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

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

const features = [
  {
    icon: Camera,
    title: "Virtual Tours",
    description:
      "Immersive 360° virtual reality experiences that transport you inside sacred monastery halls, meditation chambers, and prayer rooms.",
    benefits: ["High-resolution 360° imagery", "Interactive hotspots", "WebXR compatibility", "Multi-device support"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Headphones,
    title: "Narrated Walkthroughs",
    description:
      "AI-powered audio guides in multiple languages, providing rich historical context and spiritual insights from monastery experts.",
    benefits: ["Multi-language support", "Expert narration", "Cultural context", "Offline playback"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Archive,
    title: "Digital Archives",
    description:
      "Comprehensive collection of digitized manuscripts, ancient texts, murals, and artifacts preserved for future generations.",
    benefits: ["High-resolution scans", "Searchable metadata", "Historical timeline", "Conservation status"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Search,
    title: "AI Search",
    description:
      "Intelligent semantic search powered by advanced AI to discover connections between monasteries, texts, and cultural elements.",
    benefits: [
      "Natural language queries",
      "Visual similarity search",
      "Cross-reference linking",
      "Smart recommendations",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Download,
    title: "Offline Mode",
    description:
      "Download content for offline access, perfect for remote locations or areas with limited internet connectivity.",
    benefits: ["Selective downloads", "Compressed formats", "Sync when online", "Storage optimization"],
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Calendar,
    title: "Cultural Calendar",
    description:
      "Stay connected with monastery festivals, ceremonies, and special events throughout the year with detailed scheduling.",
    benefits: ["Festival notifications", "Event details", "Booking integration", "Cultural significance"],
    color: "from-indigo-500 to-purple-500",
  },
]

const additionalFeatures = [
  {
    icon: MapPin,
    title: "GPS Integration",
    description: "Navigate to monasteries with precise GPS coordinates and turn-by-turn directions.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Fully responsive design optimized for smartphones and tablets.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Available in English, Hindi, Nepali, and local Sikkimese languages.",
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Connect with other cultural enthusiasts and share experiences.",
  },
  {
    icon: Shield,
    title: "Cultural Respect",
    description: "Built with deep respect for Buddhist traditions and monastery protocols.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized for quick loading even on slower internet connections.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-yellow-500/95 backdrop-blur-md border-b border-yellow-400 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-white">Monastery360</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-yellow-200 font-medium">
              Features
            </Link>
            <Link href="/map" className="text-white hover:text-yellow-200 transition-colors">
              Map
            </Link>
            <Link href="/travel" className="text-white hover:text-yellow-200 transition-colors">
              Hotels & Travel
            </Link>
            <Link href="/calendar" className="text-white hover:text-yellow-200 transition-colors">
              Calendar
            </Link>
            <Link href="/archives" className="text-white hover:text-yellow-200 transition-colors">
              Archives
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-amber-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Platform Features</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Cutting-Edge Technology Meets Ancient Wisdom
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 text-balance">
              Discover how our advanced features bring Sikkim's monastery heritage to life through immersive digital
              experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Core Features</h2>
            <p className="text-lg text-gray-600">Advanced tools for cultural exploration and preservation</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-amber-200 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-800">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Additional Capabilities</h2>
            <p className="text-lg text-gray-600">Enhanced features for a complete cultural experience</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {additionalFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Start your journey through Sikkim's monastery heritage with our comprehensive digital platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg">
                <Camera className="mr-2 h-5 w-5" />
                Start Virtual Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Map
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
