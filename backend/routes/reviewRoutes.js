const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// GET /reviews - Retrieve all reviews
router.get("/", reviewController.getReviews);

// POST /reviews - Submit a new review
router.post("/", reviewController.postReview);

module.exports = router;
