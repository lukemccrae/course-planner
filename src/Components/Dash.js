import React, {Component} from 'react';
import Navbar from './Navbar';
import AddTimer from './AddTimer';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

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

Modal.setAppElement('#root')

class Dash extends Component {
  constructor(props) {
    console.log(props);
    super(props)

    this.state = {
      timers: [],
      groups: [],
      modalIsOpen: false,
      timerName: 'New Timer',
      timerLength: 60,
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
  }

  onTextboxChangeGroupName(event) {
    this.setState({
      groupName: event.target.value,
    })
  }

  onTextboxChangeTimerName(event) {
    this.setState({
      timerName: event.target.value,
    })
  }

  onTextboxChangeTimerLength(event) {
    this.setState({
      timerLength: event.target.value,
    })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      timers: []
    });
  }

  addModal() {
    this.setState({modalIsOpen: true});
  }

  Timer(name, length) {
    this.name = name;
    this.length = length;
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }

  addTimer() {
    let tempTimers = this.state.timers;
    let newTimer = new this.Timer(this.state.timerName, this.state.timerLength)
    tempTimers.push(newTimer)
    this.setState({
      timers: tempTimers,
      timerName: '',
      timerLength: 60
    })
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
        length: this.state.timerLength,
        timers: this.state.timers,
        token: token
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            timers: []
          })
          this.props.getTimers(token)
          this.closeModal()
        } else {
          this.setState({
            timerError: json.message,
            isLoading: false
          })
        }
      });
  }

  render() {
    return (
      <div>
        <Navbar addModal={this.addModal} getTimers={this.props.getTimers} loggedOut={this.props.loggedOut}></Navbar>
        <div>
          <div>
            {this.props.groups.map(g => {
              return (
                <p key={g._id}>{g.name}</p>
              )
            })}
          </div>
       <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Example Modal"
       >

         <h2 ref={subtitle => this.subtitle = subtitle}>Create a new group of Timers</h2>
           <input
             type="text"
             placeholder="Group Name"
             value={this.state.groupName}
             onChange={this.onTextboxChangeGroupName}
           />
         {this.state.timers.map(t => {
           return (
             <p key={t.id}>{t.name}, {t.length}</p>
           )
         })}
         <div>
           <div>
             <input
               type="text"
               placeholder="Timer Name"
               value={this.state.timerName}
               onChange={this.onTextboxChangeTimerName}
             />
             <input
               type="text"
               placeholder="Minutes"
               value={this.state.timerLength}
               onChange={this.onTextboxChangeTimerLength}
             />
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
