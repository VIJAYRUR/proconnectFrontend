import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faGraduationCap,
  faCode,
  faClock,
  faEnvelope,
  faCalendar
} from "@fortawesome/free-solid-svg-icons"; // Import the icons you need

const cardHoverStyles = {
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
};

const ScheduledStudent = () => {
  const [scheduledRequest, setScheduledRequest] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const fetchScheduledRequest = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/view_student_schedule",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
        } else {
          const data = await response.json();
          setScheduledRequest(data);
        }
      } catch (error) {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduledRequest();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Scheduled Requests
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error || !scheduledRequest ? (
        <div className="alert alert-danger">No scheduled Requests</div>
      ) : scheduledRequest.length === 0 ? (
        <p>No scheduled requests found.</p>
      ) : (
        <div className="row">
          {scheduledRequest[0].map((request, index) => (
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
                  <h5 className="card-title">Scheduled Request <i>{index+1}</i></h5>
                  <p>
                    <marquee>
                      <strong>Date: </strong>
                      {request.date}, <strong>Time:</strong> {request.time}
                    </marquee>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{" "}
                    <strong>Interviewer Email:</strong> {request.interviewer_email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faUniversity} className="mr-2" />{" "}
                    <strong>Interviewer Company:</strong> {request.interviewer_company}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />{" "}
                    <strong>Interviewer Role:</strong> {request.interviewer_role}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCode} className="mr-2" />{" "}
                    <strong>Interviewer Experience:</strong>{" "}
                    {request.interviewer_experience}
                  </p>
                  <p>
                    <i>Make further communication with Interviewer by email</i>
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

export default ScheduledStudent;