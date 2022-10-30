import React, { Component } from "react";
import "./CategoryBlock.scss";
import InformationEntry from "./InformationEntry";

export default class CategoryBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, entries } = this.props;

    return (
      <div className="category-block">
        <h1>{name}</h1>
        <form className="category-block-list" id={`${name}-form`}>
          {Object.keys(entries).map((key, idx) => (
            <InformationEntry
              key={idx}
              placeholder={key}
              value={entries[key]}
            />
          ))}
        </form>
      </div>
    );
  }
}
