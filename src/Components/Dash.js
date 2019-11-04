import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import AddGroup from './AddGroup.js';
import EditGroup from './EditGroup.js';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TimeSum from './TimeSum.js';
import TimeFinished from './TimeFinished.js';
import styled from 'styled-components';

const TimerListBox = styled.div`
  display: flex;
  align-items: space-between;
`

const TimerList = styled.ul`
`

const ListedTimer = styled.li`
  list-style-type: none;
`

const TimeTotal = styled.div`
  display: flex;
  margin: 0 0 10px 0;
  padding: 0 0 0 20px;
`

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
      editModalIsOpen: false,
      addModalIsOpen: false,
      timeInMins: false,
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: '',
      groupToEdit: {}
    }
    this.addModal = this.addModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.howManyTimers = this.howManyTimers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.groupLink = this.groupLink.bind(this);
    this.noGroups = this.noGroups.bind(this);
    this.theirOrIts = this.theirOrIts.bind(this);
    
  }

  closeEditModal() {
    this.setState({
      editModalIsOpen: false
    })
  }

  closeModal() {
    this.setState({
      addModalIsOpen: false,
      timers: [],
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: ''});
  }

  addModal() {
    this.setState({addModalIsOpen: true});
  }

  editGroup(g) {
    this.setState({
      editModalIsOpen: true,
      groupToEdit: g
    })
  }

  deleteGroup(group) {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`https://banana-crumble-42815.herokuapp.com/group?token=${token}&groupId=${group._id}`, {
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

  timeFormat(time, str) {
    var minutes = Math.floor(time / 60);
    time -= minutes * 60;
    var seconds = parseInt(time % 60, 10);

    if(str === 'str') return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    if(str === 'num') return [minutes, seconds];
    return null;

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }

  howManyTimers(group) {
    if(group.timers.length === 1) return ' ' +  group.timers.length + ' timer';
    return ' ' +  group.timers.length + ' timers';
  }

  theirOrIts(group) {
    if(group.timers.length === 1) return 'Its '
    return 'Their combined '
  }

  howLongTimers(timers) {
    let result = 0;
    for (var i = 0; i < timers.length; i++) {
      result += timers[i].length;
    }
    return this.timeFormat(result, 'str');
  }

  groupLink(hash) {
    return `https://banana-crumble-42815.herokuapp.com/hash/${hash}`;
  }

  noGroups() {
    if(this.props.groups.length === 0) {
      return (
        <div>
          <h2>Welcome to Group Timer</h2>
          <h4>Press the Add Group button above to create your first group.</h4>
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
                      <Dropdown.Item onClick={() => this.editGroup(g)}>Edit</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <TimerList>
                    {g.timers.map(t => {
                      return (
                        <TimerListBox key={t.id}>
                          <ListedTimer>{t.name}</ListedTimer>
                          <div>&nbsp;</div>
                          <TimeSum timers={[t]}></TimeSum>
                        </TimerListBox>
                      )
                      })
                    }
                  </TimerList>
                  <TimeTotal>
                    Total:
                    <div>&nbsp;</div>
                    <TimeSum timers={g.timers}></TimeSum> 
                    <div>&nbsp;</div>
                    Start now and finish at
                    <div>&nbsp;</div>
                    <TimeFinished group={g}></TimeFinished>.
                  </TimeTotal>
                  <Start timeFormat={this.timeFormat} group={g}></Start>
                </div>
              )
            })}
          </Container>
          <Modal
            isOpen={this.state.editModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeEditModal}
            style={customStyles}
            contentLabel="Example Modal">

            <h2 ref={subtitle => this.subtitle = subtitle}></h2>
            <EditGroup
              closeEditModal={this.closeEditModal}
              group={this.state.groupToEdit}
              getTimers={this.props.getTimers}
              timeFormat={this.timeFormat}
              timers={this.state.timers}></EditGroup>
          </Modal>
          <Modal
            isOpen={this.state.addModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">

            <h2 ref={subtitle => this.subtitle = subtitle}></h2>
            <AddGroup
              closeModal={this.closeModal}
              getTimers={this.props.getTimers}
              timeFormat={this.timeFormat}></AddGroup>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Dash;
