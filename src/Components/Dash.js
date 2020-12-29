import React, {Component} from 'react';
import Nav from './Nav';
import Start from './Start';
import AddGroup from './AddGroup.js';
import EditGroup from './EditGroup.js';
import {Grid, Row, Col} from './Grid';
import Modal from 'react-modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TimeSum from './TimeSum.js';
import TimeFinished from './TimeFinished.js';
import styled from 'styled-components';

const TimerListBox = styled.div`
  display: flex;
  align-items: space-between;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 20px;
  
`

const TimerList = styled.ul`
  padding: 0 0 0 0;
`

const PlusButton = styled.button`
  border: none;
  background-color: white;
`

const Group = styled.div`
  width: 100%;
  height: 19px;
  display: inline-table;
`

const ListedTimer = styled.li`
  list-style-type: none;
  white-space: nowrap;
`

const TimeTotal = styled.div`
  display: flex;
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height: '100%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
};


Modal.setAppElement('#root')

class Dash extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.log !== state.log) {
      return { log: props.log };
    }
    return null;
  }
  constructor(props) {
    super(props)
    
    this.state = {
      timers: [],
      groups: [],
      editModalIsOpen: false,
      addModalIsOpen: false,
      startModalIsOpen: false,
      timeInMins: false,
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: '',
      groupToEdit: {},
      startedGroup: {}
    }
    this.addModal = this.addModal.bind(this);
    this.startModal = this.startModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.howManyTimers = this.howManyTimers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.groupLink = this.groupLink.bind(this);
    this.noGroups = this.noGroups.bind(this);
    this.theirOrIts = this.theirOrIts.bind(this);
  }
  componentDidMount() {
    // this was calling with old token so i turned it off
    // this.props.getTimers(JSON.parse(localStorage.the_main_app).token);
    this.startModal(this.props.groups[2]);
  }

  closeEditModal() {
    this.setState({
      editModalIsOpen: false
    })
  }

  closeModal() {
    this.props.getTimers();
    this.setState({
      addModalIsOpen: false,
      startModalIsOpen: false,
      timers: [],
      timerName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0,
      groupName: ''
    });
    console.log('hi')
    this.forceUpdate();
  }

  addModal() {
    this.setState({addModalIsOpen: true});
  }
  startModal(g) {
    this.setState({startModalIsOpen: true, startedGroup: g});
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

    // return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
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
    // this.subtitle.style.color = '#f00';
  }


  render() {
    return (
      <div>
        <Nav log={this.props.log} username={this.props.username} addModal={this.addModal} getTimers={this.props.getTimers} loggedOut={this.props.loggedOut}></Nav>
        <Grid>
            <Row>
            {this.noGroups()}
            <Col>
              {this.props.groups.map(g => {
                return (
                  <Group className="group" key={g._id}>
                    <div className="groupNameParent">
                      <h3>{g.name}</h3>
                      <ButtonWrapper>
                        <Button className="five-px-margin-right" onClick={() => this.startModal(g)}>&#9658;</Button>

                        {/* downward unicode arrow is smaller than up, so i display the button rotated if edit menu opened */}
                        {g.editOpen === true ? (
                          <Button onClick={() => this.props.editGroup(g)}>&#8963;</Button>
                        ) : (
                          <Button id="dropdown-basic-button" onClick={() => this.props.editGroup(g)}>&#8963;</Button>
                        )}

                      </ButtonWrapper>
                    </div>
                    {g.editOpen == true ? (
                        <EditGroup
                        closeEditModal={this.closeEditModal}
                        group={g}
                        getTimers={this.props.getTimers}
                        deleteGroup={this.deleteGroup}
                        timeFormat={this.timeFormat}
                        timers={this.state.timers}>
                      </EditGroup>
                    ) : (
                      <TimeSum timers={g.timers}></TimeSum>
                    )}


                    <TimeTotal>
                      {/* Total:&nbsp; */}
                      {/* <TimeSum timers={g.timers}></TimeSum>  */}
                    </TimeTotal>
                  </Group>
                )
              })}
            </Col>
            </Row>
          <Modal
            isOpen={this.state.addModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">

            <AddGroup
              closeModal={this.closeModal}
              getTimers={this.props.getTimers}
              timeFormat={this.timeFormat}></AddGroup>
          </Modal>
          <Modal
          isOpen={this.state.startModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <Start boxContents={this.state.startedGroup.box} userId={this.props.userId} getTimers={this.props.getTimers} closeModal={this.closeModal} timeFormat={this.timeFormat} group={this.state.startedGroup}></Start>
          </Modal>
        </Grid>
      </div>
    )
  }

}

export default Dash;
