import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Button from '@material-ui/core/Button';
import EditCourse from './Components/EditCourse';
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
  const [username, setUsername] = useState('');

  const [courseList, setCourseList] = useState([]);
  const [stops, setStops] = useState([]);

  const [name, setName] = useState();
  const [mileTimes, setMileTimes] = useState([]);
  const [goalHours, setGoalHours] = useState();
  const [goalMinutes, setGoalMinutes] = useState();
  const [calories, setCalories] = useState();
  const [terrainMod, setTerrainMod] = useState();
  const [vertInfo, setVertInfo] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [vertMod, setVertMod] = useState();
 
  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  useEffect(() => {
    const obj = getFromStorage('course_planner');
    if (obj && obj.token && username === '') {
      //verify token
      fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/verify?token=' + obj.token, {
        // fetch('http://localhost:3000/course/api/account/verify?token=' + obj.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/',
          "Accept": "*/*",

        }
      }).then(res => res.json()).then(json => {
        if (json.success) {
          console.log(json)
          setCourseList(json.courseList);
          setUsername(json.email);

          loadCourse(json.course)
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  }, [username])
  //empty array means only runs once
  //component did mount equivilant


  function loadCourse(c) {
    setName(c.details.name)
    setStops(c.stops)
    setMileTimes(c.details.mileTimes)
    setGoalHours(c.details.goalHours)
    setGoalMinutes(c.details.goalMinutes)
    setCalories(c.details.calories)
    setVertMod(c.details.vertMod)
    setTerrainMod(c.details.terrainMod)
    setCoordinates(c.route.geoJSON.geometry.coordinates.length > 0  ? c.route.geoJSON.geometry.coordinates : [])
  }

    //enable group to be editable
    function editCourse(courseRef) {
      const obj = getFromStorage('course_planner');
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${obj.token}&id=${courseRef.id}`, {
      // fetch(`http://localhost:3005/course?token=${obj.token}&id=${c.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://course-planner.firebaseapp.com/'
        },
      }).then(res => res.json()).then(json => {
        if (json.success) {
          loadCourse(json.course[0]);
        } else {
          console.log("Error: didnt get a course.")
        }
      });
    }

  function loggedIn(args) {
    setUsername(args.user);
  }

  function loggedOut() {
    localStorage.clear();
    setUsername('')
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false)
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
          console.log(json)
          setCourseList(json.courseList)
        } else {
          console.log("Error: adding this course failed.")
        }
      });
  }

  function saveCourse(course) {
    setSaved(false)
    let tempCourse = {
      details: {

      },
      stops: stops
    }
    const token = JSON.parse(localStorage.course_planner).token;
    // if(props.course.route.geoJSON.properties.name === "no route stored") {
    //   saveNewRoute();
    // }
      fetch(`https://banana-crumble-42815.herokuapp.com/course?courseId=${course._id}`, {
        // fetch(`http://localhost:3000/course?courseId=${course._id}`, {
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
        }
      });
  }

  function deleteCourse(course) {
    const token = JSON.parse(localStorage.course_planner).token;

      fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${course._id}`, {
        // fetch(`http://localhost:3000/course?token=${token}&courseId=${course._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setCourseList(json.courseList)
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
      <div>
        {!loading && username ? 
        <Nav courseList={courseList} editCourse={editCourse} saveNewCourse={saveNewCourse} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn} username={username} loggedOut={loggedOut}></Nav>
        : <div></div>
        }
        {mileTimes.length > 0 && terrainMod && calories ? 
          <EditCourse 
            name={name}
            stops={stops}
            mileTimes={mileTimes}
            goalHours={goalHours}
            goalMinutes={goalMinutes}
            calories={calories}
            vertMod={vertMod}
            terrainMod={terrainMod}
            coordinates={coordinates}
            vertInfo={vertInfo}
            
            setName={setName}
            setStops={setStops}
            setMileTimes={setMileTimes}
            setGoalHours={setGoalHours}
            setGoalMinutes={setGoalMinutes}
            setCalories={setCalories}
            setVertMod={setVertMod}
            setTerrainMod={setTerrainMod}
            setCoordinates={setCoordinates}
            setVertInfo={setVertInfo}

            saved={saved}

            delStop={delStop}
            addStop={addStop}
            saveCourse={saveCourse}
          >
          </EditCourse>
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
            // setIsLoading={setIsLoading}
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
