import React, {useState, useEffect} from 'react';
import EditCourse from './EditCourse.js';
import {Grid, Row, Col} from './Grid';
import Button from '@material-ui/core/Button';
import { css } from "@emotion/core";
import Profile from './Profile';
import Modal from 'react-modal';
import PropagateLoader from "react-spinners/PropagateLoader";
import styled from 'styled-components';
import {Helmet} from "react-helmet";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const EditButton = styled.div`
  display: ${(props) => props.timerOn ? 'none' : 'inline'};
`

const Course = styled.div`
  width: 100%;
  height: 19px;
  display: ${(props) => props.timerOn ? ((props.g._id === props.startedCourse._id) ? 'inline-table' : 'none') : 'inline-table'};
`

const CourseNameParent = styled.div`
  display: ${(props) => props.course === props.editingCourse ? 'none' : 'flex'};
  justify-content: space-between;
  white-space: nowrap;
  min-width: 293px;
` 

Modal.setAppElement('#root')

function Dash(props) {
  const [editingCourse, setEditingCourse] = useState({});
  const [loading, setLoading] = useState(false);

  function toggleEdit(g) {
    //if passed course is current course, set it to empty object
    //this sets editingObject to nothing and closes edit window
    let tempCourse = g === editingCourse ? {} : g;
    props.editCourse(tempCourse);
    setEditingCourse(tempCourse);
  }

    return (
      <div>
        <Helmet>
          <title>Course Planner</title>
        </Helmet>
        <Grid>
            <Row>
            <Col size={1}></Col>
            <Col size={4}>
              {props.courses.map(c => {
                return (
                  <Course className="course" key={c._id} c={c}>
                    <CourseNameParent course={c} editingCourse={editingCourse}>
                      {loading ? <div>
                          <PropagateLoader
                          css={override}
                          size={7}
                          color={"#007bff"}
                          loading={loading}
                        />
                      </div> : <h3>{c.details.name}</h3>}
                        
                        {c.hash === 'newcourse' ? <EditButton><Button onClick={props.saveNewCourse} variant="outlined">New Course</Button> </EditButton>
                        : 
                        <EditButton>
                          <Button variant="outlined" id="dropdown-basic-button" onClick={() => toggleEdit(c, props)}>&#8963;</Button>
                        </EditButton>}
                    </CourseNameParent>
                    {c.editOpen === true ? (
                      <div>
                        <EditCourse
                          hash={c.hash}
                          id={c._id}
                          deleteCourse={props.deleteCourse}
                          toggleEdit={toggleEdit}
                          removeRoute={props.removeRoute}
                          details={props.details}
                          stops={c.stops}
                          vertInfo={c.route.geoJSON.properties.vertInfo}
                          getCourses={props.getCourses}
                          timeFormat={props.timeFormat}
                          saveCourse={props.saveCourse}
                          saved={props.saved}
                          
                          setRoute={props.setRoute}
                          addStop={props.addStop}
                          setDistance={props.setDistance}
                          setVert={props.setVert}
                          setName={props.setName}
                          setCalories={props.setCalories}
                          setGoalHours={props.setGoalHours}
                          setGoalMinutes={props.setGoalMinutes}
                          setMileTimes={props.setMileTimes}
                          setStops={props.setStops}
                          
                          stops={props.stops}
                          distance={props.distance}
                          vert={props.vert}
                          name={props.name}
                          mileTimes={props.mileTimes}
                          calories={props.calories}
                          goalHours={props.goalHours}
                          goalMinutes={props.goalMinutes}
                          vertInfo={c.route.geoJSON.properties.vertInfo}>
                        </EditCourse>
                        {c.route.geoJSON.properties.distance > 0 ? 
                        <div>
                          <Profile route={c.route.geoJSON}></Profile>
                          <div style={{display: "flex", justifyContent: "space-around"}}>
                          <small>Approx. distance: {c.route.geoJSON.properties.distance.toFixed(2)} mi.</small>
                          <small>Approx. vert: {Math.round(c.route.geoJSON.properties.vert)} ft.</small>
                          <small>Avg Uphill Grade: {Math.round(c.details.vert / c.route.geoJSON.properties.vertInfo.totalUphillFeet * 100)}%</small>
                          <small>Avg Max Grade: {c.route.geoJSON.properties.vertInfo.avgMaxGrade}%</small>
                        </div>
                        </div> : null}
                      </div>
                       
                    ) :
                      c.hash === 'newcourse' ? <div>Use dropdown to add new Course</div> : null
                    }
                  </Course>
                )
              })}
            </Col>
            <Col size={1}></Col>
            </Row>
        </Grid>
      </div>
    )

}

export default Dash;
