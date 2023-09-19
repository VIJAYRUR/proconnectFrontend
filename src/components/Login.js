import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserTypeChange = (selectedUserType) => {
    setUserType(selectedUserType);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    const requestBody = {
      username: username,
      password: password,
      role: userType,
    };

    const response = await fetch(`/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the object to a JSON string
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.my_token;
      console.log(token);
      try {
        localStorage.setItem("token", token);
        localStorage.setItem("role", data.role);
        console.log("Token set successfully.");
      } catch (error) {
        console.error("Error setting token in localStorage:", error);
      }
      if (localStorage.getItem("role") === "student") {
        navigate("/scheduledStudent");
        window.location.reload();
      } else {
        navigate("/scheduledProfessional");
        window.location.reload();
      }
    } else {
      const data = await response.json();
      const token = data.my_token;
      window.alert(data.message);
    }
  };

  const handleSignUp = () => {
    // sign-up logic to be implemented
    console.log("Sign Up clicked");
  };

  const labelStyle = {
    textAlign: "left",
    display: "block",
    marginBottom: "5px",
  };
  const imageStyle = {
    maxWidth: "95%",
    height: "90%",
  };

  const narrowerColStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  };
  const formStyle = {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: 0,
    paddingBottom: 0,
  };
  return (
    <div className="container align-items-center justify-content-center vh-80 mt-5">
      <br></br>
      <br></br>
      <div className="row">
        <div
          className="col-md-8 col-lg-6 p-3 border rounded bg-white shadow"
          style={narrowerColStyle}
        >
          <h2 className="mb-4">Sign In</h2>
          <form style={formStyle}>
            <div className="form-group">
              <div className="btn-group d-flex">
                <button
                  type="button"
                  className={`btn ${
                    userType === "student" ? "btn-primary" : "btn-light"
                  } flex-fill`}
                  onClick={() => handleUserTypeChange("student")}
                >
                  student
                </button>
                <button
                  type="button"
                  className={`btn ${
                    userType === "professional" ? "btn-primary" : "btn-light"
                  } flex-fill`}
                  onClick={() => handleUserTypeChange("professional")}
                >
                  professional
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="username" style={labelStyle}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                onChange={handleUsernameChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={labelStyle}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="mt-3"></div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg mt-3"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className="mt-3" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              className="text-primary"
              onClick={handleSignUp}
              to="/Register"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="col-md-4 col-lg-6 p-4 ">
          <img
            style={imageStyle}
            alt="login"
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
