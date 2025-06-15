import type { Listing } from "@/types"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, User } from "lucide-react"

interface ListingDetailProps {
  listing: Listing
}

export function ListingDetail({ listing }: ListingDetailProps) {
  return (
    <div className="space-y-6">
      <div
        className="w-full h-[400px] rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=400&width=800')` }}
      />

      <div>
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{listing.location}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Available now</span>
        </Badge>
        <Badge variant="outline" className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          <span>Hosted by {listing.hostId}</span>
        </Badge>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">About this place</h2>
        <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
      </div>

      {listing.amenities && listing.amenities.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {listing.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
