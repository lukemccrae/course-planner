import React, {useState} from 'react';
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

function Completionist(props) {
  const [logging, setLogging] = useState(false);

  function next() {
    setLogging(true);
    props.getTimers(token);
        props.nextTimer();
    const token = JSON.parse(localStorage.the_main_app).token;
    if(token !== undefined) {
      logStats(token)
    }
  }

  function logStats(token) {
    fetch(`https://banana-crumble-42815.herokuapp.com/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: props.group.name,
        groupId: props.group._id,
        length: props.currentTimer.length,
        id: props.currentTimer.id,
        token: token,
        date: Date.now(),
        userId: props.userId
      })
    }).then(res => res.json()).then(json => {
      setLogging(false)
      if (json.success) {
      } else {
        console.log("Error: Stats not logged")
        console.log(json)
      }
    });
  }

    return (
      <div>
        <CompleteButton currentColor={props.currentColor} currentTimer={props.currentTimer} timers={props.group.timers} disabled={logging} onClick={next}>Next</CompleteButton>
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

export default Completionist;
