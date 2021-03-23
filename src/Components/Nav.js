import React, {Component} from 'react';
import Logout from './Logout';
import Stats from './Stats';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-modal';

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

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      statsModalIsOpen: false,
      loginModalIsOpen: false,
      statPeriod: 'Week',
      showRegister: false

    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openStatsModal = this.openStatsModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
    this.showRegister = this.showRegister(this);
    
  }

  changePeriod(period) {
    this.setState({
      statPeriod: period.value
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      statsModalIsOpen: false,
      loginModalIsOpen: false,
      statPeriod: 'Week'
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  openStatsModal() {
    let sortedLog = {
      dayStats: [],
      weekStats: []
    }

      //is this log entry already in the counter?
      function findLog(entry) {
        return sortedLog.weekStats.map(function(l) { return l.name; }).indexOf(entry); 
    };
    
    function Stat(name, length, key, date) {
      this.name = name;
      this.length = length;
      this.key = key;
      this.date = date;
  }

    for (let i = 0; i < this.props.log.length; i++) {

      //if its not there,
      if(findLog(this.props.log[i].name) === -1) {
          
          //push a new stat entry
          let stat1 = new Stat(this.props.log[i].name, this.props.log[i].length, i, this.props.log[i].date)

          //if the activity was done in the past 24 hours, push it into dayStat array
          if(Date.now() - this.props.log[i].date <= 86400000) {
            sortedLog.dayStats.push(stat1)
          }
          
          //push it into weekStat array regardless
          sortedLog.weekStats.push(stat1);
      } else {
          //increment hash map log value
          sortedLog.weekStats[findLog(this.props.log[i].name)].length += this.props.log[i].length

          if(Date.now() - this.props.log[i].date <= 86400000) {
              sortedLog.dayStats[findLog(this.props.log[i].name)].length += this.props.log[i].length 
          }
      }
  }
    //sort logs according to most time done
    sortedLog.weekStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));
    sortedLog.dayStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));

    this.setState({
      statsModalIsOpen: true,
      sortedLog: sortedLog
    })
  }

  openLoginModal() {
    this.setState({loginModalIsOpen: true});
  }


  showRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Container>
            <div>{this.props.username}</div>
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
            {/* <Button onClick={this.props.addModal}>Add Group</Button> */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.openStatsModal}>Stats</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/lukemccrae/routine-timer">Github</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item>
                <Logout openLoginModal={this.openLoginModal} loggedOut={this.props.loggedOut} token={this.props.token}></Logout>
              </NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
        <Modal
          isOpen={this.state.loginModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Login showRegister={this.showRegister} loggedIn={this.props.loggedIn}></Login>
        </Modal>
        <Modal
          isOpen={this.state.statsModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Stats statPeriod={this.state.statPeriod} changePeriod={this.changePeriod} log={this.state.sortedLog}></Stats>
        </Modal>
      </div>
    )
  }
}

export default Nav;
