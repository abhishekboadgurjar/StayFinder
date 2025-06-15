"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { createBooking } from "@/lib/api"
import type { Listing } from "@/types"
import { Calendar } from "lucide-react"

interface BookingFormProps {
  listing: Listing
}

export function BookingForm({ listing }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
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
        title: "Booking Confirmed",
        description: "Your booking has been successfully confirmed!",
      })

      // Reset form
      setCheckIn("")
      setCheckOut("")
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>${listing.price} / night</span>
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Check In</Label>
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
            <Label htmlFor="checkOut">Check Out</Label>
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

          {checkIn && checkOut && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-medium">${calculateTotalPrice()}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Book Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
