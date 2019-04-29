import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Countdown from 'react-countdown-now';
import Completionist from './Completionist';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)'
  }
};
//
// const renderer = ({minutes, seconds, completed}) => {
//   if (completed) {
//     // Render a completed state
//     return <Completionist></Completionist>
//   } else {
//     // Render a countdown
//     return <span>{minutes}:{seconds}</span>;
//   }
// };

class Start extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      currentTimerIndex: 0
    }
    this.start = this.start.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.countdownDisplay = this.countdownDisplay.bind(this);
    this.nextTimer = this.nextTimer.bind(this);
    this.routineNotEnded = this.routineNotEnded.bind(this);
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

  routineNotEnded() {
    if(this.state.currentTimerIndex <= this.props.group.timers.length) {
      return true;
    }
    this.closeModal();
  }

  nextTimer() {
    if(this.routineNotEnded()) {
      let currentTimerIndex = this.state.currentTimerIndex;
      currentTimerIndex = ++currentTimerIndex;
      this.setState({currentTimerIndex}, () =>
      console.log()
      );
      this.closeModal();
    }
  }

  countdownDisplay(timer) {
    let countdownComponent = (
      <Countdown date={Date.now() + timer.length * 3000}>
        <Completionist nextTimer={this.nextTimer}></Completionist>
      </Countdown>
    )

    let displayComponent = (
      <div>
        <p>{timer.length}</p>
      </div>
    )

    if(this.props.group.timers[this.state.currentTimerIndex] !== undefined) {
      if(timer.id === this.props.group.timers[this.state.currentTimerIndex].id) {
        // console.log(this.state.currentTimerIndex);
        // console.log(timer.id, this.props.group.timers[this.state.currentTimerIndex].id);
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
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

          <h5 ref={subtitle => this.subtitle = subtitle}>{this.props.group.name}</h5>
          {this.props.group.timers.map(t => {
            return (
              <div  className="countdownDisplay" key={t.id}>{t.name}{this.countdownDisplay(t)}</div>
            )
          })}
        </Modal>
      </div>
    )
  }

}

export default Start;
