import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import AddGroup from './AddGroup.js';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
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
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: ''
    }
    this.addModal = this.addModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.howManyTimers = this.howManyTimers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.groupLink = this.groupLink.bind(this);
    this.noGroups = this.noGroups.bind(this);
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      timers: [],
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: ''});
  }

  addModal() {
    this.setState({modalIsOpen: true});
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
        this.setState({timers: [], groupName: ''})
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
    if(this.props.groups.length === 0) {
      return (
        <div>
          <h2>Welcome to Routine Timer</h2>
          <h4>Press the Add Routine button above to create your first group of timers.</h4>
        </div>
      )
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
            <AddGroup closeModal={this.closeModal} getTimers={this.props.getTimers} timeFormat={this.timeFormat} timers={this.state.timers}></AddGroup>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Dash;
