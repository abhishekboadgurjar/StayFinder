import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Listing } from "@/types"
import { MapPin } from "lucide-react"

interface ListingCardProps {
  listing: Listing
  actionButton?: React.ReactNode
}

export function ListingCard({ listing, actionButton }: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/listings/${listing._id}`} className="block">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url('/placeholder.svg?height=200&width=400')` }}
        />
      </Link>
      <CardContent className="p-4">
        <Link href={`/listings/${listing._id}`} className="block">
          <h3 className="text-lg font-medium line-clamp-1">{listing.title}</h3>
        </Link>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{listing.description}</p>
        <div className="mt-3 font-medium">${listing.price} / night</div>
      </CardContent>
      {actionButton && <CardFooter className="p-4 pt-0">{actionButton}</CardFooter>}
    </Card>
  )
}
