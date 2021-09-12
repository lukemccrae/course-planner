// import {getFromStorage} from '../utils/storage';

// //enable group to be editable
// export const editCourse = (courseRef) => {
//     const obj = getFromStorage('course_planner');
//     fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${obj.token}&id=${courseRef.id}`, {
//     // fetch(`http://localhost:3005/course?token=${obj.token}&id=${courseRef.id}`, {
//         method: 'GET',
//         headers: {
//         'Content-Type': 'application/json',
//         'origin': 'https://course-planner.firebaseapp.com/'
//         },
//     }).then(res => res.json()).then(json => {
//         if (json.success) {
//         // setCourseId(json.course[0]._id)
//         // loadCourse(json.course[0]);
//         } else {
//         console.log("Error: didnt get a course.")
//         }
//     });
// }

// export const deleteCourse = () => {
//     const token = JSON.parse(localStorage.course_planner).token;

//       fetch(`https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseId}`, {
//         // fetch(`http://localhost:3005/course?token=${token}&courseId=${courseId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => res.json()).then(json => {
//       if (json.success) {
//         setCourseList(json.courseList)
//         setDeleteModalIsOpen(false);
//         editCourse(json.courseList[0])
//       } else {
//         console.log("error: ", json)
//       }
//     });
//   }

// export const saveCourse = () => {
//     setSaved(false)
//     let tempCourse = {
//       details: {
//         name,
//         calories,
//         goalHours,
//         goalMinutes,
//         calories,
//         name,
//         vertMod,
//         terrainMod,
//         mileTimes,
//       },
//       stops: stops,
//       paceAdjust: paceAdjust
//     }
//     const token = JSON.parse(localStorage.course_planner).token;
//     // if(props.course.route.geoJSON.properties.name === "no route stored") {
//     //   saveNewRoute();
//     // }
//       fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course?token=${token}&courseId=${courseId}`, {
//         // fetch(`http://localhost:3005/course?token=${token}&courseId=${courseId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'origin': 'https://corsa.run'
//         },
//         body: JSON.stringify({
//           details: tempCourse.details,
//           stops: tempCourse.stops,
//           paceAdjust: tempCourse.paceAdjust
//         })
//       }).then(res => res.json()).then(json => {
//         if (json.success) {
//           setSaved(true)
//           setCourseList(json.courseList)
//         } else {
//           console.log("Error: adding this course failed.")
//         }
//       });
//   }