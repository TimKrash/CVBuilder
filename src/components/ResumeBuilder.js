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
    this.loadExample = this.loadExample.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.componentRef = React.createRef();
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

  loadExample() {
    const newResume = {
      details: [
        {
          id: 1,
          "First Name": "John",
          "Last Name": "Smith",
          "Phone Number": "(123)-456-7890",
          Address: "123 Happy Lane",
          "Email Address": "john.smith@gmail.com",
          Description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      educationHistory: [
        {
          id: 1,
          Degree: "B.S. Aerospace Engineering",
          School: "University of Happy Town",
          Location: "Happyville, HappyTown",
          From: "August 2017",
          To: "Present",
        },
      ],
      employmentHistory: [
        {
          id: 1,
          "Job Title": "Happy Man",
          Employer: "Happy Employer Inc.",
          Location: "Happyville, HappyTown",
          From: "December 2019",
          To: "Present",
          Tasks: [
            {
              id: 1,
              text: "This is the first task of my job!",
            },
            {
              id: 2,
              text: "This was another aspect of my job that I'm proud of!",
            },
            {
              id: 3,
              text: "I made plenty of people laugh at this job, it was great!",
            },
          ],
        },
        {
          id: 2,
          "Job Title": "Software Engineer",
          Employer: "Google",
          Location: "Chicago, Illinois",
          From: "December 2020",
          To: "Present",
          Tasks: [
            {
              id: 1,
              text: "Refactoring, documenting, unit testing and pacaking of module",
            },
            {
              id: 2,
              text: "Built full stack application using React (for web), React-Native (for mobile) and AWS cloud architecture",
            },
            {
              id: 3,
              text: "Responsible for developing a platform to imporove the current ecosystem offered to employees from leading Fortune 500 companies",
            },
          ],
        },
      ],
    };

    this.setState({
      details: newResume.details,
      employmentHistory: newResume.employmentHistory,
      educationHistory: newResume.educationHistory,
    });
  }

  resetFields() {
    const resetForm = {
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

    this.setState({
      details: resetForm.details,
      employmentHistory: resetForm.employmentHistory,
      educationHistory: resetForm.educationHistory,
    });
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
          loadExample={this.loadExample}
          resetFields={this.resetFields}
          toPrint={this.componentRef.current}
        />
        <ResumeTemplate
          details={details}
          educationHistory={educationHistory}
          employmentHistory={employmentHistory}
          ref={this.componentRef}
        />
      </div>
    );
  }
}
