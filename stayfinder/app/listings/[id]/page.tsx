import { ListingDetail } from "@/components/listing-detail"
import { BookingForm } from "@/components/booking-form"
import { getListingById } from "@/lib/api"

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const listing = await getListingById(params.id)

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ListingDetail listing={listing} />
        </div>
        <div className="lg:col-span-1">
          <BookingForm listing={listing} />
        </div>
      </div>
    </div>
  )
}
