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
import { useRouteContext }  from './Providers/RouteProvider';
import { useUserContext } from './Providers/UserProvider';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;



function App(props) {
  const {calories, terrainMod, resetCourseInfo} = useCourseInfoContext();
  const {vertInfo, resetRouteInfo} = useRouteContext();
  const {courseId, username, setUsername, token, setToken, courseList, setCourseList, loading, setIsLoading} = useUserContext();
  // const [courseList, setCourseList] = useState([]);

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
    // setCourseList(args.courseList);
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

  function updateDeleteModalIsOpen() {
    setDeleteModalIsOpen(!deleteModalIsOpen)
  }

  function renderEditCourseNoLogin() {
    return (
      <EditCourseNoLogin 
          updateDeleteModalIsOpen={updateDeleteModalIsOpen}
          id={courseId}
          setCourseList={setCourseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}
        >
        </EditCourseNoLogin>
    )
  }

  function renderNavBar() {
    if(!loading && username) {
      return (<Nav courseList={courseList} setLoginModalIsOpen={setLoginModalIsOpen} loggedIn={loggedIn}loggedOut={loggedOut}></Nav>)
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
            updateDeleteModalIsOpen={updateDeleteModalIsOpen}
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
