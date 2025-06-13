# StayFinder API

StayFinder is a RESTful API for a property booking platform that allows users to search for accommodations, view property details, and make bookings. Hosts can list their properties and manage their listings.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
    - [Register User](#register-user)
    - [Login](#login)
  - [Listings](#listings)
    - [Get All Listings](#get-all-listings)
    - [Get Single Listing](#get-single-listing)
    - [Create Listing](#create-listing)
    - [Update Listing](#update-listing)
    - [Delete Listing](#delete-listing)
  - [Bookings](#bookings)
    - [Create Booking](#create-booking)
- [Models](#models)
  - [User](#user)
  - [Listing](#listing)
  - [Booking](#booking)

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT (JSON Web Tokens). Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## API Endpoints

### Auth

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "isHost": false
}
```

**Response:**
```json
{
  "message": "User registered"
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "isHost": false
  }
}
```

### Listings

#### Get All Listings
```http
GET /api/listings
```

**Query Parameters:**
- `location` (optional): Filter by location (case-insensitive)
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price

**Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Cozy Apartment",
    "description": "A beautiful apartment in the city center",
    "location": "New York, NY",
    "price": 120,
    "hostId": "60d21b4667d0d8992e610c85",
    "bookedDates": [],
    "createdAt": "2023-06-13T13:20:06.123Z",
    "updatedAt": "2023-06-13T13:20:06.123Z"
  }
]
```

#### Get Single Listing
```http
GET /api/listings/:id
```

**Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "title": "Cozy Apartment",
  "description": "A beautiful apartment in the city center",
  "location": "New York, NY",
  "price": 120,
  "hostId": "60d21b4667d0d8992e610c85",
  "bookedDates": [],
  "createdAt": "2023-06-13T13:20:06.123Z",
  "updatedAt": "2023-06-13T13:20:06.123Z"
}
```

#### Create Listing
*Requires authentication and host privileges*

```http
POST /api/listings
```

**Request Body:**
```json
{
  "title": "Beachfront Villa",
  "description": "Luxury villa with ocean view",
  "location": "Miami, FL",
  "price": 350,
  "amenities": ["Pool", "WiFi", "Kitchen"]
}
```

**Response (201 Created):**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "title": "Beachfront Villa",
  "description": "Luxury villa with ocean view",
  "location": "Miami, FL",
  "price": 350,
  "hostId": "60d21b4667d0d8992e610c85",
  "amenities": ["Pool", "WiFi", "Kitchen"],
  "bookedDates": [],
  "createdAt": "2023-06-13T13:25:30.456Z",
  "updatedAt": "2023-06-13T13:25:30.456Z"
}
```

#### Update Listing
*Requires authentication and ownership of the listing*

```http
PUT /api/listings/:id
```

**Request Body:**
```json
{
  "price": 300
}
```

**Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "title": "Beachfront Villa",
  "description": "Luxury villa with ocean view",
  "location": "Miami, FL",
  "price": 300,
  "hostId": "60d21b4667d0d8992e610c85",
  "amenities": ["Pool", "WiFi", "Kitchen"],
  "bookedDates": [],
  "createdAt": "2023-06-13T13:25:30.456Z",
  "updatedAt": "2023-06-13T13:30:45.789Z"
}
```

#### Delete Listing
*Requires authentication and ownership of the listing*

```http
DELETE /api/listings/:id
```

**Response:**
```json
{
  "message": "Deleted"
}
```

### Bookings

#### Create Booking
*Requires authentication*

```http
POST /api/bookings
```

**Request Body:**
```json
{
  "listingId": "60d21b4667d0d8992e610c87",
  "checkIn": "2023-07-15",
  "checkOut": "2023-07-20"
}
```

**Response (201 Created):**
```json
{
  "message": "Booking confirmed",
  "booking": {
    "_id": "60d21b4667d0d8992e610c88",
    "listingId": "60d21b4667d0d8992e610c87",
    "userId": "60d21b4667d0d8992e610c85",
    "checkIn": "2023-07-15T00:00:00.000Z",
    "checkOut": "2023-07-20T00:00:00.000Z",
    "createdAt": "2023-06-13T13:35:20.123Z",
    "updatedAt": "2023-06-13T13:35:20.123Z"
  }
}
```

## Models

### User
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHost: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Listing
```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amenities: [{ type: String }],
  bookedDates: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Booking
```javascript
{
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Only hosts can add listings"
}
```

### 404 Not Found
```json
{
  "message": "Listing not found"
}
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start the server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`
