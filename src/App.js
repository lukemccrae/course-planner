import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Front from './Components/Front';
import Dash from './Components/Dash';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import ClockLoader from "react-spinners/ClockLoader";

import {useSelector, useDispatch} from 'react-redux';
import {storeData} from './actions';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;


function App(props) {
  const [token, setToken] = useState('');
  const [timers, setTimers] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [log, setLog] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([
    "#428A79",
    "#71AF55",
    "#F00500",
    "#E4BE67",
    "#E47043",
    "#B63534",
    "#9598AB",]);
  // componentDidMount() {
  //   const obj = getFromStorage('the_main_app');
  //   if (obj && obj.token) {
  //     //verify token
  //     fetch('https://banana-crumble-42815.herokuapp.com/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
  //       if (json.success) {
  //         this.setState({token: obj.token, groups: json.groups, log: json.log, username: json.email, isLoading: false})
  //       } else {
  //         this.setState({isLoading: false})
  //       }
  //     })
  //   } else {
  //     this.setState({
  //       isLoading: false
  //     })
  //   }
  // }

  useEffect(() => {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      //verify token
      fetch('https://banana-crumble-42815.herokuapp.com/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
          setToken(obj);
          setGroups(json.groups);
          setLog(json.log);
          username(json.email);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  })

  function loggedIn(args) {
    this.setState({
      token: args.token,
      username: args.user,
      timers: args.timers,
      groups: args.groups,
      log: args.log,
      userId: args.id,
    })
  }

  function loggedOut() {
    localStorage.clear();
    this.setState({
      token: ''
    })
  }

  function getTimers(token) {
    console.log("getTimers")
    fetch(`https://banana-crumble-42815.herokuapp.com/timer?token=${token}`, {
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
        console.log(json)
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

  function resetColors() {
    const colors = [
      "#428A79",
      "#71AF55",
      "#F00500",
      "#E4BE67",
      "#E47043",
      "#B63534",
      "#9598AB",
  ]

  this.setState({
    colors: colors
  })
  }

  //enable group to be editable
  function editGroup(g) {
    this.resetColors();
    let currentGroups = groups;
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

  function editOff() {
    let currentGroups = groups;
    //loop through groups
    for (let i = 0; i < currentGroups.length; i++) {
      //turn off
      currentGroups[i].editOpen = false;
    }

    this.setState({
      groups: currentGroups
    })  
  }

  function timeFormat(time, str) {
    var minutes = Math.floor(time / 60);
    time -= minutes * 60;
    var seconds = parseInt(time % 60, 10);

    if(str === 'str') return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    if(str === 'num') return [minutes, seconds];
    return null;

  }

    //if token, return dash, and show spinner
    //
    return (
      <div>
        {token ? 
          <Dash
          resetColors={resetColors}
          colors={colors}
          groups={groups}
          timers={timers}
          username={username}
          getTimers={getTimers}
          loggedOut={loggedOut}
          log={log}
          userId={userId}
          editGroup={editGroup}
          editOff={editOff}
          timeFormat={timeFormat}
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
              loading={loading}
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

export default App;
