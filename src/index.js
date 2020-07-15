import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList";
  import RabbitList from "./RabbitList";

var destination = document.querySelector("#container")
  
ReactDOM.render(
    <div>
    	<h1>Traffic Generator</h1>
    	<h3>JAVA APP</h3>
        <TodoList/>
        <h3>PYTHON APP</h3>
        <RabbitList/>
    </div>,
    destination
);