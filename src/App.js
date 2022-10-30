import React, { Component } from "react";
import Header from "./components/Header";
import ResumeBuilder from "./components/ResumeBuilder";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <ResumeBuilder />
      </div>
    );
  }
}

export default App;
