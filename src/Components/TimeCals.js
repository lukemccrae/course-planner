import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import VertStop from './VertStop';


function TimeCals({stops, mileTimes, index, calories, vertInfo}) {
    const [distance, setDistance] = useState();
    const [time, setTime] = useState();
    const [pastAid, setPastAid] = useState(0);
    const [calToConsume, setCalToConsume] = useState()
    useEffect(() => {
        distanceToNextAid()
    }, [mileTimes, stops, calories, pastAid])

    function distanceToNextAid() {
        //two variables to store next and past aid mileage
        setPastAid(parseInt(stops[index].miles));
        let nextAid;
        
        //if last stop, use finish as a stop
        if(stops[index + 1] != undefined) {
          nextAid = stops[index + 1].miles
        } else {
          nextAid = mileTimes.length + 1;
        }

        //distance between aid stations
        let diff = parseInt(nextAid) - parseInt(pastAid)

        //display distance
        setDistance(diff)

        //pass distance to calculate time and calories
        timeVertToNextAid(diff)
      }

      function timeVertToNextAid(diff) {
          let timeSum = 0;
          for (let i = 0; i < diff; i++) {
            timeSum += mileTimes[i]
          }
          setTime(timeSum)
          caloriesToNextAid(timeSum)
      }

      function caloriesToNextAid(timeSum) {
        setCalToConsume(Math.round(calories * (parseFloat(timeSum) / 60)))
    }

      function minTommss(minutes){
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    return (
        <div>
            <div>distance to {index < stops.length -1 ? "next aid" : "finish"}: {distance}</div>
            <VertStop pastAid={pastAid} vertInfo={vertInfo} distance={distance}></VertStop>
            <div>time to next aid: {minTommss(time)}</div>
            <div>calorie needs: {calToConsume}</div>
        </div>
    )
}

export default TimeCals;
