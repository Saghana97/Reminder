import React, { Component } from "react";
import "./App.css";
import Form from "./Components/Form";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="header"> REMINDER </div> */}
        <header className="header">REMINDER</header>
        <Form />
      </div>
    );
  }
}

export default App;
