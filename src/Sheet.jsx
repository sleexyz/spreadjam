import React, {PropTypes} from "react";
import ReactDOM from "react-dom";

import Tone from "tone";

/* import Audio from "./Audio";*/

export default React.createClass ({
  propTypes: {
    roll: PropTypes.array
  },
  componentDidMount() {
    this.sample = new Tone.Buffer("./FWDL.mp3");
    this.player = new Tone.Player({
      url: this.sample,
      retrigger: true
    }) .toMaster();
    //sampler!
  },
  play () {
    console.log("playing bithc");
    let loop = new Tone.Sequence((time, note) => {
      console.log(time, note);
      this.player.start();
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8], "4n");
    loop.start();
    Tone.Transport.start();
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
