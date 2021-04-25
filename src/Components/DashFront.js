import React, {useState, useEffect} from 'react';
import TimeSum from './TimeSum.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
import {Row, Col} from './Grid';
import Slider from 'react-input-slider';

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

function DashFront(props) {
  
  const [timers, setTimers] = useState([]);
  const [newTimerName, setNewTimerName] = useState("Task");
  const [newTimerLength, setNewTimerLength] = useState(15);
  const [group, setGroup] = useState({});

    useEffect(() => {
      console.log(props)
      setTimers(props.group.timers)
    }, []);



  function onTextboxChangeTimerName(event, t) {
    console.log(event, t)
    let timers = cloneDeep(timers)
    for (var i = 0; i < timers.length; i++) {
      if(timers[i].id === t.id) {
        timers[i].name = event.target.value
      }
    }
    setTimers(timers);
  }

  // function onTextboxChangeTimerLengthMins(event, t) {
  //   if(event.target.value < 60 && event.target.value !== 'e') {
  //     let timers = cloneDeep(timers)
  //     for (var i = 0; i < timers.length; i++) {
  //       if(timers[i].id === t.id) {
  //         timers[i].length = event.target.value * 60
  //       }
  //     }
  //     setState({
  //       timers: timers
  //     })
  //   }
  // }

  // function componentDidMount() {
  //   setState({
  //     timers: props.group.timers,
  //     groupName: props.group.name,
  //     id: props.group._id,
  //     newTimerName: 'Task ' + props.group.timers.length + 2
  //   })
  // }

    return (
      <Footer>
            {timers.map(t => {
              return (
                //turn off timer rows if start is running. 
                <Row style={{display: props.timerStart ? "none" : "flex"}} key={t.id}>
                  <Col size={.05}>
                    <div style={{minWidth: '15.87px'}}>
                      <button style={{display: props.group.timers.length < 2 ? "none" : "inline"}} onClick={()=>{props.delItem(t)}} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </Col>

                  <Col size={.5}>
                    <TimerInput colors={props.colors} timers={props.group.timers} t={t} disabled={true} type="text" value={t.name} onChange={(e) => onTextboxChangeTimerName(e, t)}/>
                  </Col>
                  <TimerMinsDisplay><div fontSize={12}>{t.length / 60}</div></TimerMinsDisplay>
                  <Col size={.01}></Col>

                  <Col size={.5}>
                    
                  <SliderBox>
                    <Slider
                    axis="x"
                    xmax = {30}
                    x={t.length / 60}
                    onChange={({ x }) =>  props.editTimerLength(x, t)}
                    disabled={props.timerStart}
                    styles={{
                      active: {backgroundColor: props.colors[props.group.timers.indexOf(t)]}
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
                  {props.timerStart ? <Button onClick={() => props.startTimer(!props.timerStart)}>&#9632;</Button> : <Button onClick={props.startTimer}>&#9658;</Button>}
                    <div style={{marginLeft: '15px'}}>
                      <TimeSum timers={props.group.timers}></TimeSum>
                    </div>
              </Col>
              <VerticalDivider></VerticalDivider>
                <Col size={4}>
                  <TimerInputNew disabled={false} type="text" placeholder={'name'} value={props.newTimerName} onChange={(e) => props.onTextboxChangeNewTimerName(e)}/>
                </Col>
                <Col size={1}>
                  <Button disabled={props.group.timers.length >= 5 || props.timerStart} onClick={() => props.addItem(props.newTimerName)}>Add</Button>
                </Col>
            </Row>

      </Footer>
    )
  }

export default DashFront;
