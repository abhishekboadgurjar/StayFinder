import { SearchBar } from "@/components/search-bar"
import { ListingGrid } from "@/components/listing-grid"
import { FilterSidebar } from "@/components/filter-sidebar"

export default function ListingsPage({
  searchParams,
}: {
  searchParams: { location?: string; minPrice?: string; maxPrice?: string }
}) {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h1>
      <div className="mb-6">
        <SearchBar initialValues={searchParams} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-3">
          <ListingGrid searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}
