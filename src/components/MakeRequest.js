
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faGraduationCap, faCode } from "@fortawesome/free-solid-svg-icons";
const MakeRequest = () => {
  const navigate = useNavigate();
  const [searchedSkill, setSearchedSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [depthOfKnowledge, setDepthOfKnowledge] = useState(""); // Updated depthOfKnowledge state
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sampleSkills = ["React", "Express", "Node", "Python", "Java"];
  const sampleCompanies = ["Adobe", "Salesforce", "Amazon", "Microsoft", "Infosys"];
  const sampleOrigins = ["India", "America", "US"];

  const handleSearchSkill = (event) => {
    const skillToSearch = event.target.value;
    setSearchedSkill(skillToSearch);

    // Filter the sample skills based on the search query
    const filteredSkills = sampleSkills.filter(
      (skill) =>
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
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare request data
    const requestData = {
      skills: selectedSkills.join(", "),
      depth_of_knowledge: depthOfKnowledge,
      company_target: selectedCompany,
      origin_target: selectedOrigin,
    };

    try {
      const response = await fetch("https://proconnect-backend.onrender.com/user/make_request", {
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
                  <label>Add Skills:</label>
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
                </div>
                <div className="form-group">
                  <label>Selected Skills:</label>
                  <div className="selected-skills">
                    {selectedSkills.map((skill, index) => (
                      <span key={index} className="badge badge-primary skill-badge">
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
                <div className="form-group">
                  <label>Depth of Knowledge:</label>
                  <select
                    className="form-control"
                    value={depthOfKnowledge}
                    onChange={(e) => setDepthOfKnowledge(e.target.value)}
                  >
                    <option value="">Select Depth of Knowledge</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Company:</label>
                  <select
                    className="form-control"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">Select Company</option>
                    {sampleCompanies.map((company, index) => (
                      <option key={index} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Origin:</label>
                  <select
                    className="form-control"
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                  >
                    <option value="">Select Origin</option>
                    {sampleOrigins.map((origin, index) => (
                      <option key={index} value={origin}>
                        {origin}
                      </option>
                    ))}
                  </select>
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

