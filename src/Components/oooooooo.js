import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import ViewCalendar from "./ViewCalendar";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";
import Calendar from "react-big-calendar";
import moment, { duration } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Switch from "react-switch";

const localizer = Calendar.momentLocalizer(moment); // or globalizeLocalizer

let events = [];
// let slotEvents = [];
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      time: "10:00",
      text: "",
      event: [],
      popover: false,
      extra: 0,
      slot: {},
      slotEvent: [],
      checked: false,
      currentTime: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onChange = time => this.setState({ time });

  handleChange(date) {
    // console.log(date, "date");
    this.setState({
      startDate: date
    });

  }

  handleSwitchChange = checked => dd => { 

    console.log("set rime,", dd);

    this.setState({ checked});
    // console.log("Args", this.state.currentTime);
    var finalDate = moment(this.state.currentTime);
    // console.log("date is ",finalDate);
    var end = new Date();
    
    var seconds = finalDate - end;

    console.log("secoccecec",seconds);

    var notification = null;
    
    // console.log("seconds is",finalDate);
    

    if (this.state.checked) {
      console.log("inside checked");
      if (this.state.extra > 0)
       { 
        console.log("inside greater");
        setTimeout(() => {
          notification = new Notification("Your Reminder", {
            icon:
              "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            body: this.state.text
          });
        }, seconds);

        setTimeout(() => {
          notification = new Notification("Your Reminder", {
            icon:
              "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            body: this.state.text
          });
        }, this.state.extra * 1000);

        // finalDate = moment(finalDate, "HH:mm:ss")
        //   .add(extra, "minutes")
        //   .format("HH:mm");
        // console.log(finalDate);

        // var diff = finalDate - end;
      } else {
        console.log("inside 0");
        setTimeout(() => {
          notification = new Notification("Your Reminder", {
            icon:
              "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            body: this.state.text
          });
        }, seconds);
      }
    } else {
      console.log("inside not checked");
      notification = null;
    }
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  addEvent = e => {
    const { text, startDate, time, event, extra } = this.state;
    if (text && time && startDate) {
      let date = this.convert(startDate);
      let finalDate = moment(date + " " + time);
      var end = new Date();

      event.push({
        title: text,
        start: finalDate._d,
        end: finalDate._d,
        allDay: false
      });
      alert("Event added");

      this.setState({
        event,
        startDate: finalDate._d
      });

      this.handleChange(startDate);

      var seconds = finalDate - end;
      // console.log("final date",finalDate);
      // console.log("end date is",end);

      // this.pushNotification(seconds);
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

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      if (!Notification) {
        alert(
          "Desktop notifications not available in your browser. Try Chromium."
        );
        return;
      }

      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });
  }

  click = e => {
    // console.log(e, "click");
    // console.log(this.state.event, "event");
    this.setState({ popover: true, slot: e });
    this.setState({ slotEvent: [] });
    // console.log(moment(this.state.slot.start).format("DD-MM-YYYY"), "start");
    // console.log(moment(this.state.event[0].start).format("DD-MM-YYYY"));
    // console.log("hhh", this.state.event.length);
    for (var i = 0; i < this.state.event.length; i++) {
      if (
        moment(this.state.event[i].start).format("DD-MM-YYYY") ===
        moment(this.state.slot.start).format("DD-MM-YYYY")
      ) {
        this.state.slotEvent.push(this.state.event[i]);

        // slotEvents.push(this.state.event[i]);
      }
    }
    // this.state.slotEvent.push([]);

    // console.log(this.state.slotEvent, "event push");
    this.setState({ popover: false });
    this.setState({ popover: true });
  };

  switchClick = args => {
    console.log(args, "args args args");
    this.setState({ currentTime: args });
  };

  render() {
    // console.log(this.state.slotEvent, "Render");
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
          <div className="element">
            <span className="left">Snooze Time: </span>
            <span className="right">
              <input
                type="number"
                className="input"
                onChange={e => {
                  this.setState({ extra: e.target.value });
                }}
              />
            </span>
          </div>
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
          selectable={true}
          onSelectSlot={e => {
            this.click(e);
          }}
        />
        <div
          className="popover"
          style={{
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 0,
            top: 0,
            display: this.state.popover ? "flex" : "none"
          }}
        >
          <div className="dialog">
            <div
              className="close"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "inherit",
                height: "20px"
              }}
            >
              <div
                style={{ marginTop: 20, marginRight: 20, cursor: "pointer" }}
                onClick={() => {
                  this.setState({ popover: false });
                }}
              >
                {" "}
                X{" "}
              </div>
            </div>
            <div style={{ width: "inherit" }}>
              <div style={{ fontSize: 14, fontWeight: "500", padding: 20 }}>
                {this.state.slotEvent.length} events{" "}
              </div>
              {this.state.slotEvent &&
                this.state.slotEvent.map((event, index) => {
                  return (
                    <div
                      id={index}
                      onClick={() => this.switchClick(event.start)}
                      className="event"
                    >
                      <div style={{ color: "#000" }}>
                        {" "}
                        {event.title} &nbsp;{" "}
                      </div>
                      <div>{moment(event.start).format("hh:mm")}</div>
                      <div >
                        <label htmlFor="normal-switch">
                          <Switch
                            onChange={this.handleSwitchChange(this.state.checked,event.start)}
                            checked={this.state.checked}
                            id="normal-switch"
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Form;