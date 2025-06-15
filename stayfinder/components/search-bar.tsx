"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

interface SearchBarProps {
  initialValues?: {
    location?: string
    minPrice?: string
    maxPrice?: string
  }
}

export function SearchBar({ initialValues = {} }: SearchBarProps) {
  const [location, setLocation] = useState(initialValues.location || "")
  const [minPrice, setMinPrice] = useState(initialValues.minPrice || "")
  const [maxPrice, setMaxPrice] = useState(initialValues.maxPrice || "")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (minPrice) params.append("minPrice", minPrice)
    if (maxPrice) params.append("maxPrice", maxPrice)

    router.push(`/listings?${params.toString()}`)
  }

  return (
    <Card className="p-4 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:w-[300px]">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-12"
            min="0"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-12"
            min="0"
          />
        </div>
        <Button type="submit" className="h-12 px-8">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>
    </Card>
  )
}
