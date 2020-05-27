import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import Completionist from './Completionist';
import CountdownCircle from './CountdownCircle';
import {Grid, Row, Col, Centered} from './Grid';
import ForgetBox from './ForgetBox';

import styled from 'styled-components';


const CountdownBox = styled.div`
  display: flex;
`

const CloseButton = styled.div`
  display: flex;
  justify-content: space-between;
`
class Start extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      promptModalIsOpen: false,
      currentTimerIndex: 0,
      percentDone: 0,
      minutes: 0,
      seconds: 0,
      forgetBox: [],
      lastUpdated: Date.now()
    }
    this.start = this.start.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.countdownDisplay = this.countdownDisplay.bind(this);
    this.nextTimer = this.nextTimer.bind(this);
    this.routineEnded = this.routineEnded.bind(this);
    this.formatCountdown = this.formatCountdown.bind(this);
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.props.getTimers();
    this.props.closeModal();
    this.setState({
      currentTimerIndex: 0
    });
  }

  start() {
    this.openModal()
  }

  routineEnded() {
    if(this.state.currentTimerIndex < this.props.group.timers.length - 1) {
      return false;
    } else {
      return true;
    }
  }

  nextTimer() {
    if(this.routineEnded() === false) {
      let currentTimerIndex = this.state.currentTimerIndex;
      currentTimerIndex = ++currentTimerIndex;
      this.setState({currentTimerIndex});
      
    } else {
      this.closeModal();
    }
  }

  formatCountdown(timer) {
    return Date.now() + timer.length * 1000;
  }

  countdownDisplay(timer) {
    let percentDone;
    let renderer = ({ minutes, seconds, completed }) => {
      

      //not sure if this will cause problems later.... if I leave seconds as a number it won't show two zeros
      if(minutes === 0) minutes = '00';
      if(minutes < 10 && minutes > 0) minutes = '0' + minutes;
      if(seconds === 0) seconds = '00';
      if(seconds < 10 && seconds > 0) seconds = '0' + seconds;
      // if (completed) {
        // Render a completed state
        // return ()
      // } else {
        // Render a countdown
        let totalSeconds = timer.length;
        let completedSeconds = parseInt(seconds) + minutes * 60;
        percentDone = completedSeconds / totalSeconds;
          return (
          <CountdownCircle 
          completed={completed} 
          timer={timer} 
          minutes={minutes} 
          seconds={seconds}
          currentTimer={timer}
          getTimers={this.props.getTimers}
          nextTimer={this.nextTimer}
          userId={this.props.userId}
          percent={100 - percentDone * 100}
          group={this.props.group}
          >
          </CountdownCircle>
        );

      // }
    };

      let countdownComponent = (
        <Countdown controlled={false} renderer={renderer} date={this.formatCountdown(timer)}>
          <Completionist getTimers={this.props.getTimers} currentTimer={timer} nextTimer={this.nextTimer}></Completionist>
        </Countdown>
      )



    // let displayComponent = (
    //   <Row>
    //     <Col>
    //       <DisplayStyled>
    //         {this.props.timeFormat(timer.length, 'str')}
    //       </DisplayStyled>
    //     </Col>
    //   </Row>
    // )

    if(this.props.group.timers[this.state.currentTimerIndex] !== undefined) {
      if(timer.id === this.props.group.timers[this.state.currentTimerIndex].id) {
        
        return (
          countdownComponent
        )
       }
      // } 
      // else {
      //   return (
      //     displayComponent
      //   )
      }
  }

  render() {
    return (
      <div>
      <Centered>
      <Grid>
        <CloseButton>
            <h5 ref={subtitle => this.subtitle = subtitle}>{this.props.group.name}</h5>
            <button onClick={this.props.closeModal} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </CloseButton>
          <Row>
            <Col size={4}></Col>
            {this.props.group.timers.map(t => {
              return (
                <CountdownBox key={t.id}>
                  <Col size={8}>
                    {this.countdownDisplay(t)}
                  </Col>
                </CountdownBox>
              )
            })} 
            <Col size={4}></Col>
          </Row>
            <ForgetBox getTimers={this.props.getTimers} boxContents={this.props.boxContents} group={this.props.group} value={this.state.forgetBox} onChange={this.updateForgetBox}></ForgetBox>
        </Grid>
      </Centered>
      </div>
    )
  }
}

export default Start;
