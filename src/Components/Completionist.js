import React, {Component} from 'react';
import soundfile from '../Ding.mp3';
import styled from 'styled-components';
import Sound from 'react-sound';

const CompleteButton = styled.button`
  width: ${(props) => 145 - props.timers.indexOf(props.currentTimer) * 10 + "px"};
  height: ${(props) => 145 - props.timers.indexOf(props.currentTimer) * 10 + "px"};
  border-radius: 100%;
  background-color: white;
  font-size: 40px;
  font-weight: 90;
  color: black;
  padding: 0;
  border: none;
  &:focus {
    outline: 0;
    background-color: #D3D3D3;
}
&:hover {
  background-color: grey;
}
`


class Completionist extends Component {
  constructor(props) {
    
    super(props);

    this.state = {
      logging: false
    }
    this.next = this.next.bind(this);
    this.logStats = this.logStats.bind(this);
  }

  next() {
    this.setState({logging: true})
    this.props.getTimers(token);
        this.props.nextTimer();
    const token = JSON.parse(localStorage.the_main_app).token;
    if(token != undefined) {
      this.logStats(token)
    }
  }

  logStats(token) {
    fetch(`https://banana-crumble-42815.herokuapp.com/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: this.props.group.name,
        groupId: this.props.group._id,
        length: this.props.currentTimer.length,
        id: this.props.currentTimer.id,
        token: token,
        date: Date.now(),
        userId: this.props.userId
      })
    }).then(res => res.json()).then(json => {
      this.setState({logging: false})
      if (json.success) {
        
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }

  render(props) {
    return (
      <div>
        <CompleteButton currentColor={this.props.currentColor} currentTimer={this.props.currentTimer} timers={this.props.group.timers} disabled={this.state.logging} onClick={this.next}>Next</CompleteButton>
        {/* <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          loop={true}
          ignoreMobileRestrictions={true}
          volume={30}
      /> */}
      </div>
    )
  }

}

export default Completionist;
