import React, {useState} from 'react';
import RouteNoLogin from './RouteNoLogin';
import Stop from './Stop';
import MileTimes from './MileTimes';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {Row, Col, Grid} from './Grid';
import Profile from './Profile';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { useCourseInfoContext } from '../Providers/CourseInfoProvider';
import { useMileTimesContext } from '../Providers/MileTimesProvider';
import { useRouteContext } from '../Providers/RouteProvider';

const Category = styled.strong`
  font-weight: 500;
  font-size: 25px;
  display: block;
`

function EditCourseNoLogin(props) {
  //check if values passed to the time library are valid
  const [timeFormatError, setTimeFormatError] = useState(false);

  const {name, setName, goalHours, setGoalHours, goalMinutes, setGoalMinutes, startTime, setStartTime, calories, setCalories, terrainMod, setTerrainMod} = useCourseInfoContext();
  const {coordinates} = useRouteContext();

  function updateRoute(gpxObj) {
    // saveNewRoute(gpxObj)
  }

  function validateStartTime(e) {
    let hours = parseInt(e.split(":")[0])
    let minutes = parseInt(e.split(":")[1])
    if(hours < 25 && hours > -1 && minutes > -1 && minutes < 60) {
      props.setStartTime(e)
      setTimeFormatError(false)
    } else {
      props.setStartTime(e)
      setTimeFormatError(true)
    }
  }

    return (
      <Grid>
        <Row style={{display: coordinates.length > 0 ? "flex" : "none"}}>
          <Col>   
            <Category>Course Info</Category>
              <div style={{margin: "0 0 0 10px"}}>
                <TextField type="text" value={name} label="Course Name" onChange={(e) => setName(e.target.value)} />
                <span style={{margin: "5px"}}></span>
                <TextField style={{width: "40px"}} type="number" value={goalHours}  label="Hours" onChange={(e) => setGoalHours(e.target.value)} />
                  <div style={{fontSize: "35px", padding: "5px 5px 15px 5px", display: "inline-block"}}>:</div>
                  <TextField style={{width: "40px"}} type="number" value={goalMinutes}  label="Minutes" onChange={(e) => setGoalMinutes(e.target.value)} />
                    <div>
                    <TextField error={timeFormatError} style={{width: "90px"}} type="text" value={startTime} label="Start Time (HH:MM)" onChange={(e) => validateStartTime(e.target.value)} />
                      <FormControl style={{marginRight: "10px"}}>
                        <InputLabel>Terrain Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            value={terrainMod}
                            onChange={(e) => setTerrainMod(e.target.value)}
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
                              value={calories}
                              onChange={(e) => setCalories(e.target.value)}
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
              <Stop></Stop>
          </Col>
          <Col>
            <Profile></Profile>
            <MileTimes></MileTimes>
          </Col>
        </Row>
        <div>
          {coordinates.length === 0 ? (
            <RouteNoLogin setPaceAdjust={props.setPaceAdjust} setMilePoints={props.setMilePoints} setName={props.setName} updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} loadCourse={props.loadCourse} setCoordinates={props.setCoordinates} setVertInfo={props.setVertInfo} editCourse={props.editCourse} saveCourse={props.saveCourse} id={props.id} updateRoute={updateRoute}></RouteNoLogin>
          ) : null}
        </div>
      </Grid>
    )

}

export default EditCourseNoLogin;
