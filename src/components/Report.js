import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const Report = () => {
  const [email, setEmail] = useState(""); // You can decode this from the token
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Decode the token to get user information
    if (token) {
      const decodedToken = jwt_decode(token);

      // Assuming your token payload has a "username" field
      if (decodedToken.email) {
        setEmail(decodedToken.email);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You need to implement the code to send the report via email here

    // Example code to send the report (you need to configure a mailer tool)
    const reportData = {
      email,
      subject,
      body,
      isAnonymous,
    };

    try {
      const response = await fetch("https://proconnect-backend.onrender.com/api/sendReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setMessage("Report sent successfully!");
      } else {
        setMessage("Failed to send the report. Please try again later.");
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{marginTop:"13%"}}>
      <h2 style={{textAlign:"center"}}>Report Page</h2>
          <label>Email</label>
          <input type="text" className="form-control" value={email} readOnly />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isAnonymous"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          <label className="form-check-label" htmlFor="isAnonymous">
            Send as Anonymous
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Send Message
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Report;
