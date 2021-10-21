export const minTommss = (m, index, paceAdjust) => {
    let minutes;
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

export const calculatePace = (elev, distance, terrainMod, vertMod, goalHours, goalMinutes) => {
    let goalTime = ((parseInt(goalHours ? goalHours : 0) * 60) + parseInt(goalMinutes ? goalMinutes : 0))
    let goalDistance = parseInt(distance)
    let goalPace = goalTime / goalDistance;

    let vert = (Math.pow(terrainMod, elev / vertMod)).toFixed(2);
    return goalPace * vert;
  }

  export const toHHMMSS = (secs) => {
    let sec_num = parseInt(secs, 10)
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

export const displayZeros = (n) => {
    if(n.toString().length < 2) {
      return (
        "0" + n
      )
    } else {
      return n;
    }
  }