"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { getListingById, updateListing, deleteListing } from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import type { Listing } from "@/types"
import { Trash2 } from "lucide-react"
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
import Link from "next/link"

export default function EditListingPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    amenities: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(params.id)
        setListing(data)
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          price: data.price.toString(),
          amenities: data.amenities?.join(", ") || "",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load listing",
          variant: "destructive",
        })
        router.push("/host/listings")
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [params.id, toast, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      await updateListing(params.id, {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: Number.parseFloat(formData.price),
        amenities: amenitiesArray,
      })

      toast({
        title: "Success",
        description: "Your listing has been updated",
      })

      router.push("/host/listings")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await deleteListing(params.id)
      toast({
        title: "Success",
        description: "Your listing has been deleted",
      })
      router.push("/host/listings")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-4">Please login to edit listings.</p>
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
              <p className="text-muted-foreground mb-4">Only hosts can edit listings.</p>
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

  if (isLoading) {
    return (
      <div className="container py-8">
        <Card className="max-w-2xl mx-auto">
          <div className="h-[600px] animate-pulse bg-muted"></div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Listing</CardTitle>
          <CardDescription>Update your property details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per night ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Listing
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your listing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
