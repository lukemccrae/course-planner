import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

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
  justify-content: center;
  align-items: center;
  with: 100vw;
  height: 90vh;
`


function Route(props) {
  const [uploading, setUploading] = useState(false)

  function gpxToJson(gpx) {
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
          console.log(data)
          //pass parsed geoJSON up to parent as JS object
          let parsedJson = cloneDeep(JSON.parse(JSON.stringify(data.geoJson)).features[0])
          console.log(parsedJson)
          let dummy = {
              name: "dummy gpx"
          }
          
          saveNewRoute(parsedJson)
      })
      .catch((error) => {
          console.log("It looks like that wasn't a valid gpx file.")
      console.error('Error:', error);
    });
  }

  function saveNewRoute(geoJSON) {
    const token = JSON.parse(localStorage.course_planner).token;
    // fetch(`http://localhost:3000/course/new?courseId=${props.id}`, {
      fetch(`https://banana-crumble-42815.herokuapp.com/course/new?courseId=${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geoJSON: geoJSON

      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        props.saveCourse()
        setUploading(false)
      } else {
        console.log("Error: adding this course failed.")
        console.log(json)
      }
    });
  }

  const changeHandler = (event) => {
    const file = event.target.files[0]

    //need to cmake sure valid gpx
    if(true) {
        gpxToJson(file);
    }
};

    return (
      <Center>
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
      </Center>
    )
}

export default Route;
