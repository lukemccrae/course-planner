import React, {Component} from 'react';

class TimeSum extends Component {
  constructor(props) {
    super(props)
    
  
    this.state = {}

    this.secondsToHms = this.secondsToHms.bind(this);
    this.totalTime = this.totalTime.bind(this);
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "h" : "h") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay; 
  }

  totalTime() {
      var result = 0;
      for (let i = 0; i < this.props.timers.length; i++) {
          result = result + this.props.timers[i].length      
      }
      
      return result;
  }



  render() {
    return (
    <div>{this.secondsToHms(this.totalTime())}</div>
    )
  }

}

export default TimeSum;
