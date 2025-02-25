const reviewModel = require("../models/reviewModel");

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postReview = async (req, res) => {
  const { content, rating } = req.body;
  if (!content || !rating) {
    return res.status(400).json({ error: "Missing review content or rating" });
  }
  try {
    const newReview = await reviewModel.createReview(content, rating);
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getReviews,
  postReview,
};
