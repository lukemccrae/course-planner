import React, {useState, useEffect} from 'react';
import EditCourse from './EditCourse.js';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

Modal.setAppElement('#root')

function Dash(props) {
  // const [editingCourse, setEditingCourse] = useState({});

  useEffect(() => {
    props.setWhy(false)
  }, [props.why])

  function toggleEdit(c) {
    props.editCourse(c);
  }

    return (
      <div>
        {props.details ? <EditCourse
          hash={props.c.hash}
          id={props.c._id}
          deleteCourse={props.deleteCourse}
          toggleEdit={toggleEdit}
          removeRoute={props.removeRoute}
          stops={props.c.stops}
          vertInfo={props.c.route.geoJSON.properties.vertInfo}
          getCourses={props.getCourses}
          timeFormat={props.timeFormat}
          saveCourse={props.saveCourse}
          saved={props.saved}
          deleteModalIsOpen={props.deleteModalIsOpen}
          
          setRoute={props.setRoute}
          addStop={props.addStop}
          delStop={props.delStop}
          setDistance={props.setDistance}
          setVert={props.setVert}
          setName={props.setName}
          setCalories={props.setCalories}
          setGoalHours={props.setGoalHours}
          setGoalMinutes={props.setGoalMinutes}
          setMileTimes={props.setMileTimes}
          setStops={props.setStops}
          setVertMod={props.setVertMod}
          setTerrainMod={props.setTerrainMod}
          updateDeleteModalIsOpen={props.updateDeleteModalIsOpen}

          stops={props.stops}
          terrainMod={props.terrainMod}
          vertMod={props.vertMod}
          distance={props.distance}
          vert={props.vert}
          name={props.name}
          mileTimes={props.mileTimes}
          calories={props.calories}
          goalHours={props.goalHours}
          goalMinutes={props.goalMinutes}
          route={props.c.route.geoJSON}
          vertInfo={props.c.route.geoJSON.properties.vertInfo.cumulativeGain}>
        </EditCourse> : null}
      </div>
    )

}

export default Dash;
