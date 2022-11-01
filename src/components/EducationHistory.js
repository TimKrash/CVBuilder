import React from "react";

export default function EducationHistory(props) {
  const { education } = props;

  return (
    <div className="education">
      <div className="education-entry">
        <div className="education-entry-header">
          {education.Degree}, {education.School}, {education.Location}
        </div>
        <div className="education-entry-subheader">
          {education.From} - {education.To}
        </div>
      </div>
    </div>
  );
}
