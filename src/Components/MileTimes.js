import React, {useState, useEffect} from 'react';
import Slider from 'react-input-slider';
import GainProfile from './GainProfile.tsx';
import {DateTime} from 'luxon';

import { useCourseInfoContext } from '../Providers/CourseInfoProvider.tsx';
import { useMileTimesContext } from '../Providers/MileTimesProvider.tsx';
import { useRouteContext } from '../Providers/RouteProvider.tsx';
import { useUserContext } from '../Providers/UserProvider.tsx';

import {MileBox, MileTableHead, SliderBox, TableData, Detail, ArrowRight, ArrowLeft} from './helpers/StyledComponents/MileTimeStyles';
import { gql, useQuery } from '@apollo/client';
import { mockMileTimesInfo } from '../Providers/MileTimesProvider.tsx';

const MILE_TIMES_QUERY = gql`
  query MileTimesInfo($token: String, $courseId: String) {
    mileTimesInfo(token: $token, courseId: $courseId) {
      details {
        goalHours
        goalMinutes
        mileTimes
        vertMod
        terrainMod
        startTime
      }
      paceAdjust
      route {
        geoJSON {
          properties {
            name
          }
          geometry {
            coordinates {
              lat
              lng
              elev
            }
            milePoints {
              lat
              lng
              elev
            }
          }
        }
      }
    }
  }
`

function MileTimes(props) {
    const {goalHours, goalMinutes, startTime, terrainMod, } = useCourseInfoContext();
    const {milePoints, vertMod, setVertMod, paceAdjust, setMileTimes, setPaceAdjust, setMileTimesInfo, mileTimes} = useMileTimesContext();
    const {vertInfo} = useRouteContext();
    const {courseId, token} = useUserContext();

    const { loading, error, data=mockMileTimesInfo } = useQuery(MILE_TIMES_QUERY, {
      variables: { courseId, token },
      skip: !token
      });

    useEffect(() => {
      setMileTimesInfo(data.mileTimesInfo[0])
    }, [data, courseId])
    
    const gain = vertInfo.cumulativeGain;
    const loss = vertInfo.cumulativeLoss;

    const [paces, setPaces] = useState([])
    const [totalTime, setTotalTime] = useState();
    
    //keep track of the time that a runner will start each mile
    const [timeThrough, setTimeThrough] = useState([]);
      

    useEffect(() => {
      if(startTime) resetPaces()
    }, [goalHours, goalMinutes, terrainMod, vertMod, milePoints, paceAdjust, startTime])

    function calculatePace(elev, distance) {
      let goalTime = ((parseInt(goalHours ? goalHours : 0) * 60) + parseInt(goalMinutes ? goalMinutes : 0))
      let goalDistance = parseInt(distance)
      let goalPace = goalTime / goalDistance;

      let vert = (Math.pow(terrainMod, elev / vertMod)).toFixed(2);
      return goalPace * vert;
    }

    function resetPaces() {
        let tempPace = [];
        let tempTotalTime = 0;
        for (let i = 0; i < gain.length; i++) {
            let newPace = calculatePace(gain[i], gain.length)
            tempPace[i] = newPace
            tempTotalTime += tempPace[i]
        }
        setMileTimes(tempPace)
        setTotalTime(tempTotalTime)
        setPaces(tempPace)
        updateTotalTime();

        //update the timeThrough array
        resetTimeThrough();
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
      let tempPaceAdjust = Object.assign([], paceAdjust);;
      tempPaceAdjust[index] += .111;
      setPaceAdjust(tempPaceAdjust)
      resetPaces()
      updateTotalTime()
    }

    function displayZeros(n) {
      if(n.toString().length < 2) {
        return (
          "0" + n
        )
      } else {
        return n;
      }
    }

    //fill up the timeThrough state array with timeObj objects corrosponding to minutes and seconds
    function resetTimeThrough() {
      console.log(startTime)
      const [hours, minutes] = startTime.split(":")
      let tempTimeThrough = [];

      //iterate through each mile - gain is just used to get the miles length
      for (let i = 0; i < gain.length; i++) {
        //add up the cumulative time for each mile
        let paceTotal = paces.slice(0, i + 1).reduce((a, b) => a + b, 0);

        //add up the cumulative pace adjustment up to this point
        let paceAdjustTotal = paceAdjust.slice(0, i + 1).reduce((a, b) => a + b, 0);

        let paceTotalAdjustedRounded = Math.round((paceTotal + paceAdjustTotal + Number.EPSILON) * 100) / 100;

        //create a DateTime object from the luxon package, and use the .plus method to add the paceTotalAdjustedRounded value of minutes to the start time
        let time = DateTime.fromObject({year: 2017, month: 5, day: 15, hour: parseInt(hours ? hours : 0), minute: parseInt(minutes ? minutes : 0) }, { zone: 'Asia/Singapore' }).plus({minutes: paceTotalAdjustedRounded})

        let timeObj = {
          hour: time.c.hour,
          minute: time.c.minute
        };

        tempTimeThrough.push(timeObj)
      }
      setTimeThrough(tempTimeThrough)
    }

    const TimeThrough = (props) => {
      // console.log(time[props.index], props, time, "164")
      return (
        // <div>{displayZeros(timeThrough.c.hour)}:{displayZeros(timeThrough.c.minute)}</div>
        <div>{displayZeros(timeThrough[props.index].hour)}:{displayZeros(timeThrough[props.index].minute)}</div>
      )
    }

    const AveragePaces = (props) => {
      let paceTotal = props.paces.reduce((a, b) => a + b, 0)
      let adjustTotal = paceAdjust.slice(0, props.index + 1).reduce((a, b) => a + b, 0);
      return (
        <div>{minTommss((paceTotal + adjustTotal) / (props.index + 1))}</div>
      )
    }

    return (
        <div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <h5>Total time: {toHHMMSS(totalTime*60)}</h5>
            <h5>Vertical gain: {Math.round(gain.reduce((a, b) => a + b, 0))} ft.</h5>
          </div>
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
            <section style={{margin: "0 auto"}}>
              <table style={{marginLeft: "auto", marginRight: "auto", tableLayout: "fixed", width: "250px"}}>
              <thead>
                <MileTableHead width={50}>Mile</MileTableHead>
                <MileTableHead width={90}>Pace</MileTableHead>
                <MileTableHead width={80}>Profile</MileTableHead>
                <MileTableHead width={70}>Avg.</MileTableHead>
                <MileTableHead width={80}>Gain</MileTableHead>
                <MileTableHead width={80}>Loss</MileTableHead>
                <MileTableHead width={70}>Time</MileTableHead>
              </thead>
              <tbody>
              {paces.map((m, index) => {
                  return (
                    
                  <MileBox key={index}>
                      <TableData><Detail>{index + 1}</Detail></TableData>
                      <TableData>
                        <ArrowLeft onClick={() => minusTime(index)}></ArrowLeft>
                          <Detail>{minTommss(m, index, paceAdjust)}</Detail>
                        <ArrowRight onClick={() => plusTime(index)}></ArrowRight>
                      </TableData>
                      <TableData><GainProfile milePoints={milePoints.length > 0 ? milePoints[index] : []}></GainProfile></TableData>
                      <TableData><Detail><AveragePaces paces={paces.slice(0, index + 1)} index={index}></AveragePaces></Detail></TableData>
                      <TableData><Detail>{Math.round(gain[index])} ft.</Detail></TableData>
                      <TableData><Detail>{Math.round(loss[index])} ft.</Detail></TableData>
                      
                      <TableData><Detail><TimeThrough index={index}></TimeThrough></Detail></TableData>
                  </MileBox>
                  )
              })}
              </tbody>
            </table>
          </section>
        </div>
    )
}

export default MileTimes;
