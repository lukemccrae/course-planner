import React, {useState} from 'react';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Button from '@material-ui/core/Button';
import { useUserContext } from '../Providers/UserProvider';

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
  console.log(props)
  const {courseId, setCourseId} = useUserContext();
  const [uploading, setUploading] = useState(false);


  function gpxToJson(gpx) {
    setUploading(true)
    fetch('https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/gps/togeojson', {
        // fetch('http://localhost:3005/gps/togeojson', {
      method: 'POST',
      headers: {
          'Content-Type': 'text/xml; charset=utf-8',
      },
      body: gpx
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          //pass parsed geoJSON up to parent as JS object
          let parsedJson = cloneDeep(JSON.parse(JSON.stringify(data.geoJson)).features[0])

          //save new route to this course
          saveNewRoute(parsedJson)
        } else {
          alert(data.message)
          setUploading(false)
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error:', error); 
    });
  }

  function saveNewRoute(geoJSON) {
    // fetch(`http://localhost:3005/course/new?courseId=${courseId}`, {
      fetch(`https://banana-crumble-42815.herokuapp.com/course/new?courseId=${courseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geoJSON: geoJSON

      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setCourseId({id: json.course._id})
        setUploading(false)
      } else {
        console.log("Error: adding this course failed.")
        console.log(json)
      }
    });
  }

  const changeHandler = (event) => {
    const file = event.target.files[0]
    gpxToJson(file)
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
              <input onChange={changeHandler} type='file'></input>
          </div>
          <Button style={{marginTop: "10px"}} variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Delete</Button>
        </div>
      </Center>
    )
}

export default Route;
