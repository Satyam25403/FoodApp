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

## 🛠️ Tech Stack

| Layer         | Technology            |
|-------------- |-----------------------|
| **Frontend**  | React.js, Vite, CSS   |
| **Backend**   | Node.js, Express.js   |
| **Database**  | MongoDB (Mongoose)    |
| **Admin**     | React.js, TailwindCSS |
| **Others**    | JWT, Axios            |

---

## 📂 Folder Structure

    food-delivery-app/
    │
    ├── frontend/   # Customer-facing UI (React + Vite)
    ├── backend/    # API & business logic (Node + Express)
    └── admin/      # Admin dashboard (React)

---

## 💳 Test Payment Instructions

When testing the checkout flow in development mode, you can use the following **dummy credit card details** (Stripe test mode):

- **Card Number:** `4242 4242 4242 4242`  
- **Expiry Date:** Any future date (e.g., `12/34`)  
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

- If frontends cannot reach the backend: check backend `PORT`.
- MongoDB connection errors: verify `MONGO_URI` and that MongoDB is reachable.
- CORS errors: ensure backend sets proper CORS headers for frontend/admin origins.
- Port conflicts: change `PORT` in `backend/.env` or run frontends on different ports.

---

## 🧪 Testing

- Unit & integration tests (if included) should live inside each package (`frontend`, `backend`, `admin`) under `tests/`.
- Run `npm test` inside the corresponding folder if tests are configured.

---


