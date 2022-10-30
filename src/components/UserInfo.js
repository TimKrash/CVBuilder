import React, { Component } from "react";
import "./UserInfo.scss";
import CategoryBlock from "./CategoryBlock";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { details, employmentHistory, educationHistory } = this.props;

    return (
      <div className="user-info">
        {details.map((detail, idx) => (
          <CategoryBlock key={idx} name="Personal Info" entries={detail} />
        ))}
        {employmentHistory.map((employer, idx) => (
          <CategoryBlock key={idx} name="Experience" entries={employer} />
        ))}
        {educationHistory.map((education, idx) => (
          <CategoryBlock key={idx} name="Education" entries={education} />
        ))}
      </div>
    );
  }
}
