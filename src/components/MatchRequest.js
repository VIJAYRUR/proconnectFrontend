import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a new component to render individual request cards
const RequestCard = ({ request, onConnectClick }) => {
  const percentage = request[0];
  const userData = request[1];

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{userData.username}'s Request</h5>
          <div>
            <i>profile match: {percentage % 100}%</i>
          </div>
          <br></br>
          {/* Rest of your card content */}
          <p>university: {userData.university}</p>
          <p>course: {userData.course}</p>
          <p>CGPA: {userData.CGPA}</p>
          <p>passoutdate: {userData.passoutdate}</p>
          <p>
            Skills to be questioned :{" "}
            {userData.skills_to_be_questioned.join(",")}
          </p>
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#scheduleInterviewModal"
            onClick={() => onConnectClick(userData)}
          >
            Connect
          </button>
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
        const response = await fetch("/user/view_all_request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRequests(data[0]); // Extract the requests from the response
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
      const response = await fetch("/user/match_to_request", {
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
      });
      console.log(response);
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
      <h2 className="mb-4">Active Requests</h2>
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
