import React, { useContext, createContext, useState } from 'react';

export const CourseInfoContext = createContext(null);
export const useCourseInfoContext = () => useContext(CourseInfoContext);

export const CourseInfoProvider = ({ children }) => {

const [name, setName] = useState("New Course");
const [goalHours, setGoalHours] = useState(2);
const [goalMinutes, setGoalMinutes] = useState(30);
const [startTime, setStartTime] = useState("06:00");
const [calories, setCalories] = useState(225);
const [terrainMod, setTerrainMod] = useState(1.2);

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
            setTerrainMod
        }
      }>
      {children}
    </CourseInfoContext.Provider>
  );
};

export default CourseInfoProvider;