import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';
import { makeStyles } from '@material-ui/core/styles';

const MileBox = styled.tr`
  border-bottom: 1px solid #D3D3D3;
`

const MileTableHead = styled.tr`
  width: 60px;
`

const SliderBox = styled.div`
  width: 50%;
  margin: 0 0 20px 0;

`

const TableData = styled.td`
  width: 50px;
`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
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

function MileTimes({vertInfo, vertMod, terrainMod, setVertMod, goalHours, goalMinutes, distance, setMileTimes, }) {
    const [paces, setPaces] = useState([])
    const [totalTime, setTotalTime] = useState()

    useEffect(() => {
        resetPaces()
    }, [distance, goalHours, goalMinutes, terrainMod, vertMod, vertInfo])

    const classes = useStyles();
    
    function calculatePace(gain, distance) {
      let goalTime = ((parseInt(goalHours) * 60) + parseInt(goalMinutes))
      let goalDistance = parseInt(distance)
      let goalPace = goalTime / goalDistance;

      let vert = (Math.pow(terrainMod, gain / vertMod)).toFixed(2);
      return goalPace * vert;
    }

    function resetPaces() {
        let smartDistance = vertInfo.length;
        let tempPace = [];
        let tempTotalTime = 0;
        for (let i = 0; i < smartDistance; i++) {
            // updateMileTimes(course.details.pace[0] * 60 + course.details.pace[1], i)
            let newPace = calculatePace(vertInfo[i], smartDistance)
            tempPace[i] = newPace
            tempTotalTime += tempPace[i]
        }
        setMileTimes(tempPace)
        setTotalTime(tempTotalTime)
        setPaces(tempPace)
        console.log(paces)
    }

    function minTommss(minutes){
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    var toHHMMSS = (secs) => {
      var sec_num = parseInt(secs, 10)
      var hours   = Math.floor(sec_num / 3600)
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60
  
      return [hours,minutes,seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v,i) => v !== "00" || i > 0)
          .join(":")
  }

    function updateTotalTime() {
      let tempTime = totalTime;
      for (let i = 0; i < paces.length; i++) {
        tempTime += paces[i];
      }
      setTotalTime(tempTime);
    }


    return (
        <div>
          hi
            {/* <div style={{display: "flex", justifyContent: "space-around"}}>
            Equalize pace:<SliderBox>
                <Slider
                axis="x"
                xmax = {700}
                xmin = {200}
                x={vertMod}
                onChange={({ x }) =>  setVertMod(x)}/>
            </SliderBox>
            </div> */}
            {/* <section style={{margin: "0 auto"}}>
              <table style={{marginLeft: "auto", marginRight: "auto", tableLayout: "fixed", width: "250px"}}>
              <thead>
                <MileTableHead><th>Miles</th></MileTableHead>
                <MileTableHead><th>Pace</th></MileTableHead>
                <MileTableHead><th>Vert</th></MileTableHead>
              </thead>
              {paces.map((m, index) => {
                  return (
                  <MileBox key={index}>
                      <TableData>{index + 1}</TableData>
                      <TableData>{minTommss(m)}</TableData>
                      <TableData>{Math.round(vertInfo[index])} ft.</TableData>
                  </MileBox>
                  )
              })}
            </table>
            </section> */}
             {/* <h5>Total time: {toHHMMSS(totalTime*60)}</h5> */}
        </div>
    )
}

export default MileTimes;
