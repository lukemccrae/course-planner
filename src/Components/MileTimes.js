import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Slider from 'react-input-slider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const MileBox = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const SliderBox = styled.div`
  width: 30%;
  margin: 5px 0 0 0;
`

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function MileTimes({vertInfo, vert, details, goalHours, goalMinutes, distance, setMileTimes}) {
    const [paces, setPaces] = useState([])
    const [totalTime, setTotalTime] = useState()
    const [terrainMod, setTerrainMod] = useState(1.2);
    const [vertMod, setVertMod] = useState(300);
    useEffect(() => {
        resetPaces()
    }, [distance, goalHours, goalMinutes, terrainMod, vertMod])

    const classes = useStyles();
    
    function calculatePace(gain) {
        return parseFloat(((((parseInt(goalHours) * 60) + parseInt(goalMinutes)) / parseInt(distance)) * (Math.pow(terrainMod, gain / vertMod))).toFixed(2))
    }

    function resetPaces() {
        let tempPace = []
        let tempTotalTime = 0;
        for (let i = 0; i < distance; i++) {
            // updateMileTimes(course.details.pace[0] * 60 + course.details.pace[1], i)
            let newPace = calculatePace(vertInfo.cumulativeGain[i])
            tempPace[i] = newPace
        }
        setMileTimes(tempPace)
        setPaces(tempPace)
    }

    function minTommss(minutes){
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{margin: "10px 0 0 0"}}>Equalize pace: <SliderBox>
                <Slider
                axis="x"
                xmax = {700}
                xmin = {200}
                x={vertMod}
                onChange={({ x }) =>  setVertMod(x)}/>
            </SliderBox></div>


            <FormControl className={classes.formControl}>
            <InputLabel>Terrain Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={terrainMod}
                onChange={(e) => setTerrainMod(e.target.value)}
                className="cal-style"
              >
              <MenuItem value={1.05}>Road</MenuItem>
              <MenuItem value={1.1}>Moderate</MenuItem>
              <MenuItem value={1.2}>Rough</MenuItem>
              <MenuItem value={1.3}>Extreme</MenuItem>
              </Select>
            </FormControl>
            </div>
            {paces.map((m, index) => {
                return (
                <MileBox key={index}>
                    <div>Mile: {index + 1}</div>
                    <div>{minTommss(m)}</div>
                    <div>vert: {Math.round(vertInfo.cumulativeGain[index])}</div>
                </MileBox>
                )
             })}
             <div>{totalTime}</div>
             {/* <Button onClick={resetPaces}>Click me to reset pace</Button> */}
        </div>
    )
}

export default MileTimes;
