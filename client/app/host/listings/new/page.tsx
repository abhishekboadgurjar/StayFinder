"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { createListing } from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export default function NewListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    images: "",
    amenities: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!user) {
        throw new Error("Please login to create listings")
      }

      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      const imagesArray = formData.images
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      await createListing({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: Number.parseFloat(formData.price),
        amenities: amenitiesArray,
        images: imagesArray,
      })

      toast({
        title: "Success",
        description: "Your listing has been created",
      })

      router.push("/host/listings")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-4">Please login to create listings.</p>
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user.isHost) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Host Account Required</h2>
              <p className="text-muted-foreground mb-4">
                Only hosts can create listings. Create a host account to start listing your properties.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/">Return Home</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Create Host Account</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Listing</CardTitle>
          <CardDescription>Add details about your property</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Cozy Apartment in Downtown"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your property..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="New York, NY"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per night ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                step="0.01"
                placeholder="100"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma separated)</Label>
              <Input
                id="images"
                name="images"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                value={formData.images}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input
                id="amenities"
                name="amenities"
                placeholder="WiFi, Kitchen, Pool"
                value={formData.amenities}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Listing"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
