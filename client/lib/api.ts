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
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// ==================== AUTH API ====================

export async function register(name: string, email: string, password: string, isHost = false) {
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

// ==================== PROFILE API ====================

export async function getProfile() {
  return fetchAPI("/profile")
}

export async function updateProfile(profileData: {
  bio?: string
  phone?: string
  gender?: string
  dob?: string
  avatar?: string
  location?: string
}) {
  return fetchAPI("/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  })
}

export async function deleteProfile() {
  return fetchAPI("/profile", {
    method: "DELETE",
  })
}

// ==================== LISTINGS API ====================

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
  price: number
  location: string
  images?: string[]
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
    price: number
    location: string
    images: string[]
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

export async function getMyListings() {
  return fetchAPI("/listings/my-listings")
}

// ==================== BOOKINGS API ====================

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

export async function getMyBookings() {
  return fetchAPI("/bookings/my-bookings")
}

export async function getBookingById(id: string) {
  return fetchAPI(`/bookings/${id}`)
}

export async function updateBooking(
  id: string,
  bookingData: {
    checkIn?: string
    checkOut?: string
  },
) {
  return fetchAPI(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(bookingData),
  })
}

export async function cancelBooking(id: string) {
  return fetchAPI(`/bookings/${id}`, {
    method: "DELETE",
  })
}

// Legacy function for compatibility
export async function getUserListings() {
  return getMyListings()
}
