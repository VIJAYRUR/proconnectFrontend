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

  const sampleSkills = ["React", "Express", "Node", "Python", "Java"];
  const [searchedSkill, setSearchedSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");

  const handleNewAchievementChange = (event) => {
    setNewAchievement(event.target.value);
  };
  const handleAddAchievement = () => {
    if (newAchievement.trim() !== "") {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement(""); // Clear the input field
    }
  };
  const handleRemoveAchievement = (achievementToRemove) => {
    const updatedAchievements = achievements.filter(
      (achievement) => achievement !== achievementToRemove
    );
    setAchievements(updatedAchievements);
  };

  const cardStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };
  const handleSearchSkill = (event) => {
    const skillToSearch = event.target.value;
    setSearchedSkill(skillToSearch);

    // Filter the sample skills based on the search query
    const filteredSkills = sampleSkills.filter((skill) =>
      skill.toLowerCase().includes(skillToSearch.toLowerCase())
    );
    setSearchResults(filteredSkills);
  };
  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchedSkill(""); // Clear the search input
      setSearchResults([]); // Clear search results
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
    console.log(selectedSkills);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/view_student_profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
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
          setSelectedSkills(data ? data.skills : []);
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
  const fieldsetStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px",
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value.toUpperCase());
  };

  const handleUniversityCourseChange = (event) => {
    setUniversityCourse(event.target.value.toUpperCase());
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
    const skills_array = selectedSkills;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://proconnect-backend.onrender.com/user/make_student_profile",
        {
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
        }
      );

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
      <div className="row justify-content-center" style={{ marginTop: "10%" }}>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <b>Student Profile</b>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div
                  className="form-row"
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                >
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
                  <fieldset style={fieldsetStyle}>
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
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset style={fieldsetStyle}>
                    <legend>Add Skills:</legend>
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for a skill"
                          value={searchedSkill}
                          onChange={handleSearchSkill}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAddSkill(searchedSkill)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {searchedSkill && (
                        <div className="list-group skill-list">
                          {searchResults.map((skill, index) => (
                            <div
                              key={index}
                              className="list-group-item list-group-item-action"
                              onClick={() => handleAddSkill(skill)}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      )}
                      <label>Selected Skills:</label>
                      <div className="selected-skills">
                        {selectedSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-primary skill-badge"
                          >
                            {skill}
                            <span
                              className="remove-skill"
                              onClick={() => handleRemoveSkill(skill)}
                            >
                              &times;
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset style={fieldsetStyle}>
                    <legend>Add Achievements:</legend>
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter an achievement"
                          value={newAchievement}
                          onChange={handleNewAchievementChange}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddAchievement}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <label>Existing Achievements:</label>
                    <div className="existing-achievements">
                      {achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="badge badge-primary achievement-badge"
                        >
                          {achievement}
                          <span
                            className="remove-achievement"
                            onClick={() => handleRemoveAchievement(achievement)}
                          >
                            &times;
                          </span>
                        </span>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <br></br>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateESP;
