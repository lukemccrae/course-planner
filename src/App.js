import React, {useState, useEffect} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
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
import {demoRouteStyles, loginStyles, aboutStyles, deleteStyles} from './Components/helpers/ModalStyles';
import {DeleteModalContent} from './Components/helpers/ModalContent';

import CourseInfoProvider, { useCourseInfoContext } from './Providers/CourseInfoProvider';
import MileTimesProvider, { useMileTimesContext } from './Providers/MileTimesProvider';
import RouteProvider, { useRouteContext }  from './Providers/RouteProvider';

console.log(useCourseInfoContext)

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

function App(props) {
  const [username, setUsername] = useState('');

  const [courseList, setCourseList] = useState([]);
  const [stops, setStops] = useState([{miles: 5, comments: "", name: "Aid station 1", cals: 200}, {miles: 10, comments: "", name: "Aid station 2", cals: 400}]);

  const {name, setName, goalHours, setGoalHours, setGoalMinutes, startTime, setStartTime, calories, setCalories, terrainMod, setTerrainMod} = useCourseInfoContext();
  const {milePoints, setMilePoints, vertMod, setVertMod, paceAdjust, setPaceAdjust, mileTimes, setMileTimes} = useMileTimesContext();
  const {coordinates, setCoordinates, vertInfo, setVertInfo, loadRouteInfo} = useRouteContext();
  
  //course info provider
  // const [name, setName] = useState("New Course");
  // const [goalHours, setGoalHours] = useState(2);
  // const [goalMinutes, setGoalMinutes] = useState(30);
  // const [startTime, setStartTime] = useState("06:00");
  // const [calories, setCalories] = useState(225);
  // const [terrainMod, setTerrainMod] = useState(1.2);

  //mileTimes provider
  // const [milePoints, setMilePoints] = useState([]);
  // const [vertMod, setVertMod] = useState(400);
  // const [paceAdjust, setPaceAdjust] = useState([]);
  // const [mileTimes, setMileTimes] = useState([]);

  //routeInfoProvider
  // const [vertInfo, setVertInfo] = useState({cumulativeGain: [], cumulativeLoss: []});
  // const [coordinates, setCoordinates] = useState([]);
  
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
      fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/verify?token=' + obj.token, {
        // fetch('http://localhost:3005/course/api/account/verify?token=' + obj.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/',
          "Accept": "*/*",
        }
      }).then(res => res.json()).then(json => {
        if (json.success) {
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
    
    setName(c.details.name)
    setGoalHours(c.details.goalHours)
    // setGoalMinutes(c.details.goalMinutes)
    setCalories(c.details.calories)
    setTerrainMod(c.details.terrainMod)
    setStartTime(c.details.startTime)

    setStops(c.stops)

    setMileTimes(c.details.mileTimes)
    
    setVertMod(c.details.vertMod)
    setVertInfo(c.route.geoJSON.properties.vertInfo)
    
    setCoordinates(c.route.geoJSON.geometry.coordinates.length > 0  ? c.route.geoJSON.geometry.coordinates : [])
    setMilePoints("milePoints" in c.route.geoJSON.geometry ? c.route.geoJSON.geometry.milePoints : [{}])
    setPaceAdjust("paceAdjust" in c ? c.paceAdjust : [])
    
  }

  function loadCourseInfo(c) {
    console.log("----c", c)
    setName(c.details.name)
    setGoalHours(c.details.goalHours)
    setGoalMinutes(c.details.goalMinutes)
    setCalories(c.details.calories)
    setTerrainMod(c.details.terrainMod)
    setStartTime(c.details.startTime)
    console.log(name)
  }

    //enable group to be editable
    function editCourse(courseRef) {
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
          setCourseId(json.course[0]._id)
          loadCourse(json.course[0]);
          loadCourseInfo(json.course[0])
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
    // setGoalMinutes()
    setCalories(225)
    setVertMod()
    setVertInfo({cumulativeGain: [], cumulativeLoss: []})
    setTerrainMod()
    setCoordinates([])
    setMilePoints([])
    setStartTime("")
  }

  function loggedOut() {
    localStorage.clear();
    setUsername('')
    setName("")
    setStops([{miles: 5, comments: "", name: "Aid station 1", cals: 200}])
    setMileTimes([])
    setGoalHours(2)
    // setGoalMinutes(30)
    setCalories(225)
    setVertMod(400)
    setVertInfo({cumulativeGain: [], cumulativeLoss: []})
    setTerrainMod(1.2)
    setCoordinates([])
    setMilePoints([])
    setStartTime("")
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
      // fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course`, {
        fetch(`http://localhost:3005/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/'
        },
        body: JSON.stringify({
          token: token,
          hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
          //server sets initial course values
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
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
        // goalMinutes,
        calories,
        name,
        vertMod,
        terrainMod,
        mileTimes,
        startTime
      },
      stops: stops,
      paceAdjust: paceAdjust
    }
    const token = JSON.parse(localStorage.course_planner).token;
    // if(props.course.route.geoJSON.properties.name === "no route stored") {
    //   saveNewRoute();
    // }
      // fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseId}`, {
        fetch(`http://localhost:3005/course?token=${token}&courseId=${courseId}`, {
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

  function renderEditCourseNoLogin() {
    return (
      <CourseInfoProvider>
        <EditCourseNoLogin 
            name={name}
            stops={stops}
            mileTimes={mileTimes}
            startTime={startTime}
            goalHours={goalHours}
            // goalMinutes={goalMinutes}
            calories={calories}
            terrainMod={terrainMod}
            setMileTimes={setMileTimes}
            setGoalHours={setGoalHours}
            // setGoalMinutes={setGoalMinutes}
            setCalories={setCalories}
            setTerrainMod={setTerrainMod}
            setStartTime={setStartTime}

            vertMod={vertMod}
            coordinates={coordinates}
            milePoints={milePoints}
            vertInfo={vertInfo}
            paceAdjust={paceAdjust}
            setStops={setStops}
            setVertMod={setVertMod}
            
            
            setName={setName}
            


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
      </CourseInfoProvider>
    )
  }

  function renderNavBar() {
    if(!loading && username) {
      return (<Nav courseList={courseList} editCourse={editCourse} saveNewCourse={saveNewCourse} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn} username={username} loggedOut={loggedOut}></Nav>)
    } else {
      return (
        <div></div>
      )
    }
      
  }

  function renderEditCourse() {
    if(username && terrainMod && calories) {
      return (
        <CourseInfoProvider>
          <MileTimesProvider>
            <RouteProvider>
              <EditCourse 
              //courseInfoContext
                // name={name}
                // goalHours={goalHours}
                // goalMinutes={goalMinutes}
                // calories={calories}
                // setCalories={setCalories}
                // terrainMod={terrainMod}
                // setTerrainMod={setTerrainMod}
                // startTime={startTime}
                // setName={setName}
                // setGoalMinutes={setGoalMinutes}
                // setGoalHours={setGoalHours}
                // setStartTime={setStartTime}
                
                //miletimes provider
                milePoints={milePoints}
                setMilePoints={setMilePoints}
                vertMod={vertMod}
                setVertMod={setVertMod}
                paceAdjust={paceAdjust}
                setPaceAdjust={setPaceAdjust}
                mileTimes={mileTimes}
                setMileTimes={setMileTimes}
                

                //route
                coordinates={coordinates}
                setCoordinates={setCoordinates}

                vertInfo={vertInfo}
                setVertInfo={setVertInfo}

                //stops
                stops={stops}
                delStop={delStop}
                addStop={addStop}
                setStops={setStops}

                //mthods / UI info
                saveCourse={saveCourse}
                saved={saved}
                updateDeleteModalIsOpen={updateDeleteModalIsOpen}
                editCourse={editCourse}
                loadCourse={loadCourse}
                id={courseId}
              >
              </EditCourse>
            </RouteProvider>
            
          </MileTimesProvider>
        </CourseInfoProvider>
        
      )
    } else {
      return (
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
      )
    }
  }

  function renderModal(isOpen, onRequestClose, style, contentLabel, content) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={style}
        contentLabel={contentLabel}
      >
        {content}
      </Modal>
    )
  }

  function renderLogin() {
    return <Login setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}></Login>
  }

  function renderAbout() {
    return <About></About>
  }

    return (
      <div>
        {renderNavBar()}
        {renderEditCourse()}

        {/* higher order components to render various modals */}
        {renderModal(deleteModalIsOpen, updateDeleteModalIsOpen, deleteStyles, "Delete Modal", DeleteModalContent({courseList, deleteCourse, updateDeleteModalIsOpen}))}
        {/* {renderModal(editNoLoginModalIsOpen, closeEditNoLoginModal, demoRouteStyles, "Demo Route Modal", renderEditCourseNoLogin())} */}
        {renderModal(loginModalIsOpen, closeLoginModal, loginStyles, "Login Modal", renderLogin())}
        {renderModal(aboutModalIsOpen, closeAboutModal, aboutStyles, "About Modal", renderAbout())}
      </div>
    )
  }

export default App;
