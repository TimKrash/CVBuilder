import React, { useCallback, useState } from "react";
import "./UserInfo.scss";
import CategoryBlock from "./CategoryBlock";

export default function UserInfo(props) {
  const {
    details,
    employmentHistory,
    educationHistory,
    addExperience,
    addEducation,
    addTask,
    removeTask,
    deleteEducation,
    deleteExperience,
  } = props;

  const [employmentCount, setEmploymentCount] = useState(
    employmentHistory.length
  );
  const [educationCount, setEducationCount] = useState(educationHistory.length);

  const addNewExperience = useCallback(() => {
    const newExperience = {
      id: employmentCount + 1,
      Employer: "",
      From: "",
      To: "",
      Tasks: [{}],
      Location: "",
    };

    addExperience(newExperience);
    setEmploymentCount(employmentCount + 1);
  });

  const deleteEmployment = useCallback((event) => {
    const { id } = event.target.dataset;
    deleteExperience(id);
    setEmploymentCount(employmentCount - 1);
  });

  const addNewEducation = useCallback(() => {
    const newEducation = {
      id: educationCount + 1,
      School: "",
      From: "",
      To: "",
      Degree: "",
      Notes: [],
      Location: "",
    };

    addEducation(newEducation);
    setEducationCount(educationCount + 1);
  });

  const deleteSchool = useCallback((event) => {
    const { id } = event.target.dataset;
    deleteEducation(id);
    setEducationCount(educationCount - 1);
  });

  let isLastEmployment = false;
  let isLastEducation = false;

  const noEmploymentEntries = employmentCount === 0;
  const noEducationEntries = educationCount === 0;

  return (
    <div className="user-info">
      {details.map((detail) => (
        <CategoryBlock key={detail.id} name="Personal Info" entries={detail} />
      ))}
      {noEmploymentEntries === true && (
        <CategoryBlock
          name="Experience"
          noEntries={noEmploymentEntries}
          entries={{}}
          isLastEntry={null}
          deleteEntry={null}
          addNewEntry={addNewExperience}
          addTask={null}
          removeTask={null}
        />
      )}
      {employmentHistory.map((employer, idx) => {
        if (idx === employmentHistory.length - 1) {
          isLastEmployment = true;
        }

        return (
          <CategoryBlock
            key={employer.id}
            name="Experience"
            entries={employer}
            isLastEntry={isLastEmployment}
            noEntries={noEmploymentEntries}
            addNewEntry={addNewExperience}
            deleteEntry={deleteEmployment}
            addTask={addTask}
            removeTask={removeTask}
          />
        );
      })}
      {noEducationEntries === true && (
        <CategoryBlock
          name="Education"
          noEntries={noEducationEntries}
          entries={{}}
          isLastEntry={null}
          deleteEntry={null}
          addNewEntry={addNewEducation}
        />
      )}

      {educationHistory.map((education, idx) => {
        if (idx === educationHistory.length - 1) {
          isLastEducation = true;
        }

        return (
          <CategoryBlock
            key={education.id}
            name="Education"
            entries={education}
            isLastEntry={isLastEducation}
            addNewEntry={addNewEducation}
            deleteEntry={deleteSchool}
            noEntries={noEducationEntries}
          />
        );
      })}
    </div>
  );
}
