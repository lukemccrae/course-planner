import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Button from '@material-ui/core/Button';
import Dash from './Components/Dash';
import Login from './Components/Login';
import DashNoLogin from './Components/DashNoLogin';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
import Nav from './Components/Nav';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%'
  }
};


function App(props) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseToEdit, setCourseToEdit] = useState({});

  const [details, setDetails] = useState({});
  const [route, setRoute] = useState({});
  const [stops, setStops] = useState([]);
  const [distance, setDistance] = useState();
  const [vert, setVert] = useState();
  const [name, setName] = useState();
  const [mileTimes, setMileTimes] = useState();
  const [calories, setCalories] = useState();
  const [goalHours, setGoalHours] = useState();
  const [goalMinutes, setGoalMinutes] = useState();
  const [vertMod, setVertMod] = useState();
  const [terrainMod, setTerrainMod] = useState();

  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [why, setWhy] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    //add object for creating more groups
    //NOT USING THIS ANYMORE
    // let addCourse = {
    //   box: [""],
    //   details: {
    //     calories: 2000,
    //     mileTimes: [],
    //     name: "New Course",
    //   },
    //   editOpen: false,
    //   hash: "newcourse"
    // }

  useEffect(() => {
    console.log("stops")
    const obj = getFromStorage('course_planner');
    if (obj && obj.token && courses.length === 0) {
      //verify token
      fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/verify?token=' + obj.token, {
        // fetch('http://localhost:3000/course/api/account/verify?token=' + obj.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://course-planner.firebaseapp.com/',
          'Accept': 'application/json'

        }
      }).then(res => res.json()).then(json => {
        if (json.success) {
          setToken(obj);
          setIsLoading(false);

          //if account has no courses, p the AddGroup in
          if(json.courses.length === 0) {
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
  }, [courses])
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
            setVertMod(c.details.vertMod)
            setTerrainMod(c.details.terrainMod)
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
    setCourses(args.courses);
    setUsername(args.user);
    setUserId(args.id);
  }

  function loggedOut() {
    localStorage.clear();
    setToken('');
    setUsername('')
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false)
  }

  function removeRoute(hash) {
    let currentCourses = courses;
    //loop through courses
    for (let i = 0; i < currentCourses.length; i++) {
      //if the passed course matches passed course
      if(hash === currentCourses[i].hash) {
        //change its route to empty route
        currentCourses[i].route.geoJSON = { properties: {name: "no route stored"}, vertInfo: {cumulativeGain: []} }
      }
    }
    setCourses(currentCourses);
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
      name: "New Stop",
      cals: 200,
      miles: 0,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

      updatedStops.push(newStop);
      setStops([...updatedStops])
  }


  function delStop(index) {
    let updatedStops = stops;
    updatedStops.splice(index, 1)
    setStops([...updatedStops])
  }

  function saveNewCourse() {
    const token = JSON.parse(localStorage.course_planner).token;
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course`, {
        // fetch(`http://localhost:3000/course`, {
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
          let tempCourses = courses;
          tempCourses.push(json.course)
          setCourses(tempCourses)
          setWhy(true);
        } else {
          console.log("Error: adding this course failed.")
        }
      });
  }

  function findCourse(hash) {
    for (let i = 0; i < courses.length; i++) {
      if(courses[i].hash === hash) return i;
    }
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
        goalMinutes,
        vertMod,
        terrainMod
      },
      stops: stops
    }
    const token = JSON.parse(localStorage.course_planner).token;
    // if(props.course.route.geoJSON.properties.name === "no route stored") {
    //   saveNewRoute();
    // }
      fetch(`https://banana-crumble-42815.herokuapp.com/course?courseId=${courseToEdit._id}`, {
        // fetch(`http://localhost:3000/course?courseId=${courseToEdit._id}`, {
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
          let index = findCourse(json.course.hash)
          let tempCourses = courses;
          if(index !== -1) tempCourses[index] = json.course;
          setCourses(tempCourses)
          setSaved(true)
        } else {
          console.log("Error: adding this course failed.")
        }
      });
  }

  function deleteCourse(course) {
    const token = JSON.parse(localStorage.course_planner).token;
    let index = findCourse(courseToEdit.hash);

      fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseToEdit._id}`, {
        // fetch(`http://localhost:3000/course?token=${token}&courseId=${course._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        let tempCourses = courses;
        tempCourses.splice(index, 1)
        setCourses(tempCourses)
        setDeleteModalIsOpen(false);
      } else {
        console.log("error: ", json)
      }
    });
  }

  function updateDeleteModalIsOpen() {
    setDeleteModalIsOpen(!deleteModalIsOpen)
  }

    //if token, return dash, and show spinner
    //
    return (
      <div key={courses.length}>
        {!loading ? 
        <Nav saveNewCourse={saveNewCourse} courses={courses} editCourse={editCourse} setLoginModalIsOpen={setLoginModalIsOpen} token={getFromStorage("course_planner")} loggedIn={loggedIn} username={username} loggedOut={loggedOut}></Nav>
        : <div></div>
        }
        {token ? 
          <Dash
          removeRoute={removeRoute}
          courses={courses}
          userId={userId}
          editCourse={editCourse}
          saveCourse={saveCourse}
          deleteCourse={deleteCourse}
          details={courseToEdit.details}
          saved={saved}
          deleteModalIsOpen={deleteModalIsOpen}
          saveNewCourse={saveNewCourse}
          why={why}

          setRoute={setRoute}
          addStop={addStop}
          delStop={delStop}
          setDistance={setDistance}
          setVert={setVert}
          setName={setName}
          setCalories={setCalories}
          setGoalHours={setGoalHours}
          setGoalMinutes={setGoalMinutes}
          setMileTimes={setMileTimes}
          setStops={setStops}
          setVertMod={setVertMod}
          setTerrainMod={setTerrainMod}
          updateDeleteModalIsOpen={updateDeleteModalIsOpen}
          setWhy={setWhy}
          
          stops={stops}
          terrainMod={terrainMod}
          distance={distance}
          vert={vert}
          name={name}
          mileTimes={mileTimes}
          calories={calories}
          goalHours={goalHours}
          goalMinutes={goalMinutes}
          vertMod={vertMod}
          c={courseToEdit}>
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
            setLoginModalIsOpen={setLoginModalIsOpen}
          >
          </DashNoLogin>
         }
        </div>
      }
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={updateDeleteModalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button variant="outlined" className="five-px-margin-right"  onClick={deleteCourse}>Delete</Button>
            <Button variant="outlined" className="five-px-margin-right" onClick={updateDeleteModalIsOpen}>Cancel</Button>
          </div>
        </Modal>
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Login setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}></Login>
        </Modal>
      </div>
    )
  }

export default App;
