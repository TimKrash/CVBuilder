import React, { Component } from "react";
import UserInfo from "./UserInfo";
import ResumeTemplate from "./ResumeTemplate";
import "./ResumeBuilder.scss";

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [
        {
          "First Name": "",
          "Last Name": "",
          "Phone Number": "",
          Address: "",
          "Email Address": "",
        },
      ],
      educationHistory: [
        {
          School: "",
          From: "",
          To: "",
          Degree: "",
        },
      ],
      employmentHistory: [
        {
          Employer: "",
          From: "",
          To: "",
          "Job Title": "",
          Description: "",
        },
      ],
    };
  }

  render() {
    const { details, educationHistory, employmentHistory } = this.state;
    return (
      <div className="resume-builder">
        <UserInfo
          details={details}
          educationHistory={educationHistory}
          employmentHistory={employmentHistory}
        />
        <ResumeTemplate />
      </div>
    );
  }
}
