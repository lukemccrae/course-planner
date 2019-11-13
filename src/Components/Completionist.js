import React, {Component} from 'react';
import soundfile from '../Ding.mp3';
import Button from 'react-bootstrap/Button';
import Sound from 'react-sound';



class Completionist extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(props) {
    return (
      
      <div>
        <Button onClick={this.props.nextTimer}>Next</Button>
        <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          loop={true}
          ignoreMobileRestrictions={true}
      />
      </div>
    )
  }

}

export default Completionist;
