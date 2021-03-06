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

import { useCourseInfoContext } from './Providers/CourseInfoProvider';
import { useMileTimesContext } from './Providers/MileTimesProvider';
import { useRouteContext }  from './Providers/RouteProvider';
import { useStopsContext } from './Providers/StopsProvider';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

function App(props) {
  const [username, setUsername] = useState('');

  const [courseList, setCourseList] = useState([]);

  const {name, goalHours, goalMinutes, startTime, calories, terrainMod, setCourseInfo, resetCourseInfo} = useCourseInfoContext();
  const {vertMod, paceAdjust, mileTimes, setMileTimesInfo} = useMileTimesContext();
  const {vertInfo,  setRouteInfo, resetRouteInfo} = useRouteContext();
  const {stops, setStopsInfo} = useStopsContext();

  
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
      const {DEV} = process.env;
      console.log(DEV)
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

          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  }, [username, vertInfo])

    //retrieve and set selected group in state
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
          const courseDetails = json.course[0].details;
          const routeDetails = json.course[0].route.geoJSON;
          const mileTimesDetails = json.course[0]
          const stopDetails = json.course[0].stops;
          
          setCourseInfo(courseDetails);
          setRouteInfo(routeDetails);
          setMileTimesInfo(mileTimesDetails);
          setStopsInfo(stopDetails)
        } else {
          console.log("Error: didnt get a course.")
        }
      });
    }

  function loggedIn(args) {
    setUsername(args.user);
    resetCourseInfo();
    resetRouteInfo();
  }

  function loggedOut() {
    localStorage.clear();
    setUsername('')
    resetCourseInfo();
    resetRouteInfo();
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
        goalMinutes,
        vertMod,
        terrainMod,
        mileTimes,
        startTime
      },
      stops: stops,
      paceAdjust: paceAdjust
    }
    const token = JSON.parse(localStorage.course_planner).token;
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


  function renderEditCourseNoLogin() {
    return (
      <EditCourseNoLogin 
          saved={saved}

          saveCourse={saveCourse}
          updateDeleteModalIsOpen={updateDeleteModalIsOpen}
          editCourse={editCourse}

          id={courseId}
          setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}
        >
        </EditCourseNoLogin>
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
          <EditCourse 
            saveCourse={saveCourse}
            saved={saved}
            updateDeleteModalIsOpen={updateDeleteModalIsOpen}
            editCourse={editCourse}
            id={courseId}
          >
          </EditCourse>
        
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

    //if token, return dash, and show spinner
    //
    return (
      <div>
        {renderNavBar()}
        {renderEditCourse()}

        {/* higher order components to render various modals */}
        {renderModal(deleteModalIsOpen, updateDeleteModalIsOpen, deleteStyles, "Delete Modal", DeleteModalContent({courseList, deleteCourse, updateDeleteModalIsOpen}))}
        {renderModal(editNoLoginModalIsOpen, closeEditNoLoginModal, demoRouteStyles, "Demo Route Modal", renderEditCourseNoLogin())}
        {renderModal(loginModalIsOpen, closeLoginModal, loginStyles, "Login Modal", renderLogin())}
        {renderModal(aboutModalIsOpen, closeAboutModal, aboutStyles, "About Modal", renderAbout())}
        

      </div>
    )
  }

export default App;
