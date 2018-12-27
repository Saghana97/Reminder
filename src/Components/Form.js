import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
 
import "react-datepicker/dist/react-datepicker.css"; 
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      time: '10:00',
    };
    this.handleChange = this.handleChange.bind(this);
    
  }
  onChange = time => this.setState({ time })
  
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  render() {
    return (
        <div>
            <div>
                <p> Set a Reminder</p>
            </div>
        <form>
        <div>
        DATE:<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
            />
            <br/>

          TIME:<TimePicker
          onChange={this.onChange}
          value={this.state.time}
        /><br/>
        REMINDER : <input type="text"></input><br/>
        SET TIME: <input type="number"></input>
      </div>
      </form>
      </div>
    );
  }
}
export default Form;