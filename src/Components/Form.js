import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import ViewCalendar from "./ViewCalendar";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment); // or globalizeLocalizer

let events = [];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      time:"10:00",
      text: "",
      event: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onChange = time => this.setState({ time });

  handleChange(date) {
    console.log(date, "date");
    this.setState({
      startDate: date
    });
  }

  handleTextChange = e => {
    this.setState({ 
      text: e.target.value
     });
  };

  addEvent = e => {
    const { text, startDate, time, event } = this.state;
    if (text && time && startDate) {
      let date = this.convert(startDate);
      console.log("jjjjjj",time)
      let finalDate = moment(date + " " + time);
      console.log("final",finalDate)

      event.push({
        title: text,
        start: finalDate._d,
        end: finalDate._d,
        allDay: false
      });
      this.setState({
        event,
        startDate
      })
      //this.handleChange(startDate); 
      alert("event Addded");
    } else {
      alert("missing details");
    }
  };

  convert = args => {
    var date = new Date(args),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  render() {
    console.log(this.state.event);
    return (
      <div className="outer-wrapper">
        <div className="title">Set a Reminder</div>

        <div className="form">
          <div className="element">
            <span className="left">Date:</span>
            <span className="right">
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                className="input"
              />
            </span>
          </div>
          <div className="element">
            <span className="left">Time:</span>
            <span className="right">
              <TimePicker
                className="input"
                onChange={this.onChange}
                value={this.state.time}
              />
            </span>
          </div>
          <div className="element">
            <span className="left">Message : </span>
            <span className="right">
              <input
                type="text"
                className="input"
                onChange={e => this.handleTextChange(e)}
              />
            </span>
          </div>
          {/* SET TIME: <input type="number" /> */}
          <div className="button" onClick={e => this.addEvent(e)}>
            {" "}
            Submit{" "}
          </div>
        </div>

        <Calendar
          localizer={localizer}
          // defaultDate={new Date()}
          defaultView="month"
          events={this.state.event}
          style={{
            height: "80vh",
            width: "80vw",
            alignSelf: "center",
            marginBottom: 100,
            marginTop: 50
          }}
        />
      </div>
    );
  }
}
export default Form;
