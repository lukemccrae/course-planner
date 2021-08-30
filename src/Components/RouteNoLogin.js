import React, {useState} from 'react';
import styled from 'styled-components';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import axios from 'axios'
import {Row} from './Grid';
import kendall_mtn from './Demo/kendall_mtn.gpx';
import double_dipsea from './Demo/double_dipsea.gpx';

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
        props.setMilePoints(data.geoJson.features[0].geometry.milePoints)
        props.setPaceAdjust(new Array(data.geoJson.features[0].properties.vertInfo.cumulativeGain.length).fill(0))
        props.setName(name)
          
      })
      .catch((error) => {
          console.log("There was an error")
      console.error('Error:', error);
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
                <div><a href="#" onClick={() => {invokeDemo(double_dipsea, "Double Dipsea")}}> <Name>Double Dipsea</Name></a> (Mill Valley, CA)</div>
            </div>
        </Row>
      </Center>
    )
}

export default RouteNoLogin;
