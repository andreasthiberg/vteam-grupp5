import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";

export default function MapLun() {

  return (
    <div>
      <h2>Lund</h2>
      <MapContainer center={[55.70, 13.19]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      </MapContainer>

    </div>

  );
}
