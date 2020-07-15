import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import JavaList from "./JavaList";
import PythonList from "./PythonList";

var destination = document.querySelector("#container")
  
ReactDOM.render(
    <div>
    	<h1>Traffic Generator</h1>
    	<h3>JAVA APP</h3>
        <JavaList/>
        <h3>PYTHON APP</h3>
        <PythonList/>
    </div>,
    destination
);