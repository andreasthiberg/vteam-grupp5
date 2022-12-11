import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";

export default function LeafletMap() {

  return (
    <div>
      <p>Ska ligga under scooters</p>
      <MapContainer center={[59.33, 18.055]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      </MapContainer>

    </div>

    // <div>
    //   Map
    // </div>

  );
}
