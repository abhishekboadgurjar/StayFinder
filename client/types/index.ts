export interface User {
  id: string
  name: string
  email?: string
  isHost?: boolean
}

export interface Profile {
  bio?: string
  phone?: string
  gender?: string
  dob?: string
  avatar?: string
  location?: string
}

export interface Listing {
  _id: string
  title: string
  description: string
  price: number
  location: string
  images?: string[]
  amenities?: string[]
  hostId: string
  createdAt: string
  updatedAt?: string
}

export interface Booking {
  _id: string
  listingId: string | Listing
  userId: string
  checkIn: string
  checkOut: string
  status: string
  createdAt: string
  updatedAt?: string
}

export interface BookingWithListing extends Omit<Booking, "listingId"> {
  listingId: Listing
}
