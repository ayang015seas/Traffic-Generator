import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

import axios from 'axios';
import {sendPost} from './axios';
import publicIP from 'react-native-public-ip';

class PythonList extends Component {
  constructor(props) {
    super(props);
 
     this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.addRabbitPython = this.addRabbitPython.bind(this);
    this.addRestPython = this.addRestPython.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
    publicIP()
    .then(ip => {    
      console.log(ip);
      // '47.122.71.234'
    })
    .catch(error => {
      console.log(error);
      // 'Unable to get IP address.'
    });
  }
   
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
  }

  addRabbitPython(e) {
      if (this._inputElement.value !== "" && !isNaN(this._inputElement.value)) {
        var newItem = {
          text: this._inputElement.value + " RABBIT",
          key: Date.now()
        };
        // 3050 is the port of the react adapter
        axios.post('http://192.168.170.6:3050', {
         Number: this._inputElement.value
       })
       .then(function (response) {
         console.log(response);
       })

        this.setState((prevState) => {
          return { 
            items: prevState.items.concat(newItem) 
          };
        });
       
        this._inputElement.value = "";
      }
       
      console.log(this.state.items);
         
      e.preventDefault();
  }

  addRestPython(e) {
      if (this._inputElement.value !== "" && !isNaN(this._inputElement.value)) {
        var newItem = {
          text: this._inputElement.value + " HTTP",
          key: Date.now()
        };
       // 5001 is the port of the non-adapter
       axios.post('http://192.168.170.6:5001', {
         Number: this._inputElement.value
       })
       .then(function (response) {
         console.log(response);
       })

        this.setState((prevState) => {
          return { 
            items: prevState.items.concat(newItem) 
          };
        });
       
        this._inputElement.value = "";
      }
       
      console.log(this.state.items);
         
      e.preventDefault();
  }

  addItem(e) {
      if (this._inputElement.value !== "") {
        var newItem = {
          text: this._inputElement.value,
          key: Date.now()
        };
      console.log("created Message");
      
       // axios.post('http://192.168.108.19:5000', {
       //     Age: this._inputElement.value
       //   })
       //   .then(function (response) {
       //     console.log(response);
       //   })

     
        this.setState((prevState) => {
          return { 
            items: prevState.items.concat(newItem) 
          };
        });
       
        this._inputElement.value = "";
      }
       
      console.log(this.state.items);
         
      e.preventDefault();
  }

render() {
  return (
    <div className="todoListMain">
      <div className="header">
        <form>
          <input ref={(a) => this._inputElement = a} 
                  placeholder="enter python number">
          </input>
          <button type="button" onClick={this.addRestPython}>HTTP-PYTHON</button>
          <button type="button" onClick={this.addRabbitPython}>RABBIT-PYTHON</button>        
          </form>

      </div>
      <h3>Python Queries</h3>
      <TodoItems entries={this.state.items}
                 delete={this.deleteItem}/>
    </div>
  );
}

}
 
export default PythonList;
