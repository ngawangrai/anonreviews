import React, { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import "animate.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  // API endpoint (configured via environment variable during build)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newReview, rating }),
      });
      if (res.ok) {
        setNewReview("");
        fetchReviews();
      } else {
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div
      className="bg-white animate__animated animate__fadeIn"
      style={{ minHeight: "100vh" }}
    >
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-4">
              <h1 className="fw-light display-4" style={{ color: "#333" }}>
                Anonymous Reviews
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review.."
                  required
                  rows="4"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                />
              </div>
              <div className="mb-3 d-flex align-items-center">
                <label className="me-2" style={{ fontSize: "1rem" }}>
                  Rating:
                </label>
                <select
                  className="form-select w-auto"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 shadow-sm"
                style={{
                  transition: "transform 0.2s",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Submit Review
              </button>
            </form>
            <div>
              <h2
                className="fw-light border-bottom pb-2 mb-3"
                style={{ fontSize: "1.75rem", color: "#333" }}
              >
                Recent Reviews
              </h2>
              {reviews.length === 0 ? (
                <p className="text-center text-muted">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-bottom py-3 animate__animated animate__fadeInUp"
                  >
                    <p
                      className="mb-1"
                      style={{ fontSize: "1rem", lineHeight: "1.5" }}
                    >
                      {review.content}
                    </p>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <FiStar className="me-1" /> {review.rating} |{" "}
                      {new Date(review.created_at).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
