import React, { useContext, createContext, useState } from 'react';

const INITIAL_STATE = {
    stopsInfo: {
      stops: [{
        miles: 5, 
        comments: "", 
        name: "Aid station 1", 
        cals: 200,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }, 
      {
        miles: 10, 
        comments: "", 
        name: "Aid station 2", 
        cals: 400,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      }]
    }
}

export const mockStopsInfo = {
  stopsInfo: {
    stops: [{
      miles: 8, 
      comments: "", 
      name: "Aid station 1", 
      cals: 200,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    }, 
    {
      miles: 10, 
      comments: "", 
      name: "Aid station 2", 
      cals: 400,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
    }]
  }
}

export const StopsContext = createContext(null);
export const useStopsContext = () => useContext(StopsContext);

export const StopsProvider = ({ children }) => {
    const [stops, setStops] = useState(INITIAL_STATE.stopsInfo.stops);

    function setStopsInfo(arr) {
        setStops(arr)
    }


  function addStop() {
    let updatedStops = Object.assign([], stops);
    
    let newStop = {
      name: "New Stop",
      cals: 200,
      miles: 0,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

    
    updatedStops.push(newStop);
    updatedStops.sort((a, b) => a.miles - b.miles)
    setStops([...updatedStops])
  }

  function delStop(index) {
    let updatedStops = stops;
    updatedStops.splice(index, 1)
    setStops([...updatedStops])
  }

    return (
        <StopsContext.Provider
            value={
                {
                    stops,
                    setStops,
                    addStop,
                    delStop,
                    setStopsInfo,
                }
            }>
            {children}
        </StopsContext.Provider>
    );
};

export default StopsProvider;