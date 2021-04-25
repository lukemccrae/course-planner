import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import Start from './Start';
import DisplayCircle from './DisplayCircle';
import DashFront from './DashFront';
import DashNoLogin from './DashNoLogin';
import {Grid, Row} from './Grid';
import 'whatwg-fetch';
import styled from 'styled-components';

const TimerDisplay = styled.div`
  padding-left: 25vw;
  margin-left: 10%;
  padding-top: 20px;
`

function Front(props) {

  const [newTimerLength, setNewTimerLength] = useState('15');
  const [newTimerName, setNewTimerName] = useState('Task 2');
  const [timerStart, setStartTimer] = useState(false);
  const [testGroup, setTestGroup] = useState({
    name: "Test Group",
    timers: [{
      name: "Task 1",
      length: 900,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    }
],
    hash: "newgroup",
    timerGoing: false
  });

  function addItem(timerName) {
    let group = testGroup;
    let newTimer = {
      name: timerName,
      length: newTimerLength * 60,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    }
    if(group.timers.length < 5) {
      group.timers.push(newTimer)
      setTestGroup(group);
      setNewTimerName('Task ' + (group.timers.length + 1));
      setNewTimerLength('15')
    }
  }

  function editTimerLength(x, timer) {
    console.log(timer)
    let group = testGroup;
    for (let i = 0; i < group.timers.length; i++) {
      if(group.timers[i].id == timer.id) {
        group.timers[i].length = x * 60;
      }      
    }
    setTestGroup(group);
  }

  function delItem(item) {
    let group = testGroup;
    let timersAmt = parseInt(group.timers.length);

    function isTimer(element) {
      if(element.id === item.id) return element;
    }
    let index = group.timers.findIndex(isTimer);
    group.timers.splice(index, 1);

    setTestGroup(group);
    setNewTimerName('Task ' + timersAmt)
  }

    return (
      <div>
        {/* <DashNoLogin groups={[testGroup]} colors={props.colors} timeFormat={props.timeFormat} ></DashNoLogin> */}
        {/* <Nav loggedIn={props.loggedIn} log={""} username={""} getTimers={function(){}} loggedOut={true}></Nav>
          <TimerDisplay>
            {!timerStart ? <DisplayCircle
                group={testGroup}
                timer={{length: 100}}
                colors={props.colors}
              >
              </DisplayCircle> : 
              <Start colors={props.colors} startTimer={timerStart} timerStart={timerStart} boxContents={''} userId={props.userId} getTimers={function(){}} closeModal={function(){}} timeFormat={props.timeFormat} group={testGroup}></Start>
            }
          </TimerDisplay>
          <Grid>
          <Row>
            <DashFront
                timeFormat={props.timeFormat} 
                timerStart={timerStart}
                startTimer={setStartTimer}
                onTextboxChangeNewTimerName={setNewTimerName}
                colors={props.colors}
                newTimerName={newTimerName}
                delItem={delItem}
                editTimerLength={editTimerLength}
                addItem={addItem}
                group={testGroup}
                >
                </DashFront>
          </Row>
        </Grid> */}
      </div>
    )
}

export default Front;
