import React, { Component } from 'react';
import './App.css';
import RemindForm from "./Components/RemindForm"
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header >REMINDER</header> */}
        <RemindForm/>
      </div>
    );
  }
}

export default App;
