"use client"

interface LocationMapProps {
  lat: number
  lng: number
  name: string
  zoom?: number
  className?: string
}

export function LocationMap({ lat, lng, name, zoom = 13, className = "" }: LocationMapProps) {
  // OpenStreetMap embed — free, no API key required
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.03}%2C${lng + 0.05}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lng}`

  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${className}`}>
      <iframe
        title={`Map showing ${name} service area`}
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
      <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
        <span>📍 Serving {name} and surrounding areas</span>
        <a
          href={`https://www.google.com/maps/search/travel+agent+${encodeURIComponent(name)}/@${lat},${lng},${zoom}z`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline"
        >
          View on Google Maps →
        </a>
      </div>
    </div>
  )
}
