# 🏡 Airbnb Clone - Full Stack Web Application

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-success?style=for-the-badge&logo=vercel)](https://airbnb-clone-vvuj.onrender.com)

---

## 📸 Preview

<img width="1896" height="863" alt="Screenshot 2026-04-01 204245" src="https://github.com/user-attachments/assets/85975292-300b-4fca-a728-ef46fe2f5a15" />

---

## 📌 Overview

This is a **full-stack Airbnb Clone** web application built using the **MERN stack (MongoDB, Express, Node.js)** with server-side rendering using **EJS**.

Users can explore listings, create their own listings, leave reviews, and experience a complete rental platform similar to Airbnb.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Signup & Login
- Secure authentication using Passport.js
- Session-based login system
- Only owners can edit/delete their listings

### 🏡 Listings
- Create, Edit, Delete Listings
- Upload listing images
- View all listings
- View individual listing details

### ⭐ Reviews
- Add reviews to listings
- Delete reviews
- Linked with users

### 📍 Map Integration
- Location-based listings with coordinates
- Map display for each listing

### 💰 Tax Toggle
- Dynamic price calculation including taxes

### 🧾 Session Management
- MongoDB session store using connect-mongo

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap (UI Styling)

### Authentication
- Passport.js
- express-session

### Deployment
- Render (Backend Hosting)
- MongoDB Atlas (Cloud Database)

---

## ⚙️ Environment Variables

Create a `.env` file and add:

ATLASDB_URL=your_mongodb_connection_string

SESSION_SECRET=your_secret_key


---

## 🚀 Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/AIRbnb-Clone-FULL-STACK-.git

cd AIRbnb-Clone-FULL-STACK-

### 2. Install dependencies

npm install

### 3. Add environment variables

Create `.env` file as mentioned above

### 4. Run the app

node app.js

App will run on:

http://localhost:3000

## 📂 Project Structure

* 📁 **`models/`** — Database schemas
* 📁 **`routes/`** — Express routes
* 📁 **`views/`** — EJS templates
* 📁 **`public/`** — Static assets (CSS, JS, images)
* 📁 **`init/`** — Seed data for database initialization
* 📄 **`app.js`** — Application entry point
* ⚙️ **`package.json`** — Project metadata and dependencies


---

## 🔥 Key Learnings

- Full-stack application architecture
- MongoDB relationships & population
- Authentication using Passport.js
- Session handling with cookies
- Deployment using Render
- Debugging real-world backend issues

---

## 🌟 Future Improvements

- 💳 Payment Integration (Stripe / Razorpay)
- 📅 Complete Booking System (date selection, availability check, reservations)
- 🔍 Advanced Search & Filtering (price range, location, category)
- 🧠 Recommendation System (suggest listings based on user behavior)
- 📊 Admin Dashboard (manage users, listings, analytics)
- 🔔 Notifications System (booking confirmations, alerts)
- 🧾 Booking History & User Profile Dashboard

---

## 🙌 Acknowledgements

Inspired by Airbnb UI/UX and built as a full-stack learning project.

---

## 💪 Author

** Venkata Bhuvan Kosuru**

---

## ⭐ If you like this project

Please Give it a ⭐
