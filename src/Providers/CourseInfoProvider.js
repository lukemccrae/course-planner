import React, { useContext, createContext, useState, useEffect } from 'react';

export const CourseInfoContext = createContext(null);
export const useCourseInfoContext = () => useContext(CourseInfoContext);

export const CourseInfoProvider = ({ children }) => {

  const [name, setName] = useState("New Coursee");
  const [goalHours, setGoalHours] = useState(2);
  const [goalMinutes, setGoalMinutes] = useState(30);
  const [startTime, setStartTime] = useState("06:00");
  const [calories, setCalories] = useState(225);
  const [terrainMod, setTerrainMod] = useState(1.2);

  // useEffect(() => {
  //   loadCourseInfo();
  // }, [name, goalHours, goalMinutes, goalHours])

  function loadCourseInfo(c) {
  //   console.log(c)
  //   setName(c.details.name)
  //   setGoalHours(c.details.goalHours)
  //   setGoalMinutes(c.details.goalMinutes)
  //   setCalories(c.details.calories)
  //   setTerrainMod(c.details.terrainMod)
  //   setStartTime(c.details.startTime)
  //   console.log(name)
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
            loadCourseInfo
        }
      }>
      {children}
    </CourseInfoContext.Provider>
  );
};

export default CourseInfoProvider;