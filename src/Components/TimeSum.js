import React from 'react';

function TimeSum(props) {

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "h" : "h") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay; 
  }

  function totalTime() {
      var result = 0;
      for (let i = 0; i < props.timers.length; i++) {
          result = result + props.timers[i].length      
      }
      
      return result;
  }

  return (
    <div style={{display: 'inline', fontSize: '25px'}}>{secondsToHms(totalTime())}</div>
  )

}

export default TimeSum;
