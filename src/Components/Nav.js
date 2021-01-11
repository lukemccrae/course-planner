import React, {Component} from 'react';
import Logout from './Logout';
import Stats from './Stats';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
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
    width                 : '80%'
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
    if(this.state.statPeriod === 'Week') {
      this.setState({
        statPeriod: 'Day'
      })
    } else {
      this.setState({
        statPeriod: 'Week'
      })
    }
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
    this.setState({statsModalIsOpen: true});
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
          <Stats statPeriod={this.state.statPeriod} changePeriod={this.changePeriod} log={this.props.log}></Stats>
        </Modal>
      </div>
    )
  }
}

export default Nav;
