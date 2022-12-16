import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";

export default function MapMal() {

  return (
    <div>
      <h2>Malmö</h2>
      <MapContainer center={[55.605, 13.0038]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      </MapContainer>

    </div>

  );
}
