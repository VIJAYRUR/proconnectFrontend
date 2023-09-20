import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import FrontPage from "./components/FrontPage";
import About from "./components/About";
import Features from "./components/Features";
import Working from "./components/Working";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentProfile from "./components/StudentProfile";
import ScheduledStudent from "./components/ScheduledStudent";
import MakeRequest from "./components/MakeRequest";
import StudentReview from "./components/StudentReview";
import CreateESP from "./components/CreateESP";
import ActiveStudents from "./components/ActiveStudents";
import Report from "./components/Report";
import ProfessionalProfile from "./components/ProfessionalProfile";
import MatchRequest from "./components/MatchRequest";
import EditProfessionalProfile from "./components/EditProfessionalProfile";
import ScheduledProfessional from "./components/ScheduledProfessional";
import ProfessionalHistory from "./components/ProfessionalHistory";
function App() {
  const [activeButton, setActiveButton] = useState("scheduled");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <Router>
      <div>
        <div><Navbar /></div>
        {localStorage.getItem("role") === "student" && (window.location.pathname==="/ScheduledStudent" || window.location.pathname==="/scheduledStudent"||window.location.pathname==="/studentReview"||window.location.pathname==="/ActiveStudents"||window.location.pathname==="/makeRequest" ) && (
          <div style={{marginTop:"8%"}}>


            <div
              className="btn-group-lg"
              role="group"
              aria-label="Basic example"
              style={{
                backgroundColor: "transparent", // Background color for the entire menu
                overflow: "hidden",
                display: "flex",
                borderRadius: "10px", // Rounded corners for the menu
              }}
            >
              <Link
                to="/ScheduledStudent"
                onClick={() => handleButtonClick("scheduled")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "scheduled" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "scheduled" ? "#4455a4" : "white", // Blue background when clicked
                  color: activeButton === "scheduled" ? "white" : "#4455a4",
                  fontSize: "15px",
                  paddingLeft: "10px",
                  borderLeft: "0.25rem",
                  fontWeight: "bold",
                  marginLeft: "50px",
                }}
              >
                Scheduled Interviews
              </Link>
              <Link
                to="/makeRequest"
                onClick={() => handleButtonClick("schedule")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "schedule" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "schedule" ? "#4455a4" : "white",
                  color: activeButton === "schedule" ? "white" : "#4455a4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Schedule Interview
              </Link>
              <Link
                to="/studentReview"
                onClick={() => handleButtonClick("review")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "review" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "review" ? "#4455a4" : "white",
                  color: activeButton === "review" ? "white" : "#4455a4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Review
              </Link>
              <Link
                to="/ActiveStudents"
                onClick={() => handleButtonClick("view")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "view" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "view" ? "#4455a4" : "white",
                  color: activeButton === "view" ? "white" : "#4455a4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                View Request
              </Link>
            </div>
          </div>
        )}
        {localStorage.getItem("role") === "professional" && (window.location.pathname==="/ScheduledProfessional"||window.location.pathname==="/scheduledProfessional" ||window.location.pathname==="/MatchRequest"||window.location.pathname==="/matchRequest"||window.location.pathname==="/ProfessionalHistory") && (
          <div style={{marginTop:"8%"}}>
            <div
              className="btn-group-lg"
              role="group"
              aria-label="Basic example"
              style={{
                backgroundColor: "transparent", // Background color for the entire menu
                overflow: "hidden",
                display: "flex",
                borderRadius: "10px", // Rounded corners for the menu
              }}
            >
              <Link
                to="/scheduledProfessional"
                onClick={() => handleButtonClick("scheduled")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "scheduled" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "scheduled" ? "#4455a4" : "white", // Blue background when clicked
                  color: activeButton === "scheduled" ? "white" : "#4455a4",
                  fontSize: "15px",
                  paddingLeft: "10px",
                  borderLeft: "0.25rem",
                  fontWeight: "bold",
                  marginLeft: "50px",
                }}
              >
                Scheduled Interviews
              </Link>
              <Link
                to="/matchRequest"
                onClick={() => handleButtonClick("schedule")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "schedule" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "schedule" ? "#4455a4" : "white",
                  color: activeButton === "schedule" ? "white" : "#4455a4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Match Request
              </Link>
              <Link
                to="/ProfessionalHistory"
                onClick={() => handleButtonClick("view")}
                className={`btn btn-primary border-0 rounded-pill ${
                  activeButton === "view" ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    activeButton === "view" ? "#4455a4" : "white",
                  color: activeButton === "view" ? "white" : "#4455a4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                History
              </Link>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/working" element={<Working />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route
            path="/ProfessionalProfile"
            element={<ProfessionalProfile />}
          />
          <Route path="/editstudentprofile" element={<CreateESP />} />
          <Route path="/scheduledstudent" element={<ScheduledStudent />} />
          <Route path="/makeRequest" element={<MakeRequest />} />
          <Route path="/StudentReview" element={<StudentReview />} />
          <Route path="/ActiveStudents" element={<ActiveStudents />} />
          <Route path="/report" element={<Report />} />
          <Route path="/MatchRequest" element={<MatchRequest />} />
          <Route
            path="/ScheduledProfessional"
            element={<ScheduledProfessional />}
          />
          <Route
            path="/ProfessionalHistory"
            element={<ProfessionalHistory />}
          />
          <Route
            path="/EditProfessionalProfile"
            element={<EditProfessionalProfile />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
