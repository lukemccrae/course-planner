import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class Dash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timers: [],
      groups: [],
      modalIsOpen: false,
      timeInMins: false,
      timerName: 'New Timer',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: 'Group Name'
    }
    this.addModal = this.addModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.Timer = this.Timer.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this)
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this)
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this)
    this.onTextboxChangeTimerLengthSecs = this.onTextboxChangeTimerLengthSecs.bind(this)
    this.howManyTimers = this.howManyTimers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.timeFormat = this.timeFormat.bind(this);
    this.groupLink = this.groupLink.bind(this);
    this.noGroups = this.noGroups.bind(this);
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeTimerName(event) {
    this.setState({timerName: event.target.value})
  }

  onTextboxChangeTimerLengthMins(event) {
    if(event.target.value < 60 && typeof event.target.value != 'e') {
      this.setState({timerLengthMins: event.target.value})
    }
  }

  onTextboxChangeTimerLengthSecs(event) {
    if(event.target.value < 60) {
      this.setState({timerLengthSecs: event.target.value})
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      timers: [],
      timerName: 'Timer Name',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: 'Group Name'});
  }

  addModal() {
    this.setState({modalIsOpen: true});
  }

  Timer(name, lengthMins, lengthSecs) {
    this.name = name;
    this.length = parseInt(lengthMins) + parseInt(lengthSecs);
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

  addTimer() {
    let tempTimers = this.state.timers;
    let addTimeMins = this.state.timerLengthMins * 60;
    let addTimeSecs = this.state.timerLengthSecs;
    let newTimer = new this.Timer(this.state.timerName, addTimeMins, addTimeSecs)
    tempTimers.push(newTimer)
    this.setState({timers: tempTimers, timerName: 'New Timer', timerLengthMins: 3, timerLengthSecs: 0})
  }

  saveGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`http://localhost:3000/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.groupName,
        length: this.calculateTime(),
        timers: this.state.timers,
        hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
        token: token
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        console.log('hellooo');
        this.setState({timers: [], groupName: 'Group Name'})
        this.props.getTimers(token)
        this.closeModal()
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }

  deleteGroup(group) {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`http://localhost:3000/group?token=${token}&groupId=${group._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        this.setState({timers: [], groupName: 'Group Name'})
        this.props.getTimers(token)
        this.closeModal()
      } else {
        this.setState({timerError: json.message, isLoading: false})
      }
    });
  }

  timeFormat(time) {
    var minutes = Math.floor(time / 60);
    time -= minutes * 60;
    var seconds = parseInt(time % 60, 10);

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }

  calculateTime() {
    let mins = this.state.timerLengthMins * 60;
    return this.state.timerLengthSecs + mins;
  }

  howManyTimers(group) {
    if(group.timers.length === 1) return ' ' +  group.timers.length + ' timer';
    return ' ' +  group.timers.length + ' timers';
  }

  howLongTimers(timers) {
    let result = 0;
    for (var i = 0; i < timers.length; i++) {
      result += timers[i].length;
    }

    return this.timeFormat(result);
  }

  groupLink(hash) {
    return `http://localhost:3000/hash/${hash}`;
  }

  noGroups() {
    if(this.props.groups.length == 0) {
      return (
        <div>
          <h2>Welcome to Routine Timer</h2>
          <h4>Press the Add Routine button above to create your first group of timers.</h4>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Nav username={this.props.username} addModal={this.addModal} getTimers={this.props.getTimers} loggedOut={this.props.loggedOut}></Nav>
        <div>
          <Container>
            {this.noGroups()}
            {this.props.groups.map(g => {
              return (
                <div className="group" key={g._id}>
                  <div className="groupNameParent">
                    <h3>{g.name}</h3>
                    <DropdownButton id="dropdown-basic-button" title="">
                      <Dropdown.Item onClick={() => this.deleteGroup(g)}>Delete</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <p>This group has {this.howManyTimers(g)}. Their combined length is {this.howLongTimers(g.timers)}
                  </p>
                  <Start timeFormat={this.timeFormat} group={g}></Start>
                </div>
              )
            })}
          </Container>
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

            <h2 ref={subtitle => this.subtitle = subtitle}>Create a new group of Timers</h2>
            <input type="text" placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>
            {this.state.timers.map(t => {
              return (
                <p key={t.id}>{t.name}, {this.timeFormat(t.length)}</p>
              )
            })}
            <div>
              <div>
                <input type="text" placeholder="Timer Name" value={this.state.timerName} onChange={this.onTextboxChangeTimerName}/>
                <input type="number" placeholder="Mins" value={this.state.timerLengthMins} onChange={this.onTextboxChangeTimerLengthMins}/> :
                <input type="number" placeholder="Secs" value={this.state.timerLengthSecs} onChange={this.onTextboxChangeTimerLengthSecs}/>
              </div>
              <Button onClick={this.addTimer}>Add Timer</Button>
              <Button onClick={this.saveGroup}>Save</Button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Dash;
