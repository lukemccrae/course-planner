import React, {useState, useEffect} from 'react';
import Start from './Start';
import EditGroup from './EditGroup.js';
import {Grid, Row, Col} from './Grid';
import Button from 'react-bootstrap/Button';
import Box from './ForgetBox.js';
import Modal from 'react-modal';
import TimeSum from './TimeSum.js';
import styled from 'styled-components';
import {Helmet} from "react-helmet";

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 20px;
`

const EditButton = styled.div`
  display: ${(props) => props.timerOn ? 'none' : 'inline'};
`

const Group = styled.div`
  width: 100%;
  max-width: 500px;
  height: 19px;
  display: ${(props) => props.timerOn ? ((props.g._id === props.startedGroup._id) ? 'inline-table' : 'none') : 'inline-table'};
`

const GroupNameParent = styled.div`
  display: ${(props) => props.group === props.editingGroup ? 'none' : 'flex'};
  justify-content: space-between;
  white-space: nowrap;
  min-width: 293px;
` 

Modal.setAppElement('#root')

function Dash(props) {
  const [startIsOpen, setStart] = useState(false);
  const [startedGroup, setStartedGroup] = useState({});
  const [editingGroup, setEditingGroup] = useState({});

  useEffect(() => {
    document.title = `Group Timer`;
}, [props.sec]);

  function closeModal() {
    props.getTimers();
    setStart(false);
  }

  function startModal(g) {
    setStartedGroup(g);
    props.resetColors();
    setStart(true);
    g.editOpen = false;
  }

  function stopTimer() {
    document.title = `Group Timer`;
    setStart(false);
    setStartedGroup({});
  }

  function deleteGroup(group) {
    const token = JSON.parse(localStorage.the_main_app).token;

    fetch(`https://banana-crumble-42815.herokuapp.com/group?token=${token}&groupId=${group._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        props.getTimers(token)
      } else {
        console.log("error: ", json)
      }
    });
  }

  function noGroups() {
    if(props.groups.length === 0) {
      return (
        <div>
          <h2>Welcome to Group Timer</h2>
          <h4>Press the Add Group button above to create your first group.</h4>
        </div>
      )
    }
  }

  function toggleEdit(g) {
    //if passed group is current group, set it to empty object
    //this sets editingObject to nothing and closes edit window
    let tempGroup = g === editingGroup ? {} : g;
    props.editGroup(tempGroup);
    setEditingGroup(tempGroup);
  }

    return (
      <div>
        <Helmet>
          <title>Group Timer</title>
        </Helmet>
        <Grid>
            <Row>
            {noGroups()}
            <Col size={1.5}></Col>
            <Col size={3}>
              {props.groups.map(g => {
                return (
                  <Group className="group" key={g._id} g={g} timerOn={startIsOpen} startedGroup={startedGroup}>
                    <GroupNameParent group={g} editingGroup={editingGroup}>
                      <h3>{g.name}</h3>
                      <ButtonWrapper>
                        {/* dont display start button if its new timer box */}
                        {g.hash === 'newgroup' ? 
                          null
                          :
                            startIsOpen ? <Button className="five-px-margin-right" onClick={() => stopTimer(g)}>&#9632;</Button> : <Button className="five-px-margin-right" onClick={() => startModal(g)}>&#9658;</Button>
                        }

                        <EditButton timerOn={startIsOpen}>
                          <Button id="dropdown-basic-button" onClick={() => toggleEdit(g, props)}>&#8963;</Button>
                        </EditButton>

                      </ButtonWrapper>
                    </GroupNameParent>
                    {g.editOpen === true ? (
                        <EditGroup
                        toggleEdit={toggleEdit}
                        group={g}
                        colors={props.colors}
                        getTimers={props.getTimers}
                        deleteGroup={deleteGroup}
                        timeFormat={props.timeFormat}
                        timers={g.timers}
                        setEditingGroup={setEditingGroup}>
                      </EditGroup>
                    ) :
                      g.hash === 'newgroup' ? <div>Use dropdown to add new Group</div> : (startIsOpen ? null : <TimeSum timers={g.timers}></TimeSum>)
                    }
                    {startIsOpen ? (
                      <div>
                        {startedGroup._id === g._id ? (<div>
                          <Start colors={props.colors} timerStart={true} boxContents={g.box} userId={props.userId} getTimers={props.getTimers} closeModal={closeModal} timeFormat={props.timeFormat} group={g}></Start>
                          <Box boxContents={g.box} group={g}></Box>
                        </div>) : <div></div>}
                      </div>
                      ) : <div></div>}
                  </Group>
                )
              })}
            </Col>
            <Col size={1.5}></Col>
            </Row>
        </Grid>
      </div>
    )

}

export default Dash;
