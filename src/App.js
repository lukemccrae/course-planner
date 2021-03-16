import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Front from './Components/Front';
import Dash from './Components/Dash';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      timers: [],
      username: '',
      log: [],
      showRegister: false,
      groups: [],
      colors: [
        "#428A79",
        "#71AF55",
        "#F00500",
        "#E4BE67",
        "#E47043",
        "#B63534",
        "#9598AB",
    ],
    }
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.getTimers = this.getTimers.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.editOff = this.editOff.bind(this);
    this.timeFormat = this.timeFormat.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      //verify token
      fetch('https://banana-crumble-42815.herokuapp.com/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
          this.setState({token: obj.token, groups: json.groups, log: json.log, username: json.email, isLoading: false})
        } else {
          this.setState({isLoading: false})
        }
      })
      // .then(fetch('http://localhost:3000/api/account?token=' + obj.token).then(res => res.json()).then(json => {
      //   if (json.success) {
      //     this.setState({timers: json.data})
      //   }
      // }));
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  loggedIn(args) {
    this.setState({
      token: args.token,
      username: args.user,
      timers: args.timers,
      groups: args.groups,
      log: args.log,
      userId: args.id,
    })
  }

  loggedOut() {
    localStorage.clear();
    this.setState({
      token: ''
    })
  }
  getTimers(token) {
    fetch(`https://banana-crumble-42815.herokuapp.com/timer?token=${this.state.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {

      //add object for creating more groups
      //displays at the end of the groups list in Dash
      let addGroup = {
        box: [""],
        editOpen: false,
        hash: "newgroup",
        name: "New Group",
        timers: [
          {
            name: "New Timer",
            length: 3,
          }
        ],
        user: "current user"
      }
      json.groups.push(addGroup);

      if(json.success) {
        this.setState({
          timers: json.timers,
          groups: json.groups,
          userName: json.username,
          log: json.log
        })
      } else {
        this.setState({
          timerError: json.message,
          isLoading: false
        })
      }
    });
  }

  //enable group to be editable
  editGroup(g) {
    let currentGroups = this.state.groups;
    //loop through groups
    for (let i = 0; i < currentGroups.length; i++) {
      //if the passed group matches passed group
      if(g.hash === currentGroups[i].hash) {
        //toggle the editOpen boolean value
        currentGroups[i].editOpen = !currentGroups[i].editOpen;
      } else {
        //otherwise make it false
        currentGroups[i].editOpen = false;
      }
    }

    this.setState({
      groups: currentGroups
    })
  }

  editOff() {
    let currentGroups = this.state.groups;
    //loop through groups
    for (let i = 0; i < currentGroups.length; i++) {
      //turn off
      currentGroups[i].editOpen = false;
    }

    this.setState({
      groups: currentGroups
    })  
  }

  timeFormat(time, str) {
    var minutes = Math.floor(time / 60);
    time -= minutes * 60;
    var seconds = parseInt(time % 60, 10);

    if(str === 'str') return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    if(str === 'num') return [minutes, seconds];
    return null;

    // return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }

  render() {
    //if token, return dash, and show spinner
    //
    return (
      <div>
        {this.state.token ? 
          <Dash
          colors={this.state.colors}
          groups={this.state.groups}
          timers={this.state.timers}
          username={this.state.username}
          getTimers={this.getTimers}
          loggedOut={this.loggedOut}
          log={this.state.log}
          userId={this.state.userId}
          editGroup={this.editGroup}
          editOff={this.editOff}
          timeFormat={this.timeFormat}
        >
        </Dash>
        :
        <div>
          {getFromStorage('the_main_app') ? 
          <div
          className="vertical-center">
            <Container>
              <ClockLoader
              css={override}
              size={150}
              color={"#007bff"}
              loading={this.state.loading}
            />
            </Container>
          </div>
          : 
          <Front colors={this.state.colors} timeFormat={this.timeFormat} loggedIn={this.loggedIn} onSignIn={this.onSignIn} showRegister={this.showRegister}></Front>
         }
        </div>
      }
      </div>
    )
  }
}

export default App;
