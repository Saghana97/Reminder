import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class ViewCalendar extends Component {
  // onChange = date => this.setState({ date });

  render() {
    return (
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          style={{ height: "60vh" }}
        />
      </div>
    );
  }
}
export default ViewCalendar;
