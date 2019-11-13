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

    var hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
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
      <div>{this.secondsToHms(this.totalTime())}.&nbsp;</div>
    )
  }

}

export default TimeSum;
