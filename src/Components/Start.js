import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Countdown from 'react-countdown-now';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Completionist = (timer) => {
  return (
    <span> is done.</span>
  )
}

const renderer = ({minutes, seconds, completed}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{minutes}:{seconds}</span>;
  }
};

class Start extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
    this.start = this.start.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.countdownDisplay = this.countdownDisplay.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  start() {
    this.openModal()
  }

  countdownDisplay(t) {

    let countdownComponent = (
      <Countdown renderer={renderer} name={t.name} date={Date.now() + t.length * 1000}>
        <Completionist />
      </Countdown>
    )

    let displayComponent = (
      <div>
        <span>{t.length}</span>
      </div>
    )
    if(false) {
      return (
        countdownComponent
      )
    } else {
      return (
        displayComponent
      )
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
          >

            <h5 ref={subtitle => this.subtitle = subtitle}>{this.props.group.name}</h5>
              {this.props.group.timers.map(t => {
                return (
                  <div key={t.id}>
                    <div>{t.name} {this.countdownDisplay(t)}
                    </div>
                  </div>
                )
              })}
          </Modal>
      </div>
    )
  }

}

export default Start;
