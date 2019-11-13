import React, {Component} from 'react';
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
          url="https://vocaroo.com/media_command.php?media=s0sWsqzU0AIU&command=download_mp3"
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
