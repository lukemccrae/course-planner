import React, {useState, useEffect} from 'react';
import VertStop from './VertStop';
import styled from 'styled-components';

const colors = [
  "#428A79",
  "#71AF55",
  "#F00500",
  "#E4BE67",
  "#E47043",
  "#B63534",
  "#9598AB",
  "#90be6d",
  "#577590",
  "#f9844a",
  "#4d908e",
  "#f3722c",
  "#f9c74f",
  "#43aa8b",
  "#f8961e",
  "#a44a3f",
  "#f19c79",
  "#cbdfbd",
  "#90e0ef",
  "#197278",
  "#283d3b",
  "#6a4c93",
  "#723d46",
]

const List = styled.ul`
  display: inline-flex;
  list-style: none;
  margin: 0 0 15px 5px;
  padding: 0;
  flex-wrap: wrap;
`

const Detail = styled.strong`
  font-weight: 300;
  font-size: 25px;
`

const Span = styled.span`
  margin: 5px;
`

const Color = styled.li`
  margin-right: 5px;
  background-color: ${(props) => colors[props.index + 1]};
  width: 10px;
  height: 5vh;
`


function TimeCals({stops, miles, mileTimes, index, calories, vertInfo, paceAdjust}) {
  // console.log(paceAdjust)
    const [distance, setDistance] = useState();
    const [time, setTime] = useState();
    const [pastAid, setPastAid] = useState(0);
    const [calToConsume, setCalToConsume] = useState('')
    useEffect(() => {
        distanceToNextAid()
    }, [mileTimes, stops, calories, pastAid])

    function distanceToNextAid() {
        //two variables to store next and past aid mileage
        setPastAid(parseInt(stops[index].miles));
        let nextAid;
        
        //if last stop, use finish as a stop
        if(stops[index + 1] !== undefined) {
          nextAid = stops[index + 1].miles
        } else {
          nextAid = mileTimes.length + 1;
        }

        //distance between aid stations
        //take care of last stop condition with teriary
        let diff = parseInt(nextAid) - parseInt(pastAid) - (index === stops.length - 1 ? 1 : 0)

        //display distance
        setDistance(diff)

        //pass distance to calculate time and calories
        timeVertToNextAid(diff)
      }

      function timeVertToNextAid(diff) {
          let timeSum = 0;

          for (let i = miles; i < diff + parseInt(miles); i++) {
            timeSum += mileTimes[i];
            timeSum += paceAdjust[i];
          }

          setTime(timeSum)
          if(calories && timeSum) caloriesToNextAid(timeSum)
      }

      function caloriesToNextAid(timeSum) {
        setCalToConsume(Math.round(calories * (parseFloat(timeSum) / 60)))
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

    return (
        <div>
          <List>
            <Color index={index}></Color>
            {/* <li>distance to {index < stops.length -1 ? "next stop" : "finish"}: {distance}</li> */}
            <li><Detail>{distance}</Detail>mi</li>
            <Span></Span>
            {/* { distance ? <li>avg. pace to {index < stops.length -1 ? "next stop" : "finish"}: {toHHMMSS((time / distance) *60)}</li> : null} */}
            <li><Detail>{toHHMMSS((time / distance) *60)}</Detail>/mi</li>
            <Span></Span>
            <VertStop Detail={Detail} pastAid={pastAid} vertInfo={vertInfo} distance={distance}></VertStop>
            <Span></Span>
            <li><Detail>{toHHMMSS(time*60)}</Detail>next</li>
            <Span></Span>
            <li><Detail>{calToConsume}</Detail>cals</li>
          </List>            
        </div>
    )
}

export default TimeCals;
