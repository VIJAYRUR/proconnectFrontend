// import React from "react";
// import studentDoodle from "../images/student.png";
// import teacherDoodle from "../images/teacher.png";

// import Footer from "./Footer";

// const About = () => {
//   return (
//     <div style={{height: "90%" }} className="container-fluid">
//       <div
//         className="container-fluid"
//         style={{ backgroundColor: "white"}}
//       >
//         <h1 className="pt-2 text-center" style={{ color: "#4455a4" }}>
//           ABOUT PROCONNECT
//         </h1>
//         <div className="container-fluid pt-3">
//           <div className="row v-100 pt-2 text-left">
//             <div className="col-6 pl-5 pr-5">
//               <p>
//                 Interviews are crucial moments in one’s career. Theoretical
//                 knowledge of interview questions isn't enough when you actually
//                 face an interview. Too often fear takes over our performance in
//                 job interviews. Practice & preparation are crucial to get over
//                 your anxieties when attending an interview.
//               </p>
//               <br></br>
//               <p>
//                 ProConnect is an user-friendly WebApp designed to seamlessly
//                 connect students with established working professionals. Its
//                 primary objective is to offer students a realistic and immersive
//                 interview experience, fostering their professional growth. By
//                 cutting out unnecessary intermediaries, ProConnect streamlines
//                 the process, making it effortless for both parties involved.
//               </p>
//             </div>
//             <div className="col-6 pl-5 pr-5">
//               <p>
//                 In essence, ProConnect serves as a platform that caters to the
//                 common aspiration among students to gain practical exposure to
//                 real-world interviews and the dynamics of various industries. By
//                 forging direct connections between eager students and seasoned
//                 professionals, the platform not only aids in refining interview
//                 skills but also cultivates networking opportunities and a deeper
//                 understanding of professional trajectories.{" "}
//               </p>
//               <br></br>
//               <p>
//                 ProConnect is poised to play a pivotal role in student's journey
//                 towards enhanced confidence, expanded knowledge, and
//                 well-informed career decisions. Our mock interviews are
//                 conducted by IT industry experts, so you’re sure to improve your
//                 chances of getting hired!
//               </p>
//             </div>
//           </div>
//             </div>

//         <br></br>
//       </div>
//       <div>
//     <div className="text-left">
//       <img
//         src={studentDoodle}
//         alt=""
//         className="rounded float-left"
//         style={{ height: "220px", width: "150px" }}
//       />
//     </div>
//     <div className="text-right">
//       <img
//         src={teacherDoodle}
//         alt=""
//         className="rounded float-right"
//         style={{ height: "220px", width: "150px" }}
//       />
//     </div>
//   </div>
//       <Footer></Footer>  
//     </div>
//   );
// };

// export default About;


import React from "react";
import studentDoodle from "../images/student.png";
import teacherDoodle from "../images/teacher.png";

import Footer from "./Footer";

const About = () => {
  const sectionStyle = {
    backgroundColor: "#f8f8f8",
    paddingLeft:"0px",
    paddingRight:"0px",
    borderRadius: "10px",
  };

  const titleStyle = {
    paddingLeft:"0px",
    paddingRight:"0px",
    color: "#4455a4",
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const contentStyle = {
    paddingLeft:"0px",
    paddingRight:"0px",
    fontSize: "18px",
    lineHeight: "1.5",
  };

  const imageStyle = {
    height: "220px",
    width: "150px",
  };

  return (
    <div  className="container-fluid pt-5" style={{paddingLeft:"0px",paddingRight:"0px",height: "90%"}} >
      <div className="container-fluid pt-5" style={sectionStyle}>
        <h1 className="pt-2" style={titleStyle}>
          ABOUT PROCONNECT
        </h1>
        <div className="container-fluid pt-3">
          <div className="row v-100 pt-2 text-left">
            <div className="col-6 ">
              <p style={contentStyle}>
                Interviews are crucial moments in one’s career. Theoretical
                knowledge of interview questions isn't enough when you actually
                face an interview. Too often fear takes over our performance in
                job interviews. Practice & preparation are crucial to get over
                your anxieties when attending an interview.
              </p>
              <br />
              <p style={contentStyle}>
                ProConnect is a user-friendly WebApp designed to seamlessly
                connect students with established working professionals. Its
                primary objective is to offer students a realistic and immersive
                interview experience, fostering their professional growth. By
                cutting out unnecessary intermediaries, ProConnect streamlines
                the process, making it effortless for both parties involved.
              </p>
            </div>
            <div className="col-6">
              <p style={contentStyle}>
                In essence, ProConnect serves as a platform that caters to the
                common aspiration among students to gain practical exposure to
                real-world interviews and the dynamics of various industries. By
                forging direct connections between eager students and seasoned
                professionals, the platform not only aids in refining interview
                skills but also cultivates networking opportunities and a deeper
                understanding of professional trajectories.
              </p>
              <br />
              <p style={contentStyle}>
                ProConnect is poised to play a pivotal role in students' journey
                towards enhanced confidence, expanded knowledge, and
                well-informed career decisions. Our mock interviews are
                conducted by IT industry experts, so you’re sure to improve your
                chances of getting hired!
              </p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container-fluid text-center mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={studentDoodle}
              alt=""
              className="rounded float-left"
              style={imageStyle}
            />
          </div>
          <div className="col-md-6">
            <img
              src={teacherDoodle}
              alt=""
              className="rounded float-right"
              style={imageStyle}
            />
          </div>
        </div>
        <br></br>
      </div>
      <Footer />
    </div>
  );
};

export default About;
