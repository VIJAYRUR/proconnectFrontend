import React from "react";
import benefit1 from "../images/benefit1.png";
import benefit2 from "../images/benefit2.png";
import benefit3 from "../images/benefit3.png";
import benefit4 from "../images/benefit4.png";

import Footer from "./Footer";

const Benefits = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <div
        className="container-fluid"
        style={{ backgroundColor: "black", height: "94vh" }}
      >
        <h1 className="pt-5 text-center" style={{ color: "#eeeeee" }}>
          FEATURES OF PROCONNECT
        </h1>
        <div className="container-fluid pt-5">
          <div className="row">
            <div className="col-3">
              <div
                className="card shadow p-3 mb-5 bg-white rounded-5 "
                style={{ borderRadius: "50px", height: "62vh" }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={benefit1}
                    alt=""
                    className="rounded float-center pt-3 pb-2"
                    style={{ height: "175px", width: "185px" }}
                  />
                </div>
                <div>
                  <h5
                    className="p-2"
                    style={{
                      color: "#4455a4",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    INTERVIEW FEEDBACK
                  </h5>
                  <p className="p-2" style={{ fontWeight: "bold" }}>
                    Get a detailed interview feedback with performance-based
                    metrics and comprehensive review on your strengths &
                    weaknesses.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div
                className="card shadow p-3 mb-5 bg-white rounded-5"
                style={{ borderRadius: "50px", height: "62vh" }}
              >
                <div className="d-flex justify-content-center ">
                  <img
                    src={benefit2}
                    alt=""
                    className="rounded float-center pt-3 pb-2"
                    style={{ height: "175px", width: "185px" }}
                  />
                </div>
                <div>
                  <h4
                    className="p-2"
                    style={{
                      color: "#4455a4",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    USER FRIENDLY
                  </h4>
                  <p className="p-2" style={{ fontWeight: "bold" }}>
                    ProConnect can be accessed from your desktop, laptop or
                    tablet and is very easy to use by the user.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div
                className="card shadow p-3 mb-5 bg-white rounded-5"
                style={{ borderRadius: "50px", height: "62vh" }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={benefit3}
                    alt=""
                    className="rounded float-center pt-3 pb-2"
                    style={{ height: "175px", width: "185px" }}
                  />
                </div>
                <div>
                  <h5
                    className="p-2"
                    style={{
                      color: "#4455a4",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    CURATED RESOURCES
                  </h5>
                  <p className="p-2" style={{ fontWeight: "bold" }}>
                    Prime your interview skills & etiquette by getting access to
                    the experienced interviewers covering every aspect of the
                    interview cycle with ProConnect.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div
                className="card shadow p-3 mb-5 bg-white rounded-5"
                style={{ borderRadius: "50px", height: "62vh" }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={benefit4}
                    alt=""
                    className="pt-1 rounded float-center pt-3 pb-2"
                    style={{ height: "168px", width: "185px" }}
                  />
                </div>
                <div>
                  <h5
                    className="p-2"
                    style={{
                      color: "#4455a4",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    SAVE TIME
                  </h5>
                  <p className="p-2" style={{ fontWeight: "bold" }}>
                    Attend mock interviews from anywhere, eliminating the need &
                    the costs associated with travel. Moreover, you save time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Benefits;
