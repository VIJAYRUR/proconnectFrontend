import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakeRequest = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [depthOfKnowledge, setDepthOfKnowledge] = useState("");
  const [companyTarget, setCompanyTarget] = useState("");
  const [originTarget, setOriginTarget] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSkillsChange = (event) => {
    setSkills(event.target.value.split(",").map((skill) => skill.trim()));
  };

  const handleDepthOfKnowledgeChange = (event) => {
    setDepthOfKnowledge(event.target.value);
  };

  const handleCompanyTargetChange = (event) => {
    setCompanyTarget(event.target.value);
  };

  const handleOriginTargetChange = (event) => {
    setOriginTarget(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare request data
    const requestData = {
      skills,
      depth_of_knowledge: depthOfKnowledge,
      company_target: companyTarget,
      origin_target: originTarget,
    };

    try {
      const response = await fetch("/user/make_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      } else {
        setSuccessMessage("Interview request made successfully.");
        // Redirect to a success page or update UI as needed
        navigate("/ActiveStudents"); // Replace with your success page route
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <b>Interview Request</b>
            </div>
            <div className="card-body">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Skills (comma-separated):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={skills.join(", ")}
                    onChange={handleSkillsChange}
                  />
                </div>
                <div className="form-group">
                  <label>Depth of Knowledge:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={depthOfKnowledge}
                    onChange={handleDepthOfKnowledgeChange}
                  />
                </div>
                <div className="form-group">
                  <label>Company Target:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyTarget}
                    onChange={handleCompanyTargetChange}
                  />
                </div>
                <div className="form-group">
                  <label>Origin Target:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={originTarget}
                    onChange={handleOriginTargetChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeRequest;
