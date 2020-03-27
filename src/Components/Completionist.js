import React, {Component} from 'react';
import soundfile from '../Ding.mp3';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Sound from 'react-sound';

const StyledButton = styled.button`
  width: 95px;
  height: 95px;
  border-radius: 100%;
  background-color: #007bff;
  color: white;
`

class Completionist extends Component {
  constructor(props) {
    console.log(props);
    
    super(props);

    this.state = {
      logging: false
    }
    this.next = this.next.bind(this);
  }
  // https://banana-crumble-42815.herokuapp.com/log
  next() {
    this.setState({logging: true})
    const token = JSON.parse(localStorage.the_main_app).token;
    fetch(`https://banana-crumble-42815.herokuapp.com/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: this.props.currentTimer.name,
        length: this.props.currentTimer.length,
        id: this.props.currentTimer.id,
        token: token,
        date: Date.now(),
        userId: this.props.userId
      })
    }).then(res => res.json()).then(json => {
      console.log(json);
      
      this.setState({logging: false})
      if (json.success) {
        this.props.getTimers(token);
        this.props.nextTimer();
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }

  render(props) {
    return (
      <div>
        <StyledButton disabled={this.state.logging} onClick={this.next}>Next</StyledButton>
        <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          loop={true}
          ignoreMobileRestrictions={true}
          volume={30}
      />
      </div>
    )
  }

}

export default Completionist;
