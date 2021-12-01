import React, {useEffect} from 'react';
import CourseInfo from './CourseInfo';

import { useCourseInfoContext } from '../Providers/CourseInfoProvider';
import { gql, useQuery } from '@apollo/client';
import { mockCourseInfo } from '../Providers/CourseInfoProvider';
import { useUserContext } from '../Providers/UserProvider';


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
  const {courseId, setCourseId} = useUserContext();

  const { loading, error, data=mockCourseInfo } = useQuery(COURSE_INFO_QUERY, {
    variables: { courseId: props.courseId, token: props.token }
    });

    //in use effect allows state updates to persist
      //otherwise it would reset the courseInfo with initial course data
    useEffect(() => {
      setCourseInfo(data.courseInfo)
    }, [])



    return (
      <CourseInfo updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} editCourse={props.editCourse} id={props.id}></CourseInfo>
    )

}

export default EditCourse;
