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
  const [courses, setCourses] = useState([]);
  const [courseToEdit, setCourseToEdit] = useState({});

  const [details, setDetails] = useState({});
  const [route, setRoute] = useState({});
  const [stops, setStops] = useState();
  const [distance, setDistance] = useState();
  const [vert, setVert] = useState();
  const [name, setName] = useState();
  const [mileTimes, setMileTimes] = useState();
  const [calories, setCalories] = useState();
  const [goalHours, setGoalHours] = useState();
  const [goalMinutes, setGoalMinutes] = useState();

  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);

    //add object for creating more groups
    //NOT USING THIS ANYMORE
    let addCourse = {
      box: [""],
      details: {
        calories: 2000,
        mileTimes: [],
        name: "New Course",
      },
      editOpen: false,
      hash: "newcourse"
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
          setIsLoading(false);

          //if account has no courses, p the AddGroup in
          if(json.courses.length === 0) {
            setCourses([addCourse])
            setIsLoading(false);
          } else {
            setCourses(json.courses)
          }
          setUsername(json.email);
          
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  }, [])
  //empty array means only runs once
  //component did mount equivilant

    //enable group to be editable
    function editCourse(c) {
      let currentCourses = courses;
      //loop through courses
      for (let i = 0; i < currentCourses.length; i++) {
        //if the passed course matches passed group
        if(c.hash === currentCourses[i].hash) {
          //toggle the editOpen boolean value
          currentCourses[i].editOpen = !currentCourses[i].editOpen;
          if(currentCourses[i].editOpen === true) {
            let c = currentCourses[i];
            setCourseToEdit(c);
            setName(c.details.name)
            setDistance(c.details.distance)
            setStops(c.stops)
            setVert(c.details.vert)
            setMileTimes(c.details.mileTimes)
            setGoalHours(c.details.goalHours)
            setGoalMinutes(c.details.goalMinutes)
            setCalories(c.details.calories)
          }
        } else {
          //otherwise make it false
          currentCourses[i].editOpen = false;
        }
      }
      setCourses(currentCourses);
    }

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
          editOff()
        } else {
          console.log("Error: ", json)
        }
      });
    }

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

  function addStop() {
    let updatedStops = stops;
    
    let newStop = {
      name: "",
      cal: 100,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

      updatedStops.push(newStop);
      setStops([...updatedStops])
  }

  function saveNewCourse() {
    const token = JSON.parse(localStorage.course_planner).token;
      // fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course`, {
        fetch(`http://localhost:3000/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/'
        },
        body: JSON.stringify({
          token: token,
          hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
          //server sets inital course values
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          getCourses(token)
        } else {
          console.log("Error: adding this course failed.")
          console.log(json)
        }
      });
  }

  function saveCourse() {
    setSaved(false)
    let tempCourse = {
      details: {
        stops,
        distance,
        vert,
        name,
        mileTimes,
        calories,
        goalHours,
        goalMinutes
      },
      stops: stops
    }
    const token = JSON.parse(localStorage.course_planner).token;
    // if(props.course.route.geoJSON.properties.name === "no route stored") {
    //   saveNewRoute();
    // }
      // fetch(`https://banana-crumble-42815.herokuapp.com/course?courseId=${props.course._id}`, {
        fetch(`http://localhost:3000/course?courseId=${courseToEdit._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          details: tempCourse.details,
          stops: tempCourse.stops
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          setSaved(true)
        } else {
          console.log("Error: adding this course failed.")
          console.log(json)
        }
      });
  }

  function deleteCourse(course) {
    const token = JSON.parse(localStorage.course_planner).token;

      fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseToEdit._id}`, {
        // fetch(`http://localhost:3000/course?token=${token}&courseId=${course._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        let tempCourses = courses;
        getCourses(token)
      } else {
        console.log("error: ", json)
      }
    });
  }

    //if token, return dash, and show spinner
    //
    return (
      <div>
        {!loading ? 
        <Nav token={getFromStorage("course_planner")} loggedIn={loggedIn} username={username} getCourses={props.getCourses} loggedOut={loggedOut}></Nav>
        : <div></div>
        }
        {token ? 
          <Dash
          saveNewCourse={saveNewCourse}
          removeRoute={removeRoute}
          courses={courses}
          username={username}
          getCourses={getCourses}
          loggedOut={loggedOut}
          userId={userId}
          editCourse={editCourse}
          editOff={editOff}
          saveCourse={saveCourse}
          deleteCourse={deleteCourse}
          details={courseToEdit.details}
          saved={saved}

          setDetails={setDetails}
          setRoute={setRoute}
          addStop={addStop}
          setDistance={setDistance}
          setVert={setVert}
          setName={setName}
          setCalories={setCalories}
          setGoalHours={setGoalHours}
          setGoalMinutes={setGoalMinutes}
          setMileTimes={setMileTimes}
          setStops={setStops}
          
          stops={stops}
          distance={distance}
          vert={vert}
          name={name}
          mileTimes={mileTimes}
          calories={calories}
          goalHours={goalHours}
          goalMinutes={goalMinutes}>
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
