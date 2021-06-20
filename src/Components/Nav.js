import React, {useState} from 'react';
import Login from './Login';
import AppBar from './AppBar';
import 'react-dropdown/style.css';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50vw'
  }
};

function Nav(props) {
  console.log(props)
  const [statsModalIsOpen, setStatsModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [statPeriod, setStatPeriod] = useState('Week');
  const [sortedLog, setSortedLog] = useState([]);


  function changePeriod(period) {
    setStatPeriod(period.value)
  }

  function closeModal() {
    setStatsModalIsOpen(false);
    setLoginModalIsOpen(false);
  }


  function onSelect(e) {
    console.log(e)
    switch(e.value){
      case 'github':
        window.open('https://github.com/lukemccrae/course-planner', '_blank');
        break;
      case 'Login': 
        openLoginModal();
        break;
      case 'Logout': 
        onLogout();
        break;
    }
  }

  function onLogout() {
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/logout?token=${props.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(callback => {
        if(callback.status === 200) {
          props.loggedOut();
        } else {
          console.log(callback);
        }
      });
  }

  function openLoginModal() {
    setLoginModalIsOpen(true)
  }

    return (
      <div>
        <AppBar onSelect={onSelect} openLoginModal={openLoginModal} onLogout={onLogout}></AppBar>
        {/* <Navbar bg="light">
          <Container>
            <a href="'https://github.com/lukemccrae/course-planner', '_blank'">Github</a>
            <h4>Course Planner</h4>
            {getFromStorage("course_planner") ? <a href="#" onClick={onLogout}>Logout</a> : <a href="#" onClick={openLoginModal}>Login</a>}

          </Container>
        </Navbar> */}
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Login closeModal={closeModal} loggedIn={props.loggedIn}></Login>
        </Modal>
        <Modal
          isOpen={statsModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        </Modal>
      </div>
    )

}

export default Nav;
