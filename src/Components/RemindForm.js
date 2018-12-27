import React, { Component } from "react";
require('react-datetime');
class RemindForm extends Component{
    render(){
        return(
            <div>
                <div>
                    <p>Set a Reminder</p>
                </div>
                <div>
                    <form name="form">
                        DATE: return <Datetime/>
                        &nbsp;TIME :&nbsp;&nbsp;&nbsp;&nbsp;<input type="time"></input><br/><br/>
                        REMINDER FOR:&nbsp; <input type="text"></input><br/><br/>
                        REPEAT :&nbsp;&nbsp;&nbsp;<input type="number"></input>
                        <br></br>
                        <button type="submit" form="form" value="Submit">Submit</button> 
                    </form>
                </div>
            </div>
        );
    }
}
export default RemindForm;