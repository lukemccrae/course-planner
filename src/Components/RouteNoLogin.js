import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import axios from 'axios'
import Button from '@material-ui/core/Button';
import western_states from './Demo/western_states.gpx';
import {Row, Col, Grid} from './Grid';
import kendall_mtn from './Demo/kendall_mtn.gpx';
import double_dipsea from './Demo/double_dipsea.gpx';

const Input = styled.input`

`
const override = css`
  display: flex;
`;

const Description = styled.strong`
  font-weight: 300;
  font-size: 28px;
`

const Center = styled.div`
  display: flex;
  justify-content: space-around;
  with: 100vw;
  height: 50vh;
  align-items: center;
`

const Name = styled.strong`
  font-weight: 300;
  font-size: 25px;
`


function RouteNoLogin(props) {
  const [uploading, setUploading] = useState(false)

  function gpxToJson(gpx, name) {
    setUploading(true)
    // fetch('https://banana-crumble-42815.herokuapp.com/gps/togeojson', {
        fetch('http://localhost:3005/gps/togeojson', {
      method: 'POST',
      headers: {
          'Content-Type': 'text/xml; charset=utf-8',
      },
      body: gpx
      })
      .then((response) => response.json())
      .then((data) => {
        props.setVertInfo(data.geoJson.features[0].properties.vertInfo.cumulativeGain)
        props.setCoordinates(data.geoJson.features[0].geometry.coordinates)
        props.setName(name)
        console.log(data)
          //pass parsed geoJSON up to parent as JS object
          let parsedJson = cloneDeep(JSON.parse(JSON.stringify(data.geoJson)).features[0])
          let dummy = {
              name: "dummy gpx"
          }
          
        //   saveNewRoute(parsedJson)
      })
      .catch((error) => {
          console.log("There was an error")
      console.error('Error:', error);
    });
  }

  function saveNewRoute(geoJSON) {
    const token = JSON.parse(localStorage.course_planner).token;
    fetch(`http://localhost:3005/course/new?courseId=${props.id}`, {
      // fetch(`https://banana-crumble-42815.herokuapp.com/course/new?courseId=${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geoJSON: geoJSON

      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setUploading(false)
      } else {
        console.log("Error: adding this course failed.")
        console.log(json)
      }
    });
  }

    const changeHandler = (event) => {
        console.log(event)
        const file = event.target.files[0]

        //need to cmake sure valid gpx
        if(true) {
            gpxToJson(file);
        }
    };

    function invokeDemo(file, name) {
        console.log(file)
        axios.get(file, {
            "Content-Type": "application/xml; charset=utf-8"
         })
         .then((response) => {
             gpxToJson(response.data, name)
         });

    }

    return (
      <Center>
          <Row>
            <div style={{display: "block"}}>
            <Description>Upload a GPX file</Description>
                <div className='file-input'>
                    <BarLoader css={override}
                        size={15}
                        color={"#007bff"}
                        loading={uploading}></BarLoader>
                    <input onChange={(e)=> changeHandler(e)} type='file'></input>
                </div>
            </div>
            <div>
                <Description style={{display: "flex"}}>Load Demo</Description>
                <div><a href="#" onClick={() => {invokeDemo(kendall_mtn, "Kendall Mtn Run")}}> <Name>Kendall Mtn Run</Name></a> (Silverton, CO)</div>
                {/* <div><a href="#" onClick={() => {invokeDemo(western_states)}}> <Name>Western States</Name></a> (Auburn, CA)</div> */}
                <div><a href="#" onClick={() => {invokeDemo(double_dipsea, "Double Dipsea")}}> <Name>Double Dipsea</Name></a> (Mill Valley, CA)</div>
            </div>
        </Row>
      </Center>
    )
}

export default RouteNoLogin;
