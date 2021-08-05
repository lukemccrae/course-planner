import React from 'react';
import Route from './Route';
import Stop from './Stop';
import MileTimes from './MileTimes';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {Row, Col, Grid} from './Grid';
import Profile from './Profile';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

const Category = styled.strong`
  font-weight: 500;
  font-size: 25px;
  display: block;
`

const Box = styled.div`
  display: flex;
`

function EditCourse(props) {

  function updateRoute(gpxObj) {
    // saveNewRoute(gpxObj)
  }

  function toggleEdit(c) {
    props.editCourse(c);
  }

    return (
      <Grid>
        <Row style={{display: props.coordinates.length > 0 ? "flex" : "none"}}>
          <Col>
            {props.saved ? <div style={{display: "flex", justifyContent: "flex-start", margin: "10px 0 10px 0"}}>
              <Button variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Delete</Button>
              <span style={{margin: "5px"}}></span>
              <Button variant="outlined" className="five-px-margin-right" onClick={props.saveCourse}>Save</Button>
            </div> : <div>Saving...</div>}
            
            <Category>Course Info</Category>
              <div style={{margin: "0 0 0 10px"}}>
                <TextField type="text" value={props.name} label="Course Name" onChange={(e) => props.setName(e.target.value)} />
                <span style={{margin: "5px"}}></span>
                <TextField style={{width: "40px"}} type="number" value={props.goalHours}  label="Hours" onChange={(e) => props.setGoalHours(e.target.value)} />
                  <div style={{fontSize: "35px", padding: "5px 5px 15px 5px", display: "inline-block"}}>:</div>
                  <TextField style={{width: "40px"}} type="number" value={props.goalMinutes}  label="Minutes" onChange={(e) => props.setGoalMinutes(e.target.value)} />
                    <div>
                      <div>
                    </div>
                      <FormControl style={{marginRight: "10px"}}>
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
                            <MenuItem value={100}>100 (very low)</MenuItem>
                            <MenuItem value={150}>150 (low)</MenuItem>
                            <MenuItem value={200}>200 (moderate)</MenuItem>
                            <MenuItem value={225}>225 (average)</MenuItem>
                            <MenuItem value={250}>250 (high)</MenuItem>
                            <MenuItem value={300}>300 (ravenous)</MenuItem>
                          </Select>
                        </FormControl>
                </div>
              </div>
              <Category>Stops</Category>
              <Stop vertInfo={props.vertInfo} calories={props.calories} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes} addStop={props.addStop} setStops={props.setStops} stops={props.stops} delStop={props.delStop}></Stop>
          </Col>
          <Col>
            {/* <Profile coordinates={props.coordinates} mileTimes={props.mileTimes} stops={props.stops}></Profile> */}
            <Profile coordinates={props.coordinates} mileTimes={props.mileTimes} stops={props.stops}></Profile>
            <MileTimes setVertMod={props.setVertMod} terrainMod={props.terrainMod} vertMod={props.vertMod} goalHours={props.goalHours} goalMinutes={props.goalMinutes} vertInfo={props.vertInfo} distance={props.distance} mileTimes={props.mileTimes} setMileTimes={props.setMileTimes}></MileTimes>
          </Col>
        </Row>
        <div>
          {props.coordinates.length === 0 ? (
            <Route updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} loadCourse={props.loadCourse} setCoordinates={props.setCoordinates} setVertInfo={props.setVertInfo} editCourse={props.editCourse} saveCourse={props.saveCourse} id={props.id} updateRoute={updateRoute}>hi</Route>
          ) : null}
        </div>
      </Grid>
    )

}

export default EditCourse;
