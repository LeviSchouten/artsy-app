import React from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Content />
      </Router>
    </div>
  );
};

export default App;
