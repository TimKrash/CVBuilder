import React from "react";
import Header from "./components/Header";
import ResumeBuilder from "./components/ResumeBuilder";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <ResumeBuilder />
    </div>
  );
}

export default App;
