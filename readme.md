
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
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Run the Server Locally  
```sh
node server.js
```

### 4️⃣ Build the Docker Image  
```sh
docker build -t rate-limiter .
```

### 5️⃣ Run the Docker Container  
```sh
docker run -p 3000:3000 rate-limiter
```

### 6️⃣ Test the Rate Limiter  
```sh
curl http://localhost:3000
curl http://localhost:3000
curl http://localhost:3000
curl http://localhost:3000  # This should return a "Too many requests" error
```

### 7️⃣ Stop the Running Container  
```sh
docker ps
docker stop <container_id>
```

### 8️⃣ Push Changes to GitHub  
```sh
git add .
git commit -m "Added rate limiter middleware"
git push origin main
```

---

## 📜 Understanding `rateLimiter.js`  

The `rateLimiter.js` file contains the middleware logic for limiting requests using a **Sliding Window Algorithm**.

### 📌 How It Works:
1. It stores request timestamps **per IP** in memory.
2. Requests older than the **10-second window** are removed.
3. If a client exceeds **3 requests within 10 seconds**, they get a `429 Too Many Requests` response.
4. Otherwise, the request is allowed to proceed.

### 📝 Code Explanation:
```js
const rateLimit = {};  // Stores request timestamps per IP
const WINDOW_SIZE_IN_MS = 10000; // 10 seconds
const MAX_REQUESTS = 3;  // Maximum allowed requests per window

const rateLimiter = (req, res, next) => {
    const clientIp = req.ip;
    const currentTime = Date.now();

    if (!rateLimit[clientIp]) {
        rateLimit[clientIp] = [];
    }

    // Remove old timestamps outside the window
    rateLimit[clientIp] = rateLimit[clientIp].filter(timestamp => currentTime - timestamp < WINDOW_SIZE_IN_MS);

    if (rateLimit[clientIp].length >= MAX_REQUESTS) {
        return res.status(429).json({ message: "Too many requests. Please wait." });
    }

    rateLimit[clientIp].push(currentTime);
    next();
};

module.exports = rateLimiter;
```

### ✅ Example Scenario:
| Request | Time | Allowed? |
|---------|------|---------|
| 1st | 0s  | ✅ Yes |
| 2nd | 2s  | ✅ Yes |
| 3rd | 5s  | ✅ Yes |
| 4th | 6s  | ❌ No (429 Too Many Requests) |
| 5th | 11s | ✅ Yes (Old requests expired) |

This ensures fair usage and prevents abuse of the API.

---

Now your **README.md** fully explains how the rate limiter works! Let me know if you need more edits. 🚀