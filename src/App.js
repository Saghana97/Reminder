import React, { Component } from 'react';
import './App.css';
import Form from "./Components/Form"
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header >REMINDER</header> */}
        {/* <RemindForm/> */}
        <Form/>
      </div>
    );
  }
}

export default App;
