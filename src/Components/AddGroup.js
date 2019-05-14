import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class AddGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerLengthMins: 3,
      timerLengthSecs: 0,
      timerName: '',
      timers: [],
      groupName: ''
    }
    this.groupNameRef = React.createRef();
    this.timerNameRef = React.createRef();
    this.addTimer = this.addTimer.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.Timer = this.Timer.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this);
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this);
    this.onTextboxChangeTimerLengthSecs = this.onTextboxChangeTimerLengthSecs.bind(this);

  }

  onTextboxChangeTimerName(event) {
    this.setState({timerName: event.target.value})
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeTimerLengthMins(event) {
    if(event.target.value < 60 && event.target.value !== 'e') {
      this.setState({timerLengthMins: event.target.value})
    }
  }

  onTextboxChangeTimerLengthSecs(event) {
    if(event.target.value < 60) {
      this.setState({timerLengthSecs: event.target.value})
    }
  }

  componentDidMount() {
    this.groupNameRef.current.focus();
  }

  calculateTime() {
    let mins = this.state.timerLengthMins * 60;
    return this.state.timerLengthSecs + mins;
  }

  addTimer() {
    let tempTimers = this.state.timers;
    let addTimeMins = this.state.timerLengthMins * 60;
    let addTimeSecs = this.state.timerLengthSecs;
    let newTimer = new this.Timer(this.state.timerName, addTimeMins, addTimeSecs)
    if(this.state.timerName !== '') {
      tempTimers.push(newTimer)
      this.setState({timers: tempTimers, timerName: '', timerLengthMins: 3, timerLengthSecs: 0})
    }
    this.timerNameRef.current.focus();
  }

  Timer(name, lengthMins, lengthSecs) {
    this.name = name;
    this.length = parseInt(lengthMins) + parseInt(lengthSecs);
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

  saveGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`http://localhost:3000/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.groupName,
        length: this.calculateTime(),
        timers: this.state.timers,
        hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
        token: token
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        this.setState({timers: [], groupName: ''})
        this.props.getTimers(token)
        this.props.closeModal()
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }



  render() {
    return (
      <div>
        <input type="text" ref={this.groupNameRef} placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>
        {this.state.timers.map(t => {
          return (
            <p key={t.id}>{t.name}, {this.props.timeFormat(t.length)}</p>
          )
        })}
        <div>
          <div>
            <input type="text" ref={this.timerNameRef} placeholder="Timer Name" value={this.state.timerName} onChange={this.onTextboxChangeTimerName}/>
            <input type="number" placeholder="Mins" value={this.state.timerLengthMins} onChange={this.onTextboxChangeTimerLengthMins}/> :
            <input type="number" placeholder="Secs" value={this.state.timerLengthSecs} onChange={this.onTextboxChangeTimerLengthSecs}/>
          </div>
          <Button onClick={this.addTimer}>Add Timer</Button>
          <Button onClick={this.saveGroup}>Save</Button>
        </div>
      </div>
    )
  }

}

export default AddGroup;
