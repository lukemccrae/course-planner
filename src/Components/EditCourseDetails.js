import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

import { SettingsInputCompositeSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
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

function EditCourseDetails(props) {
    console.log(props)
    const [APace, setAPace] = useState("");
    const [BPace, setBPace] = useState("");
    const [distance, setDistance] = useState(5)
    const [vert, setVert] = useState(1);

    const classes = useStyles();

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{width: "50px"}}  id="standard" type="number" value={props.distance} label="Miles" onChange={(e) => props.setDistance(e.target.value)} />
              <TextField style={{width: "50px"}}  id="standard" type="number" value={props.vert}  label="Vert" onChange={(e) => props.setVert(e.target.value)} />
              <div>{Math.round( (props.vert / props.distance))} ft. gain / mile</div>
              {/* <TextField style={{width: "70px"}}  id="standard" type="text" label="A Pace" defaultValue={""} onChange={(e) => setAPace(e.target.value)} />
              <TextField style={{width: "70px"}}  id="standard" type="text" label="B Pace" defaultValue={""} onChange={(e) => setBPace(e.target.value)} /> */}
              
            </form>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">A Pace</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={APace}
                onChange={(e) => props.setAPace(e.target.value)}
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
              onChange={(e) => props.setBPace(e.target.value)}
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
        </div>
    )
}

export default EditCourseDetails;

