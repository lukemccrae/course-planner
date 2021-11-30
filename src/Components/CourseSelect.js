import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { gql, useQuery } from '@apollo/client';
import { useUserContext } from '../Providers/UserProvider';

const COURSE_LIST_QUERY = gql`
    query Query($courseToken: String!) {
        courseNamesIds(token: $courseToken) {
            _id
            hash
            details {
            name
            }
        }
    }
`

function CourseSelect() {
    const {setCourseId, courseList, setCourseList} = useUserContext();
    const courseToken = JSON.parse(localStorage.course_planner).token;

    useEffect(() => {
        console.log(courseList)
    }, [courseList])

    const { loading, error, data = {courseNamesIds: []} } = useQuery(COURSE_LIST_QUERY, {
        variables: { courseToken }
        
    });
    if(data.courseNamesIds.length > 0) {
        setCourseList(data.courseNamesIds)
    }



    function setCourse(c) {
        setCourseId(c._id)
    }

    return (
        <FormControl style={{width: "75px", color: "white"}}>
            <InputLabel htmlFor="age-native-simple">Course</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                }}
                >
                {courseList.map(c => {
                    return (
                        <MenuItem key={c.hash} onClick={() => setCourse(c)}>{c.details.name}</MenuItem>
                    )
                })}
                </Select>
        </FormControl>
    )
}

export default CourseSelect;