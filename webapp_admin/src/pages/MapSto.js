import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Marker, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";
import scooterModel from '../models/scooters';

export default function MapSto() {
  const [scootersInfo, setScootersInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await scooterModel.getAllScooters();

      setScootersInfo(response.scooters);

    })();
  }, []);
  
  return (
    <div>
      <h2>Stockholm</h2>
      <MapContainer center={[59.33, 18.055]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {scootersInfo.map((scooter) => (
        <Marker
          key={scooter.id}
          position={scooter.pos}
          onClick={() => {
            setScootersInfo(scooter);
          }}
        />
      ))}

      </MapContainer>

    </div>

  );
}
