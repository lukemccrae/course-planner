import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';
import GainProfile from './GainProfile';
import BasePaceMod from './BasePaceMod';
import { makeStyles } from '@material-ui/core/styles';
import haversine from 'haversine';

const MileBox = styled.tr`
  border-bottom: 1px solid #D3D3D3;
`

const MileTableHead = styled.th`
  width: ${(props) => props.width + "px"};
`

const SliderBox = styled.div`
  width: 50%;
  margin: 0 0 20px 0;

`

const TableData = styled.td`
  width: 50px;
`

const ElevationIcon = styled.div`
  height: 40px;
  width: 100px;
  border-top-right: 1px solid black;
`

const Detail = styled.strong`
  font-weight: 300;
  font-size: 20px;
`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

const ArrowRight = styled.div`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`

const ArrowLeft = styled.div`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
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

function MileTimes({vertInfo, vertMod, terrainMod, setVertMod, goalHours, goalMinutes, distance, setMileTimes, milePoints, paceAdjust, setPaceAdjust, setGoalHours, setGoalMinutes}) {
  // console.log(milePoints)
    const [paces, setPaces] = useState([])
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        resetPaces()
    }, [distance, goalHours, goalMinutes, terrainMod, vertMod, vertInfo, milePoints, paceAdjust])

    const classes = useStyles();
    
    function calculatePace(gain, distance) {
      let goalTime = ((parseInt(goalHours) * 60) + parseInt(goalMinutes))
      let goalDistance = parseInt(distance)
      let goalPace = goalTime / goalDistance;

      let vert = (Math.pow(terrainMod, gain / vertMod)).toFixed(2);
      return goalPace * vert;
    }

    function findVertModFkt(vert){
      const b1 = 0.15006;
      const b2 = 0.0000539868;
      const b3 = -6.3067 * Math.pow(10, -8);
      const b4 = 2.1199 * Math.pow(10, -11);
      const b5 = 1.5448 * Math.pow(10, -14);
      const result = b1 * vert + b2 * Math.pow(vert, 2) + b3 * Math.pow(vert, 3) + b4 * Math.pow(vert, 4) + b5 * Math.pow(vert, 5)
      return result;
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
        updateTotalTime()
    }

    function minTommss(m, index){
        var minutes;
        if(index >= 0) {
          minutes = m + paceAdjust[index]
        } else {
          minutes = m;
        }
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    var toHHMMSS = (secs) => {
      var paceAdjustSecs = paceAdjust.reduce((a, b) => a + b, 0) * 60
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
      let tempTime = 0;
      for (let i = 0; i < paces.length; i++) {
        tempTime += paces[i] + paceAdjust[i];
      }
      setTotalTime(tempTime);
    }

    function minusTime(index) {
      let tempPaceAdjust = paceAdjust;
      tempPaceAdjust[index] -= .222;
      setPaceAdjust(tempPaceAdjust)
      resetPaces()
      updateTotalTime()
    }

    function plusTime(index) {
      let tempPaceAdjust = paceAdjust;
      tempPaceAdjust[index] += .111;
      setPaceAdjust(tempPaceAdjust)
      resetPaces()
      updateTotalTime()
    }

    //slider controls to change the goal hours/minutes to select for a particular base pace
    function basePaceMod(x) {
      // setGoalHours()
      // setGoalMinutes()
    }

    function AveragePaces(props) {
      let paceTotal = props.paces.reduce((a, b) => a + b, 0)
      let adjustTotal = paceAdjust.slice(0, props.index + 1).reduce((a, b) => a + b, 0);
      return (
        <div>{minTommss((paceTotal + adjustTotal) / (props.index + 1))}</div>
      )
    }


    return (
        <div>
          <h5>Total time: {toHHMMSS(totalTime*60)}</h5>
            <div style={{display: "flex", justifyContent: "space-around"}}>
            Equalize pace:<SliderBox>
                <Slider
                axis="x"
                xmax = {700}
                xmin = {200}
                x={vertMod}
                onChange={({ x }) =>  setVertMod(x)}/>
            </SliderBox>
            {vertMod}
            </div>
            {/* <BasePaceMod goalHours={goalHours} goalMinutes={goalMinutes} setGoalHours={setGoalHours} setGoalMinutes={setGoalMinutes} basePaceMod={basePaceMod} minTommss={minTommss}></BasePaceMod> */}
            <section style={{margin: "0 auto"}}>
              <table style={{marginLeft: "auto", marginRight: "auto", tableLayout: "fixed", width: "250px"}}>
              <thead>
                <MileTableHead width={50}>Mile</MileTableHead>
                <MileTableHead width={100}>Pace</MileTableHead>
                <MileTableHead width={80}>Gain</MileTableHead>
                <MileTableHead width={90}>Avg. Pace</MileTableHead>
                <MileTableHead width={100}>Profile</MileTableHead>
              </thead>
              {paces.map((m, index) => {
                  return (
                  <MileBox key={index}>
                      <TableData><Detail>{index + 1}</Detail></TableData>
                      <TableData><ArrowLeft onClick={() => minusTime(index)}></ArrowLeft><Detail>{minTommss(m, index)}</Detail><ArrowRight onClick={() => plusTime(index)}></ArrowRight></TableData>
                      <TableData><Detail>{Math.round(vertInfo[index])} ft.</Detail></TableData>
                      <TableData><Detail><AveragePaces paces={paces.slice(0, index + 1)} index={index}></AveragePaces></Detail></TableData>
                      <TableData><GainProfile milePoints={milePoints.length > 0 ? milePoints[index] : []}></GainProfile></TableData>

                  </MileBox>
                  )
              })}
            </table>
          </section>
        </div>
    )
}

export default MileTimes;
