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
      checked:false
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
  
  handleSwitchChange = checked => dd=> {
    console.log("ddwdwdwdwdwd",dd)
    this.setState({ checked });
    // if (extra > 0) 
    // {   
    //   setTimeout(() => {
    //     var notification = new Notification("Notification title", {
    //       icon:
    //         "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
    //       body: text
    //     });
    //   }, extra * 1000);
    // } else {
    //   setTimeout(() => {
    //     var notification = new Notification("Notification title", {
    //       icon:
    //         "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
    //       body: text
    //     });
    //   }, seconds);
    // }
  }

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

      // this.pushNotification(seconds);
    } else {
      alert("missing details");
    }
  };

  // pushNotification = args => {

  // };

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
    console.log(e, "click");
    console.log(this.state.event, "event");
    this.setState({ popover: true, slot: e });
    console.log(moment(this.state.slot.start).format("DD-MM-YYYY"), "start");
    console.log(moment(this.state.event[0].start).format("DD-MM-YYYY"));
    for (var i = 0; i < this.state.event.length; i++) {
      if (
        moment(this.state.event[i].start).format("DD-MM-YYYY") ===
        moment(this.state.slot.start).format("DD-MM-YYYY")
      ) {
        this.state.slotEvent.push(this.state.event[i]);

        // slotEvents.push(this.state.event[i]);
      }
    }
    console.log("event push",this.state.slotEvent);
    this.setState({ popover: false });
    this.setState({ popover: true });
  };

  render() {
    console.log(this.state.slotEvent, "Render");
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
            <span className="left">Set Time : </span>
            <span className="right">
              <input
                type="number"
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
          <div
            className="dialog"
            style={{
              width: "30vw",
              height: "20vh",
              background: "#fff"
            }}
          >
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
            <div style={{ height: "inherit", width: "inherit" }}>
              {this.state.slotEvent &&
                this.state.slotEvent.map((event, index) => {
                  return (
                    <div>
                    <p style={{ color: "#000" }}>
                      {" "}
                      {event.title} &nbsp; {moment(event.start).format("hh:mm")}
                    <label htmlFor="normal-switch">
                    <Switch
                      onChange={this.handleSwitchChange(this.state.checked,event.start)}
                      checked={this.state.checked}
                      id="normal-switch"
                    />
                  </label>
                  </p>
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