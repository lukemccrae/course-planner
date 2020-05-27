import React, {Component} from 'react';
import TimeSum from './TimeSum.js';
import cloneDeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Grid, Row, Col, Centered} from './Grid';

const GroupInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 40px 5px;
  background-color: #D3D3D3;
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #007bff;
`

const TimerInput = styled.input`
  font-size: 20px;
  margin: 0px 5px 30px 5px;
  background-color: #D3D3D3;
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #007bff;
`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin-bottom: 30px
`

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 15px 0;
`

class EditGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      timers: [],
      groupName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      newTimerName: 'New Timer',
      newTimerLength: ''
    }

    this.addModal = this.addModal.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
    this.onTextboxChangeNewTimerName = this.onTextboxChangeNewTimerName.bind(this);
    this.onTextboxChangeNewTimerLength = this.onTextboxChangeNewTimerLength.bind(this);
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this);
  }

  componentDidMount() {
    this.setState({
      timers: this.props.group.timers,
      groupName: this.props.group.name,
      id: this.props.group._id
    })
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeNewTimerName(event) {
    this.setState({
      newTimerName: event.target.value
    })
  }

  onTextboxChangeNewTimerLength(event) {
    if(event.target.value < 60 && event.target.value !== 'e') {
      console.log('hi');
      
      this.setState({
        newTimerLength: event.target.value
      })
    }
  }

  onTextboxChangeTimerName(event, t) {
    let timers = cloneDeep(this.state.timers)
    for (var i = 0; i < timers.length; i++) {
      if(timers[i].id === t.id) {
        timers[i].name = event.target.value
      }
    }
    this.setState({
      timers: timers
    })
  }

  onTextboxChangeTimerLengthMins(event, t) {
    if(event.target.value < 60 && event.target.value !== 'e') {
      let timers = cloneDeep(this.state.timers)
      for (var i = 0; i < timers.length; i++) {
        if(timers[i].id === t.id) {
          timers[i].length = event.target.value * 60
        }
      }
      this.setState({
        timers: timers
      })
    }
  }

    addModal() {
      this.setState({modalIsOpen: true});
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

    addItem() {
      let timers = this.state.timers;
      let newTimer = {
        name: this.state.newTimerName,
        length: this.state.newTimerLength * 60,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }
      timers.push(newTimer)
      this.setState({
        timers: timers,
        newTimerName: '',
        newTimerLength: ''
      })
    }

    saveGroup(group) {
      const token = JSON.parse(localStorage.the_main_app).token;
      fetch(`https://banana-crumble-42815.herokuapp.com/group?groupId=${this.state.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.groupName,
          timers: this.state.timers
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          this.props.getTimers(token)
          this.props.closeEditModal();
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
            <button onClick={this.props.closeEditModal} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </CloseButton>
        <GroupInput type="text" ref={this.groupNameRef} placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>
        <div>
          <Grid>
            {this.state.timers.map(t => {
              return (
                <Row key={t.id}>
                  <Col size={5}><TimerInput type="text" value={t.name} onChange={(e) => this.onTextboxChangeTimerName(e, t)}/></Col>
                  <Col size={.2}></Col>
                  <Col size={1}><TimerInput type="number" placeholder="Mins" value={this.props.timeFormat(t.length, 'num')[0]} onChange={(e) => this.onTextboxChangeTimerLengthMins(e, t)}/></Col>
                  <Col size={.2}></Col>
                  <Col size={1}><Button disabled={this.state.timers.length < 2} onClick={()=>{this.delItem(t)}}>Del</Button></Col>
                </Row>
              )
            })}
            <Divider></Divider>
            <Row>
              <Col size={5}><TimerInput  type="text" placeholder={'name'} value={this.state.newTimerName} onChange={(e) => this.onTextboxChangeNewTimerName(e)}/></Col>
              <Col size={.2}></Col>
              <Col size={1}><TimerInput  type="number" onChange={(e) => this.onTextboxChangeNewTimerLength(e)} value={this.state.newTimerLength} placeholder="Mins"/></Col>
              <Col size={.2}></Col>
              <Col size={1}><Button disabled={this.state.newTimerLength === ''} onClick={this.addItem}>Add</Button></Col>
            </Row>
          </Grid>
          <TimeSum timers={this.state.timers}></TimeSum>
          <Button onClick={this.saveGroup}>Save</Button>
        </div>
        </Centered>
      </div>
    )
  }

}

export default EditGroup;
