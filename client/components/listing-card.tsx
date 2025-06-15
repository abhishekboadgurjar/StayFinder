import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Listing } from "@/types"
import { MapPin, Star, Wifi } from "lucide-react"

interface ListingCardProps {
  listing: Listing
  actionButton?: React.ReactNode
}

export function ListingCard({ listing, actionButton }: ListingCardProps) {
  const mainImage = listing.images?.[0] || "/placeholder.svg?height=250&width=400&text=Property+Image"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/listings/${listing._id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-black">
              ${listing.price}/night
            </Badge>
          </div>
          {listing.rating && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-black/70 text-white flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                {listing.rating}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/listings/${listing._id}`} className="block">
          <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors">{listing.title}</h3>
        </Link>

        <div className="flex items-center text-muted-foreground mt-1 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{listing.location}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>

        {listing.amenities && listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                {amenity}
              </Badge>
            ))}
            {listing.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {listing.rating && listing.reviewCount && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span>{listing.rating}</span>
                <span>({listing.reviewCount})</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${listing.price}</div>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        </div>
      </CardContent>

      {actionButton && <CardFooter className="p-4 pt-0">{actionButton}</CardFooter>}
    </Card>
  )
}
