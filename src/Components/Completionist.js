import React, {Component} from 'react';
import soundfile from '../Ding.mp3';
import Button from 'react-bootstrap/Button';
import Sound from 'react-sound';

class Completionist extends Component {
  constructor(props) {
    super(props)

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
        date: Date.now()
      })
    }).then(res => res.json()).then(json => {
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
        <Button disabled={this.state.logging} onClick={this.next}>Next</Button>
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
