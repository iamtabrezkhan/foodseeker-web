import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DragDropImage from "./components/DragDropImage/DragDropImage";
import Home from "./components/Home/Home";
import History from "./components/History/History";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" component={History} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
