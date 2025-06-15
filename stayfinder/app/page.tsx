import { SearchBar } from "@/components/search-bar"
import { FeaturedListings } from "@/components/featured-listings"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <div className="container">
        <SearchBar />
      </div>
      <div className="container">
        <FeaturedListings />
      </div>
      <HowItWorks />
      <Testimonials />
    </div>
  )
}
