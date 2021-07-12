import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';

const Input = styled.input`

`

function Route(props) {
  function gpxToJson(gpx) {
    // fetch('https://banana-crumble-42815.herokuapp.com/gps/togeojson', {
        fetch('http://localhost:3000/gps/togeojson', {
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
    fetch(`http://localhost:3000/course/new?courseId=${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geoJSON: geoJSON

      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
          console.log(json)
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
        console.log(file)
        gpxToJson(file);
    }
};

    return (
        <div className='file-input'>
            <input onChange={(e)=> changeHandler(e)} type='file'></input>
        </div>
    )
}

export default Route;
