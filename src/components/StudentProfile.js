// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faUniversity,
//   faGraduationCap,
//   faFileAlt, // FontAwesome icon for marksheet
//   faMoneyCheckAlt, // FontAwesome icon for scholarship
// } from "@fortawesome/free-solid-svg-icons";
// import profileLogo from "../images/ProfileLogo.png";

// const StudentProfile = () => {
//   const [token, setToken] = useState("");
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch("https://proconnect-backend.onrender.com/user/view_student_profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });

//         if (!response || response === undefined || response === null) {
//           setError("Make your profile");
//         }

//         if (response.ok) {
//           const data = await response.json();
//           setProfileData(data);
//         } else {
//           setError("Error fetching profile data");
//         }
//       } catch (error) {
//         setError("Network error");
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const imageStyle = {
//     maxWidth: "50%", // Make the profile picture smaller
//     height: "auto", // Maintain aspect ratio
//   };

//   const profileCardStyle = {
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//     borderRadius: "8px",
//   };

//   return (
//     <div className="container mt-5">
//       {error.length === 0 && profileData && (
//         <div className="row">
//           <div className="col-md-6">
//             <div className="card" style={profileCardStyle}>
//               <div className="card-body">
//                 <h2 className="card-title">{profileData.username}'s Profile</h2>
//                 <ul className="list-group">
//                   <li className="list-group-item">
//                     <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
//                     <strong>Email:</strong> {profileData.email}
//                   </li>
//                   <li className="list-group-item">
//                     <FontAwesomeIcon icon={faUniversity} className="mr-2" />
//                     <strong>University:</strong> {profileData.university}
//                   </li>
//                   <li className="list-group-item">
//                     <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
//                     <strong>CGPA:</strong> {profileData.universitycgpa}
//                   </li>
//                   <li className="list-group-item">
//                   <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
//                     <strong>Passout Date:</strong> {profileData.passoutdate}
//                   </li>
//                 </ul>
//                 {profileData.skills && profileData.skills.length > 0 && (
//                   <div>
//                     <h2 className="mt-4">Skills</h2>
//                     <div className="row">
//                       {profileData.skills.map((skill, index) => (
//                         <div key={index} className="col-auto">
//                           <button
//                             type="button"
//                             className="btn btn-primary mb-2"
//                             style={{ marginRight: "5px" }}
//                           >
//                             {skill}
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="text-center">
//               <img
//                 src={profileLogo}
//                 alt="Dummy Profile Pic"
//                 style={imageStyle}
//                 className="img-fluid rounded-circle mt-3"
//               />
//               <div className="mt-4">
//                 <Link className="btn btn-primary" to="/editStudentProfile">
//                   Edit Profile
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {!profileData && (
//         <div className="alert alert-danger mt-3">
//           <p>Please create profile, if you have done please try again later</p>
//           <button className="btn btn-primary mt-2">
//             <Link to="/editStudentProfile" style={{ color: "white" }}>
//               Create Profile
//             </Link>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUniversity,
  faGraduationCap,
  faFileAlt,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import profileLogo from "../images/ProfileLogo.png";

const StudentProfile = () => {
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [showAllSkills, setShowAllSkills] = useState(false);

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
    maxWidth: "50%", // Make the profile picture smaller
    height: "auto", // Maintain aspect ratio
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
    <div className="container mt-5">
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
                    <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                    <strong>University:</strong> {profileData.university}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    <strong>CGPA:</strong> {profileData.universitycgpa}
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2" />
                    <strong>Passout Date:</strong> {profileData.passoutdate}
                  </li>
                </ul>
                <div>
                  <h2 className="mt-4">Skills</h2>
                  <div className="row">
                    {skillsToShow.map((skill, index) => (
                      <div key={index} className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary mb-2"
                          style={{ marginRight: "5px" }}
                        >
                          {skill}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
          <div className="col-md-6">
            <div className="text-center">
              <img
                src={profileLogo}
                alt="Dummy Profile Pic"
                style={imageStyle}
                className="img-fluid rounded-circle mt-3"
              />
              <div className="mt-4">
                <Link className="btn btn-primary" to="/editStudentProfile">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {!profileData && (
        <div className="alert alert-danger mt-3">
          <p>Please create a profile. If you have done so, please try again later.</p>
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
