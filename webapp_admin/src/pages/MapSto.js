import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Marker, TileLayer, MapContainer, Popup } from "react-leaflet";
import * as L from "leaflet";
import marker from '../assets/scooter.png';
import "../App.css";
import scooterModel from '../models/scooters';

//Custom scooter icon
const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [30,30],     
});

export default function MapSto() {
  const [scootersInfo, setScootersInfo] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState();

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
      <div className="map-display-div">
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
          eventHandlers={{
            click: (e) => {
              setSelectedScooter(scooter.id)
            },
          }}>
          <Popup>
            Scooter-ID: {scooter.id}<br></br>
            Position: {scooter.pos[0]}, {scooter.pos[1]}<br></br>
            Battery: {scooter.battery}%
          </Popup>
        </Marker>
      ))}

      </MapContainer>
      </div>
      <div className="map-info-box">Vald scooter: {selectedScooter}</div>
      </div>
      </div>
    </div>

  );
}
