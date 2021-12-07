import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '../Providers/UserProvider';
import {useCourseInfoContext } from '../Providers/CourseInfoProvider.tsx';
import { useStopsContext } from '../Providers/StopsProvider';
import { useMileTimesContext } from '../Providers/MileTimesProvider';

const SAVE_QUERY = gql`
    mutation Mutation($courseId: String!, $token: String!, $tempCourse: TempCourse!) {
        saveCourse(courseId: $courseId, token: $token, tempCourse: $tempCourse)
    }
`

function SaveCourse() {
    const {token, courseId} = useUserContext();
    const { name, calories, goalHours, goalMinutes, startTime, terrainMod } = useCourseInfoContext();
    const { stops } = useStopsContext();
    const { paceAdjust, mileTimes, vertMod } = useMileTimesContext();
    const { setSaved } = useUserContext();

    const tempCourse = {
        details: {
          name,
          calories,
          goalHours: parseInt(goalHours),
          goalMinutes: parseInt(goalMinutes),
          vertMod,
          terrainMod,
          mileTimes,
          startTime
        },
        stops: stops,
        paceAdjust: paceAdjust
      }

      console.log(tempCourse)
    function saveCourse() {
        setSaved(false);

        //is this the right way??? seems funky
        saveCourseMutation(token, courseId, tempCourse).then(() => {setSaved(true)})
    }

    //data, loading, error values not changing.... wtf
    const [saveCourseMutation, {data, loading, error}] = useMutation(SAVE_QUERY, {
        variables: { token, courseId, tempCourse }
    });

    return (
        <Button variant="outlined" className="five-px-margin-right" onClick={saveCourse}>Save</Button>
    )
}

export default SaveCourse;