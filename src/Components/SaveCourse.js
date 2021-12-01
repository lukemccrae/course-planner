import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '../Providers/UserProvider';
import {useCourseInfoContext } from '../Providers/CourseInfoProvider';
import { useStopsContext } from '../Providers/StopsProvider';
import { useMileTimesContext } from '../Providers/MileTimesProvider';

const SAVE_QUERY = gql`
    mutation Mutation($courseId: String!, $token: String!, $tempCourse: TempCourse!) {
        saveCourse(courseId: $courseId, token: $token, tempCourse: $tempCourse)
    }
`

function SaveCourse() {
    const {token, courseId} = useUserContext();
    console.log(courseId)
    const { name, calories, goalHours, goalMinutes, startTime, terrainMod } = useCourseInfoContext();
    const { stops } = useStopsContext();
    const { paceAdjust, mileTimes, vertMod } = useMileTimesContext();

    const tempCourse = {
        details: {
          name,
          calories,
          goalHours,
          goalMinutes,
          vertMod,
          terrainMod,
          mileTimes,
          startTime
        },
        stops: stops,
        paceAdjust: paceAdjust
      }

    function saveCourse() {
        saveCourseMutation(token, courseId, tempCourse);
    }

    const [saveCourseMutation, {data, loading, erorr}] = useMutation(SAVE_QUERY, {
        variables: { token, courseId, tempCourse}
    });
    console.log(data)

    return (
        <Button variant="outlined" className="five-px-margin-right" onClick={saveCourse}>Save</Button>
    )
}

export default SaveCourse;