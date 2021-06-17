import React, {useState, useEffect} from 'react';
import EditCourse from './EditCourse.js';
import {Grid, Row, Col} from './Grid';
import Button from 'react-bootstrap/Button';
import Box from './ForgetBox.js';
import Modal from 'react-modal';
import styled from 'styled-components';
import {Helmet} from "react-helmet";

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 20px;
`

const EditButton = styled.div`
  display: ${(props) => props.timerOn ? 'none' : 'inline'};
`

const Course = styled.div`
  width: 100%;
  max-width: 500px;
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
  console.log(props)
  const [editingCourse, setEditingCourse] = useState({});

  function closeModal() {
    props.getCourses();
  }

  function deleteCourse(course) {
    const token = JSON.parse(localStorage.course_planner).token;

      fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${course._id}`, {
        // fetch(`http://localhost:3000/course?token=${token}&courseId=${course._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success) {
        props.getCourses(token)
      } else {
        console.log("error: ", json)
      }
    });
  }

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
            <Col size={1.5}></Col>
            <Col size={3}>
              {props.courses.map(c => {
                return (
                  <Course className="course" key={c._id} c={c}>
                    <CourseNameParent course={c} editingCourse={editingCourse}>
                      <h3>{c.name}</h3>
                      <ButtonWrapper>

                        <EditButton>
                          <Button id="dropdown-basic-button" onClick={() => toggleEdit(c, props)}>&#8963;</Button>
                        </EditButton>

                      </ButtonWrapper>
                    </CourseNameParent>
                    {c.editOpen === true ? (
                        <EditCourse
                        toggleEdit={toggleEdit}
                        removeRoute={props.removeRoute}
                        course={c}
                        colors={props.colors}
                        getCourses={props.getCourses}
                        deleteCourse={deleteCourse}
                        timeFormat={props.timeFormat}
                        timers={c.timers}
                        setEditingCourse={setEditingCourse}>
                      </EditCourse>
                    ) :
                      c.hash === 'newcourse' ? <div>Use dropdown to add new Course</div> : null
                    }
                    {/* {startIsOpen ? (
                      <div>
                        {startedGroup._id === c._id ? (<div>
                          <Box boxContents={c.box} course={c}></Box>
                        </div>) : <div></div>}
                      </div>
                      ) : <div></div>} */}
                  </Course>
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
