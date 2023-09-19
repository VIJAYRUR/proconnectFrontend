import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileLogo from "../images/ProfileLogo.png";

const StudentProfile = () => {
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null); // Initialize profileData as null
  const [error, setError] = useState("");

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
    maxWidth: "95%",
    height: "90%",
  };

  return (
    <div className="container mt-5">
      {error.length === 0 && profileData && (
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{profileData.username}'s Profile</h2>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Email:</strong> {profileData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>University:</strong> {profileData.university}
                  </li>
                  <li className="list-group-item">
                    <strong>Course:</strong> {profileData.universitycourse}
                  </li>
                  <li className="list-group-item">
                    <strong>CGPA:</strong> {profileData.universitycgpa}
                  </li>
                  <li className="list-group-item">
                    <strong>Passout Date:</strong> {profileData.passoutdate}
                  </li>
                </ul>
                {profileData.skills && profileData.skills.length > 0 && (
                  <div>
                    <h2 className="mt-4">Skills</h2>
                    <ul className="list-group">
                      {profileData.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
              <Link className="btn btn-primary mt-4" to="/editStudentProfile">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}
      {!profileData && (
        <div className="alert alert-danger mt-3">
          <p>Please create profile, if you have done please try again later</p>
          <button className="btn btn-primary mt-2">
            <Link to="/editStudentProfile" style={{ color: "white" }}>
              Create Profile
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
