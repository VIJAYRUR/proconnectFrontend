import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGraduationCap,
  faUniversity,
  faBriefcase,
  faGlobe,
  faPerson,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import profileLogo from "../images/ProfileLogo.png";

const ProfessionalProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [history, setHistory] = useState([]);
  const [newCompany, setNewCompany] = useState("");

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
        } else {
          setError("Error fetching profile data");
        }
      } catch (error) {
        setError("Network error");
      }
    };

    fetchProfileData();
  }, []);

  const imageStyle = {
    maxWidth: "150px",
    width: "100%",
    height: "auto",
  };

  const cardStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const skillsToShow = showAllSkills
    ? profileData?.skills
    : profileData?.skills.slice(0, 7);
  let HistoryToShow = [];
  try {
    HistoryToShow = showAllCompanies
      ? profileData?.History
      : profileData?.History.slice(0, 5);
  } catch {
    HistoryToShow = [];
  }

  const toggleSkillsView = () => {
    setShowAllSkills(!showAllSkills);
  };
  const toggleHistoryView = () => {
    setShowAllCompanies(!showAllCompanies);
  };
  const handleNewCompanyChange = (event) => {
    setNewCompany(event.target.value);
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

  return (
    <section style={{ backgroundColor: "#eee" }}>
      {profileData != null ? (
        <div className="container py-5" style={{ marginTop: "4%" }}>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4" style={cardStyle}>
                <div className="card-body text-center">
                  <img
                    src={profileLogo}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={imageStyle}
                  />
                  <br />
                  <p className="text-muted mb-2">Professional</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      <a href="/EditProfessionalProfile">Edit Profile</a>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0" style={cardStyle}>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    {/* Social media links */}

                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <FontAwesomeIcon icon={faLinkedin} className="mr-3" />
                      <p className="mb-0">
                        <a
                          href="twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Linkedin Profile
                        </a>
                      </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <FontAwesomeIcon icon={faGithub} />
                      <p className="mb-0">
                        <a
                          href="profileData.twitter"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Github Profile
                        </a>
                      </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <FontAwesomeIcon icon={faTwitter} />
                      <p className="mb-0">
                        <a
                          href="profileData.twitter"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter Profile
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4" style={cardStyle}>
                <div className="card-body">
                  {/* Profile information */}
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon icon={faPerson} className="mr-2" />
                        Name
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profileData.username}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        Email
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profileData.email}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                        University
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {profileData.universityname}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon
                          icon={faGraduationCap}
                          className="mr-2"
                        />
                        Years of Experience
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {profileData.yearsofexperience}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                        Currently Working
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {profileData.currentlyworking}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                        Origin
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profileData.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Progress bars */}
                <div className="col">
                  <div className="card mb-4 mb-md-0" style={cardStyle}>
                    <div className="card-body">
                      <p className="mb-4">Skills</p>
                      {skillsToShow.map((skill, index) => (
                        <span key={index} className="col-auto">
                          <button
                            type="button"
                            className="btn btn-primary mb-2"
                            style={{ marginRight: "5px" }}
                          >
                            {skill}
                          </button>
                        </span>
                      ))}
                      {!showAllSkills && profileData.skills.length > 7 && (
                        <button
                          className="btn btn-link"
                          onClick={toggleSkillsView}
                        >
                          View More ...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                {/* Progress bars */}
                <div className="col">
                  <div className="card mb-4 mb-md-0" style={cardStyle}>
                    <div className="card-body">
                      <p className="mb-4">Previous companies</p>
                      {HistoryToShow.map((skill, index) => (
                        <span key={index} className="col-auto">
                          <button
                            type="button"
                            className="btn btn-primary mb-2"
                            style={{ marginRight: "5px" }}
                          >
                            {skill}
                          </button>
                        </span>
                      ))}
                      {!showAllCompanies &&
                        profileData.skills.length >= 7 &&
                        HistoryToShow.length > 0 && (
                          <button
                            className="btn btn-link"
                            onClick={toggleHistoryView}
                          >
                            View More ...
                          </button>
                        )}
                      {HistoryToShow.length === 0 && <p>No History found</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger " style={{ marginTop: "20%" }}>
          <p>
            Please create a profile. If you have done so, please try again
            later.
          </p>
          <button className="btn btn-primary ">
            <Link to="/EditProfessionalProfile" style={{ color: "white" }}>
              Create Profile
            </Link>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfessionalProfile;
