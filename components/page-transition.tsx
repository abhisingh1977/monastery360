"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("in")

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("out")
    }
  }, [children, displayChildren])

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate={transitionStage}
      variants={pageVariants}
      transition={pageTransition}
      onAnimationComplete={() => {
        if (transitionStage === "out") {
          setDisplayChildren(children)
          setTransitionStage("in")
        }
      }}
      className="page-content"
    >
      {displayChildren}
    </motion.div>
  )
}
