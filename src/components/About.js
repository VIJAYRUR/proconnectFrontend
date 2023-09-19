import React from "react";
import studentDoodle from "../images/student.png";
import teacherDoodle from "../images/teacher.png";
import Footer from "./Footer";

const About = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        className="container-fluid mt-4"
        style={{ backgroundColor: "white", height: "96vh" }}
      >
        <h1 className="pt-2 text-center" style={{ color: "#4455a4" }}>
          ABOUT PROCONNECT
        </h1>
        <div className="container-fluid pt-3">
          <div className="row v-100 pt-2 text-left">
            <div className="col-6 pl-5 pr-5">
              <p>
                Interviews are crucial moments in one’s career. Theoretical
                knowledge of interview questions isn't enough when you actually
                face an interview. Too often fear takes over our performance in
                job interviews. Practice & preparation are crucial to get over
                your anxieties when attending an interview.
              </p>
              <br></br>
              <p>
                ProConnect is an user-friendly WebApp designed to seamlessly
                connect students with established working professionals. Its
                primary objective is to offer students a realistic and immersive
                interview experience, fostering their professional growth. By
                cutting out unnecessary intermediaries, ProConnect streamlines
                the process, making it effortless for both parties involved.
              </p>
            </div>
            <div className="col-6 pl-5 pr-5">
              <p>
                In essence, ProConnect serves as a platform that caters to the
                common aspiration among students to gain practical exposure to
                real-world interviews and the dynamics of various industries. By
                forging direct connections between eager students and seasoned
                professionals, the platform not only aids in refining interview
                skills but also cultivates networking opportunities and a deeper
                understanding of professional trajectories.{" "}
              </p>
              <br></br>
              <p>
                ProConnect is poised to play a pivotal role in student's journey
                towards enhanced confidence, expanded knowledge, and
                well-informed career decisions. Our mock interviews are
                conducted by IT industry experts, so you’re sure to improve your
                chances of getting hired!
              </p>
            </div>
          </div>
        </div>
        <div>
          <span className="text-left">
            <img
              src={studentDoodle}
              alt=""
              className="rounded float-left"
              style={{ height: "220px", width: "150px" }}
            />
          </span>
          <span className="text-right">
            <img
              src={teacherDoodle}
              alt=""
              className="rounded float-right"
              style={{ height: "220px", width: "150px" }}
            />
          </span>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
