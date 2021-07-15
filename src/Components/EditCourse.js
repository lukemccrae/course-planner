import React from 'react';
import Route from './Route';
import Stop from './Stop';
import MileTimes from './MileTimes';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {Row} from './Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

function EditCourse(props) {
  function updateRoute(gpxObj) {
    // saveNewRoute(gpxObj)
  }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <TextField style={{width: "300px", fontSize: "25px"}} type="text" value={props.name} label="Course Name" onChange={(e) => props.setName(e.target.value)} />
          {props.saved ? <div style={{display: "flex"}}>
            <Button variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Delete</Button>
            <Button variant="outlined" className="five-px-margin-right" onClick={props.saveCourse}>Save</Button>
            </div> : <div>Saving...</div>}
          <Button variant="outlined" onClick={() => props.toggleEdit(props.hash)}>&#8963;</Button>
        </div>
        <div>
          {/* {true ? ( */}
          {props.vertInfo.length === 0 ? (
            <Route saveCourse={props.saveCourse} id={props.id} updateRoute={updateRoute}></Route>
          ) : null}
          {/* <form noValidate autoComplete="off"> */}
              {/* <TextField style={{width: "50px", display: props.vertInfo.length > 0 ? "none" : "none"}} type="number" value={props.distance} label="Miles"  onChange={(e) => props.setDistance(e.target.value)} />
              <TextField style={{width: "75px", display: props.vertInfo.length > 0 ? "none" : "none"}} type="number" value={props.vert} label="Vert" onChange={(e) => props.setVert(e.target.value)} /> */}
              {/* <div style={{paddingTop: "30px", display: props.vertInfo.length > 0 ? "none" : "none"}}>{Math.round( (props.vert / props.distance))} ft/mi</div> */}
              <div style={{display: "flex", justifyContent: "space-around", margin: "10px 0 0 0"}}>
                <div style={{display: "flex"}}>
                  <TextField style={{width: "40px"}} type="number" value={props.goalHours}  label="Hours" onChange={(e) => props.setGoalHours(e.target.value)} />
                  <div style={{fontSize: "35px", padding: "5px 5px 15px 5px", display: "inline-block"}}>:</div>
                  <TextField style={{width: "40px"}} type="number" value={props.goalMinutes}  label="Minutes" onChange={(e) => props.setGoalMinutes(e.target.value)} />
                </div>
                <FormControl style={{display: props.vertInfo.length > 0 ? "inline-block" : "none"}}>
                <InputLabel>Terrain Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={props.terrainMod}
                    onChange={(e) => props.setTerrainMod(e.target.value)}
                    className="cal-style"
                  >
                  <MenuItem value={1.05}>Road</MenuItem>
                  <MenuItem value={1.1}>Moderate</MenuItem>
                  <MenuItem value={1.2}>Rough</MenuItem>
                  <MenuItem value={1.3}>Extreme</MenuItem>
                  </Select>
                </FormControl>
                <FormControl >
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
              </div>
              
          {/* </form> */}

          <div style={{display: props.mileTimes.length > 0 ? "inline" : "none"}}>
            <MileTimes setVertMod={props.setVertMod} terrainMod={props.terrainMod} vertMod={props.vertMod} goalHours={props.goalHours} goalMinutes={props.goalMinutes} vertInfo={props.vertInfo} distance={props.distance} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes}></MileTimes>
            <Divider></Divider>
            <Stop vertInfo={props.vertInfo} calories={props.calories} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes} addStop={props.addStop} stops={props.stops} setStops={props.setStops}></Stop>
            <Divider></Divider>
          </div>

        </div>
        </div>
    )

}

export default EditCourse;
