import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import gapi from "gapi";

import Tone from "tone";

/* import Audio from "./Audio";*/

export default React.createClass ({
  propTypes: {
    roll: PropTypes.array
  },
  play () {
    console.log("playing bithc");
    let player = new Tone.Player("./FWDL.mp3").toMaster();
    Tone.Buffer.on("load", () => {
      player.start();
    });
  },
  render() {
    const cool = this.props.roll.map(
      (v) =>
        <div>
        <span>{v[0]}</span>
        <span>{v[1]}</span>
        </div>
    );
    console.log(this.props.roll);
    return (<div>
            <button onClick={this.play}> play</button>
            <div children={cool}/>
            </div>);
  }
});
