import React, {useContext, useState} from 'react';

const CourseInfoContext = React.createContext();

export function useCourseInfoContextState() {
    const {state} = useContext(CourseInfoContext);
    return {...state}
}

export function useCourseInfoContextActions() {
    const {actions} = useContext(CourseInfoContext);
    return {...actions}
}

export function CourseInfoProvider({children}) {
    const [name, setName] = useState("New Course");
    const [calories, setCalories] = useState(225);
    const [vertMod, setVertMod] = useState(400);
    const [terrainMod, setTerrainMod] = useState(1.2);

    const state = {
        name,
        calories,
        vertMod,
        terrainMod
    }

    const actions = {
        setName,
        setCalories,
        setVertMod,
        setTerrainMod
    }

    return (
        <CourseInfoContext.Provider value={{state, actions}}>
            {children}
        </CourseInfoContext.Provider>
    )
}