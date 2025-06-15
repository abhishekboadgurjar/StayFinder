"use client"

import { useState } from "react"
import Image from "next/image"
import type { Listing } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface ListingDetailProps {
  listing: Listing
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = listing.images || ["/placeholder.svg?height=400&width=800&text=Property+Image"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <div className="relative">
        <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${listing.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Property Info */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{listing.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${listing.price}</div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>

        {/* Rating and Reviews */}
        {listing.rating && listing.reviewCount && (
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-current text-yellow-500" />
              <span className="font-semibold">{listing.rating}</span>
              <span className="text-muted-foreground">({listing.reviewCount} reviews)</span>
            </div>
          </div>
        )}

        {/* Quick Info Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Great for families</span>
          </Badge>
          <Badge variant="outline">Instant Book</Badge>
          <Badge variant="outline">Self check-in</Badge>
        </div>
      </div>

      {/* Description */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">About this place</h2>
        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{listing.description}</p>
      </div>

      {/* Amenities */}
      {listing.amenities && listing.amenities.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
          <div className="grid grid-cols-2 gap-3">
            {listing.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Host Info */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
        <div className="flex items-center gap-4 p-4 rounded-lg border">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
            {listing.hostId.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">Host ID: {listing.hostId}</div>
            <div className="text-sm text-muted-foreground">Superhost • Joined in 2023</div>
          </div>
        </div>
      </div>
    </div>
  )
}
