import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import DisplayCircle from './DisplayCircle';
import DashFront from './DashFront';
import {Grid, Row, Centered, Col} from './Grid';
import 'whatwg-fetch';
import styled from 'styled-components';

class Front extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      group: {
        name: "Test Group",
        timers: [{
          name: "Task 1",
          length: 900,
        }
    ],
        hash: "newgroup",
        timerGoing: false
      },
      mockBox: "",
      mockGetTimers: function(){},
      timerStart: false,
    newTimerName: 'Task ',
    newTimerLength: '15'
    }

    this.signInRef = React.createRef()
    this.startTimer = this.startTimer.bind(this);
    this.onTextboxChangeNewTimerName = this.onTextboxChangeNewTimerName.bind(this);
    this.editTimerLength = this.editTimerLength.bind(this);
    this.addItem = this.addItem.bind(this);
    this.delItem = this.delItem.bind(this);
  }

  componentDidMount() { 
    this.setState({
      newTimerName: 'Task ' + 2
    })
  }

  startTimer() {
    let toggle = !this.state.timerStart;
    
    this.setState({
      timerStart: toggle
    })
  }

  editTimerLength(x, timer) {
    let group = this.state.group;
    for (let i = 0; i < group.timers.length; i++) {
      if(group.timers[i].id == timer.id) {
        group.timers[i].length = x * 60;
      }      
    }
    this.setState({
      group: group
    })
  }

  addItem(timerName) {
    console.log(timerName)
    let group = this.state.group;
    let timersAmt = parseInt(group.timers.length) + 2;
    let newTimer = {
      name: timerName,
      length: this.state.newTimerLength * 60,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    }
    if(group.timers.length < 5) {
      group.timers.push(newTimer)
      this.setState({
        group: group,
        newTimerName: 'Task ' + (group.timers.length + 1),
        newTimerLength: '15'
      })
    }
  }

  delItem(item) {
    let group = this.state.group;
    let timersAmt = parseInt(group.timers.length);

    function isTimer(element) {
      if(element.id === item.id) return element;
    }
    let index = group.timers.findIndex(isTimer);
    group.timers.splice(index, 1);
    let timers = group.timers;
    this.setState({
      group: group,
      newTimerName: 'Task ' + timersAmt,
    })
  }

  onTextboxChangeNewTimerName(event) {
    this.setState({
      newTimerName: event.target.value
    })
  }

  render(props) {
    return (
      <div>
        <Nav loggedIn={this.props.loggedIn} log={""} username={""} getTimers={function(){}} loggedOut={true}></Nav>
        <Grid>
          {!this.state.timerStart ? <DisplayCircle
              group={this.state.group}
              timer={{length: 100}}
              colors={this.props.colors}
            >
            </DisplayCircle> : 
            <Start colors={this.props.colors} startTimer={this.startTimer} timerStart={this.state.timerStart} boxContents={this.state.mockBox} userId={this.props.userId} getTimers={this.state.mockGetTimers} closeModal={function(){}} timeFormat={this.timeFormat} group={this.state.group}></Start>
          }
          <Row>
            <DashFront
                timeFormat={this.props.timeFormat} 
                timerStart={this.state.timerStart}
                startTimer={this.startTimer}
                onTextboxChangeNewTimerName={this.onTextboxChangeNewTimerName}
                colors={this.props.colors}
                newTimerName={this.state.newTimerName}
                delItem={this.delItem}
                editTimerLength={this.editTimerLength}
                addItem={this.addItem}
                group={this.state.group}
                >
                </DashFront>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Front;
