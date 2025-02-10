const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();
app.use(rateLimiter);

app.get("/", (req, res) => {
    res.send("Hello, this is a rate-limited API!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
