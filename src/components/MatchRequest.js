import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faGraduationCap,
  faEnvelope,
  faFileAlt,
  faMoneyCheckAlt,
  faBrain,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const cardHoverStyles = {
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
};

const RequestCard = ({ request, onConnectClick }) => {
  const percentage = request[0];
  const userData = request[1];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="col-md-4 mb-2">
      <div
        className={`card card-cascade request-card ${
          isHovered ? "hovered" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-body card-body-cascade text-center">
          <h4 className="card-title">
            <strong>{userData.username}</strong>
          </h4>
          <br></br>
          <ul className="list-group">
            <li className="list-group-item">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <strong>Email:</strong> {userData.email}
            </li>
            <li className="list-group-item">
              <FontAwesomeIcon icon={faUniversity} className="mr-2" />
              <strong>University:</strong> {userData.university}
            </li>
            <li className="list-group-item">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <strong>CGPA:</strong> {userData.CGPA}
            </li>
            <li className="list-group-item">
              <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2" />
              <strong>Passout Date:</strong> {userData.passoutdate}
            </li>
            <li className="list-group-item">
              <FontAwesomeIcon icon={faCode} />{" "}
              <strong>Skills to be questioned:</strong>{" "}
              {userData.skills_to_be_questioned.join(",")}
            </li>
            <li className="list-group-item">
              <FontAwesomeIcon icon={faBrain} /> <strong>Proficiency:</strong>{" "}
              {userData.depth_of_knowledge}
            </li>
            <li className="list-group-item" style={{ fontSize: "25px" }}>
              <FontAwesomeIcon icon={faLinkedin} className="mr-3" />

              <FontAwesomeIcon icon={faTwitter} className="mr-3" />

              <FontAwesomeIcon icon={faGithub} />
            </li>
          </ul>

          <br></br>
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#scheduleInterviewModal"
            onClick={() => onConnectClick(userData)}
          >
            Connect
          </button>
        </div>

        <div className="card-footer text-muted text-center">
          {percentage}% Match
        </div>
      </div>
    </div>
  );
};

const MatchRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  useEffect(() => {
    const fetchActiveRequests = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/view_all_request",
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
          setRequests(data[0]);
        }
      } catch (error) {
        console.error("Error fetching active requests:", error);
      }
    };

    fetchActiveRequests();
  }, []);

  const handleConnectClick = (request) => {
    setSelectedRequest(request);
  };

  const handleScheduleInterview = async () => {
    try {
      const response = await fetch(
        "https://proconnect-backend.onrender.com/user/match_to_request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            studentname: selectedRequest.username || "",
            date: interviewDate,
            time: interviewTime,
          }),
        }
      );

      if (response.ok) {
        setSelectedRequest(null);
        window.location.reload();
      } else {
        console.error("Error scheduling interview:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {requests && requests.length > 0 ? (
          requests.map((request, index) => (
            <RequestCard
              key={index}
              request={request}
              onConnectClick={handleConnectClick}
            />
          ))
        ) : (
          <p>No active requests found.</p>
        )}
      </div>

      {selectedRequest && (
        <div
          className="modal fade"
          id="scheduleInterviewModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Schedule Interview</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedRequest(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  You are scheduling an interview with{" "}
                  <strong>{selectedRequest.username}</strong>. Please select a
                  date and time for the interview.
                </p>
                <p>Date:</p>
                <input
                  type="date"
                  className="form-control"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                />
                <p className="mt-3">Time:</p>
                <input
                  type="time"
                  className="form-control"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchRequests;
