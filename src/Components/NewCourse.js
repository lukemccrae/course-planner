import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '../Providers/UserProvider';

const ADD_QUERY = gql`
    mutation AddNewCourse($token: String!) {
        addNewCourse(token: $token) {
            details {
            name
            }
        }
    }
`

function NewCourse() {
    const {token} = useUserContext();
    function addNewCourse() {
        addCourseMutation(token);
    }

    const [addCourseMutation, {data, loading, erorr}] = useMutation(ADD_QUERY, {
        variables: { token}
    });

    return (
        <Button style={{color: "white", borderColor: "white", margin: "0 5px 0 5px"}} onClick={addNewCourse} variant="outlined">New Course</Button>
    )
}

export default NewCourse;