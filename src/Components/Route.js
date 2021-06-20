import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';

const Input = styled.input`

`

function Route(props) {
    console.log(props)
  const [route, setRoute] = useState({});
  const [routeName, setRouteName] = useState("");
  const [isFilePicked, setIsFilePicked] = useState("");
  const [selected, setIsSelected] = useState(false);

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
          
          props.updateRoute(parsedJson);
      })
      .catch((error) => {
          console.log("It looks that wasn't a valid gpx file.")
      console.error('Error:', error);
    });
  }


  const changeHandler = (event) => {
    const file = event.target.files[0]

    //need to cmake sure valid gpx
    if(true) {
        console.log(file)
        gpxToJson(file);
    }
    setIsSelected(true);
};

    return (
        <div className='file-input'>
            <input onChange={(e)=> changeHandler(e)} type='file'></input>
        </div>
    )
}

export default Route;
