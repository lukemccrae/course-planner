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
import {DeleteModalContent} from './Components/helpers/DeleteModalContent';

import { useCourseInfoContext } from './Providers/CourseInfoProvider';
import { useMileTimesContext } from './Providers/MileTimesProvider';
import { useRouteContext }  from './Providers/RouteProvider';
import { useStopsContext } from './Providers/StopsProvider';
import { useUserContext } from './Providers/UserProvider';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;



function App(props) {
  // const [username, setUsername] = useState('');

  const {name, goalHours, goalMinutes, startTime, calories, terrainMod, setCourseInfo, resetCourseInfo} = useCourseInfoContext();
  const {vertMod, paceAdjust, mileTimes, setMileTimesInfo} = useMileTimesContext();
  const {vertInfo,  setRouteInfo, resetRouteInfo} = useRouteContext();
  const {stops, setStopsInfo} = useStopsContext();
  const {courseId, setCourseId, username, setUsername, token, setToken} = useUserContext();
  const [courseList, setCourseList] = useState([]);

  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [editNoLoginModalIsOpen, setEditNoLoginModalIsOpen] = useState(false);
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);


  useEffect(() => {
    const obj = getFromStorage('course_planner');
    if (obj && obj.token && username === '') {
      setToken(obj.token)
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
          loggedIn(json)
        } else {
          setIsLoading(false);
        }
      })
    } else {
      setIsLoading(false);
    }
  }, [vertInfo])

  function loggedIn(args) {
    setUsername(args.email);
    setCourseList(args.courseList);
    setIsLoading(false);
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

  function updateDeleteModalIsOpen() {
    setDeleteModalIsOpen(!deleteModalIsOpen)
  }

  function renderEditCourseNoLogin() {
    return (
      <EditCourseNoLogin 
          saved={saved}

          saveCourse={saveCourse}
          updateDeleteModalIsOpen={updateDeleteModalIsOpen}
          // editCourse={editCourse}

          id={courseId}
          setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}
        >
        </EditCourseNoLogin>
    )
  }

  function renderNavBar() {
    if(!loading && username) {
      return (<Nav courseList={courseList} 
        // editCourse={editCourse} 
        saveNewCourse={saveNewCourse} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}loggedOut={loggedOut}></Nav>)
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
            // editCourse={editCourse}
            courseId={courseId}
            token={token}
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
    return <Login setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn} setToken={setToken}></Login>
  }

  function renderAbout() {
    return <About></About>
  }

    return (
      <div>
        {renderNavBar()}
        {renderEditCourse()}

        {/* higher order components to render various modals */}
        {renderModal(deleteModalIsOpen, updateDeleteModalIsOpen, deleteStyles, "Delete Modal", DeleteModalContent({updateDeleteModalIsOpen, courseList, setDeleteModalIsOpen}))}
        {renderModal(editNoLoginModalIsOpen, closeEditNoLoginModal, demoRouteStyles, "Demo Route Modal", renderEditCourseNoLogin())}
        {renderModal(loginModalIsOpen, closeLoginModal, loginStyles, "Login Modal", renderLogin())}
        {renderModal(aboutModalIsOpen, closeAboutModal, aboutStyles, "About Modal", renderAbout())}
        

      </div>
    )
  }

export default App;
