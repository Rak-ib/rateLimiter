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
