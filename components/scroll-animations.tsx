"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fadeInUp" | "slideInLeft" | "slideInRight" | "scaleIn" | "parallax"
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollAnimation({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.8,
  className = "",
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animationProps = {}

    switch (animation) {
      case "fadeInUp":
        gsap.set(element, { opacity: 0, y: 60 })
        animationProps = { opacity: 1, y: 0 }
        break
      case "slideInLeft":
        gsap.set(element, { opacity: 0, x: -100 })
        animationProps = { opacity: 1, x: 0 }
        break
      case "slideInRight":
        gsap.set(element, { opacity: 0, x: 100 })
        animationProps = { opacity: 1, x: 0 }
        break
      case "scaleIn":
        gsap.set(element, { opacity: 0, scale: 0.8 })
        animationProps = { opacity: 1, scale: 1 }
        break
      case "parallax":
        animationProps = { y: -50 }
        break
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: animation === "parallax" ? "bottom top" : undefined,
        scrub: animation === "parallax" ? 1 : false,
        toggleActions: animation !== "parallax" ? "play none none reverse" : undefined,
      },
    })

    tl.to(element, {
      ...animationProps,
      duration,
      delay,
      ease: "power2.out",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [animation, delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
