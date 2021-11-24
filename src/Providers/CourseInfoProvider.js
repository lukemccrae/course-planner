import React, { useContext, createContext, useState } from 'react';

const INITIAL_STATE = {
  name: "New Course",
  goalHours: 2,
  goalMinutes: 30,
  calories: 225, 
  terrainMod: 1.2,
  startTime: "06:00"
}

export const mockCourseInfo = {
  courseInfo: {
    name: "",
    goalHours: 2,
    goalMinutes: 30,
    calories: 225, 
    terrainMod: 1.2,
    startTime: ""
  }
}

export const CourseInfoContext = createContext(null);
export const useCourseInfoContext = () => useContext(CourseInfoContext);

export const CourseInfoProvider = ({ children }) => {

  const [name, setName] = useState(INITIAL_STATE.name);
  const [goalHours, setGoalHours] = useState(INITIAL_STATE.goalHours);
  const [goalMinutes, setGoalMinutes] = useState(INITIAL_STATE.goalMinutes);
  const [startTime, setStartTime] = useState(INITIAL_STATE.startTime);
  const [calories, setCalories] = useState(INITIAL_STATE.calories);
  const [terrainMod, setTerrainMod] = useState(INITIAL_STATE.terrainMod);

  function resetCourseInfo() {
    setName(INITIAL_STATE.name)
    setGoalHours(INITIAL_STATE.goalHours)
    setGoalMinutes(INITIAL_STATE.goalMinutes)
    setCalories(INITIAL_STATE.calories)
    setTerrainMod(INITIAL_STATE.terrainMod)
    setStartTime(INITIAL_STATE.startTime)
  }
  
  function setCourseInfo(courseDetails = {}) {
    const {name, goalHours, goalMinutes, calories, terrainMod, startTime} = courseDetails;
    setName(name)
    setGoalHours(goalHours)
    setGoalMinutes(goalMinutes)
    setCalories(calories)
    setTerrainMod(terrainMod)
    setStartTime(startTime)
  }

  return (
    <CourseInfoContext.Provider
      value={
        {
            name,
            setName,
            goalHours,
            setGoalHours,
            goalMinutes,
            setGoalMinutes,
            startTime, 
            setStartTime,
            calories,
            setCalories,
            terrainMod,
            setTerrainMod,
            setCourseInfo,
            resetCourseInfo
        }
      }>
      {children}
    </CourseInfoContext.Provider>
  );
};

export default CourseInfoProvider;