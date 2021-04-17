import React, {useState, useEffect} from 'react';
import TimeSum from './TimeSum.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
import Box from './ForgetBox.js';
import {getFromStorage} from '../utils/storage';
import {Row, Col} from './Grid';
import Slider from 'react-input-slider';
import Modal from 'react-modal';

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


const EditBox = styled.div`

`

const GroupInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 50%;
  outline: 0;
  border-width: 0 0 1px;

`

const SliderBox = styled.div`
  width: 30%;
  margin: 5px 0 0 0;
`

const TimerMinsDisplay = styled.div`
  margin: 5px 5px 0 10px;
`

const TimerInput = styled.input`
  display: inline;
  font-size: 15px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 90%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;
  border-color: ${(props) => props.colors[props.timers.indexOf(props.t)]};
`

const TimerInputNew = styled.input`
  display: inline;
  font-size: 15px;
  margin: 0px 5px 10px 5px;
  width: 90%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;

`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

function EditGroup(props) {
  const [deleteModalIsOpen, openDeleteModal] = useState(false);
  const [timers, setTimers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [timerLengthMins, setTimerLengthMins] = useState(5);
  const [timerLengthSecs, setTimerLengthSecs] = useState(0);
  const [newTimerName, setNewTimerName] = useState("Task");
  const [newTimerLength, setNewTimerLength] = useState(15);
  const [timerToEdit, setTimerToEdit] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  // constructor(props) {
  //   super(props)

  //   state = {
  //     modalIsOpen: false,
  //     timers: [],
  //     groupName: '',
  //     timerLengthMins: 5,
  //     timerLengthSecs: 0,
  //     newTimerName: 'Task ',
  //     newTimerLength: 15,
  //     timerToEdit: {},
  //     showDetails: false,
  //     deleteModalIsOpen: false
  //   }

  //   deleteModal = deleteModal.bind(this);
  //   closeDeleteModal = closeDeleteModal.bind(this);
  //   saveGroup = saveGroup.bind(this);
  //   addGroup = addGroup.bind(this);
  //   addItem = addItem.bind(this);
  //   showDetails = showDetails.bind(this);
  //   calculateTime = calculateTime.bind(this);
  //   onTextboxChangeGroupName = onTextboxChangeGroupName.bind(this);
  //   onTextboxChangeNewTimerName = onTextboxChangeNewTimerName.bind(this);
  //   onTextboxChangeTimerName = onTextboxChangeTimerName.bind(this);
  //   onTextboxChangeNewTimerLength = onTextboxChangeNewTimerLength.bind(this);
  //   editTimerLength = editTimerLength.bind(this);
  //   onTextboxChangeTimerLengthMins = onTextboxChangeTimerLengthMins.bind(this);
  // }


  useEffect(() => {
    let timersAmt = parseInt(props.group.timers.length) + 1;
    setTimers(props.group.timers)
    setGroupName(props.group.name)
    setNewTimerName('Task ' + timersAmt);
  })

  // function componentDidMount() { 
  //   setState({
  //     timers: props.group.timers,
  //     groupName: props.group.name,
  //     id: props.group._id,
  //     newTimerName: 'Task ' + timersAmt
  //   })
  // }

  function editTimerLength(x, timer) {
    let temp = props.group.timers;
    for (let i = 0; i < temp.length; i++) {
      if(temp[i].id === timer.id) {
        temp[i].length = x * 60;
      }      
    }
    setTimerToEdit(temp);
  }

  function onTextboxChangeNewTimerName(event) {
    setNewTimerName(event.target.value);
  }

  function onTextboxChangeTimerName(event, t) {
    console.log(event)
    let timers = cloneDeep(props.group.timers)
    for (var i = 0; i < timers.length; i++) {
      if(timers[i].id === t.id) {
        timers[i].name = event.target.value
      }
    }
    setTimers(timers);
  }

  function onTextboxChangeGroupName(event) {
    setGroupName(event.target.value)
  }

  // function onTextboxChangeTimerLengthMins(event, t) {
  //   if(event.target.value < 60 && event.target.value !== 'e') {
  //     let timers = cloneDeep(state.timers)
  //     for (var i = 0; i < timers.length; i++) {
  //       if(timers[i].id === t.id) {
  //         timers[i].length = event.target.value * 60
  //       }
  //     }
  //     setState({
  //       timers: timers
  //     })
  //   }
  // }

  function closeDeleteModal() {
    openDeleteModal(false);
  }

  function deleteModal() {
    openDeleteModal(true);
  }

  function addGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;
    fetch(`https://banana-crumble-42815.herokuapp.com/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: groupName,
        length: timerLengthMins * 60,
        timers: timers,
        hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
        token: token
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setTimers([]);
        setGroupName('');
        props.getTimers(token)
      } else {
        console.log("Error: adding this group failed.")
        console.log(json)
      }
    });
  }
  
  function delItem(item) {
      let timersAmt = parseInt(props.group.timers.length);

      function isTimer(element) {
        if(element.id === item.id) return element;
      }
      let index = props.group.timers.findIndex(isTimer);
      
      setTimers(timers.splice(index, 1));
      newTimerName('Task ' + timersAmt);
    }

    function addItem() {
      let prevTimers = props.group.timers;
      let timersAmt = parseInt(prevTimers.length) + 2;
      let newTimer = {
        name: newTimerName,
        length: newTimerLength * 60,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }
      if(prevTimers.length < 5) {
        timers.push(newTimer)
        setTimers(timers);
        setNewTimerName(props.group.timers.length < 5 ? 'Task ' + timersAmt : '');
        setNewTimerLength('15');
      }
    }

    function saveGroup(group) {
      const token = JSON.parse(localStorage.the_main_app).token;
      fetch(`https://banana-crumble-42815.herokuapp.com/group?groupId=${group.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: groupName,
          timers: timers
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          props.getTimers(token)
          props.closeEditModal();
        } else {
          console.log("Error: adding this group failed.")
          console.log(json)
        }
      });
    }


    return (
      <div>
          {props.group.hash === 'newgroup' ? null : <GroupInput type="text" placeholder="Group Name" value={groupName} onChange={onTextboxChangeGroupName}/>}
        <EditBox>
            {timers.map(t => {
              return (
                <Row key={t.id}>
                    <button style={{display: timers.length < 2 ? "none" : "inline", marginBottom: "10px"}} onClick={()=>{delItem(t)}} type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>

                  <Col size={.5}>
                    <TimerInput colors={props.colors} timers={timers} t={t} type="text" value={t.name} onChange={(e) => onTextboxChangeTimerName(e)}/>
                  </Col>
                  <TimerMinsDisplay><div fontSize={12}>{t.length / 60}</div></TimerMinsDisplay>
                  <Col size={.01}></Col>


                  <Col size={.5}>
                    
                  <SliderBox>
                    <Slider
                    axis="x"
                    xmax = {30}
                    x={t.length / 60}
                    onChange={({ x }) =>  editTimerLength(x, t)}
                    styles={{
                      active: {backgroundColor: props.colors[props.group.timers.indexOf(t)]}
                    }}
                    />
                  </SliderBox>
                  </Col>

                </Row>
              )
            })}
            <Divider></Divider>
            <Row>
              <Col size={1}>
                <TimeSum timers={timers}></TimeSum>
              </Col>
              <Col size={3}>
                <TimerInputNew style={{margin: '5px 0 0 0'}} type="text" placeholder={'name'} value={newTimerName} onChange={(e, t) => onTextboxChangeNewTimerName(e)}/>
                  <Col size={.1}></Col>
              </Col>
              <Col size={.5}>
                <Button style={{display: 'inline'}} disabled={timers.length >= 5 || props.timerStart} onClick={addItem}>Add</Button>
              </Col>
            </Row>
              <Divider></Divider>
              {showDetails === true ? 
              <div>
                <Box boxContents={props.group.box} group={props.group}></Box>
                <Divider></Divider>
              </div> : null}
              <Row style={{display: 'flex'}}>
              <Col size={2}>
                {/* if no token, show start button. if token, show save/add and delete
                  this is so that editTimer appears different on signIn and Dash components */}
                  {getFromStorage('the_main_app') ? (
                    <div>
                      {/* dont show button if its add group box */}
                      {props.group.hash === 'newgroup' ? null : <Button className="five-px-margin-right" onClick={deleteModal}>Delete</Button>}
                        {/* show add group button if its new group box, save button if save box */}
                      {props.group.hash === 'newgroup' ? 
                      <Button onClick={addGroup}>Save</Button>
                      :
                      <Button className="five-px-margin-right" onClick={saveGroup}>Save</Button>}
                      <Button onClick={() => showDetails()}>Details</Button>
                    </div>
                  )
                :
                (<Button onClick={props.startTimer}>&#9658;</Button>)}
              </Col>
              {/* <Col size={1}><TimerInput type="number" onChange={(e) => onTextboxChangeNewTimerLength(e)} value={state.newTimerLength} placeholder="Mins"/></Col> */}
              </Row>

          {/* </Grid> */}

        </EditBox>
        <Modal
          isOpen={deleteModalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeDeleteModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button className="five-px-margin-right"  onClick={() => props.deleteGroup(props.group)}>Delete</Button>
            <Button className="five-px-margin-right" onClick={closeDeleteModal}>Cancel</Button>
          </div>
        </Modal>
        </div>
    )


}

export default EditGroup;
