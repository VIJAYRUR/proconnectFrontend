import React from 'react'
import studentDoodle from "../images/student.png";
import teacherDoodle from "../images/teacher.png";
const Aboutimages = () => {
  return (
    <div>
    <div className="text-left">
      <img
        src={studentDoodle}
        alt=""
        className="rounded float-left"
        style={{ height: "220px", width: "150px" }}
      />
    </div>
    <div className="text-right">
      <img
        src={teacherDoodle}
        alt=""
        className="rounded float-right"
        style={{ height: "220px", width: "150px" }}
      />
    </div>
  </div>
  )
}

export default Aboutimages
