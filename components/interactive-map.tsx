"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { SITES as ALL_SITES } from "./sites-data"

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false }) as any
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false }) as any
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false }) as any
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false }) as any
// Note: Do not dynamically import hooks like useMap; instead rely on MapContainer props

import L from "leaflet"

// Ensure Leaflet CSS is available on client
const ensureLeafletCss = () => {
  if (typeof window === "undefined") return
  const id = "leaflet-css"
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  link.crossOrigin = ""
  document.head.appendChild(link)
}

type Site = (typeof ALL_SITES)[number]
const SITES: Site[] = ALL_SITES

// Fix default marker icons when bundling
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

// Re-centering is handled via MapContainer props; no imperative map API needed

export type InteractiveMapProps = {
  isOpen: boolean
  onClose: () => void
}

export default function InteractiveMap({ isOpen, onClose }: InteractiveMapProps) {
  const [selected, setSelected] = useState<Site | null>(null)

  useEffect(() => {
    ensureLeafletCss()
  }, [])

  if (!isOpen) return null

  const center: [number, number] = [27.533, 88.512]
  const zoom = 9

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.jpg"
  }

  const getImageSrc = (img: Site["image"]): string => {
    if (typeof img === "string") return img
    // Next static imports expose a `src` string
    return (img as any)?.src ?? "/placeholder.jpg"
  }

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex-1">
        <MapContainer center={center} zoom={zoom} className="h-full w-full" style={{ minHeight: 300 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Center/zoom are provided via props */}
          {SITES.map((site) => (
            <Marker
              key={site.name}
              position={site.position}
              eventHandlers={{
                click: () => setSelected(site),
                mouseover: (e: any) => e.target.openPopup(),
                mouseout: (e: any) => e.target.closePopup(),
              }}
            >
              <Popup>
                <div className="flex items-center space-x-2">
                  <div className="relative w-12 h-8 overflow-hidden rounded bg-gray-200">
                    <img src={getImageSrc(site.image)} alt={site.name} className="object-cover w-full h-full" onError={handleImgError} />
                  </div>
                  <div className="font-medium">{site.name}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className={`relative w-full sm:w-[420px] max-w-[95vw] bg-white h-full overflow-y-auto shadow-2xl transition-transform duration-300 ${selected ? "translate-x-0" : "translate-x-full"}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white">
          <h3 className="text-lg font-semibold">Site Details</h3>
          <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>
        {selected ? (
          <div className="p-4 space-y-3">
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100">
              <img src={getImageSrc(selected.image)} alt={selected.name} className="object-cover w-full h-full" onError={handleImgError} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">{selected.name}</h4>
              <p className="text-gray-700 text-sm">{selected.info}</p>
            </div>
            <div className="text-sm">
              <p><span className="font-semibold">Speciality:</span> {selected.speciality}</p>
              <p><span className="font-semibold">Festival:</span> {selected.festival}</p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-base font-semibold">All Sites</h4>
              <span className="text-xs text-gray-500">{SITES.length} locations</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SITES.map((site) => (
                <button
                  key={site.name}
                  onClick={() => setSelected(site)}
                  className="group text-left"
                  title={site.name}
                >
                  <div className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100 ring-1 ring-gray-200 transition-transform duration-200 group-hover:scale-[1.02]">
                    <img
                      src={getImageSrc(site.image)}
                      alt={site.name}
                      className="object-cover w-full h-full opacity-95 group-hover:opacity-100"
                      onError={handleImgError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="mt-1 text-xs font-medium text-gray-800 line-clamp-2">{site.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={onClose} className="absolute top-4 right-4 z-[70] rounded-full bg-white/90 hover:bg-white shadow px-3 py-1">
        Close
      </button>
    </div>
  )
}


