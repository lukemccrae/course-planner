import React, {useState} from 'react';
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

import { useCourseInfoContext } from '../Providers/CourseInfoProvider';
import { useRouteContext } from '../Providers/RouteProvider';
import { gql, useQuery } from '@apollo/client';
import { mockCourseInfo } from '../Providers/CourseInfoProvider';
import { useUserContext } from '../Providers/UserProvider';


const Category = styled.strong`
  font-weight: 500;
  font-size: 25px;
  display: block;
`

const COURSE_INFO_QUERY = gql`
  query CourseInfo($token: String, $courseId: String) {
    courseInfo(token: $token, courseId: $courseId) {
      name
      goalHours
      goalMinutes
      calories
      terrainMod
      startTime
    }
  }
`



function EditCourse(props) {
  const {name, setName, goalHours, setGoalHours, goalMinutes, setGoalMinutes, startTime, setStartTime, calories, setCalories, terrainMod, setTerrainMod, setCourseInfo} = useCourseInfoContext();
  const {coordinates} = useRouteContext();
  const {courseId} = useUserContext();

  //check if values passed to the time library are valid
  const [timeFormatError, setTimeFormatError] = useState(false);

  const { loading, error, data=mockCourseInfo } = useQuery(COURSE_INFO_QUERY, {
    variables: { courseId: props.courseId, token: props.token }
    });
    setCourseInfo(data.courseInfo)

  function validateStartTime(e) {
    let hours = parseInt(e.split(":")[0])
    let minutes = parseInt(e.split(":")[1])
    if(hours < 25 && hours > -1 && minutes > -1 && minutes < 60) {
      setStartTime(e)
      setTimeFormatError(false)
    } else {
      setStartTime(e)
      setTimeFormatError(true)
    }
  }

    return (
      <Grid>
        <Row style={{display: coordinates.length > 0 ? "flex" : "none"}}>
          <Col>
            {props.saved ? <div style={{display: "flex", justifyContent: "flex-start", margin: "10px 0 10px 0"}}>
              <Button variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Delete</Button>
              <span style={{margin: "5px"}}></span>
              <Button variant="outlined" className="five-px-margin-right" onClick={props.saveCourse}>Save</Button>
            </div> : <div>Saving...</div>}
            
            <Category>Course Info</Category>
              <div style={{margin: "0 0 0 10px"}}>
                <TextField type="text" value={name} label="Course Name" onChange={(e) => setName(e.target.value)} />
                <span style={{margin: "5px"}}></span>
                <TextField style={{width: "40px"}} type="number" value={goalHours}  label="Hours" onChange={(e) => setGoalHours(e.target.value)} />
                  <div style={{fontSize: "35px", padding: "5px 5px 15px 5px", display: "inline-block"}}>:</div>
                  <TextField style={{width: "40px"}} type="number" value={goalMinutes}  label="Minutes" onChange={(e) => setGoalMinutes(e.target.value)} />
                    <div>
                    <TextField error={timeFormatError} style={{width: "90px"}} type="text" value={startTime} label="Start Time (HH:MM)" onChange={(e) => validateStartTime(e.target.value)} />
                    {/* <TimePicker onChange={onChange} value={value}/> */}
                    <span style={{margin: "5px"}}></span>
                      <FormControl style={{marginRight: "10px"}}>
                        <InputLabel>Terrain Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            value={terrainMod}
                            onChange={(e) => setTerrainMod(e.target.value)}
                            style={{width: "110px"}}
                          >
                          <MenuItem value={1.05}>Road</MenuItem>
                          <MenuItem value={1.1}>Moderate</MenuItem>
                          <MenuItem value={1.2}>Rough</MenuItem>
                          <MenuItem value={1.23}>Extreme</MenuItem>
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
              <Stop courseId={props.courseId} token={props.token}></Stop>
          </Col>
          <Col>
            <Profile courseId={props.courseId} token={props.token}></Profile>
            <MileTimes courseId={props.courseId} token={props.token}></MileTimes>
          </Col>
        </Row>
        <div>
          {coordinates.length === 0 && courseId ? (
            <Route updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} editCourse={props.editCourse} id={props.id}>hi</Route>
          ) : null}
        </div>
      </Grid>
    )

}

export default EditCourse;
