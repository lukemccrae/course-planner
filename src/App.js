import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Button from '@material-ui/core/Button';
import EditCourse from './Components/EditCourse';
import EditCourseNoLogin from './Components/EditCourseNoLogin';
import Login from './Components/Login';
import DashNoLogin from './Components/DashNoLogin';
import About from './Components/About';
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

const demoRouteStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '80%',
    height                : '80%'
  }
};

const aboutStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%',
    height                : '50%'
  }
};

const deleteStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '25%',
    height                : '15%'
  }
};

const loginStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '40%',
    height                : '37%'
  }
};


function App(props) {
  const [username, setUsername] = useState('');

  const [courseList, setCourseList] = useState([]);
  const [stops, setStops] = useState([{miles: 5, comments: "", name: "Aid station 1", cals: 200}, {miles: 10, comments: "", name: "Aid station 2", cals: 400}]);

  const [name, setName] = useState("New Course");
  const [mileTimes, setMileTimes] = useState([]);
  const [goalHours, setGoalHours] = useState(2);
  const [goalMinutes, setGoalMinutes] = useState(30);
  const [calories, setCalories] = useState(225);
  const [terrainMod, setTerrainMod] = useState(1.2);
  const [vertInfo, setVertInfo] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [milePoints, setMilePoints] = useState([]);
  const [vertMod, setVertMod] = useState(400);
  const [paceAdjust, setPaceAdjust] = useState([]);

 
  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [editNoLoginModalIsOpen, setEditNoLoginModalIsOpen] = useState(false);
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);


  const [courseId, setCourseId] = useState();

  useEffect(() => {
    const obj = getFromStorage('course_planner');
    if (obj && obj.token && username === '') {
      //verify token
      // fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/verify?token=' + obj.token, {
        fetch('http://localhost:3005/course/api/account/verify?token=' + obj.token, {
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
          // setCourseId(json.course._id)

          // loadCourse(json.course)
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  }, [username, vertInfo])
  //empty array means only runs once
  //component did mount equivilant


  function loadCourse(c) {
    console.log(c)
    setName(c.details.name)
    setStops(c.stops)
    setMileTimes(c.details.mileTimes)
    setGoalHours(c.details.goalHours)
    setGoalMinutes(c.details.goalMinutes)
    setCalories(c.details.calories)
    setVertMod(c.details.vertMod)
    setVertInfo(c.route.geoJSON.properties.vertInfo.cumulativeGain)
    setTerrainMod(c.details.terrainMod)
    setCoordinates(c.route.geoJSON.geometry.coordinates.length > 0  ? c.route.geoJSON.geometry.coordinates : [])
    setMilePoints("milePoints" in c.route.geoJSON.geometry ? c.route.geoJSON.geometry.milePoints : [{}])
    setPaceAdjust("paceAdjust" in c ? c.paceAdjust : [])
  }

    //enable group to be editable
    function editCourse(courseRef) {
      console.log(courseRef)
      const obj = getFromStorage('course_planner');
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${obj.token}&id=${courseRef.id}`, {
      // fetch(`http://localhost:3005/course?token=${obj.token}&id=${courseRef.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://course-planner.firebaseapp.com/'
        },
      }).then(res => res.json()).then(json => {
        if (json.success) {
          console.log(json)
          setCourseId(json.course[0]._id)
          loadCourse(json.course[0]);
        } else {
          console.log("Error: didnt get a course.")
        }
      });
    }

  function loggedIn(args) {
    setUsername(args.user);
    setName("")
    setStops([])
    setMileTimes([])
    setGoalHours()
    setGoalMinutes()
    setCalories(225)
    setVertMod()
    setVertInfo([])
    setTerrainMod()
    setCoordinates([])
    setMilePoints([])
  }

  function loggedOut() {
    localStorage.clear();
    setUsername('')
    setName("")
    setStops([{miles: 5, comments: "", name: "Aid station 1", cals: 200}])
    setMileTimes([])
    setGoalHours(2)
    setGoalMinutes(30)
    setCalories(225)
    setVertMod(400)
    setVertInfo([])
    setTerrainMod(1.2)
    setCoordinates([])
    setMilePoints([])
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false)
  }

  function closeAboutModal() {
    setAboutModalIsOpen(false)
  }

  function closeEditNoLoginModal() {
    setEditNoLoginModalIsOpen(false)
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
        // fetch(`http://localhost:3005/course`, {
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

  function saveCourse() {
    setSaved(false)
    let tempCourse = {
      details: {
        name,
        calories,
        goalHours,
        goalMinutes,
        calories,
        name,
        vertMod,
        terrainMod,
        mileTimes,
      },
      stops: stops,
      paceAdjust: paceAdjust
    }
    const token = JSON.parse(localStorage.course_planner).token;
    // if(props.course.route.geoJSON.properties.name === "no route stored") {
    //   saveNewRoute();
    // }
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseId}`, {
        // fetch(`http://localhost:3005/course?token=${token}&courseId=${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://corsa.run'
        },
        body: JSON.stringify({
          details: tempCourse.details,
          stops: tempCourse.stops,
          paceAdjust: tempCourse.paceAdjust
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          setSaved(true)
          setCourseList(json.courseList)
        } else {
          console.log("Error: adding this course failed.")
        }
      });
  }

  function deleteCourse() {
    const token = JSON.parse(localStorage.course_planner).token;

      fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseId}`, {
        // fetch(`http://localhost:3005/course?token=${token}&courseId=${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setCourseList(json.courseList)
        setDeleteModalIsOpen(false);
        editCourse(json.courseList[0])
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
        {username && terrainMod && calories ? 
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
            milePoints={milePoints}
            paceAdjust={paceAdjust}
            
            setName={setName}
            setStops={setStops}
            setMileTimes={setMileTimes}
            setGoalHours={setGoalHours}
            setGoalMinutes={setGoalMinutes}
            setCalories={setCalories}
            setVertMod={setVertMod}
            setTerrainMod={setTerrainMod}
            setCoordinates={setCoordinates}
            setMilePoints={setMilePoints}
            setVertInfo={setVertInfo}
            setPaceAdjust={setPaceAdjust}

            saved={saved}

            delStop={delStop}
            addStop={addStop}
            saveCourse={saveCourse}
            updateDeleteModalIsOpen={updateDeleteModalIsOpen}
            editCourse={editCourse}
            loadCourse={loadCourse}

            id={courseId}
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
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            setEditNoLoginModalIsOpen={setEditNoLoginModalIsOpen}
            setAboutModalIsOpen={setAboutModalIsOpen}
          >
          </DashNoLogin>
         }
        </div>
      }
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={updateDeleteModalIsOpen}
          style={deleteStyles}
          contentLabel="Delete Modal"
        >
          <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button style={{margin: '0 0 0 10px'}} disabled={courseList.length < 2} variant="outlined" className="five-px-margin-right"  onClick={deleteCourse}>Delete</Button>
            <Button style={{margin: '0 0 0 10px'}} variant="outlined" className="five-px-margin-right" onClick={updateDeleteModalIsOpen}>Cancel</Button>
          </div>
        </Modal>
        <Modal
          isOpen={editNoLoginModalIsOpen}
          onRequestClose={closeEditNoLoginModal}
          style={demoRouteStyles}
          contentLabel="Demo Route Modal"
        >
          <EditCourseNoLogin 
            name={name}
            stops={stops}
            mileTimes={mileTimes}
            goalHours={goalHours}
            goalMinutes={goalMinutes}
            calories={calories}
            vertMod={vertMod}
            terrainMod={terrainMod}
            coordinates={coordinates}
            milePoints={milePoints}
            vertInfo={vertInfo}
            paceAdjust={paceAdjust}
            
            setName={setName}
            setStops={setStops}
            setMileTimes={setMileTimes}
            setGoalHours={setGoalHours}
            setGoalMinutes={setGoalMinutes}
            setCalories={setCalories}
            setVertMod={setVertMod}
            setTerrainMod={setTerrainMod}
            setCoordinates={setCoordinates}
            setMilePoints={setMilePoints}
            setVertInfo={setVertInfo}
            setPaceAdjust={setPaceAdjust}

            saved={saved}

            delStop={delStop}
            addStop={addStop}
            saveCourse={saveCourse}
            updateDeleteModalIsOpen={updateDeleteModalIsOpen}
            editCourse={editCourse}
            loadCourse={loadCourse}

            id={courseId}
            setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}
          >
          </EditCourseNoLogin>
          
        </Modal>
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          style={loginStyles}
          contentLabel="Login Modal"
        >
        <Login setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}></Login>
        </Modal>
        <Modal
          isOpen={aboutModalIsOpen}
          onRequestClose={closeAboutModal}
          style={aboutStyles}
          contentLabel="About Modal"
        >
          <About></About>
        </Modal>
      </div>
    )
  }

export default App;
