import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import Completionist from './Completionist';
import CountdownCircle from './CountdownCircle';
import {Grid, Row, Centered} from './Grid';
import {getFromStorage} from '../utils/storage';
import ForgetBox from './ForgetBox';

import styled from 'styled-components';

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 80%;
  margin-bottom: 20px;
`

const TimerDisplay = styled.div`
  
`


const CountdownBox = styled.div`
  display: flex;
  font-size: 15px;
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

        // Render a countdown
        let totalSeconds = timer.length;
        let completedSeconds = parseInt(seconds) + minutes * 60;
        percentDone = completedSeconds / totalSeconds;
          return (
          <CountdownCircle 
            completed={completed}
            timerStart={this.props.timerStart}
            timer={timer} 
            minutes={minutes}
            seconds={seconds}
            currentTimer={timer}
            getTimers={this.props.getTimers}
            nextTimer={this.nextTimer}
            userId={this.props.userId}
            percent={100 - percentDone * 100}
            group={this.props.group}
            colors={this.props.colors}
          >
          </CountdownCircle>
        );

      // }
    };

      let countdownComponent = (
        <Countdown controlled={false} renderer={renderer} date={this.formatCountdown(timer)}>
          <Completionist currentColor={this.state.currentColor} getTimers={this.props.getTimers} currentTimer={timer} nextTimer={this.nextTimer}></Completionist>
        </Countdown>
      )


    if(this.props.group.timers[this.state.currentTimerIndex] !== undefined) {
      if(timer.id === this.props.group.timers[this.state.currentTimerIndex].id) {
        
        return (
          countdownComponent
        )
       }
      }
  }

  render() {
    return (
      <div style={{minHeight: '45vh'}}>
      {/* <Centered> */}
      {getFromStorage('the_main_app') ?
        <CloseButton>
         {/* <h5 ref={subtitle => this.subtitle = subtitle}>{this.props.group.name}</h5> */}
            {/* <button onClick={this.props.closeModal} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> */}
          </CloseButton>
          : null }
          <Row>
          <TimerDisplay>
            {this.props.group.timers.map(t => {
              return (
                  <CountdownBox key={t.id}>
                    {this.props.timerStart ? this.countdownDisplay(t) : 
                        <CountdownCircle 
                        completed={false}
                        timerStart={this.props.timerStart}
                        //passing only length and not a name causes the countdown to not start
                        timer={{length: 100}} 
                        colors={this.props.colors}
                        minutes={"1"}
                        seconds={"1"}
                        currentTimer={t}
                        getTimers={this.props.getTimers}
                        nextTimer={this.nextTimer}
                        userId={this.props.userId}
                        percent={5}
                        group={this.props.group}
                      >
                      </CountdownCircle>}
                </CountdownBox>
              )
            })} 
            </TimerDisplay>
          </Row>
          {/* { {getFromStorage('the_main_app') ? 
            <Footer>
              <ForgetBox getTimers={this.props.getTimers} boxContents={this.props.boxContents} group={this.props.group} value={this.state.forgetBox} onChange={this.updateForgetBox}></ForgetBox>
            </Footer> 
          : 
            null
          } } */}
      
      </div>
    )
  }
}

export default Start;
