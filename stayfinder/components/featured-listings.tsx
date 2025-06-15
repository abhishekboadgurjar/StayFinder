"use client"

import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/api"
import type { Listing } from "@/types"

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings()
        setListings(data.slice(0, 6)) // Show only first 6 listings
      } catch (error) {
        console.error("Failed to fetch listings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Featured Stays</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
