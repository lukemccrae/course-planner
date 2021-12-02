import React, {useEffect, useState} from 'react';
import CourseInfo from './CourseInfo';

import RouteNoLogin from './RouteNoLogin';
import { useRouteContext } from '../Providers/RouteProvider';

function EditCourse(props) {
  const { coordinates } = useRouteContext();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(coordinates.length > 0) setLoaded(true)
  }, [coordinates])

  return (
    !loaded ? <RouteNoLogin updateDeleteModalIsOpen={props.updateDeleteModalIsOpen} loadCourse={props.loadCourse}></RouteNoLogin> : <CourseInfo></CourseInfo>
  )
}

export default EditCourse;
