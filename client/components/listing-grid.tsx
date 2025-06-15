"use client"

import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/api"
import type { Listing } from "@/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [error, setError] = useState<string | null>(null)

  const fetchListings = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("Fetching listings with params:", searchParams)
      const data = await getListings(searchParams)
      console.log("Received data:", data)

      if (Array.isArray(data)) {
        setListings(data)
      } else {
        console.error("Expected array but got:", typeof data, data)
        setError("Invalid data format received from server")
      }
    } catch (err) {
      console.error("Failed to fetch listings:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Unable to load listings: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Listings</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={fetchListings}>
            <RefreshCcw className="h-4 w-4 mr-2" /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No listings found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters to find more results.</p>
        <Button variant="outline" onClick={fetchListings} className="mt-4">
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
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
