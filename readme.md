
# 🚀 Rate Limiter (Sliding Window Algorithm)

## 📖 Introduction
A **Rate Limiter** is a mechanism used to **control the number of requests** a client can make to a server **within a specified time period**. This helps prevent **abuse, brute-force attacks, and excessive server load**.

For example, if an API allows **100 requests per minute**, and a client sends 101 requests, the last request will be **denied** until the next time window starts.

<img src="images/your_image.png" width="250" />


## 🔍 What is a Sliding Window Algorithm?
# 🔄 Sliding Window Technique

The **Sliding Window Technique** is a method used in computer science and algorithms to efficiently process data that is sequential in nature, such as a stream of numbers or a series of requests. It’s often used in scenarios where we need to track or evaluate a subset of data over a fixed range or time interval, and we want to avoid recalculating everything from scratch as the window "slides" over the data.

## 🚪 How Does it Work?

Imagine you're looking at a series of data points (for example, numbers in a list, timestamps, or requests), and you want to focus on a **subset** of these data points at any given time — this subset is called the **window**. The size of this window is fixed and can be adjusted based on the problem you’re solving.

Here’s the key idea: as the window slides over the data, **old data is removed** from the window, and **new data is added**. This allows you to focus on only the most relevant data at any given moment, which can help save computational resources.

## 🧑‍🤝‍🧑 Visualizing Sliding Window with a Real-life Example:

Let’s take a real-life scenario where you have a **sliding window of time** (say, 10 seconds) to allow only a certain number of events (requests, clicks, etc.).

### Example: Rate Limiting for API Requests

Let’s assume your API allows **up to 5 requests per 10 seconds**. The goal is to keep track of the requests and deny any request that exceeds the limit within this 10-second window.

1. Initially, no requests have been made, so the window is empty.
2. When a user sends a request, the **current time** is added to the "window" (which in this case is a list of timestamps).
3. Each time a new request comes in, we **remove timestamps** that are older than 10 seconds. This keeps the window size fixed.
4. If the number of requests within this 10-second window exceeds the limit (5 in our case), the system will **deny** any further requests and send an error like **"Too many requests"**.

This is an example of a **sliding window** because it keeps track of only the most recent **10 seconds'** worth of requests, and the window "slides" over time as new requests come in and old ones fall out.

### Simple Illustration:

Let’s visualize this with a **10-second window** that allows only **5 requests**:

- **At time 0s**: User sends the first request → ✅ **Allowed**
- **At time 2s**: User sends the second request → ✅ **Allowed**
- **At time 4s**: User sends the third request → ✅ **Allowed**
- **At time 6s**: User sends the fourth request → ✅ **Allowed**
- **At time 8s**: User sends the fifth request → ✅ **Allowed**
- **At time 10s**: The first request (made at time 0s) **falls out** of the window.
- **At time 10s**: User sends another request → ✅ **Allowed** (since the window now contains 5 requests).
- **At time 12s**: User sends another request → ❌ **Denied**, because there are already 5 requests within the window (from time 2s to 12s).

The sliding window makes it possible to continuously evaluate the requests and ensures the rate limiting stays efficient without re-checking all the requests every time.

### 📝 Example:
Imagine you have an **API limit of 5 requests per 10 seconds**.

1. A user sends **3 requests at 00:00** → ✅ **All Allowed**.
2. The user tries another request at **00:02** → ❌ **Denied** (Limit reached).
3. At **00:10**, the first request from 00:00 is removed from the count.
4. The user can now send **1 more request** before hitting the limit again.

This method ensures **continuous request handling** instead of resetting limits at fixed intervals.

## ⚙️ Features of this Rate Limiter
- Uses the **Sliding Window Algorithm** for flexible rate limiting.
- Prevents **abuse** and **DDoS attacks**.
- Can be **customized** for different APIs.

## 🏗️ Tech Stack
- **Node.js**
- **Express.js**


## 🚀 Want to do by yourself!

![create a directory](images/1.png=250px)
![Initializing the project](images/2.png=250px)
![Installing the express](images/3.png=250px)

### 1️⃣ Create `rateLimiter.js`
```sh
# Create the file
nano rateLimiter.js
```

📌 Paste the following code:

```js
const rateLimit = {};
const WINDOW_SIZE_IN_MS = 10000; // 10 seconds
const MAX_REQUESTS = 3;

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

✅ Save and exit:
- Press `CTRL + X`, then `Y`, then `ENTER`.

### 2️⃣ Create `server.js`
```sh
# Create the file
nano server.js
```

📌 Paste the following code:

```js
const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();
app.use(rateLimiter);

app.get("/", (req, res) => {
    res.send("Hello, this is a rate-limited API!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

✅ Save and exit:
- Press `CTRL + X`, then `Y`, then `ENTER`.

---

## 🚀 Step 4: Dockerize the Application

### 1️⃣ Create `Dockerfile`
```sh
# Create the file
nano Dockerfile
```

📌 Paste the following code:

```dockerfile
# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
```

✅ Save and exit:
- Press `CTRL + X`, then `Y`, then `ENTER`.

![Rate Limiter Flow](images/4.png=250px)
![Rate Limiter Flow](images/5.png=250px)

Using the following command we can test the server. Here the server can handel 3 request in a 10s time period
```sh
# Create the file
curl http://localhost:3000
```
![Rate Limiter Flow](images/6.png=250px)

Here we can see that for the first three request the output is Hello, this is a rate-limited API! but for the 4th request we can see
 the error message 



### ✅ Example Scenario:
| Request | Time | Allowed? |
|---------|------|---------|
| 1st | 0s  | ✅ Yes |
| 2nd | 2s  | ✅ Yes |
| 3rd | 5s  | ✅ Yes |
| 4th | 6s  | ❌ No (429 Too Many Requests) |
| 5th | 11s | ✅ Yes (Old requests expired) |

This ensures fair usage and prevents abuse of the API.

