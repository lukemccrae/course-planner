import React, {Component} from 'react';
import TimeSum from './TimeSum.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Grid, Row, Col, Centered} from './Grid';

const AddList = styled.div`
  display: flex;
  justify-content: space-between;
`

const NewGroupInput = styled.input`
  font-size: 30px;
  margin: 5px 5px 40px 5px;
  background-color: #cccccc;
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #007bff;
`

const NewTimerInput = styled.input`
  font-size: 30px;
  margin: 5px 5px 30px 5px;
  background-color: #cccccc;
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #007bff;

`

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

class AddGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerLengthMins: 3,
      timerLengthSecs: 0,
      timerName: '',
      timers: [],
      groupName: ''
    }
    this.groupNameRef = React.createRef();
    this.timerNameRef = React.createRef();
    this.addTimer = this.addTimer.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.Timer = this.Timer.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this);
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this);
    this.onTextboxChangeTimerLengthSecs = this.onTextboxChangeTimerLengthSecs.bind(this);
  }

  onTextboxChangeTimerName(event) {
    this.setState({timerName: event.target.value})
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeTimerLengthMins(event) {
    if(event.target.value < 60 && event.target.value !== 'e') {
      this.setState({timerLengthMins: event.target.value})
    }
  }

  onTextboxChangeTimerLengthSecs(event) {
    if(event.target.value < 60) {
      this.setState({timerLengthSecs: event.target.value})
    }
  }

  componentDidMount() {
    this.groupNameRef.current.focus();
  }

  calculateTime() {
    let mins = this.state.timerLengthMins * 60;
    return this.state.timerLengthSecs + mins;
  }

  addTimer() {
    let tempTimers = this.state.timers;
    let addTimeMins = this.state.timerLengthMins * 60;
    let addTimeSecs = this.state.timerLengthSecs;
    let newTimer = new this.Timer(this.state.timerName, addTimeMins, addTimeSecs)
    if(this.state.timerName !== '') {
      tempTimers.push(newTimer)
      this.setState({timers: tempTimers, timerName: '', timerLengthMins: 3, timerLengthSecs: 0})
    }
    this.timerNameRef.current.focus();
  }

  Timer(name, lengthMins, lengthSecs) {
    this.name = name;
    this.length = parseInt(lengthMins) + parseInt(lengthSecs);
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

  delItem(item) {
    function isTimer(element) {
      if(element.id === item.id) return element;
    }
    let index = this.state.timers.findIndex(isTimer);
    this.state.timers.splice(index, 1);
    let timers = this.state.timers;
    this.setState({
      timers: timers
    })
  }

  saveGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`https://banana-crumble-42815.herokuapp.com/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.groupName,
        length: this.calculateTime(),
        timers: this.state.timers,
        hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
        token: token
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        this.setState({timers: [], groupName: ''})
        this.props.getTimers(token)
        this.props.closeModal()
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }



  render() {
    return (
      <div>
        <Centered>
          <CloseButton>
            <button onClick={this.props.closeModal} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </CloseButton>
            <NewGroupInput type="text" ref={this.groupNameRef} placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>
          {this.state.timers.map(t => {
            return (
              <AddList key={t.id}>
                <p>{t.name}, {this.props.timeFormat(t.length, 'str')}</p>
                <Button disabled={this.state.timers.length < 2} onClick={() => {this.delItem(t)}}>Del</Button>
              </AddList>
            )
          })}
          <Grid>
            <Row>
              <Col size={6}>
                <NewTimerInput type="text" ref={this.timerNameRef} placeholder="Timer Name" value={this.state.timerName} onChange={this.onTextboxChangeTimerName}/>
              </Col>
              <Col size={.5}></Col>
              <Col size={1}>
                <NewTimerInput type="number" placeholder="Mins" value={this.state.timerLengthMins} onChange={this.onTextboxChangeTimerLengthMins}/>
              </Col>
            </Row>
            <Row>
              <TimeSum timers={this.state.timers}></TimeSum>
            </Row>
            <Row>
              <Col size={2}>
                <Button onClick={this.addTimer}>Add Timer</Button></Col>
              <Col size={2}>
                <Button onClick={this.saveGroup}>Save</Button>
              </Col>
              <Col size={1}></Col>
            </Row>
          </Grid>
          </Centered>
      </div>
    )
  }

}

export default AddGroup;
