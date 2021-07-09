import React, {useState, useLayoutEffect} from 'react';
import Route from './Route';
import Stop from './Stop';
import MileTimes from './MileTimes';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {Row, Col} from './Grid';
import FormControl from '@material-ui/core/FormControl';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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

const CourseInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 50%;
  outline: 0;
  border-width: 0 0 1px;
`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

function EditCourse(props) {
  const [deleteModalIsOpen, openDeleteModal] = useState(false);

  const classes = useStyles();

  function updateMileTimes(m, index) {
    let tempMileTimes = props.mileTimes;
    tempMileTimes[index] = m;
    props.setMileTimes(tempMileTimes);
    console.log(props.mileTimes)
  }

  function closeDeleteModal() {
    openDeleteModal(false);
  }

  function deleteModal() {
    openDeleteModal(true);
  }

  function updateRoute(gpxObj) {
    // saveNewRoute(gpxObj)
  }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <TextField style={{width: "200px", fontSize: "25px"}} type="text" value={props.name} label="Course Name" defaultValue={props.name} onChange={(e) => props.setName(e.target.value)} />
          {props.saved ? <div style={{display: "flex"}}>
            <Button variant="outlined" className="five-px-margin-right" onClick={deleteModal}>Delete</Button>
            <Button variant="outlined" className="five-px-margin-right" onClick={props.saveCourse}>Save</Button>
            </div> : <div>Saving...</div>}
          <Button variant="outlined" onClick={() => props.toggleEdit(props.hash)}>&#8963;</Button>
        </div>
        <div>

          {/* {true ? ( */}
          {props.vertInfo.cumulativeGain.length === 0 ? (
            <Route id={props.id} updateRoute={updateRoute}></Route>
          ) : 
          <Row style={{display: "inline"}}>
            <button onClick={()=>{props.removeRoute(props.course)}} type="button" className="close" aria-label="Close">
            </button>
            
          </Row>}
          <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{width: "50px"}} type="number" value={props.distance} label="Miles" defaultValue={props.distance} onChange={(e) => props.setDistance(e.target.value)} />
              <TextField style={{width: "75px"}} type="number" value={props.vert}  label="Vert" defaultValue={props.vert} onChange={(e) => props.setVert(e.target.value)} />
              <TextField style={{width: "75px"}} type="number" value={props.goalHours}  label="Hours" defaultValue={props.goalHours} onChange={(e) => props.setGoalHours(e.target.value)} />
              <TextField style={{width: "75px"}} type="number" value={props.goalMinutes}  label="Minutes" defaultValue={props.goalMinutes} onChange={(e) => props.setGoalMinutes(e.target.value)} />
              <div style={{paddingTop: "30px"}}>{Math.round( (props.vert / props.distance))} ft/mi</div>
          </form>
          <FormControl className={classes.formControl}>
            <InputLabel>Calories per Hour</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={props.calories}
                onChange={(e) => props.setCalories(e.target.value)}
                className="cal-style"
              >
              <MenuItem value={150}>150 (low)</MenuItem>
              <MenuItem value={200}>200 (med)</MenuItem>
              <MenuItem value={250}>250 (high)</MenuItem>
              </Select>
          </FormControl>

          <MileTimes vert={props.vert} goalHours={props.goalHours} goalMinutes={props.goalMinutes} vertInfo={props.vertInfo} distance={props.distance} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes}></MileTimes>
          <Divider></Divider>
          <Stop vertInfo={props.vertInfo} calories={props.calories} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes} addStop={props.addStop} stops={props.stops} setStops={props.setStops}></Stop>
            <Divider></Divider>
        </div>
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
            <Button variant="outlined" className="five-px-margin-right"  onClick={() => props.deleteCourse(props.course)}>Delete</Button>
            <Button variant="outlined" className="five-px-margin-right" onClick={closeDeleteModal}>Cancel</Button>
          </div>
        </Modal>
        </div>
    )

}

export default EditCourse;
