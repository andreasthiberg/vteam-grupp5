import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Marker, TileLayer, MapContainer, Popup } from "react-leaflet";
import * as L from "leaflet";
import marker from '../assets/scooter.ico';
import "../App.css";
import scooterModel from '../models/scooters';

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [32,45],     
});

export default function MapSto() {
  const [scootersInfo, setScootersInfo] = useState([]);

  //Load scooter info on load
  useEffect(() => {
    updateScooters()
  }, []);

  async function updateScooters(){
    const response = await scooterModel.getAllScooters();
    setScootersInfo(response.scooters);
  }

  // Interval to update scooter markers every x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateScooters();
    }, 2000);
  
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <h2>Stockholm</h2>
      <div className="map-page-div">
      <div className="map-div">
      <MapContainer center={[59.33, 18.055]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {scootersInfo.map((scooter) => (
        <Marker
          key={scooter.id}
          position={scooter.pos}
          icon={myIcon}
          onClick={() => {
            setScootersInfo(scooter);
          }}>
          <Popup>
            Scooter {scooter.id}<br></br>
            Position {scooter.pos}
          </Popup>
        </Marker>
      ))}

      </MapContainer>
      </div>
      </div>

    </div>

  );
}
