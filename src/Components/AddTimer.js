import React, {Component} from 'react';

class AddTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerName: 'New Timer',
      timerLength: 60,
      isLoading: '',
      timerError: ''
    }
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this)
    this.onTextboxChangeTimerLength = this.onTextboxChangeTimerLength.bind(this)
    this.addTimer = this.addTimer.bind(this)
  }

  onTextboxChangeTimerName(event) {
    this.setState({
      timerName: event.target.value,
    })
  }

  onTextboxChangeTimerLength(event) {
    this.setState({
      timerLength: event.target.value,
    })
  }

  addTimer() {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`http://localhost:3000/timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.timerName,
        length: this.state.timerLength,
        token: token
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.props.getTimers(token)
          this.setState({
            isLoading: false,
            timerName: 'New Timer',
            timerLength: 60
          })
        } else {
          console.log('nope');
          this.setState({
            timerError: json.message,
            isLoading: false
          })
        }
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Timer Name"
          value={this.state.timerName}
          onChange={this.onTextboxChangeTimerName}
        />
        <input
          type="text"
          placeholder="Minutes"
          value={this.state.timerLength}
          onChange={this.onTextboxChangeTimerLength}
        />
      <br/>
        <button onClick={this.addTimer}>Add Timer</button>

      </div>
    );
  }
}

export default AddTimer;
