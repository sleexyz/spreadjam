import React from "react";
import ReactDOM from "react-dom";
import gapi from "gapi";

import App from "./App";
import Sheet from "./Sheet.jsx"

const CLIENT_ID = "304803725949-1ule70akblltdsp0v70ubqqbg7cc0eoc.apps.googleusercontent.com";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];


const AuthWrapper = React.createClass({
  getInitialState() {
    return {
      authenticated: false
    };
  },
  componentDidMount() {
    const fn = () => this.auth(true);

    if (gapi.auth !== undefined) {
      fn();
    } else {
      setTimeout(fn, 1000);
    }
  },
  auth(immediate) {
    gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': immediate
    }, this.handleAuthResult);
  },
  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      this.setState({authenticated: true});
    }else {
      console.log(authResult);
    }
  },

  render() {
    let auth = this.state.authenticated
        ? (<div></div>)
        : (<div><button onClick={() => this.auth(false)}>authorize</button></div>);
    let app = this.state.authenticated
        ? (<SheetsAPIWrapper/>)
        : (<div>
           </div>);
    return (<div> {auth} {app}</div>);
  }
});

// string -> maybe string
function url2ssid (url) {
  //"https://docs.google.com/spreadsheets/d/1rz5CY1HVVY5T1rQlVGHqCwb39QBZBYv2CD72rSzHf4c/edit#gid=952693803"
  if (url.substring(0, 39) === "https://docs.google.com/spreadsheets/d/") {
    let lastslash = url.lastIndexOf('/')
    let str = url.substring(39, lastslash);
    return str;
  } else {
    return null;
  }
}


// TODO: add debounce and validation
const SheetsAPIWrapper = React.createClass({
  getInitialState() {
    return {
      url: "https://docs.google.com/spreadsheets/d/1rz5CY1HVVY5T1rQlVGHqCwb39QBZBYv2CD72rSzHf4c/edit#gid=952693803",
    };
  },
  componentDidMount() {
    const discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    gapi.client
      .load(discoveryUrl)
      .then(this.loadStuff);
  },
  onUrlChange(e) {
    console.log(e.currentTarget.value);
  },
  render() {
    const ssid = url2ssid(this.state.url)
    let app = ssid === null
        ? <p>could not load url</p>
        : <App ssid={ssid}/>;
    return (
      <div>
        <input value={this.state.url} onChange={this.onUrlChange}/>
        <p>Welcome. You are authenticated</p>
        {app}
      </div>
    );
  }
});


const test = [[5,0],[7,0],[9,0],[0,0],[6,0],[0,0],[9,0],[0,0],[9,0],[0,"1"],[9,0],[9,0],[0,"0"],[9,0],[0,"0"],[9,0],[0,"0"],[9,0],[0,"0"],[9,0],[0,"0"],[9,0]];

const Entry = React.createClass({
  render() {
    return (<div>
            <h1> spreadsheet-tunes </h1>
            <Sheet roll={test}/>
                {/* <AuthWrapper/> */}
            </div>);
  }
});

ReactDOM.render(<Entry/>, document.getElementById("entry"));
