import React, { Component } from "react";
import "./InformationEntry.scss";

export default class InformationEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { placeholder, value } = this.props;

    return <input type="text" placeholder={placeholder} defaultValue={value} />;
  }
}
