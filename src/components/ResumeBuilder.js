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
          "First Name": "",
          "Last Name": "",
          "Phone Number": "",
          Address: "",
          "Email Address": "",
          Description: "",
        },
      ],
      educationHistory: [
        {
          id: 1,
          Degree: "",
          School: "",
          Location: "",
          From: "",
          To: "",
        },
      ],
      employmentHistory: [
        {
          id: 1,
          "Job Title": "",
          Employer: "",
          Location: "",
          From: "",
          To: "",
          Tasks: [{ id: 1, text: "" }],
        },
      ],
    };

    this.addExperience = this.addExperience.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, parentID, key, value, taskID = null) {
    const parsedID = parseInt(parentID, 10);
    const parsedTaskID = taskID && parseInt(taskID, 10);

    switch (name) {
      case "Personal Info":
        this.setState((prevState) => {
          const detailWithEdits = {
            ...prevState.details[0],
          };
          detailWithEdits[key] = value;

          return {
            details: update(prevState.details, {
              $splice: [[0, 1, detailWithEdits]],
            }),
          };
        });
        break;
      case "Experience":
        this.setState((prevState) => {
          const idx = prevState.employmentHistory.findIndex(
            (el) => el.id === parsedID
          );
          const experienceWithEdits = {
            ...prevState.employmentHistory[idx],
          };
          if (taskID) {
            const taskIdx = experienceWithEdits.Tasks.findIndex(
              (el) => el.id === parsedTaskID
            );
            experienceWithEdits.Tasks[taskIdx].text = value;
          } else {
            experienceWithEdits[key] = value;
          }

          return {
            employmentHistory: update(prevState.employmentHistory, {
              $splice: [[idx, 1, experienceWithEdits]],
            }),
          };
        });
        break;
      case "Education":
        this.setState((prevState) => {
          const idx = prevState.educationHistory.findIndex(
            (el) => el.id === parsedID
          );

          const educationWithEdits = {
            ...prevState.educationHistory[idx],
          };
          educationWithEdits[key] = value;

          return {
            educationHistory: update(prevState.educationHistory, {
              $splice: [[idx, 1, educationWithEdits]],
            }),
          };
        });
        break;
      default:
        break;
    }
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

  removeTask(employmentID, taskID) {
    const parsedID = parseInt(employmentID, 10);
    const parsedTaskID = parseInt(taskID, 10);
    this.setState((prevState) => {
      const idx = prevState.employmentHistory.findIndex(
        (e) => e.id === parsedID
      );
      const taskIdx = prevState.employmentHistory[idx].Tasks.findIndex(
        (e) => e.id === parsedTaskID
      );

      const updatedTasks = update(prevState.employmentHistory[idx].Tasks, {
        $splice: [[taskIdx, 1]],
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
          removeTask={this.removeTask}
          handleChange={this.handleChange}
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
