import React, {useState} from 'react';
import Stats from './Stats';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-modal';
import {getFromStorage} from '../utils/storage';

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

  function openStatsModal() {
    //create two arrays of stats for user to select between
    let sortedLog = {
      dayStats: [],
      weekStats: []
    }
      //is this log entry already in the counter?
      function findLog(entry) {
        //all day stats are in week
        return sortedLog.weekStats.map(function(l) { return l.name; }).indexOf(entry); 
    };

  let oneDayAgo = 86400000;

    for (let i = 0; i < props.log.length; i++) {

      //if its not there,
      if(findLog(props.log[i].name) === -1) {

          //if the activity was done in the past 24 hours, push it into dayStat array
          if(Date.now() - props.log[i].date <= oneDayAgo) {
            sortedLog.dayStats.push(props.log[i])
          }
          
          //push it into weekStat array regardless
          sortedLog.weekStats.push(props.log[i]);
      } else {
          //increment hash map log value
          sortedLog.weekStats[findLog(props.log[i].name)].length += props.log[i].length

          if(Date.now() - props.log[i].date <= oneDayAgo) {
              sortedLog.dayStats[findLog(props.log[i].name)].length += props.log[i].length 
          }
      }
  }
    //sort logs according to most time done
    sortedLog.weekStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));
    sortedLog.dayStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));

    setStatsModalIsOpen(true)
    setSortedLog(sortedLog);
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
        <Navbar bg="light">
          <Container>
            <div>{props.username}</div>
            <h4>Course Planner</h4>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={openStatsModal}>Stats</NavDropdown.Item>
              <NavDropdown.Item target="_blank" href="https://github.com/lukemccrae/routine-timer">Github</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item>
              {getFromStorage("the_main_app") ? <div onClick={onLogout}>Logout</div> : <div onClick={openLoginModal}>Login</div>}
              </NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
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
          <Stats token={getFromStorage("the_main_app")} statPeriod={statPeriod} changePeriod={changePeriod} log={sortedLog}></Stats>
        </Modal>
      </div>
    )

}

export default Nav;
