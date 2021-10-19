import React, { useContext, createContext, useState, useEffect } from 'react';

export const RouteContext = createContext(null);
export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {

    const [coordinates, setCoordinates] = useState([]);
    const [vertInfo, setVertInfo] = useState({cumulativeGain: [], cumulativeLoss: []});

    function loadRouteInfo(c) {
        console.log(c)
        // setCoordinates()
        // setVertInfo()
    }

  return (
    <RouteContext.Provider
      value={
        {
            coordinates, 
            setCoordinates,
            vertInfo,
            setVertInfo,
            loadRouteInfo
        }
      }>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;