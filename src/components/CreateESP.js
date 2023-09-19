import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const CreateESP = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  // Initialize state for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [universityCourse, setUniversityCourse] = useState("");
  const [universityCGPA, setUniversityCGPA] = useState("");
  const [passoutDate, setPassoutDate] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://proconnect-backend.onrender.com/user/view_student_profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response || response === undefined || response === null) {
          setError("Make your profile");
        }

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setUsername(data ? data.username : "");
          setEmail(data ? data.email : "");
          setUniversity(data ? data.university : "");
          setUniversityCourse(data ? data.universitycourse : "");
          setUniversityCGPA(data ? data.universitycgpa : "");
          setPassoutDate(data ? data.passoutdate : "");
          setSkills(data && data.skills ? data.skills.join(", ") : "");
        } else {
          setError("Error fetching profile data");
        }
      } catch (error) {
        setError("Network error");
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchProfileData();
  }, []);

  // Check if user is not authenticated and redirect to the login page
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
  };

  const handleUniversityCourseChange = (event) => {
    setUniversityCourse(event.target.value);
  };

  const handleUniversityCGPAChange = (event) => {
    setUniversityCGPA(event.target.value);
  };

  const handlePassoutDateChange = (event) => {
    setPassoutDate(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skills_array = skills.split(",");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://proconnect-backend.onrender.com/user/make_student_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          username,
          university,
          universitycourse: universityCourse,
          universitycgpa: universityCGPA,
          passoutdate: passoutDate,
          skills: skills_array,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Profile Data Saved:", data);
        // Handle success, e.g., show a success message to the user.
        navigate("/studentProfile");
      } else {
        const errorData = await response.json();
        console.error("Error Saving Profile Data:", errorData.message);
        // Handle the error, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors, e.g., show a network error message.
    }
  };

  // Conditional rendering based on isLoading
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <b>Student Profile</b>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>University:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={university}
                      onChange={handleUniversityChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>University Course:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={universityCourse}
                      onChange={handleUniversityCourseChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>University CGPA:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={universityCGPA}
                      onChange={handleUniversityCGPAChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Passout Date:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={passoutDate}
                      onChange={handlePassoutDateChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Skills:</label>
                  <textarea
                    className="form-control"
                    value={skills}
                    onChange={handleSkillsChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateESP;
