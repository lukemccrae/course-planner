import React, { useContext, createContext, useState } from 'react';

const INITIAL_STATE = {
  coordinates: [],
  vertInfo: {cumulativeGain: [], cumulativeLoss: []}
}

export const mockRouteInfo = {
  routeInfo: {
    geoJSON: {
      geometry: {
        coordinates: []
      },
      properties: {
        vertInfo: {
          cumulativeGain: [],
          cumulativeLoss: []
        }
      }
    }
  }
}

export const RouteContext = createContext(null);
export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {

  const [coordinates, setCoordinates] = useState(INITIAL_STATE.coordinates);
  const [vertInfo, setVertInfo] = useState(INITIAL_STATE.vertInfo);

  function resetRouteInfo() {
    setCoordinates(INITIAL_STATE.coordinates)
    setVertInfo(INITIAL_STATE.vertInfo)
  }

  function setRouteInfo(data) {

    setVertInfo(data.routeInfo.geoJSON.properties.vertInfo)
    setCoordinates(data.routeInfo.geoJSON.geometry.coordinates)
  }

  return (
    <RouteContext.Provider
      value={
        {
            coordinates, 
            setCoordinates,
            vertInfo,
            setVertInfo,
            setRouteInfo,
            resetRouteInfo
        }
      }>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;