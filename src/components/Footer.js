import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/iomplogo.jpg";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <footer className="bg-light text-center text-lg-start text-muted">
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={{ backgroundColor: "#4455a4", color: "white" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faFacebookF} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faTwitter} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faInstagram} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faLinkedin} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faGithub} size="lg" color="white" />
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FontAwesomeIcon icon={faGem} className="me-3" />
                PRO-CONNECT
              </h6>
              <img
                src={logo}
                className=".img-responsive"
                style={{ heigh: "50%", width: "50%" }}
              />
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">TEAM</h6>
              <p>Naveen Chandra</p>
              <p>Nagarur Sai Vijay</p>
              <p>Neha Nami Reddy</p>
              <p>Prathamesh Pathak</p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                <span> </span>
                KMIT, Narayanaguda, Hyderabad
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                <span> </span>
                proconnect@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-3" />
                <span> </span> + 01 234 567 88
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "#4455a4" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold">
          <span> </span> ProConnect Team
        </a>
      </div>
    </footer>
  );
}