"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { getUserListings } from "@/lib/api"
import { PlusCircle } from "lucide-react"
import { ListingCard } from "@/components/listing-card"
import { useToast } from "@/components/ui/use-toast"
import type { Listing } from "@/types"

export default function HostListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (user) {
          const data = await getUserListings()
          setListings(data)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load your listings",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [user, toast])

  if (!user?.isHost) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Host Access Required</h2>
              <p className="text-muted-foreground mb-4">You need to be registered as a host to access this page.</p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button asChild>
          <Link href="/host/listings/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[300px] animate-pulse">
              <div className="h-full bg-muted"></div>
            </Card>
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              actionButton={
                <Link href={`/host/listings/${listing._id}/edit`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Listing
                  </Button>
                </Link>
              }
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Listings Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You haven&apos;t created any listings yet. Add your first property to get started!</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/host/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Listing
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
