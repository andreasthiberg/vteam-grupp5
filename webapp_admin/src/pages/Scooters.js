import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";
import MapLun from "../components/MapLun";
import MapSto from "../components/MapSto";
import MapMal from "../components/MapMal";


function Scooters () {


  return (
    <div>
      <p>Här skall valen göras för de olika städer</p>
      <h2>Stockholm</h2>
      <MapSto />
    </div>
  )
}

export default { Scooters };
