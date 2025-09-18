"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Narration = { en: string; hi: string; ne: string }
type TourStop = { id: string; title: string; imageUrl: string; thumbnailUrl: string; narration: Narration }

declare global {
  interface Window {
    Marzipano?: any
  }
}

const loadScriptOnce = async (src: string) => {
  if (document.querySelector(`script[src=\"${src}\"]`)) return
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(s)
  })
}

const ensureMarzipano = async () => {
  // Try jsdelivr first, then unpkg as a fallback
  const candidates = [
    "https://cdn.jsdelivr.net/npm/marzipano@0.10.2/dist/marzipano.js",
    "https://unpkg.com/marzipano@0.10.2/dist/marzipano.js",
  ]
  for (const url of candidates) {
    if (window.Marzipano) break
    try {
      await loadScriptOnce(url)
    } catch {}
  }
  if (!window.Marzipano?.Viewer) {
    throw new Error("Marzipano not available after loading CDN script")
  }
}

export default function VirtualTourViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewerRef = useRef<any>(null)
  const [stops, setStops] = useState<TourStop[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [language, setLanguage] = useState<keyof Narration>("en")
  const [showNarration, setShowNarration] = useState(false)
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        // Load data
        const res = await fetch("/data/tours.json", { cache: "no-cache" })
        const data: TourStop[] = await res.json()
        setStops(data)

        // Load Marzipano (robust CDN loader)
        await ensureMarzipano()

        // Initialize viewer (with CSS fallback if WebGL stage fails)
        if (containerRef.current) {
          const Marzipano = window.Marzipano
          if (!Marzipano?.Viewer) throw new Error("Marzipano Viewer constructor missing")
          let viewer: any
          try {
            viewer = new Marzipano.Viewer(containerRef.current, { stageType: "webgl" })
          } catch {
            viewer = new Marzipano.Viewer(containerRef.current, { stageType: "css" })
          }
          viewerRef.current = viewer
          setIsReady(true)
        }
      } catch (e) {
        console.error("Failed to initialize VirtualTourViewer", e)
      }
    }
    init()
    return () => {
      viewerRef.current = null
      try { window.speechSynthesis?.cancel() } catch {}
    }
  }, [])

  // Build a scene for a given stop
  const buildScene = (stop: TourStop) => {
    const Marzipano = window.Marzipano
    const source = Marzipano.ImageUrlSource.fromString(stop.imageUrl)
    // Use multi-level geometry to be robust across image sizes
    const geometry = new Marzipano.EquirectGeometry([
      { width: 1024 },
      { width: 2048 },
      { width: 4096 },
    ])
    
    // Initialize RectilinearView with defaults; avoid passing a custom limiter function
    const view = new Marzipano.RectilinearView({ yaw: 0, pitch: 0, fov: Math.PI / 2 })
    const scene = viewerRef.current.createScene({ source, geometry, view, pinFirstLevel: true })

    // Enable scroll zoom and device orientation
    const controls = viewerRef.current.controls()
    
    // Only enable methods that exist in this Marzipano build
    try { controls.enableMethod("mouseViewDrag") } catch {}
    try { controls.enableMethod("scrollZoom") } catch {}
    try { controls.enableMethod("touchViewPinch") } catch {}
    
    try {
      const deviceOrientation = new Marzipano.controls.DeviceOrientationControlMethod()
      controls.registerMethod("deviceOrientation", deviceOrientation)
      controls.enableMethod("deviceOrientation")
    } catch {}

    return { scene, view }
  }

  // Switch scenes with fade
  const switchTo = (idx: number) => {
    if (!viewerRef.current || !stops[idx]) return
    const { scene } = buildScene(stops[idx])
    if (scene) {
      scene.switchTo({ transitionDuration: 700 })
    }
    setCurrentIdx(idx)
    // restart narration on scene change if it was playing
    if (isNarrationPlaying) {
      stopNarration()
      // small delay to allow voices to populate
      setTimeout(() => startNarration(), 100)
    }
  }

  useEffect(() => {
    if (isReady && stops.length > 0) {
      switchTo(0)
    }
  }, [isReady, stops])

  const goFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      el.requestFullscreen({ navigationUI: "hide" } as any).catch(() => {})
    }
  }

  const getNarrationText = (): string => {
    const s = stops[currentIdx]
    if (!s) return ""
    return s.narration[language] || s.narration.en
  }

  const pickVoiceForLang = (lang: keyof Narration): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis?.getVoices?.() || []
    const prefer = {
      en: ["en-IN", "en-GB", "en-US"],
      hi: ["hi-IN"],
      ne: ["ne-NP", "hi-IN", "en-IN"],
    }[lang]
    const found = voices.find((v) => prefer?.some((p) => v.lang?.toLowerCase().startsWith(p.toLowerCase())))
    return found || voices[0] || null
  }

  const startNarration = () => {
    try {
      if (!("speechSynthesis" in window)) return alert("Narration not supported on this browser")
      const text = getNarrationText()
      if (!text) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      const voice = pickVoiceForLang(language)
      if (voice) u.voice = voice
      u.lang = voice?.lang || (language === "hi" ? "hi-IN" : language === "ne" ? "ne-NP" : "en-IN")
      u.rate = 0.95
      u.pitch = 1
      u.onend = () => setIsNarrationPlaying(false)
      window.speechSynthesis.speak(u)
      setIsNarrationPlaying(true)
    } catch {}
  }

  const stopNarration = () => {
    try { window.speechSynthesis?.cancel() } catch {}
    setIsNarrationPlaying(false)
  }

  // Restart narration when language changes while playing
  useEffect(() => {
    if (isNarrationPlaying) {
      stopNarration()
      setTimeout(() => startNarration(), 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <div ref={containerRef} className="w-full h-full bg-black" />

        {/* Top overlay */}
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-black/50 text-white text-xs rounded px-2 py-1">Drag to look • Scroll to zoom • Tilt to explore</div>
        </div>

        {/* Controls */}
        <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
          <button onClick={goFullscreen} className="px-2 py-1 text-white bg-black/60 rounded hover:bg-black/80">🔍 Fullscreen</button>
          <button onClick={() => setShowNarration((s) => !s)} className="px-2 py-1 text-white bg-black/60 rounded hover:bg-black/80">🎧 Narration</button>
          <select value={language} onChange={(e) => setLanguage(e.target.value as any)} className="px-2 py-1 bg-black/60 text-white rounded">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ne">Nepali</option>
          </select>
        </div>

        {/* Narration panel */}
        <AnimatePresence>
          {showNarration && stops[currentIdx] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-2 right-2 md:left-auto md:right-2 top-20 z-10 max-w-md"
            >
              <div className="bg-white/95 backdrop-blur rounded-lg shadow p-3 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{stops[currentIdx].title}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={isNarrationPlaying ? stopNarration : startNarration}
                      className="px-2 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700"
                    >
                      {isNarrationPlaying ? "⏸️ Pause" : "▶️ Play"}
                    </button>
                    <button
                      onClick={stopNarration}
                      className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                    >
                      ⏹️ Stop
                    </button>
                    <button
                      onClick={() => setShowNarration(false)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{stops[currentIdx].narration[language]}</p>
                {isNarrationPlaying && (
                  <div className="mt-2 text-xs text-amber-600">🔊 Playing narration...</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 overflow-x-auto">
        <div className="flex space-x-3">
          {stops.map((s, i) => (
            <button
              key={s.id}
              onClick={() => switchTo(i)}
              className={`flex-shrink-0 w-28 focus:outline-none ${i === currentIdx ? "ring-2 ring-amber-500 rounded" : ""}`}
              title={s.title}
            >
              <div className="w-28 h-16 rounded overflow-hidden bg-gray-200">
                <img src={s.thumbnailUrl || s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-1 text-xs text-gray-800 line-clamp-2 text-left">{s.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}



