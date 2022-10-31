import React, { Component } from "react";
import update from "immutability-helper";
import UserInfo from "./UserInfo";
import ResumeTemplate from "./ResumeTemplate";
import "./ResumeBuilder.scss";

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [
        {
          id: 1,
          "First Name": "Tim",
          "Last Name": "Krashevsky",
          "Phone Number": "(224)-723-2355",
          Address: "816 N Leavitt, #3F",
          "Email Address": "tim.krashevsky@gmail.com",
          Description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          `,
        },
      ],
      educationHistory: [
        {
          id: 1,
          School: "University of Illinois at Urbana-Champaign",
          From: "August 2017",
          To: "May 2021",
          Degree: "B.S. Aerospace Engineering",
          Location: "Champaign",
          Notes: [
            {
              id: 1,
              text: "Graduated with Honors",
            },
          ],
        },
      ],
      employmentHistory: [
        {
          id: 1,
          Employer: "Connamara",
          From: "2020-09-01",
          To: "Present",
          "Job Title": "Software Engineer",
          Tasks: [
            {
              id: 1,
              text: "Managed software stack and did stuff",
            },
            {
              id: 2,
              text: "Also did some other stuff too!",
            },
          ],
          Location: "Chicago",
        },
      ],
    };

    this.addExperience = this.addExperience.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(id, task) {
    const parsedID = parseInt(id, 10);
    this.setState((prevState) => {
      const idx = prevState.employmentHistory.findIndex(
        (e) => e.id === parsedID
      );
      const updatedTasks = update(prevState.employmentHistory[idx].Tasks, {
        $push: [task],
      });
      const employmentWithNewTask = {
        ...prevState.employmentHistory[idx],
      };
      employmentWithNewTask.Tasks = updatedTasks;
      return {
        employmentHistory: update(prevState.employmentHistory, {
          $splice: [[idx, 1, employmentWithNewTask]],
        }),
      };
    });
  }

  deleteExperience(id) {
    this.setState((prevState) => {
      const idx = prevState.employmentHistory.findIndex((e) => e.id === id);
      return {
        employmentHistory: update(prevState.employmentHistory, {
          $splice: [[idx, 1]],
        }),
      };
    });
  }

  addExperience(experience) {
    this.setState((prevState) => ({
      employmentHistory: prevState.employmentHistory.concat(experience),
    }));
  }

  deleteEducation(id) {
    this.setState((prevState) => {
      const idx = prevState.educationHistory.findIndex((e) => e.id === id);
      return {
        educationHistory: update(prevState.educationHistory, {
          $splice: [[idx, 1]],
        }),
      };
    });
  }

  addEducation(education) {
    this.setState((prevState) => ({
      educationHistory: prevState.educationHistory.concat(education),
    }));
  }

  render() {
    const { details, educationHistory, employmentHistory } = this.state;
    return (
      <div className="resume-builder">
        <UserInfo
          details={details}
          educationHistory={educationHistory}
          employmentHistory={employmentHistory}
          addExperience={this.addExperience}
          addEducation={this.addEducation}
          deleteExperience={this.deleteExperience}
          deleteEducation={this.deleteEducation}
          addTask={this.addTask}
        />
        <ResumeTemplate
          details={details}
          educationHistory={educationHistory}
          employmentHistory={employmentHistory}
        />
      </div>
    );
  }
}
