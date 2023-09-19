import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveStudents = () => {
  const navigate = useNavigate();
  const [activeRequest, setActiveRequest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActiveRequest = async () => {
      try {
        const response = await fetch("/user/active_requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        // console.log(response.json);
        if (!response.ok) {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        } else {
          const data = await response.json();
          console.log(data);
          if (Array.isArray(data) && data.length === 1) {
            setActiveRequest(data[0]); // Assuming there's only one active request
          } else {
            setActiveRequest(null);
          }
        }
      } catch (error) {
        setError("Network error. Please try again later." + error);
      }
    };

    fetchActiveRequest();
  }, []);

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch("/user/delete_active_request", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      if (response.ok) {
        // Request successfully deleted
        setActiveRequest(null); // Clear activeRequest state
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      }
    } catch (error) {
      setError("Network error. Please try again later." + error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Active Request</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {activeRequest ? (
        <div className="card mt-3">
          <div className="card-body">
            <div>
              <strong>Skills:</strong>{" "}
              {activeRequest.skills_to_be_questioned
                ? activeRequest.skills_to_be_questioned.join(", ")
                : ""}
            </div>
            <div>
              <strong>Depth of Knowledge:</strong>{" "}
              {activeRequest.depth_of_knowledge}
            </div>
            <div>
              <strong>Company Target:</strong> {activeRequest.company_target}
            </div>
            <div>
              <strong>Origin Target:</strong> {activeRequest.origin_target}
            </div>
            <button
              className="btn btn-danger mt-3"
              onClick={handleDeleteRequest}
            >
              Delete Request
            </button>
          </div>
        </div>
      ) : (
        <p>No active request found.</p>
      )}
    </div>
  );
};

export default ActiveStudents;
