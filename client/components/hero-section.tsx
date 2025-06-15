import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background z-20" />

      {/* Background image */}
      <div
        className="h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      {/* Content */}
      <div className="container absolute inset-0 flex flex-col items-center justify-center z-30 text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            Find Your Perfect
            <span className="block text-primary">Stay</span>
          </h1>

          <p className="text-lg md:text-xl max-w-[600px] mb-8 text-white/90 drop-shadow">
            Discover amazing places to stay around the world. From cozy apartments to luxury villas, find your home away
            from home.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">8 Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">8 Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span className="font-medium">Easy Booking</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/listings">
                <Search className="mr-2 h-5 w-5" />
                Explore Listings
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/auth/register">Become a Host</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
