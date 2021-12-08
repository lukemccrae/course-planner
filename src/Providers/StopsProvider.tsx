import React, { useContext, createContext, useState } from 'react';

type StopProviderProps = {
  children: React.ReactNode
}

type Stop = {
  miles: number,
  name: string,
  comments: string,
  cals: number,
  id: string
}

type Stops = {
  stops: Stop[]
}

interface StopsInterface {
  stopsInfo: Stops
}

const stopsContext: StopsInterface = {
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

export const StopsContext = createContext<StopsInterface>(stopsContext);
export const useStopsContext = () => useContext(StopsContext);

export const StopsProvider = ({ children }: StopProviderProps) => {
    const [stops, setStops] = useState<Stops>();

    function setStopsInfo(arr: any) {
        setStops(arr)
    }

  function addStop() {
    let updatedStops: Stops = Object.assign([], stops);
    
    let newStop: Stop = {
      name: "New Stop",
      cals: 200,
      miles: 0,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

    
    updatedStops.push(newStop);
    updatedStops.sort((a: Stop, b: Stop) => a.miles - b.miles)
    setStops([...updatedStops])
  }

  function delStop(index: number) {
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
