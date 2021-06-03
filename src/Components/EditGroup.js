import React, {useState, useLayoutEffect} from 'react';
import TimeSum from './TimeSum.js';
import Details from './Details.js';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
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

const CheckBox = styled.input`
  display: inline;
`

const EditBox = styled.div`

`

const CheckBoxBox = styled.div`
  display: flex;
  justify-content: space-evenly;
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

  const [group, setGroup] = useState({timers: []});
  const [groupName, setGroupName] = useState("");
  const [timerLengthMins, setTimerLengthMins] = useState(5);
  const [newTimerName, setNewTimerName] = useState("Task 2");
  const [newTimerLength, setNewTimerLength] = useState(15);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({})

  useLayoutEffect(() => {
    //update hook state with passed group
    if(group.timers.length == 0) {
      setGroup(props.group);
      setGroupName(props.group.name)
      setNewTimerName('Task 4');
      setDetails(props.group.details);
    }
    
  })

  function editTimerLength(x, timer) {
    const updatedGroup = cloneDeep(group)
    for (let i = 0; i < updatedGroup.timers.length; i++) {
      if(updatedGroup.timers[i].id === timer.id) {
        updatedGroup.timers[i].length = x * 60;
      }      
    }
    // setTimers(updatedTimers);
    setGroup(updatedGroup);
  }

  function onTextboxChangeNewTimerName(event) {
    setNewTimerName(event.target.value);
  }

  function onTextboxChangeTimerName(event, t) {
    const updatedGroup = cloneDeep(group)
    for (var i = 0; i < updatedGroup.timers.length; i++) {
      if(updatedGroup.timers[i].id === t.id) {
        updatedGroup.timers[i].name = event.target.value
      }
    }
    // setTimers(updatedTimers);
    setGroup(updatedGroup)
  }

  function onTextboxChangeGroupName(event) {
    setGroupName(event.target.value)
  }

  function closeDeleteModal() {
    openDeleteModal(false);
  }

  function deleteModal() {
    openDeleteModal(true);
  }

  function saveNewGroup() {
    const token = JSON.parse(localStorage.the_main_app).token;
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/'
        },
        body: JSON.stringify({
          name: groupName,
          timers: group.timers,
          token: token,
          hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)

        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          props.getTimers(token)
        } else {
          console.log("Error: adding this group failed.")
          console.log(json)
        }
      });
  }
  
  function delItem(item) {
      let timersAmt = parseInt(group.timers.length);
      let updatedGroup = group;

      function isTimer(element) {
        if(element.id === item.id) return element;
      }

      let index = group.timers.findIndex(isTimer);
      updatedGroup.timers.splice(index, 1);
      setGroup(updatedGroup);
      setNewTimerName('Task ' + timersAmt);
    }

    function addItem() {
      let updatedGroup = group;
      let timersAmt = parseInt(group.timers.length) + 2;
      
      let newTimer = {
        name: newTimerName,
        length: newTimerLength * 60,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }


      if(updatedGroup.timers.length < 7) {
        updatedGroup.timers.push(newTimer);
        setNewTimerName(props.group.timers.length < 7 ? 'Task ' + timersAmt : '');
        setGroup(updatedGroup);
        setNewTimerLength('15');
      }
    }

    function saveGroup() {
      const token = JSON.parse(localStorage.the_main_app).token;
      if(group.timers.length > 0) {
        fetch(`https://banana-crumble-42815.herokuapp.com/group?groupId=${props.group._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            timers: group.timers,
            name: groupName,
            details: details
          })
        }).then(res => res.json()).then(json => {
          if (json.success) {
            props.getTimers(token)
          } else {
            console.log("Error: adding this group failed.")
            console.log(json)
          }
        });
      }
    }

    function saveDetails(str) {
      let tempDetails = details;
      tempDetails[str] = !tempDetails[str];
      setDetails(tempDetails)
    }


    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <GroupInput type="text" placeholder="Group Name" value={groupName} onChange={onTextboxChangeGroupName}/>
          <Button  onClick={() => props.toggleEdit(group)}>&#8963;</Button>
        </div>
          
        <EditBox>

          {showDetails == false ? <div>
            {group.timers.map(t => {
              return (
                <Row key={t.id}>
                    <button style={{display: group.timers.length < 2 ? "none" : "inline", marginBottom: "10px"}} onClick={()=>{delItem(t)}} type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>

                  <Col size={.5}>
                    <TimerInput colors={props.colors} timers={group.timers} t={t} type="text" value={t.name} onChange={(e) => onTextboxChangeTimerName(e, t)}/>
                  </Col>
                  <TimerMinsDisplay><div fontSize={12}>{t.length / 60}</div></TimerMinsDisplay>
                  <Col size={.01}></Col>
                  <Col size={.5}>
                    
                  <SliderBox>
                    <Slider
                    axis="x"
                    xmax = {30}
                    xmin = {1}
                    x={t.length / 60}
                    onChange={({ x }) =>  editTimerLength(x, t)}
                    styles={{
                      active: {backgroundColor: props.colors[group.timers.indexOf(t)]}
                    }}
                    />
                  </SliderBox>
                  </Col>
                  <Divider></Divider>
                </Row>
                
              )
            })}
            <Row>
              <Col size={1}>
                <TimeSum timers={group.timers}></TimeSum>
              </Col>
              <Col size={3}>
                <TimerInputNew style={{margin: '5px 0 0 0'}} type="text" placeholder={'name'} value={newTimerName} onChange={(e, t) => onTextboxChangeNewTimerName(e)}/>
                  <Col size={.1}></Col>
              </Col>
              <Col size={.5}>
                <Button style={{display: 'inline'}} disabled={group.timers.length >= 7 || props.timerStart} onClick={addItem}>Add</Button>
              </Col>
            </Row>
          </div> : <Details group={group} details={details} saveDetails={saveDetails}></Details>}
            
              <Divider></Divider>
              <div>
                    {/* dont show button if its add group box */}
                    {props.group.hash === 'newgroup' ? null : <Button className="five-px-margin-right" onClick={deleteModal}>Delete</Button>}
                    {/* show add group button if its new group box, save button if save box */}
                    {props.group.hash === 'newgroup' ? 
                    <Button className="five-px-margin-right" onClick={saveNewGroup}>Save</Button>
                    :
                    <Button className="five-px-margin-right" onClick={saveGroup}>Save</Button>}
                    {props.group.hash === 'newgroup' ? null : <Button onClick={() => setShowDetails(!showDetails)}>Details</Button>}
                    
                </div>

        </EditBox>
        <Modal
          isOpen={deleteModalIsOpen}
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
