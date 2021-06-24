import React, {useState, useLayoutEffect} from 'react';
import Route from './Route';
import Profile from './Profile';
import Stops from './Stops';
// import Button from 'react-bootstrap/Button';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import cloneDeep from 'lodash.clonedeep';
import {Row, Col} from './Grid';
import FormControl from '@material-ui/core/FormControl';

import Slider from 'react-input-slider';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

import { SettingsInputCompositeSharp } from '@material-ui/icons';

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

const EditBox = styled.div`
`

const CourseDetails = styled.ul`
  border-top: none;
  padding-top: 0;
  list-style-type:none;
`

const CourseData = styled.li`
  display: inline;
  font-size: 22px;
  margin: 0 15px 0 0;
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

const GainPerMile = styled.div`
  margin: 30px 10px 0 0;
  font-size: 15px;
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



const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

function EditCourse(props) {
  console.log(props)
  const [deleteModalIsOpen, openDeleteModal] = useState(false);

  const [course, setCourse] = useState({stops: [], route: {distance: 1}, details: {}, calories: {}});
  const [courseName, setCourseName] = useState("");

  const [calories, setCalories] = useState(1)
  const [distance, setDistance] = useState(5)
  const [pace, setPace] = useState(1)
  const [details, setDetails] = useState({});
  const [geoJSON, setGeoJSON] = useState({});
  const [vert, setVert] = useState(1);
  const [stops, setStops] = useState([]);

  const [APace, setAPace] = useState("");
  const [BPace, setBPace] = useState("");



  const classes = useStyles();



  useLayoutEffect(() => {
    //update hook state with passed course
    if(course.stops.length === 0) {
      setCourse(props.course);
      setStops(props.course.stops);
      setCourseName(props.course.name)
      setDetails(props.course.details);
      setCalories(props.course.details.calories);
      setAPace(props.course.details.pace[0])
      setBPace(props.course.details.pace[1])
      setDistance(props.course.distance);
      setVert(props.course.vert);
      setGeoJSON(props.course.geoJSON)
    }
  })

  function editStopLength(x, stop) {
    const updatedCourse = cloneDeep(course)
    for (let i = 0; i < updatedCourse.stops.length; i++) {
      if(updatedCourse.stops[i].id === stop.id) {
        updatedCourse.stops[i].length = x * 60;
      }      
    }
    setCourse(updatedCourse);
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
          details: details,
          distance: distance,
          vert: vert,
          route: {geoJSON}
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

  function setNewStops(s) {
    setStops(s)
    console.log(stops)
  } 

  function addItem() {
    let updatedStops = stops;
    
    let newStop = {
      name: "",
      cal: 100,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

      updatedStops.push(newStop);
      setStops(updatedStops)
  }

    function sumCal(stops) {
      let sum = 0;
      for (let i = 0; i < stops.length; i++) {
        sum += parseInt(stops[i].cals);
      }
      return sum;
    }

    function updateRoute(gpxObj) {
      // saveNewRoute(gpxObj)
    }

    

    function saveCourse(newRoute) {
      const token = JSON.parse(localStorage.course_planner).token;
      // if(props.course.route.geoJSON.properties.name === "no route stored") {
      //   saveNewRoute();
      // }
      if(course.stops.length > 0) {
        console.log(props.course.geoJSON)
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
            pace: [APace, BPace]
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
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <CourseInput type="text" placeholder="Course Name" value={courseName} onChange={onTextboxChangeCourseName}/>
          <Button variant="outlined" onClick={() => props.toggleEdit(course)}>&#8963;</Button>
        </div>
        <EditBox>
          {/* {true ? ( */}
          {props.course.route.geoJSON.geometry.coordinates.length === 0 ? (
          
            props.course.hash === 'newcourse' ? null : <Route course={course} updateRoute={updateRoute}></Route>
          ) : 
          <Row style={{display: "inline"}}>

            <Profile route={props.course.route.geoJSON}></Profile>
            <button onClick={()=>{props.removeRoute(course)}} type="button" className="close" aria-label="Close">
            </button>
            
          </Row>}
          <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{width: "50px"}}  id="standard" type="number" value={distance} label="Miles" defaultValue={distance} onChange={(e) => setDistance(e.target.value)} />
              <TextField style={{width: "75px"}}  id="standard" type="number" value={vert}  label="Vert" defaultValue={distance} onChange={(e) => setVert(e.target.value)} />
              <GainPerMile>{Math.round( (vert / distance))} ft/mi</GainPerMile>
              {/* <TextField style={{width: "70px"}}  id="standard" type="text" label="A Pace" defaultValue={""} onChange={(e) => setAPace(e.target.value)} />
              <TextField style={{width: "70px"}}  id="standard" type="text" label="B Pace" defaultValue={""} onChange={(e) => setBPace(e.target.value)} /> */}
              
            </form>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">A Pace</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={APace}
                onChange={(e) => setAPace(e.target.value)}
                className="pace-style"
              >
              <MenuItem value={480}>8:00</MenuItem>
              <MenuItem value={510}>8:30</MenuItem>
              <MenuItem value={540}>9:00</MenuItem>
              <MenuItem value={570}>9:30</MenuItem>
              <MenuItem value={600}>10:00</MenuItem>
              <MenuItem value={630}>10:30</MenuItem>
              <MenuItem value={660}>11:00</MenuItem>
              <MenuItem value={690}>11:30</MenuItem>
              <MenuItem value={720}>12:00</MenuItem>
              <MenuItem value={750}>12:00</MenuItem>
              </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">B Pace</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={BPace}
              onChange={(e) => setBPace(e.target.value)}
            >
              <MenuItem value={480}>8:00</MenuItem>
              <MenuItem value={510}>8:30</MenuItem>
              <MenuItem value={540}>9:00</MenuItem>
              <MenuItem value={570}>9:30</MenuItem>
              <MenuItem value={600}>10:00</MenuItem>
              <MenuItem value={630}>10:30</MenuItem>
              <MenuItem value={660}>11:00</MenuItem>
              <MenuItem value={690}>11:30</MenuItem>
              <MenuItem value={720}>12:00</MenuItem>
              <MenuItem value={750}>12:00</MenuItem>
            </Select>
          </FormControl>
          <Divider></Divider>
          <Stops addItem={addItem} setNewStops={setNewStops} stops={stops}></Stops>
            
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
