import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import gapi from "gapi";
import Sheet from "./Sheet";

function rollTrans(roll) {
  for (let i = 0; i < roll.length; i++) {
    let row = roll[i];
    if (row.length < 2) {
      row[0] = 0;
      row[1] = 0;
    }
    if (row[0] === "") {
      row[0] = 0;
    } else {
      row[0] = parseInt(row[0]);
    }
    if (row[1] === "") {
      row[1] = 0;
    } else {
      row[1] = parseInt(row[1]);
    }

  }
  return roll;
}

export default React.createClass ({
  propTypes: {
    ssid: PropTypes.string
  },
  getInitialState () {
    return {
      roll: null
    };
  },
  loadStuff() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.props.ssid,
      range: 'Take2!A:B'
    }).then((response) =>  {
      let range = response.result;
      if (range.values.length > 0) {
        this.setState({roll: range.values});
      }
    });
  },
  refresh () {
    this.loadStuff();
  },
  render() {
    let roll = this.state.roll === null
        ? (<div></div>)
        : (<Sheet roll={rollTrans(this.state.roll)}/>);
    return (<div>
            <button onClick={this.refresh}> refresh</button>
            {roll}
            </div>);
  }
});
