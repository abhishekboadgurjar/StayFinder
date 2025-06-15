export interface User {
  id: string
  name: string
  email?: string
  isHost: boolean
}

export interface Listing {
  _id: string
  title: string
  description: string
  location: string
  price: number
  hostId: string
  amenities?: string[]
  bookedDates?: {
    start: string
    end: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Booking {
  _id: string;
  listingId: string;
