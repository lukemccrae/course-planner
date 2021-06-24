import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Dash from './Components/Dash';
import DashNoLogin from './Components/DashNoLogin';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import Nav from './Components/Nav';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;


function App(props) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [log, setLog] = useState([]);
  const [courses, setCourses] = useState([]);
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
    let addCourse = {
      box: [""],
      details: {
        calories: 2000,
        pace: 10
      },
      route: {
        geoJSON: {
          properties: {
            name: "no route stored"
          },
          geometry: {
            coordinates: []
          }
        },
        vert: 1,
        distance: 1
      },
      editOpen: false,
      hash: "newcourse",
      name: "New Course",
      stops: [
        {
          name: "Stop 1",
          cals: 400,
          miles: 8,
          id: 1
        },
        {
          name: "Stop 2",
          cals: 400,
          miles: 12,
          id: 2
        },
        {
          name: "Stop 3",
          cals: 700,
          miles: 16,
          id: 3
        }
      ],
      user: "current user",
      distance: 13,
      vert: 500
    }

  useEffect(() => {
    const obj = getFromStorage('course_planner');
    if (obj && obj.token && courses.length === 0) {
      //verify token
      // fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/verify?token=' + obj.token, {
        fetch('http://localhost:3000/course/api/account/verify?token=' + obj.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/',
          'Accept': 'application/json'

        }
      }).then(res => res.json()).then(json => {
        if (json.success) {
          console.log(json)
          setToken(obj);
          json.courses.push(addCourse);

          //if account has no courses, p the AddGroup in
          if(json.courses.length === 0) {
            setCourses([addCourse])
          } else {
            setCourses(json.courses)
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
    if(args.course === []) args.courses = addCourse;
    setCourses(args.courses);
    setUsername(args.user);
    setUserId(args.id);
  }

  function loggedOut() {
    localStorage.clear();
    setToken('');
  }

  function getCourses(token) {
    if(token) {
      // fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${token}`, {
        fetch(`http://localhost:3000/course?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        json.courses.push(addCourse);
  
        if(json.success) {
          setCourses(json.courses)
          setLog(json.log)
        } else {
          console.log("Error: ", json)
        }
      });
    }

  }

  //enable group to be editable
  function editCourse(c) {
    let currentCourses = courses;
    //loop through courses
    for (let i = 0; i < currentCourses.length; i++) {
      //if the passed course matches passed group
      if(c.hash === currentCourses[i].hash) {
        //toggle the editOpen boolean value
        currentCourses[i].editOpen = !currentCourses[i].editOpen;
      } else {
        //otherwise make it false
        currentCourses[i].editOpen = false;
      }
    }
    setCourses(currentCourses);
  }

  function removeRoute(c) {
    let currentCourses = courses;
    //loop through courses
    for (let i = 0; i < currentCourses.length; i++) {
      //if the passed course matches passed course
      if(c.hash === currentCourses[i].hash) {
        //change its route to empty route
        currentCourses[i].route.geoJSON = { properties: {name: "no route stored"} }
      }
    }
    setCourses(currentCourses);
    console.log(currentCourses)
  }

  function editOff() {
    let currentCourses = courses;
    //loop through groups
    for (let i = 0; i < currentCourses.length; i++) {
      //turn off
      currentCourses[i].editOpen = false;
    }
    setCourses(currentCourses);  
  }

    //if token, return dash, and show spinner
    //
    return (
      <div>
        {!loading ? 
        <Nav token={getFromStorage("course_planner")} loggedIn={loggedIn} log={log} username={username} getCourses={props.getCourses} loggedOut={loggedOut}></Nav>
        : <div></div>
        }
        {token ? 
          <Dash
          removeRoute={removeRoute}
          colors={colors}
          courses={courses}
          username={username}
          getCourses={getCourses}
          loggedOut={loggedOut}
          log={log}
          userId={userId}
          editCourse={editCourse}
          editOff={editOff}
        >
        </Dash>
        :
        <div>
          {getFromStorage('course_planner') ? 
          <div
          className="vertical-center">
            <Container>
              <ClimbingBoxLoader
              css={override}
              size={15}
              color={"#007bff"}
              loading={loading}
            />
            </Container>
          </div>
          :
          <DashNoLogin
            setIsLoading={setIsLoading} 
            colors={colors} 
            getCourses={getCourses}
          >
          </DashNoLogin>
         }
        </div>
      }
      </div>
    )
  }

export default App;
