"use client"

import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/api"
import type { Listing } from "@/types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchListings = async () => {
    setIsLoading(true)
    try {
      const data = await getListings()
      setListings(data.slice(0, 6)) // Show only first 6 listings
    } catch (error) {
      console.error("Failed to fetch listings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Stays</h2>
          <p className="text-muted-foreground">Discover our most popular destinations</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/listings">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[350px] animate-pulse bg-muted rounded-lg"></div>
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
