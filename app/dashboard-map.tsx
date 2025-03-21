"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

// Define a type for a map marker
type StatusType = "pending" | "in-progress" | "completed"

type Marker = {
    id: number
    lat: number
    lng: number
    status: StatusType
    title: string
  }

// Sample data for map markers
const SAMPLE_MARKERS: Marker[] = [
  { id: 1, lat: 40.7128, lng: -74.006, status: "pending", title: "Pothole on Main Street" },
  { id: 2, lat: 40.7148, lng: -74.013, status: "in-progress", title: "Broken Traffic Light" },
  { id: 3, lat: 40.7118, lng: -74.009, status: "completed", title: "Road Crack" },
  { id: 4, lat: 40.7138, lng: -74.003, status: "pending", title: "Damaged Sidewalk" },
  { id: 5, lat: 40.7158, lng: -74.008, status: "in-progress", title: "Missing Street Sign" },
]

export default function DashboardMap() {
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null) // ✅ Properly typed state

  useEffect(() => {
    // This would normally load the Google Maps API
    // For this prototype, we'll simulate a map with a placeholder
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Define a function to get marker colors
  const getMarkerColor = (status: "pending" | "in-progress" | "completed"): string => {
    switch (status) {
      case "pending":
        return "#ef4444" // red
      case "in-progress":
        return "#eab308" // yellow
      case "completed":
        return "#22c55e" // green
      default:
        return "#3b82f6" // blue
    }
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-100">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Map would display here with markers for reported issues</p>
            </div>
          </div>

          {/* Simulated map markers */}
          {SAMPLE_MARKERS.map((marker) => (
            <div
              key={marker.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
              style={{
                top: `${Math.random() * 70 + 15}%`,
                left: `${Math.random() * 70 + 15}%`,
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              <div className="flex flex-col items-center">
                <MapPin size={28} fill={getMarkerColor(marker.status)} color={getMarkerColor(marker.status)} />
              </div>
            </div>
          ))}

          {/* Info window for selected marker */}
          {selectedMarker && (
            <div
              className="absolute z-10 bg-white p-3 rounded-lg shadow-lg w-48"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -130%)",
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{selectedMarker.title}</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedMarker(null)}>
                  ×
                </button>
              </div>
              <div className="mt-1 flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: getMarkerColor(selectedMarker.status) }}
                ></div>
                <span className="text-xs capitalize">{selectedMarker.status}</span>
              </div>
              <button
                className="mt-2 text-xs text-blue-600 hover:underline w-full text-left"
                onClick={() => (window.location.href = `/report/details/${selectedMarker.id}`)}
              >
                View details
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}