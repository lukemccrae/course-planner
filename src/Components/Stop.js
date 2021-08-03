import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {Row, Col} from './Grid';
import cloneDeep from 'lodash.clonedeep';
import TimeCals from './TimeCals';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      comments: {
        position: "absolute"
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


function Stop({mileTimes, delStop, setStops, addStop, stops, calories, vertInfo}) {
  const [countedStops, setCountedStops] = useState(0);
  
    const classes = useStyles();

function onTextboxChangeStopName(event, i) {
    const updatedStops = cloneDeep(stops)
    updatedStops[i].name = event.target.value
    setStops(updatedStops)
  }

  function onTextboxChangeStopMiles(event, i) {
    const updatedStops = cloneDeep(stops)
    updatedStops[i].miles = event.target.value
    setStops(updatedStops)
  }

  function onTextboxChangeStopCals(event, i) {
    const updatedStops = cloneDeep(stops)
    updatedStops[i].cals = event.target.value
    setStops(updatedStops)
  }

  function onTextboxChangeStopComments(event, i) {
    const updatedStops = cloneDeep(stops)
    updatedStops[i].comments = event.target.value
    // setStops(updatedStops)
  }

  function sumCal(stops) {
    let sum = 0;
    for (let i = 0; i < stops.length; i++) {
      sum += parseInt(stops[i].cals);
    }
    return sum;
  }

  function minTommss(minutes){
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}



    return (
        <div>
            {stops.sort((a, b) => a.miles - b.miles).map((s, index) => {
              return (
                <div key={s.id}>
                <form key={s.id} className={classes.root} noValidate autoComplete="off">
                    <Row style={{display: "flex", flexDirection: "row"}} key={s.id}>
                        <button style={{display: parseFloat(s.miles) === 0 ? "none" : "inline"}} onClick={()=>{delStop(index)}} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* <StopNameInput placeholder="Name" stops={stops} s={s} type="text" value={s.name} onChange={(e) => onTextboxChangeStopName(e, s)}/> */}
                        <TextField style={{width: "75px"}} placeholder="Name"  label={index == 0 ? "Name" : ""} s={s} defaultValue={s.name} onChange={(e) => onTextboxChangeStopName(e, index)} />

                        {/* <StopInput placeholder="Miles" stops={stops} s={s} type="number" value={s.miles} onChange={(e) => onTextboxChangeStopMiles(e, s)}/>
                        <StopInput placeholder="Calories" stops={stops} s={s} type="number" value={s.cals} onChange={(e) => onTextboxChangeStopCals(e, s)}/> */}

                        <TextField style={{width: "50px"}} placeholder="Miles" type="number" min="0" step="1" label={index == 0 ? "Miles" : ""} defaultValue={s.miles} s={s} onChange={(e) => onTextboxChangeStopMiles(e, index)} />
                        <TextField style={{width: "50px"}} placeholder="Calories"  label={index == 0 ? "Calories" : ""} type="number" defaultValue={s.cals} s={s} onChange={(e) => onTextboxChangeStopCals(e, s, index)} />
                        <TextField className={classes.comments} style={{width: "150px"}} placeholder="Comments" rowsMax={2} multiline label={index == 0 ? "Comments" : ""} type="text" defaultValue={s.comments} s={s} onChange={(e) => onTextboxChangeStopComments(e, index)} />
                    </Row>
                </form>
                <TimeCals miles={s.miles} countedStops={countedStops} setCountedStops={setCountedStops} vertInfo={vertInfo} calories={calories} stops={stops} mileTimes={mileTimes} index={index}></TimeCals>
                </div>
              )
            })}
            <Row>
                {/* <h5 style={{paddingTop: "5px"}}>Resupply Cals: {sumCal(stops)}</h5> */}
                <div>
                    <Button variant="outlined" style={{display: 'flex'}} onClick={addStop}>Add Stop</Button>
                </div>
            </Row>
        </div>
    )
}

export default Stop;
