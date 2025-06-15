import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background z-10" />
      <div
        className="h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1920')" }}
      />
      <div className="container absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">Find Your Perfect Stay</h1>
        <p className="text-lg md:text-xl max-w-[600px] mb-8 text-muted-foreground">
          Discover amazing places to stay around the world with StayFinder. Book unique homes, apartments, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/listings">Explore Listings</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Become a Host</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
