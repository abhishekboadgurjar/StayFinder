"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { createBooking } from "@/lib/api"
import type { Listing } from "@/types"
import { Calendar, Users, Star, Shield } from "lucide-react"

interface BookingFormProps {
  listing: Listing
}

export function BookingForm({ listing }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    return nights * listing.price
  }

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : 0
  const subtotal = calculateTotalPrice()
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book this property",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      await createBooking({
        listingId: listing._id,
        checkIn,
        checkOut,
      })

      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your booking has been successfully confirmed!",
      })

      // Reset form
      setCheckIn("")
      setCheckOut("")
      setGuests("1")
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${listing.price}</span>
            <span className="text-muted-foreground">/ night</span>
          </div>
          {listing.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-muted-foreground">({listing.reviewCount})</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="text-xs font-medium uppercase tracking-wide">
                Check In
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut" className="text-xs font-medium uppercase tracking-wide">
                Check Out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                  min={checkIn || new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-xs font-medium uppercase tracking-wide">
              Guests
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {checkIn && checkOut && nights > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>
                    ${listing.price} × {nights} nights
                  </span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Processing..." : "Reserve"}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>You won't be charged yet</span>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
