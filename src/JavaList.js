import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import axios from 'axios';

class JavaList extends Component {
  constructor(props) {
    super(props);
 
     this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.addItemRabbit = this.addItemRabbit.bind(this);
    this.addItemRest = this.addItemRest.bind(this);

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

  addItemRabbit(e) {
      if (this._inputElement.value !== "") {
        var newItem = {
          text: this._inputElement.value + " RABBIT",
          key: Date.now()
        };

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

  addItemRest(e) {
      if (this._inputElement.value !== "" && !isNaN(this._inputElement.value)) {
        var newItem = {
          text: this._inputElement.value + " HTTP",
          key: Date.now()
        };
     
       axios.post('http://192.168.170.6:8080/MavenApp/SimpleServlet', {
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
      if (this._inputElement.value !== "" && !isNaN(this._inputElement.value)) {
        var newItem = {
          text: this._inputElement.value,
          key: Date.now()
        };

       // for (var i = 0; i < 20; i++) {
       //    axios.get(this._inputElement.value)
       //    .then(res => {
       //      const persons = res.data;
       //      console.log(res.data);
       //    })
       // }
     
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
                  placeholder="enter java number">
          </input>
          <button type="button" onClick={this.addItemRest}>HTTP-JAVA</button>
          <button type="button" onClick={this.addItemRabbit}>RABBIT-JAVA</button>
        </form>

      </div>
      <h3>Java Queries</h3>
      <TodoItems entries={this.state.items}
                 delete={this.deleteItem}/>
    </div>
  );
}

}
 
export default JavaList;
