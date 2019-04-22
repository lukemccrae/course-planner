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
      timeDegreeButton: 'Mins',
      timerName: 'New Timer',
      timerLength: 5,
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
    this.onTextboxChangeTimerLength = this.onTextboxChangeTimerLength.bind(this)
    this.howManyTimers = this.howManyTimers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.changeTimeDegree = this.changeTimeDegree.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeTimerName(event) {
    this.setState({timerName: event.target.value})
  }

  onTextboxChangeTimerLength(event) {
    this.setState({timerLength: event.target.value})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false, timers: [], timerName: 'Timer Name', timerLength: 5, groupName: 'Group Name'});
  }

  addModal() {
    this.setState({modalIsOpen: true});
  }

  Timer(name, length) {
    this.name = name;
    this.length = parseInt(length);
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

  addTimer() {
    let tempTimers = this.state.timers;
    let newTimer = new this.Timer(this.state.timerName, this.state.timerLength)
    tempTimers.push(newTimer)
    this.setState({timers: tempTimers, timerName: 'New Timer', timerLength: 5, groupName: 'Group Name'})
  }

  changeTimeDegree() {
    if (this.state.timeDegreeButton === 'Mins') {
      this.setState({timeDegreeButton: 'Secs'})
    } else {
      this.setState({timeDegreeButton: 'Mins'})
    }
    this.setState({
      timeInMins: !this.state.timeInMins
    })
  }

  saveGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`http://localhost:3000/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.groupName, length: this.state.timerLength, timers: this.state.timers, token: token})
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

  calculateTime() {
    if (this.state.timeInMins === true) {
      return (this.state.timerLength * 60)
    }
    return (this.state.timerLength)
  }

  howManyTimers(group) {
    return group.timers.length;
  }

  howLongTimers(timers) {
    let result = 0;
    for (var i = 0; i < timers.length; i++) {
      result += timers[i].length;
    }
    return result;
  }

  render() {
    return (
      <div>
        <Nav addModal={this.addModal} getTimers={this.props.getTimers} loggedOut={this.props.loggedOut}></Nav>
        <div>
          <Container>
            {this.props.groups.map(g => {
              return (
                <div className="group" key={g._id}>
                  <div className="groupNameParent">
                    <h3>{g.name}</h3>
                    <DropdownButton id="dropdown-basic-button" title="">
                      <Dropdown.Item onClick={() => this.deleteGroup(g)}>Delete</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <p>This group has {this.howManyTimers(g)}
                    timers. Their combined length is {this.howLongTimers(g.timers)}
                  </p>
                  <Start group={g}></Start>
                </div>
              )
            })}
          </Container>
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

            <h2 ref={subtitle => this.subtitle = subtitle}>Create a new group of Timers</h2>
            <input type="text" placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/> {this.state.timers.map(t => {
              return (
                <p key={t.id}>{t.name}, {t.length}</p>
              )
            })}
            <div>
              <div>
                <input type="text" placeholder="Timer Name" value={this.state.timerName} onChange={this.onTextboxChangeTimerName}/>
                <input type="number" placeholder="Length" value={this.state.timerLength} onChange={this.onTextboxChangeTimerLength}/>
                <Button onClick={this.changeTimeDegree}>{this.state.timeDegreeButton}</Button>
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
