import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {Row, Col} from './Grid';
import cloneDeep from 'lodash.clonedeep';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));



const StopNameInput = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  // background-color: #D3D3D3;
  width: 40%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;
`

const StopInput = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  width: 40%;
  max-width: 40px;
  min-width: 40px;
  outline: 0;
  border-width: 0 0 1px;
`

const StopInputNew = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  width: 90%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;

`


function Stops(props) {
    const [stops, setStops] = useState([])
    const [newStopName, setNewStopName] = useState("Stop 2");
    const [newStopLength, setNewStopLength] = useState(15);

    const classes = useStyles();

    useEffect(() => {
        //update hook state with passed course
      })

function onTextboxChangeNewStopName(event) {
    setNewStopName(event.target.value);
}

function onTextboxChangeStopName(event, s) {
    const updatedStops = cloneDeep(stops)
    for (var i = 0; i < updatedStops.length; i++) {
      if(updatedStops[i].id === s.id) {
        updatedStops[i].name = event.target.value
      }
    }
    setStops(updatedStops)
    s.name = event.target.value
  }

  function onTextboxChangeStopMiles(event, s) {
    const updatedStops = cloneDeep(stops)
    for (var i = 0; i < updatedStops.length; i++) {
      if(updatedStops[i].id === s.id) {
        updatedStops[i].miles = event.target.value
      }
    }
    setStops(updatedStops)
    s.miles = event.target.value
  }

  function onTextboxChangeStopCals(event, s) {
    const updatedStops = cloneDeep(stops)
    for (var i = 0; i < updatedStops.length; i++) {
      if(updatedStops[i].id === s.id) {
        updatedStops[i].cals = event.target.value
      }
    }
    setStops(updatedStops)
    s.cals = event.target.value
  }

  function onTextboxChangeStopComments(event, s) {
    const updatedStops = cloneDeep(stops)
    for (var i = 0; i < updatedStops.length; i++) {
      if(updatedStops[i].id === s.id) {
        updatedStops[i].comments = event.target.value
      }
    }
    setStops(updatedStops)
    s.comments = event.target.value
  }

  function delItem(item) {
    let updatedStops;

    function isStop(element) {
      if(element.id === item.id) return element;
    }

    let index = props.stops.findIndex(isStop);
    updatedStops = props.stops.splice(index, 1);
    setStops(updatedStops)
  }

  function addItem() {
    props.addItem()
  }


  function sumCal(stops) {
    let sum = 0;
    for (let i = 0; i < stops.length; i++) {
      sum += parseInt(stops[i].cals);
    }
    return sum;
  }

    return (
        <div>
            {props.stops.map((s, index) => {
              return (
                <form className={classes.root} noValidate autoComplete="off">
                    <Row key={s.id}>
                        <button style={{display: props.stops.length < 2 ? "none" : "inline"}} onClick={()=>{delItem(s)}} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* <StopNameInput placeholder="Name" stops={stops} s={props.s} type="text" value={props.s.name} onChange={(e) => onTextboxChangeStopName(e, props.s)}/> */}
                        <TextField style={{width: "100px"}} placeholder="Name" id="standard" label={index == 0 ? "Name" : ""} s={s} defaultValue={s.name} onChange={(e) => onTextboxChangeStopName(e, s)} />

                        {/* <StopInput placeholder="Miles" stops={stops} s={props.s} type="number" value={props.s.miles} onChange={(e) => onTextboxChangeStopMiles(e, props.s)}/>
                        <StopInput placeholder="Calories" stops={stops} s={props.s} type="number" value={props.s.cals} onChange={(e) => onTextboxChangeStopCals(e, props.s)}/> */}

                        <TextField style={{width: "50px"}} placeholder="Miles" type="number" id="standard" label={index == 0 ? "Miles" : ""} defaultValue={s.miles} s={s} onChange={(e) => onTextboxChangeStopMiles(e, s)} />
                        <TextField style={{width: "50px"}} placeholder="Calories" id="standard" label={index == 0 ? "Calories" : ""} type="number" defaultValue={s.cals} s={s} onChange={(e) => onTextboxChangeStopCals(e, s)} />
                        <TextField style={{width: "250px"}} placeholder="Comments" rowsMax={4} multiline id="standard-multiline-flexible" label={index == 0 ? "Comments" : ""} type="text" defaultValue={s.comments} s={s} onChange={(e) => onTextboxChangeStopComments(e, s)} />
                    </Row>
                </form>
                
              )
            })}
            <Row>
                <div style={{paddingTop: "5px"}}>Cals: {sumCal(props.stops)}</div>
                <div style={{marginLeft: 'auto', marginRight: 0}}>
                    <Button variant="outlined" style={{display: 'inline'}} onClick={()=>{addItem()}}>Add Stop</Button>
                </div>
            </Row>
        </div>
    )
}

export default Stops;
