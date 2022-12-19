<<<<<<< HEAD
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
=======
import { React } from 'react-router-dom';
function Scooters() {
  return (
    <div>
      <p>Hej, här skulle egentligen valet för varje stad ligga, men nu belv det inte så. Går utmärkt att ändra om man har en lösning på det.</p>
    </div>

  );
}

export default Scooters;
>>>>>>> main
