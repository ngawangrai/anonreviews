const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all origins (or restrict to your frontend origin)
// Apply CORS middleware early
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Mount routes for reviews
app.use("/reviews", reviewRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
