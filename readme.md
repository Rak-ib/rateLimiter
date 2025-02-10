# Rate Limiter Middleware in Node.js

## 📌 Overview
This project implements a **Rate Limiter Middleware** using a **Sliding Window Algorithm** to limit client requests in a Node.js application.

## 🚀 How It Works
- Allows **3 requests per 10 seconds** per IP.
- Uses an **in-memory store** to track timestamps.
- Denies requests exceeding the limit with `429 Too Many Requests`.

## 🛠 Tech Stack
- Node.js
- Express.js
- Docker

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone <repo_url>
cd rate-limiter
