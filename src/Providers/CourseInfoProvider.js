import React, { useContext, createContext, useState, useEffect } from 'react';

const INITIAL_STATE = {
  name: "",
  goalHours: 2,
  goalMinutes: 30,
  calories: 225, 
  terrainMod: 1.2,
  startTime: ""
}

export const CourseInfoContext = createContext(null);
export const useCourseInfoContext = () => useContext(CourseInfoContext);

export const CourseInfoProvider = ({ children }) => {

  const [name, setName] = useState("New Coursee");
  const [goalHours, setGoalHours] = useState(2);
  const [goalMinutes, setGoalMinutes] = useState(30);
  const [startTime, setStartTime] = useState("06:00");
  const [calories, setCalories] = useState(225);
  const [terrainMod, setTerrainMod] = useState(1.2);

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

  //passthrough function to pass into view component
  //nice pattern to have so that setters can be defined conditionally
  function updateGoalHours(p) {
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