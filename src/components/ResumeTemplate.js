import React from "react";
import "./ResumeTemplate.scss";
import Details from "./Details";
import EmploymentHistory from "./EmploymentHistory";
import EducationHistory from "./EducationHistory";
import avatar from "../assets/blank-avatar.png";

const ResumeTemplate = React.forwardRef((props, ref) => {
  const { details, employmentHistory, educationHistory } = props;
  const name = `${details[0]["First Name"]} ${details[0]["Last Name"]}`;
  const description = details[0].Description;
  console.log(ref);

  return (
    <div ref={ref} className="resume-template">
      <div className="container-left">
        <img src={avatar} width="50" height="50" alt="Avatar.png" />
        <div className="name">{name}</div>
        {details.map((detail) => (
          <Details key={`detail_${name}`} details={detail} />
        ))}
      </div>
      <div className="container-right">
        <div className="profile-container">
          <h3>Profile</h3>
          <div className="description">{description}</div>
        </div>

        <div className="employment-container">
          <h3>Employment History</h3>
          {employmentHistory.map((employment) => (
            <EmploymentHistory
              key={`detail_${employment.Employer}`}
              employment={employment}
            />
          ))}
        </div>

        <div className="education-container">
          <h3>Education History</h3>
          {educationHistory.map((education) => (
            <EducationHistory
              key={`detail_${education.School}`}
              education={education}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ResumeTemplate;
