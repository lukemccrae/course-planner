import React, { useContext, createContext, useState } from 'react';

type Coordinate = {
  coordinates: {
    lat: number;
    long: number;
    elev: number;
  }
}

type Coordinates = {
  coordinates: Coordinate[]
}

type VertInfo = {
  cumulativeGain: number[],
  cumulativeLoss: number[]
}

type Properties = {
  vertInfo: VertInfo
}

type RouteInfo = {
  geoJSON: GeoJSON,
  properties: Properties
}

type GeoJSON = {
  geometry: Geometry
}

type Geometry = {
  coordinates: Coordinates
}

interface RouteInterface {
  routeInfo: RouteInfo
}

export const routeContext: RouteInterface = {
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

const INITIAL_STATE = {
  coordinates: [],
  vertInfo: {cumulativeGain: [], cumulativeLoss: []}
}

export const mockRouteInfo = {

}

export const RouteContext = createContext<RouteInterface>(routeContext);
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