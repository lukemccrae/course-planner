import React, {useState, useEffect} from 'react';
import Countdown from 'react-countdown-now';
import Completionist from './Completionist';
import CountdownCircle from './CountdownCircle';
import {Row} from './Grid';
import styled from 'styled-components';

const TimerDisplay = styled.div`
  
`

const CountdownBox = styled.div`
  display: flex;
  font-size: 15px;
`

function Start(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [percentDone, setPercentDone] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [forgetBox, setForgetBox] = useState([]);


  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    props.getTimers();
    props.closeModal();
    setCurrentTimerIndex(0);
  }

  function start() {
    openModal()
  }

  function routineEnded() {
    if(currentTimerIndex < props.group.timers.length - 1) {
      return false;
    } else {
      return true;
    }
  }

  function nextTimer() {
    if(routineEnded() === false) {
      let tempTimerIndex = currentTimerIndex;
      tempTimerIndex = ++tempTimerIndex;
      setCurrentTimerIndex(tempTimerIndex);
      
    } else {
      closeModal();
    }
  }

  function formatCountdown(timer) {
    return Date.now() + timer.length * 1000;
  }

  function countdownDisplay(timer) {
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
            timerStart={props.timerStart}
            timer={timer} 
            minutes={minutes}
            seconds={seconds}
            currentTimer={timer}
            getTimers={props.getTimers}
            nextTimer={nextTimer}
            userId={props.userId}
            percent={100 - percentDone * 100}
            group={props.group}
            colors={props.colors}
          >
          </CountdownCircle>
        );

      // }
    };

      let countdownComponent = (
        <Countdown controlled={false} renderer={renderer} date={formatCountdown(timer)}>
          <Completionist getTimers={props.getTimers} currentTimer={timer} nextTimer={nextTimer}></Completionist>
        </Countdown>
      )

    if(props.group.timers[currentTimerIndex] !== undefined) {
      if(timer.id === props.group.timers[currentTimerIndex].id) {
        return (
          countdownComponent
        )
       }
      }
  }

    return (
      <div style={{minHeight: '45vh'}}>
          <Row>
          <TimerDisplay>
            {props.group.timers.map(t => {
              return (
                <CountdownBox key={t.id}>
                  {countdownDisplay(t)}
                </CountdownBox>
              )
            })} 
            </TimerDisplay>
          </Row>
      </div>
    )
}

export default Start;
