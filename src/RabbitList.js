import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

import axios from 'axios';
import {sendPost} from './axios';

class RabbitList extends Component {
  constructor(props) {
    super(props);
 
     this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
   
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
  }


  addItem(e) {
      if (this._inputElement.value !== "") {
        var newItem = {
          text: this._inputElement.value,
          key: Date.now()
        };
      console.log("created Message");
      
       axios.post('http://localhost:5000', {
           Name: 'Fred',
           Age: this._inputElement.value
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

render() {
  return (
    <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
          <input ref={(a) => this._inputElement = a} 
                  placeholder="enter rabbitMQ address">
          </input>
          <button type="submit">QUERY</button>
        </form>

      </div>
      <h3>Created Queries</h3>
      <TodoItems entries={this.state.items}
                 delete={this.deleteItem}/>
    </div>
  );
}

}
 
export default RabbitList;
