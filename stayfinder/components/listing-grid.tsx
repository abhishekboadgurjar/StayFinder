"use client"

import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/api"
import type { Listing } from "@/types"

interface ListingGridProps {
  searchParams?: {
    location?: string
    minPrice?: string
    maxPrice?: string
  }
}

export function ListingGrid({ searchParams = {} }: ListingGridProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings(searchParams)
        setListings(data)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No listings found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters to find more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  )
}
