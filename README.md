

# 🏨 Stay Finder - Full Stack Booking Platform

A full-featured stay booking platform built with **Next.js** for the frontend and **Node.js** for the backend. The app includes user authentication, property listings, detailed profiles, and booking functionality.

> Developed by [Abhishek Gurjar](https://github.com/abhishekboadgurjar)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Overview

Stay Finder is a modern and responsive web application that allows users to browse, list, and book properties. It features user authentication, profile management, property posting, and a seamless booking experience.

---

## ✅ Features

### 🌐 Frontend (Next.js)
- Responsive UI with Tailwind CSS (or your preferred CSS framework)
- Authentication flow (Sign Up / Login)
- Browse property listings
- Filter/search stays
- User dashboard to manage bookings and listings

### 🖥️ Backend (Node.js, Express.js)
- JWT Authentication
- RESTful APIs for bookings, users, and listings
- MongoDB database integration
- Middleware for authorization and error handling

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS (or CSS Modules)
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB with Mongoose
- **API Client:** Axios or Fetch API
- **Deployment:** Vercel (frontend), Render/Heroku (backend)

---

## 📁 Project Structure

```

stay-finder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── styles/
│   └── next.config.js
└── README.md

````

---

## ⚙️ Installation

### 📦 Prerequisites
- Node.js
- MongoDB Atlas or local instance
- Vercel CLI (optional for deployment)

### 🔧 Frontend Setup

```bash
cd frontend
npm install
npm run dev
````

### 🔧 Backend Setup

```bash
cd backend
npm install
node server.js
```

---

## 🔐 Environment Variables

Create `.env` files in both `frontend` and `backend` directories.

### 🗂️ Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 🗂️ Frontend `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🧪 Usage

1. Visit the frontend at `http://localhost:3000`
2. Register or log in as a user
3. Browse available stays
4. Book a stay and manage your profile

---

## 🔌 API Endpoints

### 🧑 Auth

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `GET /api/auth/profile` – Get current user

### 🏠 Listings

* `GET /api/listings` – Get all listings
* `POST /api/listings` – Create a new listing
* `GET /api/listings/:id` – Get listing by ID
* `DELETE /api/listings/:id` – Delete listing

### 📅 Bookings

* `POST /api/bookings` – Book a listing
* `GET /api/bookings/user/:userId` – Get user’s bookings

---

## 📸 Screenshots

> Add your app screenshots or GIFs here

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch `git checkout -b feature/awesome-feature`
3. Commit your changes `git commit -m "Add some feature"`
4. Push to the branch `git push origin feature/awesome-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Made with ❤️ by **Abhishek Gurjar**
GitHub: [@abhishekboadgurjar](https://github.com/abhishekboadgurjar)
