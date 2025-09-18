"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(".floating-element")

    elements.forEach((element, index) => {
      gsap.set(element, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0.1 + Math.random() * 0.3,
        scale: 0.5 + Math.random() * 0.5,
      })

      gsap.to(element, {
        x: `+=${(Math.random() - 0.5) * 200}`,
        y: `+=${(Math.random() - 0.5) * 200}`,
        rotation: Math.random() * 360,
        duration: 20 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      })
    })

    return () => {
      gsap.killTweensOf(elements)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Prayer Flag Elements */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="floating-element absolute w-16 h-4 bg-gradient-to-r from-red-400 to-orange-400 opacity-20"
          style={{
            clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
          }}
        />
      ))}

      {/* Lotus Petals */}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={`lotus-${i}`}
          className="floating-element absolute w-8 h-12 bg-gradient-to-t from-pink-300 to-pink-100 opacity-20 rounded-full"
          style={{
            clipPath: "ellipse(50% 70% at 50% 100%)",
          }}
        />
      ))}

      {/* Dharma Wheel Symbols */}
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={`wheel-${i}`}
          className="floating-element absolute w-12 h-12 border-2 border-amber-300 opacity-20 rounded-full"
        >
          <div className="absolute inset-2 border border-amber-300 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-amber-300 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-8 h-1 bg-amber-300 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      ))}
    </div>
  )
}
