import React, {useState, useLayoutEffect} from 'react';
import Route from './Route';
import Profile from './Profile';
// import Button from 'react-bootstrap/Button';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
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

const CourseInput = styled.input`
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

const StopPointDisplay = styled.div`
  margin: 5px 5px 0 10px;
`

const StopNameInput = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  // background-color: #D3D3D3;
  width: 40%;
  max-width: 120px;
  min-width: 100px;
  outline: 0;
  border-width: 0 0 1px;
`

const StopInput = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  width: 40%;
  max-width: 40px;
  min-width: 40px;
  outline: 0;
  border-width: 0 0 1px;
`

const CourseInfoInput = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
  width: 40%;
  max-width: 40px;
  min-width: 40px;
  outline: 0;
  border-width: 0 0 1px;
`

const StopInputNew = styled.input`
  display: inline;
  font-size: 12px;
  margin: 0px 5px 5px 5px;
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

function EditCourse(props) {
  console.log(props)
  const [deleteModalIsOpen, openDeleteModal] = useState(false);

  const [course, setCourse] = useState({stops: [], route: {distance: 1}, details: {}, calories: {}});
  const [courseName, setCourseName] = useState("");
  const [newStopName, setNewStopName] = useState("Stop 2");
  const [newStopLength, setNewStopLength] = useState(15);
  const [calories, setCalories] = useState(1)
  const [distance, setDistance] = useState(5)
  const [pace, setPace] = useState(1)
  const [details, setDetails] = useState({});
  const [geoJSON, setGeoJSON] = useState({});
  const [vert, setVert] = useState(1);

  useLayoutEffect(() => {
    //update hook state with passed course
    if(course.stops.length === 0) {
      setCourse(props.course);
      setCourseName(props.course.name)
      setNewStopName('Task 4');
      setDetails(props.course.details);
      setCalories(props.course.details.calories);
      setPace(props.course.details.pace)
      setDistance(props.course.route.distance);
      setVert(props.course.route.geoJSON.properties.vert);
    }
  })

  function editStopLength(x, timer) {
    const updatedCourse = cloneDeep(course)
    for (let i = 0; i < updatedCourse.timers.length; i++) {
      if(updatedCourse.timers[i].id === timer.id) {
        updatedCourse.timers[i].length = x * 60;
      }      
    }
    // setTimers(updatedTimers);
    setCourse(updatedCourse);
  }

  function onTextboxChangeNewStopName(event) {
    setNewStopName(event.target.value);
  }

  function onTextboxChangeStopName(event, s) {
    const updatedCourse = cloneDeep(course)
    for (var i = 0; i < updatedCourse.stops.length; i++) {
      if(updatedCourse.stops[i].id === s.id) {
        updatedCourse.stops[i].name = event.target.value
      }
    }
    // setTimers(updatedTimers);
    setCourse(updatedCourse)
  }

  function onTextboxChangeStopMiles(event, s) {
    const updatedCourse = cloneDeep(course)
    for (var i = 0; i < updatedCourse.stops.length; i++) {
      if(updatedCourse.stops[i].id === s.id) {
        updatedCourse.stops[i].miles = event.target.value
      }
    }
    // setTimers(updatedTimers);
    setCourse(updatedCourse)
  }

  function onTextboxChangeStopCals(event, s) {
    const updatedCourse = cloneDeep(course)
    for (var i = 0; i < updatedCourse.stops.length; i++) {
      if(updatedCourse.stops[i].id === s.id) {
        updatedCourse.stops[i].cals = event.target.value
      }
    }
    // setTimers(updatedTimers);
    setCourse(updatedCourse)
  }

  function onTextboxChangeCourseName(event) {
    console.log(event.target.value)
    setCourseName(event.target.value)
  }

  function closeDeleteModal() {
    openDeleteModal(false);
  }

  function deleteModal() {
    openDeleteModal(true);
  }

  function saveNewCourse() {
    const token = JSON.parse(localStorage.course_planner).token;
      // fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course`, {
        fetch(`http://localhost:3000/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://group-timer.firebaseapp.com/'
        },
        body: JSON.stringify({
          name: courseName,
          token: token,
          hash: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
          stops: course.stops,
          course: course,
          details: details
        })
      }).then(res => res.json()).then(json => {
        if (json.success) {
          props.getCourses(token)
        } else {
          console.log("Error: adding this course failed.")
          console.log(json)
        }
      });
  }
  
  function delItem(item) {
      let stopsAmt = parseInt(course.stops.length);
      let updatedCourse = course;

      function isStop(element) {
        if(element.id === item.id) return element;
      }

      let index = course.stops.findIndex(isStop);
      updatedCourse.stops.splice(index, 1);
      setCourse(updatedCourse);
      setNewStopName('Stop ' + stopsAmt);
    }

    function sumCal(stops) {
      let sum = 0;
      for (let i = 0; i < stops.length; i++) {
        sum += parseInt(stops[i].cals);
      }
      return sum;
    }

    function addItem() {
      let updatedCourse = course;
      let stopsAmt = parseInt(course.stops.length) + 2;
      
      let newStop = {
        name: "",
        cal: 100,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }


      if(updatedCourse.stops.length < 7) {
        updatedCourse.stops.push(newStop);
        setNewStopName(props.course.stops.length < 7 ? 'Task ' + stopsAmt : '');
        setCourse(updatedCourse);
      }
    }

    function updateRoute(gpxObj) {
      setGeoJSON(gpxObj)
    }

    function saveCourse(newRoute) {
      const token = JSON.parse(localStorage.course_planner).token;
      if(course.stops.length > 0) {
        // fetch(`https://banana-crumble-42815.herokuapp.com/course?courseId=${props.course._id}`, {
          fetch(`http://localhost:3000/course?courseId=${props.course._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: courseName,
            stops: course.stops,
            distance: parseInt(distance),
            vert: parseInt(vert),
            calories: calories,
            pace: pace,
            geoJSON: Object.keys(geoJSON).length > 0 ? geoJSON : props.course.route.geoJSON

          })
        }).then(res => res.json()).then(json => {
          if (json.success) {
            props.getCourses(token)
            setGeoJSON({})
          } else {
            console.log("Error: adding this course failed.")
            console.log(json)
          }
        });
      }
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <CourseInput type="text" placeholder="Course Name" value={courseName} onChange={onTextboxChangeCourseName}/>
          <Button variant="outlined" onClick={() => props.toggleEdit(course)}>&#8963;</Button>
        </div>
        <EditBox>
          {props.course.route.geoJSON.properties.name === "no route stored" ? (
            props.course.hash === 'newcourse' ? null : <Route updateRoute={updateRoute}></Route>
          ) : 
          <Row style={{display: "inline"}}>
            <Profile route={props.course.route.geoJSON}></Profile>
            <button onClick={()=>{props.removeRoute(course)}} type="button" className="close" aria-label="Close">
              <Button variant="outlined" className="five-px-margin-right" onClick={() => {}}>Remove GPX</Button>
            </button>
            <div style={{margin: "0 0 0 5px"}}>{props.course.route.geoJSON.properties.name}</div>
            <div style={{margin: "0 0 0 5px"}}>{Math.round(props.course.route.distance * 100 + Number.EPSILON ) / 100} miles</div>
            <div style={{margin: "0 0 0 5px"}}>{props.course.route.geoJSON.properties.vert} ft. gain</div>
            <div style={{margin: "0 0 0 5px"}}>{Math.round( (props.course.route.geoJSON.properties.vert / props.course.route.distance) * 100 + Number.EPSILON ) / 100} ft. gain per mile</div>
          </Row>}
            {course.stops.map(s => {
              return (
                <Row key={s.id}>
                    <button style={{display: course.stops.length < 2 ? "none" : "inline", marginBottom: "10px"}} onClick={()=>{delItem(s)}} type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <Col size={.5}>
                      <StopNameInput placeholder="Name" stops={course.stops} s={s} type="text" value={s.name} onChange={(e) => onTextboxChangeStopName(e, s)}/>
                    </Col>
                    <StopInput placeholder="Miles" stops={course.stops} s={s} type="number" value={s.miles} onChange={(e) => onTextboxChangeStopMiles(e, s)}/>
                    <StopInput placeholder="Calories" stops={course.stops} s={s} type="number" value={s.cals} onChange={(e) => onTextboxChangeStopCals(e, s)}/>
                </Row>
                
              )
            })}
            <Row>
              <Col size={3}>
                <StopInputNew style={{margin: '5px 0 0 0'}} type="text" placeholder={'name'} value={newStopName} onChange={(e, s) => onTextboxChangeNewStopName(e)}/>
                  <Col size={.1}></Col>
              </Col>
              <Col size={.5}>
                <Button variant="outlined" style={{display: 'inline'}} onClick={addItem}>Add</Button>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <div>Cals: {sumCal(course.stops)}</div>
              <div>Distance: </div>
              <CourseInfoInput placeholder="Distance" type="text" value={distance} onChange={(e) => setDistance(e.target.value)}/>
              <div>Vert: </div>
              <CourseInfoInput placeholder="Vert" type="text" value={vert} onChange={(e) => setVert(e.target.value)}/>

              {/* <StopNameInput placeholder="Name" type="text"  stops={course.stops} s={s} value={s.name} onChange={(e) => onTextboxChangeStopName(e, s)}/> */}

              <div>Pace: </div>
              <CourseInfoInput placeholder="Pace" type="text" value={pace} onChange={(e) => setPace(e.target.value)}/>
              <div>/ mile</div> 
            </Row>

              <Divider></Divider>
              <div>
                    {/* dont show button if its add course box */}
                    {props.course.hash === 'newcourse' ? null : <Button variant="outlined" className="five-px-margin-right" onClick={deleteModal}>Delete</Button>}
                    {/* show add course button if its new course box, save button if save box */}
                    {props.course.hash === 'newcourse' ? 
                    <Button variant="outlined" className="five-px-margin-right" onClick={saveNewCourse}>Save</Button>
                    :
                    <Button variant="outlined" className="five-px-margin-right" onClick={saveCourse}>Save</Button>}
                    
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
            <Button variant="outlined" className="five-px-margin-right"  onClick={() => props.deleteCourse(props.course)}>Delete</Button>
            <Button variant="outlined" className="five-px-margin-right" onClick={closeDeleteModal}>Cancel</Button>
          </div>
        </Modal>
        </div>
    )

}

export default EditCourse;
