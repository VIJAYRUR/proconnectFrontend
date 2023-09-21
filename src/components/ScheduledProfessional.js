

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faUniversity,
//   faGraduationCap,
//   faFileAlt,
//   faMoneyCheckAlt,
//   faCalendar,
//   faSchool
// } from "@fortawesome/free-solid-svg-icons";
// const cardHoverStyles = {
//   transition: "transform 0.2s, box-shadow 0.2s",
//   boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
// };
// const ScheduledProfessional = () => {
//   const navigate = useNavigate();
//   const [interviews, setInterviews] = useState([]);
//   const [selectedInterview, setSelectedInterview] = useState(null);
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   useEffect(() => {
//     const fetchScheduledInterviews = async () => {
//       try {
//         const response = await fetch(
//           "https://proconnect-backend.onrender.com/user/view_interviewer_schedule",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setInterviews(data);
//           console.log(data[0])
//         } else {
//           console.error("Error fetching scheduled interviews:", response.statusText);
//           console.log("error");
//         }
//       } catch (error) {
//         console.error("Network error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScheduledInterviews();
//   }, []);

//   const handleFeedbackClick = (interview) => {
//     setSelectedInterview(interview);
//   };

//   const handleFeedbackSubmit = async () => {
//     try {
//       if (!selectedInterview || !selectedInterview.student_name) {
//         console.error("No selected interview to provide feedback for.");
//         return;
//       }

//       const response = await fetch(
//         "https://proconnect-backend.onrender.com/user/provide_feedback",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             authorization: "Bearer " + localStorage.getItem("token"),
//           },
//           body: JSON.stringify({
//             interviewer_name: selectedInterview.interviewer_name,
//             student_name: selectedInterview.student_name,
//             interviewer_email: selectedInterview.interviewer_email,
//             student_email: selectedInterview.student_email,
//             message: feedbackMessage,
//             date: selectedInterview.date,
//             time: selectedInterview.time,
//           }),
//         }
//       );

//       if (response.ok) {
//         setFeedbackMessage("");
//         setSelectedInterview(null);
//         navigate("/ProfessionalHistory");
//         window.location.reload();
//       } else {
//         console.error("Error submitting feedback:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4" style={{marginTop:"10%"}}>Scheduled Interviews</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : interviews.length === 0 ? (
//         <p>No scheduled interviews found.</p>
//       ) : (
//         <div className="row">
//           {interviews[0].map((interview) => (
//             <div key={interview._id} className="col-md-4 mb-4">
//               <div className="card " style={isHovered ? cardHoverStyles : {}}
//                 onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}>
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     Interview with {interview.student_name}
//                   </h5>
//                   <p> <FontAwesomeIcon icon={faUniversity} className="mr-2" /> University: {interview.student_university} </p>
//                   <p><FontAwesomeIcon icon={faCalendar} className="mr-2" /> Course: {interview.student_course} </p>
//                   <p><FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> University CGPA: {interview.student_CGPA} </p>
//                   <p><FontAwesomeIcon icon={faCalendar} className="mr-2" />Passout Date: {interview.student_passoutdate} </p>
//                   <p>
//                     <marquee><strong>Date: </strong>{interview.date}, <strong>Time:</strong> {interview.time}</marquee>
//                   </p>
//                   <button
//                     className="btn btn-primary"
//                     data-toggle="modal"
//                     data-target="#feedbackModal"
//                     onClick={() => handleFeedbackClick(interview)}
//                   >
//                     Provide Feedback
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedInterview && (
//         <div className="modal fade" id="feedbackModal" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Provide Feedback</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => setSelectedInterview(null)}
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 {selectedInterview && selectedInterview.student_name && (
//                   <p>
//                     You are providing feedback for the interview with{" "}
//                     <strong>{selectedInterview.student_name}</strong>. Please
//                     enter your feedback message below:
//                   </p>
//                 )}
//                 <textarea
//                   className="form-control"
//                   rows="4"
//                   placeholder="Enter your feedback message"
//                   value={feedbackMessage}
//                   onChange={(e) => setFeedbackMessage(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-dismiss="modal"
//                   onClick={() => setSelectedInterview(null)}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={handleFeedbackSubmit}
//                 >
//                   Submit Feedback
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScheduledProfessional;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUniversity,
  faGraduationCap,
  faFileAlt,
  faMoneyCheckAlt,
  faCalendar,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

const cardHoverStyles = {
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
};

const ScheduledProfessional = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const fetchScheduledInterviews = async () => {
      try {
        const response = await fetch(
          "https://proconnect-backend.onrender.com/user/view_interviewer_schedule",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInterviews(data);
          console.log(data[0]);
        } else {
          console.error(
            "Error fetching scheduled interviews:",
            response.statusText
          );
          console.log("error");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduledInterviews();
  }, []);

  const handleFeedbackClick = (interview) => {
    setSelectedInterview(interview);
  };

  const handleFeedbackSubmit = async () => {
    try {
      if (!selectedInterview || !selectedInterview.student_name) {
        console.error("No selected interview to provide feedback for.");
        return;
      }

      const response = await fetch(
        "https://proconnect-backend.onrender.com/user/provide_feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            interviewer_name: selectedInterview.interviewer_name,
            student_name: selectedInterview.student_name,
            interviewer_email: selectedInterview.interviewer_email,
            student_email: selectedInterview.student_email,
            message: feedbackMessage,
            date: selectedInterview.date,
            time: selectedInterview.time,
          }),
        }
      );

      if (response.ok) {
        setFeedbackMessage("");
        setSelectedInterview(null);
        navigate("/ProfessionalHistory");
        window.location.reload();
      } else {
        console.error("Error submitting feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ marginTop: "10%" }}>
        Scheduled Interviews
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : interviews.length === 0 ? (
        <p>No scheduled interviews found.</p>
      ) : (
        <div className="row">
          {interviews[0].map((interview) => (
            <div
              key={interview._id}
              className="col-md-4 mb-4"
              onMouseEnter={() => setHoveredCardId(interview._id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div
                className={`card ${
                  hoveredCardId === interview._id ? "hovered-card" : ""
                }`}
                style={hoveredCardId === interview._id ? cardHoverStyles : {}}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Interview with {interview.student_name}
                  </h5>
                  <p>
                    <FontAwesomeIcon icon={faUniversity} className="mr-2" />{" "}
                    University: {interview.student_university}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faSchool} className="mr-2" /> Course:{" "}
                    {interview.student_course}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />{" "}
                    University CGPA: {interview.student_CGPA}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Passout
                    Date: {interview.student_passoutdate}
                  </p>
                  <p>
                    <marquee>
                      <strong>Date: </strong>
                      {interview.date}, <strong>Time:</strong> {interview.time}
                    </marquee>
                  </p>
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#feedbackModal"
                    onClick={() => handleFeedbackClick(interview)}
                  >
                    Provide Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedInterview && (
        <div className="modal fade" id="feedbackModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Provide Feedback</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedInterview(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {selectedInterview && selectedInterview.student_name && (
                  <p>
                    You are providing feedback for the interview with{" "}
                    <strong>{selectedInterview.student_name}</strong>. Please
                    enter your feedback message below:
                  </p>
                )}
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter your feedback message"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setSelectedInterview(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFeedbackSubmit}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledProfessional;
