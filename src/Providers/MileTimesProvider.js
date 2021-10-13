import React, { useContext, createContext, useState } from 'react';

export const MileTimesContext = createContext(null);
export const useMileTimesContext = () => useContext(MileTimesContext);

export const MileTimesProvider = ({ children }) => {

const [milePoints, setMilePoints] = useState([]);
const [vertMod, setVertMod] = useState(400);
const [paceAdjust, setPaceAdjust] = useState([]);
const [mileTimes, setMileTimes] = useState([]);

  return (
    <MileTimesContext.Provider
      value={
        {
            milePoints, 
            setMilePoints,
            vertMod,
            setVertMod,
            paceAdjust, 
            setPaceAdjust,
            mileTimes,
            setMileTimes
        }
      }>
      {children}
    </MileTimesContext.Provider>
  );
};

export default MileTimesProvider;