"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { getMyBookings, cancelBooking } from "@/lib/api"
import { Calendar, MapPin, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { BookingWithListing } from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingWithListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchBookings = async () => {
    try {
      if (user) {
        const data = await getMyBookings()
        setBookings(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your bookings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [user])

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId)
    try {
      await cancelBooking(bookingId)
      toast({
        title: "Success",
        description: "Booking cancelled successfully",
      })
      // Refresh bookings
      await fetchBookings()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      })
    } finally {
      setCancellingId(null)
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-4">Please login to view your bookings.</p>
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[200px] animate-pulse">
              <div className="h-full bg-muted"></div>
            </Card>
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {typeof booking.listingId === "object" ? booking.listingId.title : "Loading..."}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={cancellingId === booking._id}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this booking? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelBooking(booking._id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Cancel Booking
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{typeof booking.listingId === "object" ? booking.listingId.location : "Loading..."}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {typeof booking.listingId === "object" && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">${booking.listingId.price} per night</p>
                    <Link href={`/listings/${booking.listingId._id}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Property
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any bookings yet. Start exploring our listings!
              </p>
              <Button asChild>
                <Link href="/listings">Explore Properties</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
