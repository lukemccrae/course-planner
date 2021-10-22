import React, { useContext, createContext, useState } from 'react';

const INITIAL_STATE = {
  milePoints: [],
  vertMod: 300,
  paceAdjust: [],
  mileTimes: []
}

const mockMileTimesInfo = {
  route: {
    geoJSON: {
      geometry: {
        milePoints: []
      }
    }
  },
  details: {
    vertMod: 300
  }
}

export const MileTimesContext = createContext(null);
  export const useMileTimesContext = () => useContext(MileTimesContext);

  export const MileTimesProvider = ({ children }) => {

  const [milePoints, setMilePoints] = useState(INITIAL_STATE.milePoints);
  const [vertMod, setVertMod] = useState(INITIAL_STATE.vertMod);
  const [paceAdjust, setPaceAdjust] = useState(INITIAL_STATE.paceAdjust);
  const [mileTimes, setMileTimes] = useState(INITIAL_STATE.mileTimes);

  function setMileTimesInfo(mileTimesInfo = mockMileTimesInfo) {
    console.log(mileTimesInfo)
    setMilePoints(mileTimesInfo.route.geoJSON.geometry.milePoints);
    setVertMod(mileTimesInfo.details.vertMod);
    setPaceAdjust(mileTimesInfo.paceAdjust);
  }

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
            setMileTimes,
            setMileTimesInfo
        }
      }>
      {children}
    </MileTimesContext.Provider>
  );
};

export default MileTimesProvider;