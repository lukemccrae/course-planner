import React, {useState, useEffect} from 'react';
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
        if(stops[index + 1] !== undefined) {
          nextAid = stops[index + 1].miles
        } else {
          nextAid = mileTimes.length + 1;
        }

        //distance between aid stations
        let diff = parseInt(nextAid) - parseInt(pastAid) - (index > 0 ?  1 : 0)

        //display distance
        setDistance(diff)

        //pass distance to calculate time and calories
        timeVertToNextAid(diff)
      }

      function timeVertToNextAid(diff) {
          let timeSum = 0;
          for (let i = 0; i < diff - (index > 0 ? 1 : 0); i++) {
            timeSum += mileTimes[i]
          }
          setTime(timeSum)
          caloriesToNextAid(timeSum)
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
            <div>distance to {index < stops.length -1 ? "next aid" : "finish"}: {distance}</div>
            <VertStop pastAid={pastAid} vertInfo={vertInfo} distance={distance}></VertStop>
            <div>time to next aid: {toHHMMSS(time*60)}</div>
            <div>calorie needs: {calToConsume}</div>
        </div>
    )
}

export default TimeCals;
