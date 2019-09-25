import React, {Component} from 'react';
import cloneDeep from 'lodash.clonedeep'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

class EditGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      timers: [],
      groupName: '',
      timerLengthMins: 3,
      timerLengthSecs: 0
    }

    this.addModal = this.addModal.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.onTextboxChangeGroupName = this.onTextboxChangeGroupName.bind(this);
    this.onTextboxChangeTimerName = this.onTextboxChangeTimerName.bind(this);
    this.onTextboxChangeTimerLengthMins = this.onTextboxChangeTimerLengthMins.bind(this);
  }

  componentDidMount() {
    this.setState({
      timers: this.props.group.timers,
      groupName: this.props.group.name,
      id: this.props.group._id
    })
  }

  onTextboxChangeGroupName(event) {
    this.setState({groupName: event.target.value})
  }

  onTextboxChangeTimerName(event, t) {
    let timers = cloneDeep(this.state.timers)
    for (var i = 0; i < timers.length; i++) {
      if(timers[i].id == t.id) {
        timers[i].name = event.target.value
      }
    }
    this.setState({
      timers: timers
    })
  }

  onTextboxChangeTimerLengthMins(event, t) {
    if(event.target.value < 60 && event.target.value !== 'e') {
      let timers = cloneDeep(this.state.timers)
      for (var i = 0; i < timers.length; i++) {
        if(timers[i].id == t.id) {
          timers[i].length = event.target.value * 60
        }
      }
      this.setState({
        timers: timers
      })
    }
  }

    addModal() {
      this.setState({modalIsOpen: true});
    }

    saveGroup(group) {
      const token = JSON.parse(localStorage.the_main_app).token;

      fetch(`https://banana-crumble-42815.herokuapp.com/group?groupId=${this.state.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.groupName,
          timers: this.state.timers
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          this.props.closeEditModal();
          this.setState({
            timers: [],
            groupName: ''
          })
          this.props.getTimers(token)
        } else {
          this.setState({timerError: json.message, isLoading: false})
        }
      });
    }

  render() {
    return (
      <div>
        <input type="text" ref={this.groupNameRef} placeholder="Group Name" value={this.state.groupName} onChange={this.onTextboxChangeGroupName}/>
        <div>
          <div>
            {this.state.timers.map(t => {
              return (
                <div key={t.id}>
                  <input type="text" value={t.name} onChange={(e) => this.onTextboxChangeTimerName(e, t)}/>
                  <input type="number" placeholder="Mins" value={this.props.timeFormat(t.length, 'num')[0]} onChange={(e) => this.onTextboxChangeTimerLengthMins(e, t)}/>
                </div>
              )
            })}
          </div>
          <Button onClick={this.saveGroup}>Save</Button>
        </div>
      </div>
    )
  }

}

export default EditGroup;
