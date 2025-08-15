# 🍽️ Food Delivery App – Full Stack Project

A full-stack **Food Delivery Application** with:
- **Frontend**: Customer-facing interface
- **Backend**: Node.js + Express API
- **Admin Dashboard**: Manage orders, menus, and users

---

## 🚀 Quick Start (copy & paste these commands)

> Open three terminals (or use a terminal multiplexer) — one for each service.

1) Clone repo and install base (optional if not already cloned)
    
    git clone https://github.com/Satyam25403/FoodApp.git
    cd FoodApp

### 🖥️ Terminal 1 – Frontend (Customer UI)

    cd frontend
    npm install
    npm run dev

### ⚙️ Terminal 2 – Backend (API)

    cd backend
    npm install
    npm start

### 📊 Terminal 3 – Admin Dashboard

    cd admin
    npm install
    npm run dev

---

## ✨ Features

**Frontend (Customer UI)**  
- Browse menu items  
- Add to cart & checkout  
- Track order status  

**Backend (API)**  
- RESTful endpoints for products, orders, and users  
- Authentication & Authorization (JWT)  
- Order management logic  

**Admin Dashboard**  
- Add items to existing menu  
- Manage orders  
- View customer details  
- Update order status  

---

## 💳 Test Payment Instructions

When testing the checkout flow in development mode, you can use the following **dummy credit card details** (Stripe test mode):

- **Card Number:** `4242 4242 4242 4242`  
- **Expiry Date:** Any future date (e.g., `MM/YY`)  
- **CVC:** Any 3-digit number (e.g., `123`)  

**Steps:**
1. Go to the checkout page in the app.
2. Enter the dummy card number above.
3. Enter any valid **future expiry date**.
4. Enter any **3-digit CVC**.
5. Submit to simulate a successful payment.

> ⚠️ **Note:** These details are for **testing only** and will not charge any real money.

---

## ⚙️ Environment Variables (create `.env` files)

**Backend (`backend/.env`)**
    
    MONGODB_CONNECTION_URI=your_db_connection_string
    SECRET_KEY="some_secret"
    STRIPE_SECRET_KEY="stripe_test_secret"

---

## 💡 Troubleshooting

- Don't connect to a VPN while running services....mongodb will refuse to connect
- If frontends cannot reach the backend: check backend `PORT`.
- MongoDB connection errors: verify `MONGO_URI` and that MongoDB is reachable.
- CORS errors: ensure backend sets proper CORS headers for frontend/admin origins.
- Port conflicts: change `PORT` in `backend/.env` or run frontends on different ports.

---

## 🐳 Running in Containerized Environments

## 🖥️ Frontend (Customer UI)

### bash

docker run -p 5173:5173 satyamshivam/food-app-frontend


## ⚙️ Backend (API)
If you already have a .env file on your host, you can pass all variables at once with --env-file:

### bash

docker run --env-file .env -p 4000:4000 satyamshivam/food-app-backend

or you can pass individually:

### bash

docker run \
-e MONGODB_CONNECTION_URI="mongodb_atlas_uri" \
-e SECRET_KEY="some_random_string" \
-e STRIPE_SECRET_KEY="Your_stripe_apikey" \
-p 4000:4000 \
satyamshivam/food-app-backend 

## 📊 Admin Dashboard

### bash

docker run -p 5174:5174 satyamshivam/food-app-admin
