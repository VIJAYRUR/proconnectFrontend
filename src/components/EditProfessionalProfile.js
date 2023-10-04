import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGraduationCap,
  faUniversity,
  faBriefcase,
  faGlobe,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const EditProfessionalProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");
  const [history, setHistory] = useState([]);
  const [newCompany, setNewCompany] = useState("");

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

  const sampleSkills = ["React", "Express", "Node", "Python", "Java"];
  const [searchedSkill, setSearchedSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
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
  const cardStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
    console.log(selectedSkills);
  };
  const handleNewCompanyChange = (event) => {
    setNewCompany(event.target.value.toUpperCase());
  };
  const handleAddCompany = () => {
    if (newCompany.trim() !== "") {
      setHistory([...history, newCompany]);
      setNewCompany(""); // Clear the input field
    }
  };
  const handleRemoveCompany = (companyToRemove) => {
    const updatedHistory = history.filter(
      (company) => company !== companyToRemove
    );
    setHistory(updatedHistory);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/view_professional_profile",
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
          setSkills(data && data.skills ? data.skills.join(", ") : "");
          setUniversityName(data ? data.universityname : "");
          setYearsOfExperience(data ? data.yearsofexperience : "");
          setCurrentlyWorking(data ? data.currentlyworking : "");
          setCurrentRole(data ? data.currentrole : "");
          setOrigin(data ? data.origin : "");
          setLinkedin(data ? data.linkedin : "");
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
  const fieldsetStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px",
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleUniversityNameChange = (event) => {
    setUniversityName(event.target.value.toUpperCase());
  };

  const handleYearsOfExperienceChange = (event) => {
    setYearsOfExperience(event.target.value);
  };

  const handleCurrentlyWorkingChange = (event) => {
    setCurrentlyWorking(event.target.value.toUpperCase());
  };

  const handleCurrentRoleChange = (event) => {
    setCurrentRole(event.target.value.toUpperCase());
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleLinkedinChange = (event) => {
    setLinkedin(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skillsArray = selectedSkills;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://proconnect-backend.onrender.com/user/make_professional_profile",
        {
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
        }
      );

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
    <div className="container mt-5" style={{ marginTop: "12%" }}>
      <div className="row justify-content-center" style={{ marginTop: "12%" }}>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <b>Edit Professional Profile</b>
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
                    <legend>Add Skills:</legend>
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
                    </div>
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
                  </fieldset>
                </div>
                <div>
                  <fieldset style={fieldsetStyle}>
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
                  </fieldset>
                </div>
                <div>
                  <fieldset style={fieldsetStyle}>
                    <legend>Add Previous Companies:</legend>
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a company"
                          value={newCompany}
                          onChange={handleNewCompanyChange}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddCompany}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <label>Existing Companies:</label>
                    <div className="existing-companies">
                      {history.map((company, index) => (
                        <span
                          key={index}
                          className="badge badge-primary company-badge"
                        >
                          {company}
                          <span
                            className="remove-company"
                            onClick={() => handleRemoveCompany(company)}
                          >
                            &times;
                          </span>
                        </span>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <br></br>
                <p className="text-center">Social Media Profiles</p>
                <div className="card mb-4 mb-lg-0" style={cardStyle}>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      {/* Social media links */}
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={faLinkedin} className="mr-1" />
                        Github
                        <p className="mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="LinkedIn Profile URL"
                            defaultValue={`linkedin.com/`}
                            onChange={(e) => console.log(e.target.value)}
                          />
                        </p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={faGithub} /> Linkedin
                        <p className="mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="GitHub Profile URL"
                            defaultValue={`github.com/`}
                            onChange={(e) => console.log(e.target.value)}
                          />
                        </p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={faTwitter} />
                        Twitter
                        <p className="mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Twitter Profile URL"
                            defaultValue={`twitter.com/`}
                            onChange={(e) => console.log(e.target.value)}
                          />
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <br></br>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary ">
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

export default EditProfessionalProfile;
