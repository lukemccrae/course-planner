import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const CourseInput = styled.input`
  font-size: 25px;
  margin: 0px 5px 10px 5px;
  // background-color: #D3D3D3;
  width: 50%;
  outline: 0;
  border-width: 0 0 1px;
`

function EditCourseName(props) {
    const [courseName, setCourseName] = useState("");

    function onTextboxChangeCourseName(event) {
        setCourseName(event.target.value)
      }

    return (
        <div>
            <CourseInput type="text" placeholder="Course Name" value={props.courseName} onChange={(e) => {onTextboxChangeCourseName(e)}}/>
        </div>
    )
}

export default EditCourseName;