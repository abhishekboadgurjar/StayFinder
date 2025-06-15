# StayFinder Server API Documentation

## Base URL
```
https://stayfinderbackend.vercel.app/api
```

## Authentication
Include JWT token in the `Authorization` header:
```
Authorization: Bearer your-jwt-token
```

## API Endpoints

### 1. Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and get token
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "isHost": false
    }
  }
  ```

---

### 2. Profile

#### Get Profile
- **Endpoint**: `GET /api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "bio": "Travel enthusiast",
    "phone": "+1234567890",
    "gender": "Male",
    "dob": "1990-01-01T00:00:00.000Z",
    "avatar": "https://example.com/avatar.jpg",
    "location": "New York, USA"
  }
  ```

#### Create/Update Profile
- **Endpoint**: `PUT /api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "bio": "Updated bio",
    "phone": "+1234567890",
    "gender": "Male",
    "dob": "1990-01-01",
    "avatar": "https://example.com/new-avatar.jpg",
    "location": "Los Angeles, USA"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Profile updated successfully",
    "profile": {
      // Updated profile object
    }
  }
  ```

#### Delete Profile
- **Endpoint**: `DELETE /api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "message": "Profile deleted successfully"
  }
  ```

---

### 3. Listings

#### Get All Listings
- **Endpoint**: `GET /api/listings`
- **Query Parameters**:
  - `location` (string, optional): Filter by location
  - `minPrice` (number, optional): Minimum price
  - `maxPrice` (number, optional): Maximum price
- **Success Response (200)**:
  ```json
  [
    {
      "_id": "listing-id",
      "title": "Cozy Apartment",
      "description": "Beautiful apartment...",
      "price": 100,
      "location": "New York, USA",
      "images": ["img1.jpg", "img2.jpg"],
      "amenities": ["WiFi", "Kitchen"],
      "hostId": "host-user-id",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

#### Get Single Listing
- **Endpoint**: `GET /api/listings/:id`
- **Success Response (200)**:
  ```json
  {
    "_id": "listing-id",
    "title": "Cozy Apartment",
    "description": "Beautiful apartment...",
    "price": 100,
    "location": "New York, USA",
    "images": ["img1.jpg"],
    "amenities": ["WiFi"],
    "hostId": "host-user-id"
  }
  ```

#### Create Listing (Host Only)
- **Endpoint**: `POST /api/listings`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "Luxury Villa",
    "description": "Beautiful villa with pool",
    "price": 250,
    "location": "Miami, USA",
    "images": ["villa1.jpg", "villa2.jpg"],
    "amenities": ["Pool", "WiFi", "AC", "Parking"]
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "_id": "new-listing-id",
    "title": "Luxury Villa",
    "description": "Beautiful villa with pool",
    "price": 250,
    "location": "Miami, USA",
    "images": ["villa1.jpg", "villa2.jpg"],
    "amenities": ["Pool", "WiFi", "AC", "Parking"],
    "hostId": "current-user-id",
    "createdAt": "2023-06-15T00:00:00.000Z"
  }
  ```

#### Update Listing (Host Only)
- **Endpoint**: `PUT /api/listings/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "price": 275,
    "amenities": ["Pool", "WiFi", "AC", "Parking", "Gym"]
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Listing updated",
    "listing": {
      // Updated listing object
    }
  }
  ```

#### Delete Listing (Host Only)
- **Endpoint**: `DELETE /api/listings/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "message": "Listing deleted successfully"
  }
  ```

#### Get Host's Listings
- **Endpoint**: `GET /api/listings/my-listings`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  [
    {
      "_id": "listing-1",
      "title": "Listing 1",
      "price": 100
    },
    {
      "_id": "listing-2",
      "title": "Listing 2",
      "price": 150
    }
  ]
  ```

---

### 4. Bookings

#### Create Booking
- **Endpoint**: `POST /api/bookings`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "listingId": "listing-id",
    "checkIn": "2023-12-15",
    "checkOut": "2023-12-20"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "_id": "booking-id",
    "listingId": "listing-id",
    "userId": "user-id",
    "checkIn": "2023-12-15T00:00:00.000Z",
    "checkOut": "2023-12-20T00:00:00.000Z",
    "status": "confirmed",
    "createdAt": "2023-06-15T10:00:00.000Z"
  }
  ```

#### Get User's Bookings
- **Endpoint**: `GET /api/bookings/my-bookings`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  [
    {
      "_id": "booking-1",
      "listingId": {
        "_id": "listing-1",
        "title": "Cozy Apartment",
        "price": 100,
        "images": ["img1.jpg"]
      },
      "checkIn": "2023-12-15T00:00:00.000Z",
      "checkOut": "2023-12-20T00:00:00.000Z",
      "status": "confirmed"
    }
  ]
  ```

#### Get Booking by ID
- **Endpoint**: `GET /api/bookings/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "_id": "booking-id",
    "listingId": {
      "_id": "listing-1",
      "title": "Cozy Apartment",
      "description": "Beautiful apartment...",
      "price": 100,
      "location": "New York, USA",
      "images": ["img1.jpg"]
    },
    "userId": "user-id",
    "checkIn": "2023-12-15T00:00:00.000Z",
    "checkOut": "2023-12-20T00:00:00.000Z",
    "status": "confirmed",
    "createdAt": "2023-06-15T10:00:00.000Z"
  }
  ```

#### Update Booking
- **Endpoint**: `PUT /api/bookings/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "checkIn": "2023-12-16",
    "checkOut": "2023-12-21"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Booking updated",
    "booking": {
      // Updated booking object
    }
  }
  ```

#### Cancel Booking
- **Endpoint**: `DELETE /api/bookings/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "message": "Booking cancelled successfully"
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

## Rate Limiting
- 100 requests per 15 minutes per IP address

## Version
v1.0.0
