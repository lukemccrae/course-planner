import React, {Component} from 'react';
import TimeSum from './TimeSum.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
import {Grid, Row, Col} from './Grid';
import Slider from 'react-input-slider';
const ReactDOM = require('react-dom');



const GroupInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 50%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #007bff;
`

const SliderBox = styled.div`
  width: 30%;
  margin: 5px 0 0 0;
`

const TimerMinsDisplay = styled.div`
  margin: 5px 5px 0 10px;
`

const TimerInput = styled.input`
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
  font-size: 15px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
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

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width:90vw;
  margin: 0 10px 20px 0;
`

class EditGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timers: [],
      timerLengthMins: 5,
      timerLengthSecs: 0,
      newTimerLength: 15,
      newTimerName: ''
    }

    this.calculateTime = this.calculateTime.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
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

  componentDidMount() { 
    this.setState({
      timers: this.props.group.timers,
      groupName: this.props.group.name,
      id: this.props.group._id,
      newTimerName: 'Task ' + this.props.group.timers.length + 2
    })
  }

  calculateTime() {
    let mins = this.state.timerLengthMins * 60;
    return this.state.timerLengthSecs + mins;
  }

  render() {
    return (
      <Footer>
            {this.props.group.timers.map(t => {
              return (
                //turn off timer rows if start is running. 
                <Row style={{display: this.props.timerStart ? "none" : "flex"}} key={t.id}>
                  <Col size={.05}>
                    <div style={{minWidth: '15.87px'}}>
                      <button style={{display: this.state.timers.length < 2 ? "none" : "inline"}} onClick={()=>{this.props.delItem(t)}} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </Col>

                  <Col size={.5}>
                    <TimerInput colors={this.props.colors} timers={this.props.group.timers} t={t} disabled={true} type="text" value={t.name} onChange={(e) => this.onTextboxChangeTimerName(e, t)}/>
                  </Col>
                  <TimerMinsDisplay><div fontSize={12}>{t.length / 60}</div></TimerMinsDisplay>
                  <Col size={.01}></Col>

                  <Col size={.5}>
                    
                  <SliderBox>
                    <Slider
                    axis="x"
                    xmax = {30}
                    x={t.length / 60}
                    onChange={({ x }) =>  this.props.editTimerLength(x, t)}
                    disabled={this.props.timerStart}
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
              <Col style={{display: 'flex'}} size={1.5}>
                  {this.props.timerStart ? <Button onClick={this.props.startTimer}>&#9632;</Button> : <Button onClick={this.props.startTimer}>&#9658;</Button>}
                    <div style={{marginLeft: '15px'}}>
                      <TimeSum timers={this.props.group.timers}></TimeSum>
                    </div>
              </Col>
              <VerticalDivider></VerticalDivider>
                <Col size={4}>
                  <TimerInputNew type="text" placeholder={'name'} value={this.props.newTimerName} onChange={(e) => this.props.onTextboxChangeNewTimerName(e)}/>
                </Col>
                <Col size={1}>
                  <Button disabled={this.props.group.timers.length >= 5 || this.props.timerStart} onClick={() => this.props.addItem(this.props.newTimerName)}>Add</Button>
                </Col>
            </Row>

      </Footer>
    )
  }
}

export default EditGroup;
