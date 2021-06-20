import React, {useState, useEffect} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'



function MapWindow(props) {
    console.log(props)

    return (
        <Map center={{lat:props.route[0][0], lng: props.route[0][1]}} zoom={13} scrollWheelZoom={false}>
        {/* <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{lat:props.route[0][0], lng: props.route[0][1]}}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </Map>
    )
}

export default MapWindow;
