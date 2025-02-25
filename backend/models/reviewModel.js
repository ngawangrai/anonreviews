const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getAllReviews = async () => {
  const result = await pool.query(
    "SELECT id, content, rating, created_at FROM reviews ORDER BY created_at DESC"
  );
  return result.rows;
};

const createReview = async (content, rating) => {
  const result = await pool.query(
    "INSERT INTO reviews (content, rating, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [content, rating]
  );
  return result.rows[0];
};

module.exports = {
  getAllReviews,
  createReview,
};
