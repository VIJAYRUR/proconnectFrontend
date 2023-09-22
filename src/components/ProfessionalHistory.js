import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faGraduationCap,
  faCode,
  faMessage,
  faClock,
  faEnvelope,
  faCalendar
} from "@fortawesome/free-solid-svg-icons"; // Import the icons you need

const cardHoverStyles = {
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
};

const ProfessionalHistory = () => {
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    // Fetch feedback history for the professional here
    const fetchFeedbackHistory = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/professional_history",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

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
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackHistory();
  }, []);

  return (
    <div className="container mt-2">
      <h2 className="mb-4" style={{ marginTop: "5%" }}>
        Feedback History
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : feedbackHistory.length === 0 ? (
        <div className="alert alert-danger">No feedback history found.</div>
      ) : (
        <div className="row">
          {feedbackHistory.map((feedback, index) => (
            <div
              key={index}
              className="col-md-4 mb-4"
              onMouseEnter={() => setHoveredCardId(index)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div
                className={`card ${
                  hoveredCardId === index ? "hovered-card" : ""
                }`}
                style={hoveredCardId === index ? cardHoverStyles : {}}
              >
                <div className="card-body">
                  
                  <p>
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />{" "}
                    <strong>Date:</strong> {feedback.date}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faClock} className="mr-2" />{" "}
                    <strong>Time:</strong> {feedback.time}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{" "}
                    <strong>Student Email:</strong> {feedback.student_email}
                  </p>
                  
                  <p>
                    <FontAwesomeIcon icon={faMessage} className="mr-2" />{" "}
                    <strong>Messsage:</strong> {feedback.message}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalHistory;
