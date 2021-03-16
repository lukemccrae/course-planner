import React, {Component} from 'react';
import TimeSum from './TimeSum.js';
import Start from './Start.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
import Box from './ForgetBox.js';
import {getFromStorage} from '../utils/storage';
import {Grid, Row, Col} from './Grid';
import Slider from 'react-input-slider';
import Modal from 'react-modal';
const ReactDOM = require('react-dom');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const EditBox = styled.div`

`

const GroupInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 50%;
  outline: 0;
  border-width: 0 0 1px;

`

const SliderBox = styled.div`
  width: 30%;
  margin: 5px 0 0 0;
`

const TimerMinsDisplay = styled.div`
  margin: 5px 5px 0 10px;
`

const TimerInput = styled.input`
  display: inline;
  font-size: 15px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 90%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;
  border-color: ${(props) => props.colors[props.timers.indexOf(props.t)]};
`

const TimerInputNew = styled.input`
  display: inline;
  font-size: 15px;
  margin: 0px 5px 10px 5px;
  width: 90%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;

`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

const VerticalDivider = styled.div`
  border-right: 2px solid #D3D3D3;
  margin: 0 10px 0 10px;
`

class EditGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      timers: [],
      groupName: '',
      timerLengthMins: 5,
      timerLengthSecs: 0,
      newTimerName: 'Task ',
      newTimerLength: 15,
      timerToEdit: {},
      showDetails: false,
      deleteModalIsOpen: false
    }

    this.deleteModal = this.deleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addItem = this.addItem.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this);
    this.onTextboxChangeNewTimerName = this.onTextboxChangeNewTimerName.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
    this.onTextboxChangeNewTimerLength = this.onTextboxChangeNewTimerLength.bind(this);
    this.editTimerLength = this.editTimerLength.bind(this);
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this);
  }

  editTimerLength(x, timer) {
    let temp = this.state.timers;
    for (let i = 0; i < temp.length; i++) {
      if(temp[i].id == timer.id) {
        temp[i].length = x * 60;
      }      
    }
    this.setState({
      timerToEdit: temp
    })
    // this.onTextboxChangeTimerLengthMins({target: {value: x}}, temp)
  }

  onTextboxChangeNewTimerLength(x) {
    this.setState({
      newTimerLength: x
    })
  }

  onTextboxChangeNewTimerName(event) {
    console.log(event)
    this.setState({
      newTimerName: event.target.value
    })
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

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
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

  closeDeleteModal() {
    this.setState({
      deleteModalIsOpen: false
    })
  }

  deleteModal() {
    console.log(this.deleteModalIsOpen)
    this.setState({
      deleteModalIsOpen: true
    })
  }


  componentDidMount() { 
    let timersAmt = parseInt(this.props.group.timers.length) + 1;
    this.setState({
      timers: this.props.group.timers,
      groupName: this.props.group.name,
      id: this.props.group._id,
      newTimerName: 'Task ' + timersAmt
    })
  }

  calculateTime() {
    let mins = this.state.timerLengthMins * 60;
    return this.state.timerLengthSecs + mins;
  }

  addGroup() {
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
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }
  
    delItem(item) {
      let timersAmt = parseInt(this.state.timers.length);

      function isTimer(element) {
        if(element.id === item.id) return element;
      }
      let index = this.state.timers.findIndex(isTimer);
      this.state.timers.splice(index, 1);
      let timers = this.state.timers;
      this.setState({
        timers: timers,
        newTimerName: 'Task ' + timersAmt,
      })
    }

    showDetails() {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    addItem() {
      let timers = this.state.timers;
      let timersAmt = parseInt(this.state.timers.length) + 2;
      let newTimer = {
        name: this.state.newTimerName,
        length: this.state.newTimerLength * 60,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }
      if(this.state.timers.length < 5) {
        timers.push(newTimer)
        this.setState({
          timers: timers,
          newTimerName: this.state.timers.length < 5 ? 'Task ' + timersAmt : '',
          newTimerLength: '15'
        })
      }
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
          {this.props.group.hash === 'newgroup' ? null : <GroupInput type="text" ref={this.groupNameRef} placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>}
        <EditBox>
          {/* <Grid> */}
            {this.state.timers.map(t => {
              return (
                <Row key={t.id}>
                  {/* <Col size={.2}> */}
                    <button style={{display: this.state.timers.length < 2 ? "none" : "inline", marginBottom: "10px"}} onClick={()=>{this.delItem(t)}} type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  {/* </Col> */}

                  <Col size={.5}>
                    <TimerInput colors={this.props.colors} timers={this.state.timers} t={t} type="text" value={t.name} onChange={(e) => this.onTextboxChangeTimerName(e, t)}/>
                  </Col>
                  <TimerMinsDisplay><div fontSize={12}>{t.length / 60}</div></TimerMinsDisplay>
                  <Col size={.01}></Col>

                  {/* <Col size={1}><TimerInput onBlur={()=>{this.onFocus({})}} onFocus={()=>{this.onFocus(t)}} type="number" placeholder="Mins" value={this.props.timeFormat(t.length, 'num')[0]} onChange={(e) => this.onTextboxChangeTimerLengthMins(e, t)}/></Col> */}
                  <Col size={.5}>
                    
                  <SliderBox>
                    <Slider
                    axis="x"
                    xmax = {30}
                    x={t.length / 60}
                    onChange={({ x }) =>  this.editTimerLength(x, t)}
                    styles={{
                      active: {backgroundColor: this.props.colors[this.props.group.timers.indexOf(t)]}
                    }}
                    />
                  </SliderBox>
                  </Col>

                </Row>
              )
            })}
            <Divider></Divider>
            <Row>
              <Col size={1}>
                <TimeSum timers={this.state.timers}></TimeSum>
              </Col>
              <Col size={3}>
                <TimerInputNew style={{margin: '5px 0 0 0'}} type="text" placeholder={'name'} value={this.state.newTimerName} onChange={(e) => this.onTextboxChangeNewTimerName(e)}/>
                  <Col size={.1}></Col>
              </Col>
              <Col size={.5}>
                <Button style={{display: 'inline'}} disabled={this.state.timers.length >= 5 || this.props.timerStart} onClick={this.addItem}>Add</Button>
              </Col>
            </Row>
              <Divider></Divider>
              {this.state.showDetails === true ? 
              <div>
                {console.log(this.props.group)}
                <Box boxContents={this.props.group.box} group={this.props.group}></Box>
                <Divider></Divider>
              </div> : null}
              <Row style={{display: 'flex'}}>
              <Col size={2}>
                {/* if no token, show start button. if token, show save/add and delete
                  this is so that editTimer appears different on signIn and Dash components */}
                  {getFromStorage('the_main_app') ? (
                    <div>
                      {/* dont show button if its add group box */}
                      {this.props.group.hash === 'newgroup' ? null : <Button className="five-px-margin-right" onClick={this.deleteModal}>Delete</Button>}
                        {/* show add group button if its new group box, save button if save box */}
                      {this.props.group.hash === 'newgroup' ? 
                      <Button onClick={this.addGroup}>Save</Button>
                      :
                      <Button className="five-px-margin-right" onClick={this.saveGroup}>Save</Button>}
                      <Button onClick={() => this.showDetails()}>Details</Button>
                    </div>
                  )
                :
                (<Button onClick={this.props.startTimer}>&#9658;</Button>)}
              </Col>
              {/* <Col size={1}><TimerInput type="number" onChange={(e) => this.onTextboxChangeNewTimerLength(e)} value={this.state.newTimerLength} placeholder="Mins"/></Col> */}
              </Row>

          {/* </Grid> */}

        </EditBox>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeDeleteModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button className="five-px-margin-right"  onClick={() => this.props.deleteGroup(this.props.group)}>Delete</Button>
            <Button className="five-px-margin-right" onClick={this.closeDeleteModal}>Cancel</Button>
          </div>
        </Modal>
        </div>
    )
  }

}

export default EditGroup;
