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
    name: "mock",
    goalHours: 2,
    goalMinutes: 30,
    calories: 225, 
    terrainMod: 1.2,
    startTime: "06:00"
  }
}

interface CourseInfoInterface {
  name: string;
  goalHours: number;
  goalMinutes: number;
  calories: number;
  terrainMod: number;
  startTime: string;
  setName: any;
  setGoalHours: any;
  setGoalMinutes: any;
  setStartTime: any;
  setCalories: any;
  setTerrainMod: any;
  setCourseInfo: any;
  resetCourseInfo: any;
}


type CourseInfoProviderProps = {
  children: React.ReactNode
}

const courseInfoContext: CourseInfoInterface = {
  name: "New Course",
  goalHours: 2,
  goalMinutes: 30,
  calories: 225, 
  terrainMod: 1.2,
  startTime: "06:00",
  setName: () => {},
  setGoalHours: () => {},
  setGoalMinutes: () => {},
  setStartTime: () => {},
  setCalories: () => {},
  setTerrainMod: () => {},
  setCourseInfo: () => {},
  resetCourseInfo: () => {}
}

export const CourseInfoContext = createContext<CourseInfoInterface>(courseInfoContext);
export const useCourseInfoContext = () => useContext(CourseInfoContext);

export const CourseInfoProvider = ({ children }: CourseInfoProviderProps) => {

  const [name, setName] = useState<string>("new course");
  const [goalHours, setGoalHours] = useState<number>(2);
  const [goalMinutes, setGoalMinutes] = useState<number>(2);
  const [startTime, setStartTime] = useState<string>("06:00");
  const [calories, setCalories] = useState<number>(200);
  const [terrainMod, setTerrainMod] = useState<number>(1.2);

  function resetCourseInfo() {
    setName("new course")
    setGoalHours(2)
    setGoalMinutes(30)
    setCalories(225)
    setTerrainMod(1.2)
    setStartTime("06:00")
  }
  
  function setCourseInfo(name: string, goalHours: number, goalMinutes: number, startTime: string, calories: number, terrainMod: number) {
    // const {name, goalHours, goalMinutes, calories, terrainMod, startTime} = courseDetails;
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