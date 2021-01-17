import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import DashFront from './DashFront';
import {Grid, Row, Centered, Col} from './Grid';
import 'whatwg-fetch';
import styled from 'styled-components';

const StartBox = styled.div`
  height: 100%;
  
`



class Front extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
      group: {
        name: "Test Group",
        timers: [{
          name: "Task 1",
          length: 300,
        }
    ],
        hash: "newgroup",
        timerGoing: false
      },
      mockBox: "",
      mockGetTimers: function(){},
      startModalIsOpen: false,
      timerStart: false
    }

    this.signInRef = React.createRef();
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)
    this.closeModal = this.closeModal.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  
  onTextboxChangeSignInEmail(event) {
    this.setState({signInEmail: event.target.value})
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({signInPassword: event.target.value})
  }

  closeModal() {
    this.setState({
      startModalIsOpen: false,
    });
  }

  startTimer() {
    let toggle = !this.state.timerStart;
    this.setState({
      timerStart: toggle
    })
  }

  render(props) {
    return (
      <div>
        <Nav loggedIn={this.props.loggedIn} log={""} username={""} getTimers={function(){}} loggedOut={true}></Nav>
        <Grid>
          <Row>
            <Col size={1.5}></Col>
            <Col size={3}>
            <StartBox>
              <Start startTimer={this.startTimer} timerStart={this.state.timerStart} boxContents={this.state.mockBox} userId={this.props.userId} getTimers={this.state.mockGetTimers} closeModal={this.closeModal} timeFormat={this.timeFormat} group={this.state.group}></Start>
            </StartBox>
            <div style={{marginTop: '40px'}}></div>
                <DashFront
                timeFormat={this.props.timeFormat} 
                timerStart={this.state.timerStart}
                startTimer={this.startTimer}
                group={this.state.group}
                onTextboxChangeTimerName={this.onTextboxChangeTimerName}
                onTextboxChangeNewTimerName={this.onTextboxChangeNewTimerName}
                onTextboxChangeNewTimerLength={this.onTextboxChangeNewTimerLength}
                onTextboxChangeTimerLengthMins={this.onTextboxChangeTimerLengthMins}
                >
                </DashFront>
            </Col>
            <Col size={1.5}></Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Front;
