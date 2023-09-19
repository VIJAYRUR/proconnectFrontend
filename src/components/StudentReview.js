import React, { useEffect, useState } from "react";

const StudentReview = () => {
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        const response = await fetch("https://proconnect-backend.onrender.com/user/student_history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
        } else {
          const data = await response.json();
          setFeedbackHistory(data);
        }
      } catch (error) {
        setError("Network error. Please try again later.");
      }
    };

    fetchFeedbackHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Feedback History</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {feedbackHistory.length > 0 ? (
        feedbackHistory.map((feedback, index) => (
          <div className="card mt-3" key={index}>
            <div className="card-body">
              <div>
                <strong>Date:</strong> {feedback.date}
              </div>
              <div>
                <strong>Time:</strong> {feedback.time}
              </div>
              <div>
                <strong>Interviewer Name:</strong> {feedback.interviewer_name}
              </div>
              <div>
                <strong>Interviewer Email:</strong> {feedback.interviewer_email}
              </div>
              <div>
                <strong>Student Name:</strong> {feedback.student_name}
              </div>
              <div>
                <strong>Student Email:</strong> {feedback.student_email}
              </div>
              <div>
                <strong>Feedback:</strong> {feedback.message}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No feedback history found.</p>
      )}
    </div>
  );
};

export default StudentReview;
