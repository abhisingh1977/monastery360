"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ScrollAnimation from "@/components/scroll-animations"
import FloatingElements from "@/components/floating-elements"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import dynamic from "next/dynamic"

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), { ssr: false })

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


const testimonials = [
  {
    quote: "A monastery is not a place to hide from the world, but a place to heal the world.",
    author: "Traditional Buddhist Wisdom",
  },
  {
    quote: "In the silence of the mountains, the soul finds its voice.",
    author: "Sikkimese Proverb",
  },
  {
    quote: "Every monastery tells a story of devotion, culture, and timeless wisdom.",
    author: "Cultural Heritage Foundation",
  },
]

export default function HomePage() {
  const [mapOpen, setMapOpen] = useState(false)
  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        // Hero parallax effect
        gsap.to(".hero-bg", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        // Floating animation for navigation
        gsap.to(".nav-logo", {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      } catch (error) {
        console.log("GSAP ScrollTrigger not available")
      }
    }

    initGSAP()

    return () => {
      if (typeof window !== "undefined") {
        gsap.killTweensOf("*")
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      <FloatingElements />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 nav-logo">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-800 to-red-800 rounded-full flex items-center justify-center shadow-md">
              <span className="text-gray-100 font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Monastery360</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/map"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:scale-105"
            >
              Map
            </Link>
            <Link
              href="/travel"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:scale-105"
            >
              Hotels & Travel
            </Link>
            <Link
              href="/calendar"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:scale-105"
            >
              Calendar
            </Link>
            <Link
              href="/archives"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:scale-105"
            >
              Archives
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80 z-10"></div>
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/majestic-himalayan-monastery-with-prayer-flags-and.jpg')`,
          }}
        ></div>

        <motion.div
          className="relative z-20 text-center text-white px-4 max-w-4xl bg-black/20 backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Badge className="mb-6 bg-amber-600/90 text-white border-amber-500">Digital Heritage Platform</Badge>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-balance drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Experience Sikkim's Monasteries Like Never Before
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-white text-balance drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Immerse yourself in the sacred heritage of Himalayan monasteries through cutting-edge virtual reality and
            AI-powered cultural exploration.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              ▶️ Explore Virtual Tours
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg hover:scale-105 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm shadow-xl"
            >
              Learn More →
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Preserving Sacred Heritage</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Monastery360 is a groundbreaking digital platform dedicated to preserving and sharing the rich cultural
                heritage of Sikkim's monasteries. Through advanced technology and deep cultural respect, we bring these
                sacred spaces to the world while honoring their spiritual significance.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>


      {/* Interactive Map Preview */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="slideInLeft">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Monastery Locations</h2>
              <p className="text-lg text-gray-600">Interactive map of Sikkim's sacred sites</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="scaleIn" delay={0.3}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="h-96 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('/interactive-map-of-sikkim-with-monastery-location-.jpg')`,
                }}
              >
                <div className="absolute inset-0 bg-gray-900/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white hover:scale-110 transition-all duration-300"
                    onClick={() => setMapOpen(true)}
                  >
                    📍 View Interactive Map
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Interactive Map Overlay */}
      <InteractiveMap isOpen={mapOpen} onClose={() => setMapOpen(false)} />

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-100 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Cultural Wisdom</h2>
              <p className="text-lg text-gray-600">Timeless quotes that inspire our mission</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation
                key={index}
                animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
                delay={index * 0.2}
              >
                <Card className="h-full border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <span className="text-amber-500 text-xl">⭐</span>
                        </motion.div>
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 mb-4 italic">"{testimonial.quote}"</blockquote>
                    <cite className="text-sm text-gray-500 font-medium">— {testimonial.author}</cite>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ScrollAnimation animation="fadeInUp">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold">Monastery360</span>
                </div>
                <p className="text-gray-400">Preserving Sikkim's monastery heritage through digital innovation.</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.1}>
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours" className="hover:text-white transition-colors">
                      Virtual Tours
                    </Link>
                  </li>
                  <li>
                    <Link href="/map" className="hover:text-white transition-colors">
                      Interactive Map
                    </Link>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.2}>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/archives" className="hover:text-white transition-colors">
                      Digital Archives
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar" className="hover:text-white transition-colors">
                      Cultural Calendar
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.3}>
              <div>
                <h4 className="font-semibold mb-4">Partners</h4>
                <div className="space-y-4">
                  <div className="text-sm text-gray-400">
                    <p>Government of Sikkim</p>
                    <p>SIH Hackathon 2025</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Monastery360. Built with respect for Sikkim's cultural heritage.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
