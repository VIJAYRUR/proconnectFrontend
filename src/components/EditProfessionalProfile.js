import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProfessionalProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  // Initialize state for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [universityname, setUniversityName] = useState("");
  const [yearsofexperience, setYearsOfExperience] = useState("");
  const [currentlyworking, setCurrentlyWorking] = useState("");
  const [currentrole, setCurrentRole] = useState("");
  const [origin, setOrigin] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/user/view_professional_profile", {
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
          setSkills(data && data.skills ? data.skills.join(", ") : "");
          setUniversityName(data ? data.universityname : "");
          setYearsOfExperience(data ? data.yearsofexperience : "");
          setCurrentlyWorking(data ? data.currentlyworking : "");
          setCurrentRole(data ? data.currentrole : "");
          setOrigin(data ? data.origin : "");
          setLinkedin(data ? data.linkedin : "");
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

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleUniversityNameChange = (event) => {
    setUniversityName(event.target.value);
  };

  const handleYearsOfExperienceChange = (event) => {
    setYearsOfExperience(event.target.value);
  };

  const handleCurrentlyWorkingChange = (event) => {
    setCurrentlyWorking(event.target.value);
  };

  const handleCurrentRoleChange = (event) => {
    setCurrentRole(event.target.value);
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleLinkedinChange = (event) => {
    setLinkedin(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skillsArray = skills.split(",");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/user/make_professional_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          username,
          email,
          skills: skillsArray,
          universityname: universityname,
          yearsofexperience,
          currentlyworking,
          currentrole,
          origin,
          linkedin,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Profile Data Saved:", data);
        // Handle success, e.g., show a success message to the user.
        navigate("/professionalProfile");
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
              <b>Edit Professional Profile</b>
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
                <div className="form-group">
                  <label>Skills:</label>
                  <textarea
                    className="form-control"
                    value={skills}
                    onChange={handleSkillsChange}
                  />
                </div>
                <div className="form-group">
                  <label>University Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={universityname}
                    onChange={handleUniversityNameChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Years of Experience:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={yearsofexperience}
                      onChange={handleYearsOfExperienceChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Currently Working:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentlyworking}
                      onChange={handleCurrentlyWorkingChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Current Role:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentrole}
                      onChange={handleCurrentRoleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Origin:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={origin}
                      onChange={handleOriginChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>LinkedIn:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={linkedin}
                    onChange={handleLinkedinChange}
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

export default EditProfessionalProfile;
