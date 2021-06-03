import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Dash from './Components/Dash';
import DashNoLogin from './Components/DashNoLogin';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import Nav from './Components/Nav';
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
  const [loading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([
    "#428A79",
    "#71AF55",
    "#F00500",
    "#E4BE67",
    "#E47043",
    "#B63534",
    "#9598AB",]);
    

    //add object for creating more groups
    let addGroup = {
      box: [""],
      editOpen: false,
      hash: "newgroup",
      name: "New Group",
      timers: [
        {
          name: "Task 1",
          length: 900,
          id: '1'
        },
        {
          name: "Task 2",
          length: 900,
          id: '2',
        },
        {
          name: "Task 3",
          length: 900,
          id: '3',
        }
      ],
      user: "current user"
    }

  useEffect(() => {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token && groups.length == 0) {
      //verify token
      fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/api/account/verify?token=' + obj.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/',
          'Accept': 'application/json'

        }
      }).then(res => res.json()).then(json => {
        if (json.success) {
          setToken(obj);
          json.groups.push(addGroup);

          //if account has no groups, p the AddGroup in
          if(json.groups.length == 0) {
            setGroups([addGroup])
          } else {
            setGroups(json.groups)
          }
          setLog(json.log);
          setUsername(json.email);
          
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  })

  function loggedIn(args) {
    setToken(args.token);
    if(args.groups == []) args.groups = addGroup;
    args.groups.push(addGroup);
    setGroups(args.groups);
    setLog(args.log);
    setUsername(args.user);
    setUserId(args.id);
  }

  function loggedOut() {
    localStorage.clear();
    setToken('');
  }

  function getTimers(token) {
    fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/timer?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      json.groups.push(addGroup);

      if(json.success) {
        setGroups(json.groups)
        setLog(json.log)
      } else {
        console.log("Error: ", json)
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

  setColors(colors);
  }

  //enable group to be editable
  function editGroup(g) {
    resetColors();
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
    setGroups(currentGroups);
  }

  function editOff() {
    let currentGroups = groups;
    //loop through groups
    for (let i = 0; i < currentGroups.length; i++) {
      //turn off
      currentGroups[i].editOpen = false;
    }
    setGroups(currentGroups);  
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
        {!loading ? 
        <Nav token={getFromStorage("the_main_app")} loggedIn={loggedIn} log={log} username={username} getTimers={props.getTimers} loggedOut={loggedOut}></Nav>
        : <div></div>
        }
        {token ? 
          <Dash
          resetColors={resetColors}
          colors={colors}
          groups={groups}
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
          <DashNoLogin
            setIsLoading={setIsLoading} 
            resetColors={resetColors} 
            colors={colors} 
            timeFormat={props.timeFormat}
            getTimers={getTimers}
            timeFormat={props.timeFormat}
            resetColors={resetColors}>
          </DashNoLogin>
         }
        </div>
      }
      </div>
    )
  }

export default App;
