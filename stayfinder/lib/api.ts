// API utility functions to interact with the StayFinder API

const API_BASE_URL = "https://stayfinderbackend.vercel.app/api"

// Helper function to get the auth token
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function for API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred")
  }

  return response.json()
}

// Auth API functions
export async function register(name: string, email: string, password: string, isHost: boolean) {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, isHost }),
  })
}

export async function login(email: string, password: string) {
  return fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

// Listings API functions
export async function getListings(params: Record<string, string | undefined> = {}) {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value)
  })

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
  return fetchAPI(`/listings${queryString}`)
}

export async function getListingById(id: string) {
  return fetchAPI(`/listings/${id}`)
}

export async function createListing(listingData: {
  title: string
  description: string
  location: string
  price: number
  amenities?: string[]
}) {
  return fetchAPI("/listings", {
    method: "POST",
    body: JSON.stringify(listingData),
  })
}

export async function updateListing(
  id: string,
  listingData: Partial<{
    title: string
    description: string
    location: string
    price: number
    amenities: string[]
  }>,
) {
  return fetchAPI(`/listings/${id}`, {
    method: "PUT",
    body: JSON.stringify(listingData),
  })
}

export async function deleteListing(id: string) {
  return fetchAPI(`/listings/${id}`, {
    method: "DELETE",
  })
}

// Bookings API functions
export async function createBooking(bookingData: {
  listingId: string
  checkIn: string
  checkOut: string
}) {
  return fetchAPI("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  })
}

// User listings (for hosts)
export async function getUserListings() {
  // This is a mock function since the API doesn't have this endpoint
  // In a real app, you would have an endpoint like /api/users/me/listings
  const allListings = await getListings()
  return allListings // In a real app, this would filter by the current user's hostId
}
