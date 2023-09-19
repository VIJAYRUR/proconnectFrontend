import React, { useState, useEffect } from "react";

const ProfessionalHistory = () => {
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  useEffect(() => {
    // Fetch feedback history for the professional here
    const fetchFeedbackHistory = async () => {
      try {
        const response = await fetch("/user/professional_history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbackHistory(data);
        } else {
          console.error(
            "Error fetching feedback history:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchFeedbackHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Feedback History</h2>
      {feedbackHistory.length === 0 ? (
        <p>No feedback history found.</p>
      ) : (
        <ul className="list-group">
          {feedbackHistory.map((feedback, index) => (
            <li key={index} className="list-group-item">
              <p>
                Interview with <strong>{feedback.student_name}</strong>
              </p>
              <p>Message: {feedback.message}</p>
              <p>Date: {feedback.date}</p>
              <p>Time: {feedback.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfessionalHistory;
