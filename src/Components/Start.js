import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-modal';
import Countdown from 'react-countdown-now';
import Completionist from './Completionist';
import styled from 'styled-components';

const TimeBox = styled.div`
display: flex;
justify-content: space-between;
`


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    width: '70%'
  }
};

class Start extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      promptModalIsOpen: false,
      currentTimerIndex: 0,
    }
    this.start = this.start.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.countdownDisplay = this.countdownDisplay.bind(this);
    this.nextTimer = this.nextTimer.bind(this);
    this.routineEnded = this.routineEnded.bind(this);
    this.formatCountdown = this.formatCountdown.bind(this);
    this.pause = this.pause.bind(this);
    this.unPause = this.unPause.bind(this);
  }



  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      currentTimerIndex: 0
    });
  }

  start() {
    this.openModal()
  }

  routineEnded() {
    if(this.state.currentTimerIndex < this.props.group.timers.length - 1) {
      return false;
    } else {
      return true;
    }
  }

  nextTimer() {
    if(this.routineEnded() === false) {
      let currentTimerIndex = this.state.currentTimerIndex;
      currentTimerIndex = ++currentTimerIndex;
      this.setState({currentTimerIndex}, () =>
      console.log()
      );
    } else {
      this.closeModal();
    }
  }

  formatCountdown(timer) {
    return Date.now() + timer.length * 1000;
  }

  pause() {
    console.log('pause');
    this.setState({
      paused: !this.state.paused
    })
  }

  unPause() {
    console.log('unpause');
    this.setState({
      paused: !this.state.paused
    })
  }

  countdownDisplay(timer) {
    let renderer = ({ minutes, seconds, completed }) => {
      //not sure if this will cause problems later.... if I leave seconds as a number it won't show two zeros
      if(minutes === 0) minutes = '00';
      if(seconds === 0) seconds = '00';
      if(seconds < 10 && seconds > 0) seconds = '0' + seconds;
      if (completed) {
        // Render a completed state
        return (<Completionist userId={this.props.userId} getTimers={this.props.getTimers} currentTimer={timer} nextTimer={this.nextTimer}></Completionist>)
      } else {
        // Render a countdown
        return (
          <div>
          <TimeBox>
            <span>{minutes}:{seconds}</span>
          </TimeBox>
          </div>
        );
      }
    };

      let countdownComponent = (
        <Countdown controlled={false} renderer={renderer} date={this.formatCountdown(timer)}>
          <Completionist getTimers={this.props.getTimers} currentTimer={timer} nextTimer={this.nextTimer}></Completionist>
        </Countdown>
      )

    let displayComponent = (
      <div>
        <p className="displayTime">{this.props.timeFormat(timer.length, 'str')}</p>
      </div>
    )

    let pausedComponent = (
      <div>
      <p className="displayTime">{this.props.timeFormat(timer.length, 'str')}</p>
    </div>
    )

    if(this.props.group.timers[this.state.currentTimerIndex] !== undefined) {
      if(timer.id === this.props.group.timers[this.state.currentTimerIndex].id) {
        return (
          countdownComponent
        )
      } else {
        return (
          displayComponent
        )
      }
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.start}>Start</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
        <div className="startNav">
          <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <Container>
            <h5 ref={subtitle => this.subtitle = subtitle}>{this.props.group.name}</h5>
            {this.props.group.timers.map(t => {
              return (
                <Row  className="countdownDisplay" key={t.id}>
                  <Col>
                    {t.name}
                  </Col>
                  <Col>
                    {this.countdownDisplay(t)}
                  </Col>
                </Row>
              )
            })}
          </Container>
        </div>
        </Modal>
      </div>
    )
  }

}

export default Start;
