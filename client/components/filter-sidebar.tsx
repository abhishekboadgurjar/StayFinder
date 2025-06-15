"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export function FilterSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [priceRange, setPriceRange] = useState([0, 1000])

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    setMinPrice(values[0].toString())
    setMaxPrice(values[1].toString())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (minPrice) {
      params.set("minPrice", minPrice)
    } else {
      params.delete("minPrice")
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice)
    } else {
      params.delete("maxPrice")
    }

    router.push(`/listings?${params.toString()}`)
  }

  const handleReset = () => {
    setMinPrice("")
    setMaxPrice("")
    setPriceRange([0, 1000])
    router.push("/listings")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Price Range</Label>
            <Slider
              defaultValue={[Number.parseInt(minPrice) || 0, Number.parseInt(maxPrice) || 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="minPrice">Min ($)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="maxPrice">Max ($)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit">Apply Filters</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
