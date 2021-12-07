import React, {useEffect} from 'react';
import CourseInfo from './CourseInfo.js';
import { useCourseInfoContext } from '../Providers/CourseInfoProvider.tsx';
import { gql, useQuery } from '@apollo/client';
import { mockCourseInfo } from '../Providers/CourseInfoProvider.tsx';
import { useUserContext } from '../Providers/UserProvider.tsx';

const COURSE_INFO_QUERY = gql`
  query CourseInfo($token: String, $courseId: String) {
    courseInfo(token: $token, courseId: $courseId) {
      name
      goalHours
      goalMinutes
      calories
      terrainMod
      startTime
    }
  }
`

function EditCourse(props) {
  const { setCourseInfo } = useCourseInfoContext();
  const {courseId, token} = useUserContext();

  const { loading, error, data=mockCourseInfo } = useQuery(COURSE_INFO_QUERY, {
    variables: { courseId: courseId, token: token }
    });

    //setState when the data comes back from the query
    useEffect(() => {
      setCourseInfo(data.courseInfo)
    }, [data])

    if(courseId) return (<CourseInfo updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} editCourse={props.editCourse} id={props.id}></CourseInfo>)
    return <div></div>
}

export default EditCourse;
