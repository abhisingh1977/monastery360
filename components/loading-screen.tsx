"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Animate page entrance
      gsap.fromTo(".page-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-amber-600 to-red-600 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "power2.inOut" }}
        >
          <div className="text-center text-white">
            <motion.div
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <span className="text-2xl font-bold">M</span>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Monastery360
            </motion.h1>

            <motion.p
              className="text-xl text-amber-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Loading Sacred Heritage...
            </motion.p>

            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.p
              className="text-sm text-amber-100 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {progress < 100 ? `${Math.round(progress)}%` : "Ready!"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
