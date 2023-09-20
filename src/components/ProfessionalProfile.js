import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGraduationCap,
  faUniversity,
  faBriefcase,
  faGlobe,
  faFileAlt,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import profileLogo from "../images/ProfileLogo.png";

const ProfessionalProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://proconnect-backend.onrender.com/user/view_professional_profile", {
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
    maxWidth: "85%",
    height: "80%",
  };

  const profileCardStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    borderRadius: "8px",
  };

  const skillsToShow = showAllSkills
    ? profileData?.skills
    : profileData?.skills.slice(0, 7);

  const toggleSkillsView = () => {
    setShowAllSkills(!showAllSkills);
  };

  return (
    <div style={{ marginTop: "8%" }}>
      {error.length === 0 && profileData && (
        <div className="row">
          <div className="col-md-6">
            <div className="card" style={profileCardStyle}>
              <div className="card-body">
                <h2 className="card-title">{profileData.username}'s Profile</h2>
                <ul className="list-group">
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    <strong>Email:</strong> {profileData.email}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    <strong>Skills:</strong>{" "}
                    {skillsToShow.join(", ")}
                    {!showAllSkills && profileData.skills.length > 7 && (
                      <button
                        className="btn btn-link"
                        onClick={toggleSkillsView}
                      >
                        View More
                      </button>
                    )}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                    <strong>University:</strong> {profileData.universityname}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                    <strong>Years of Experience:</strong>{" "}
                    {profileData.yearsofexperience}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                    <strong>Currently Working:</strong>{" "}
                    {profileData.currentlyworking}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                    <strong>Origin:</strong> {profileData.origin}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2" />
                    <strong>LinkedIn:</strong> {profileData.linkedin}
                  </li>
                </ul>
                <Link
                  className="btn btn-primary mt-4"
                  to="/editProfessionalProfile"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <img
                src={profileLogo}
                alt="Dummy Profile Pic"
                style={imageStyle}
                className="img-fluid rounded-circle mt-3"
              />
            </div>
          </div>
        </div>
      )}
      {!profileData && (
        <div className="alert alert-danger mt-3">
          <p>
            Please create your profile, if you have already done so, please try
            again later.
          </p>
          <button className="btn btn-primary mt-2">
            <Link to="/editProfessionalProfile" style={{ color: "white" }}>
              Create Profile
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalProfile;
