import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserTypeChange = (selectedUserType) => {
    setUserType(selectedUserType);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://proconnect-backend.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          confirmpassword: confirmPassword,
          phone: phoneNumber,
          role: userType,
        }),
      });

      if (response.ok) {
        // Registration was successful
        const data = await response.json();
        
        window.alert("You can now Login");
        navigate("/login");
      } else {
        // Registration failed
        const errorData = await response.json();
        window.alert(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const handleSignIn = () => {
    // sign-in logic to be implemented
    console.log("Sign In clicked");
  };
  const labelStyle = {
    textAlign: "left",
    display: "block",
    marginBottom: "5px",
  };

  const narrowerColStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    height: "60%",
  };
  const imageStyle = {
    maxWidth: "95%",
    height: "90%",
  };
  const formStyle = {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: 0,
    paddingBottom: 0,
  };
  return (
    <div className="container align-items-center justify-content-center vh-100 mt-5">
      <br></br>
      <br></br>
      <div className="row">
        <div
          className="col-md-8 col-lg-6 p-4 border rounded bg-white shadow"
          style={narrowerColStyle}
        >
          <h2 className="mb-4">Sign Up</h2>
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
                  Interviewer
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
              <label htmlFor="phoneNumber" style={labelStyle}>
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="form-control"
                placeholder="Enter ph no."
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={labelStyle}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleEmailChange}
                value={email}
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
            <div className="form-group">
              <label htmlFor="confirmPassword" style={labelStyle}>
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
            </div>
            <div className="mt-3"></div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg mt-3"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-3" style={{ textAlign: "center" }}>
            Have an account?<span> </span>
            <Link className="text-primary" onClick={handleSignIn} to="/Login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="col-md-4 col-lg-6 p-4 ">
          <img
            style={imageStyle}
            alt="login"
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?size=626&ext=jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
