import React from "react";

export default function EmploymentHistory(props) {
  const { employment } = props;

  return (
    <div className="employment">
      <div className="employment-entry">
        <div className="employment-entry-header">
          {employment["Job Title"]}, {employment.Employer},{" "}
          {employment.Location}
        </div>
        <div className="employment-entry-subheader">
          {employment.From} - {employment.To}
        </div>
        <ul>
          {employment.Tasks.map((task) => (
            <li key={`${Date.now()}_${task.id}`}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
