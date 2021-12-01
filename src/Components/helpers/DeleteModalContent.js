import Button from '@material-ui/core/Button';
import { useUserContext } from '../../Providers/UserProvider';

import { gql, useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';


  const DELETE_QUERY = gql`
  mutation Mutation($courseId: String!, $token: String!) {
    deleteCourse(courseId: $courseId, token: $token) {
      details {
        name
      }
      _id
      hash
    }
  }
`

export const DeleteModalContent = (props) => {
    const {courseId, setCourseId, courseList, setCourseList, token} = useUserContext();

    useEffect(() => {
        // console.log(courseList.length, "why am i not being called when course is deleted?")
    }, [courseList])

    const [deleteMutation, {data={deleteCourse: []}, loading, erorr}] = useMutation(DELETE_QUERY, {
        variables: { courseId, token}
      });
      if(data.deleteCourse.length > 0) {
        setCourseList(data.deleteCourse)
      }

    function deleteCourse() {
        deleteMutation(courseId, token);
        props.setDeleteModalIsOpen(false);
    }
    return (
        <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button style={{margin: '0 0 0 10px'}} disabled={courseList.length < 2} variant="outlined" className="five-px-margin-right"  onClick={deleteCourse}>Delete</Button>
            <Button style={{margin: '0 0 0 10px'}} variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Cancel</Button>
          </div>
    )
}

