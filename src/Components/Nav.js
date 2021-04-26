import React, {useState} from 'react';
import Logout from './Logout';
import Stats from './Stats';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-modal';
import {getFromStorage} from '../utils/storage';

// import styled from 'styled-components';
// const TitleLetter = styled.h4`
//   display: inline;
//   color: ${(props) => props.color};
// `

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [statsModalIsOpen, setStatsModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [statPeriod, setStatPeriod] = useState('Week');
  const [showRegister, setShowRegister] = useState(false);
  const [sortedLog, setSortedLog] = useState([]);


  function changePeriod(period) {
    setStatPeriod(period.value)
  }

  function closeModal() {
    setModalIsOpen(false);
    setStatsModalIsOpen(false);
    setLoginModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function openStatsModal() {
    let sortedLog = {
      dayStats: [],
      weekStats: []
    }
      //is this log entry already in the counter?
      function findLog(entry) {
        return sortedLog.weekStats.map(function(l) { return l.name; }).indexOf(entry); 
    };
    
    function Stat(name, length, key, date) {
      name = name;
      length = length;
      key = key;
      date = date;
  }

    for (let i = 0; i < props.log.length; i++) {

      //if its not there,
      if(findLog(props.log[i].name) === -1) {
          
          //push a new stat entry
          let stat1 = new Stat(props.log[i].name, props.log[i].length, i, props.log[i].date)

          //if the activity was done in the past 24 hours, push it into dayStat array
          if(Date.now() - props.log[i].date <= 86400000) {
            sortedLog.dayStats.push(stat1)
          }
          
          //push it into weekStat array regardless
          sortedLog.weekStats.push(stat1);
      } else {
          //increment hash map log value
          sortedLog.weekStats[findLog(props.log[i].name)].length += props.log[i].length

          if(Date.now() - props.log[i].date <= 86400000) {
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
            <h4>Group Timer</h4>

            {/* //colorful title? */}
            {/* <div>
              <TitleLetter color={"#428A79"}>G</TitleLetter>
              <TitleLetter color={"#71AF55"}>r</TitleLetter>
              <TitleLetter color={"#F00500"}>o</TitleLetter>
              <TitleLetter color={"#E47043"}>u</TitleLetter>
              <TitleLetter color={"#B63534"}>p</TitleLetter>
              <TitleLetter color={"#428A79"}> T</TitleLetter>
              <TitleLetter color={"#71AF55"}>i</TitleLetter>
              <TitleLetter color={"#F00500"}>m</TitleLetter>
              <TitleLetter color={"#E47043"}>e</TitleLetter>
              <TitleLetter color={"#B63534"}>r</TitleLetter>
            </div> */}
            {/* <Button onClick={props.addModal}>Add Group</Button> */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={openStatsModal}>Stats</NavDropdown.Item>
              <NavDropdown.Item target="_blank" href="https://github.com/lukemccrae/routine-timer">Github</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item>
              {getFromStorage("the_main_app") ? <div onClick={onLogout}>Logout</div> : <div onClick={openLoginModal}>Login</div>}
                {/* <Logout openLoginModal={openLoginModal} loggedOut={props.loggedOut} token={props.token}></Logout> */}
              </NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
        <Modal
          isOpen={loginModalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Login closeModal={closeModal} showRegister={setShowRegister} loggedIn={props.loggedIn}></Login>
        </Modal>
        <Modal
          isOpen={statsModalIsOpen}
          // onAfterOpen={afterOpenModal}
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
