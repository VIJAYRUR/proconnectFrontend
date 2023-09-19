
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ScheduledProfessional = () => {
//   const navigate = useNavigate();
//   const [interviews, setInterviews] = useState([]);
//   const [selectedInterview, setSelectedInterview] = useState(null);
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchScheduledInterviews = async () => {
//       try {
//         const response = await fetch("https://proconnect-backend.onrender.com/user/view_interviewer_schedule", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setInterviews(data);
//           console.log(data);
//           console.log(data[0]);
//         } else {
//           console.error(
//             "Error fetching scheduled interviews:",
//             response.statusText
//           );
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

//       const response = await fetch("https://proconnect-backend.onrender.com/user/provide_feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify({
//           interviewer_name: selectedInterview.interviewer_name,
//           student_name: selectedInterview.student_name,
//           interviewer_email: selectedInterview.interviewer_email,
//           student_email: selectedInterview.student_email,
//           message: feedbackMessage,
//           date: selectedInterview.date,
//           time: selectedInterview.time,
//         }),
//       });

//       if (response.ok) {
//         setFeedbackMessage("");
//         setSelectedInterview(null);
//         navigate("/ProfessionalHistory");
//         window.location.reload();
//       } else {
//         console.error("Error submitting feedback:", response.statusText);
//       }
//       window.location.reload();
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Scheduled Interviews</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : interviews[0] == null ? (
//         <p>No scheduled interviews found.</p>
//       ) : (
//         <div className="row">
//           {interviews.map((interview) => (
//             <div key={interview._id} className="col-md-4 mb-4">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     Interview with {interview.student_name}
//                   </h5>
//                   <p>University: {interview.student_university} </p>
//                   <p>Course: {interview.student_course} </p>
//                   <p>University CGPA: {interview.student_CGPA} </p>
//                   <p>Passout Date: {interview.student_passoutdate} </p>
//                   <p>
//                     Date: {interview.date}, Time: {interview.time}
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

const ScheduledProfessional = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
          console.log(data)
        } else {
          console.error("Error fetching scheduled interviews:", response.statusText);
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
      <h2 className="mb-4">Scheduled Interviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : interviews.length === 0 ? (
        <p>No scheduled interviews found.</p>
      ) : (
        <div className="row">
          {interviews.map((interview) => (
            <div key={interview._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Interview with {interview.student_name}
                  </h5>
                  <p>University: {interview.student_university} </p>
                  <p>Course: {interview.student_course} </p>
                  <p>University CGPA: {interview.student_CGPA} </p>
                  <p>Passout Date: {interview.student_passoutdate} </p>
                  <p>
                    Date: {interview.date}, Time: {interview.time}
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
