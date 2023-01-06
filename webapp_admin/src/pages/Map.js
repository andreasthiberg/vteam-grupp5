import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Marker, TileLayer, MapContainer, Popup, Rectangle, Circle} from "react-leaflet";
import "../App.css";
import scooterModel from '../models/scooters';
import mapModel from '../models/map';
import scooterIcons from '../assets/scooterIcons';
import chargingStationIcon from '../assets/chargingStationIcon';

export default function Map() {
  const [parkingZones, setParkingZones] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);
  const [scootersInfo, setScootersInfo] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState();

  //Load scooter info on load
  useEffect(() => {
    updateScooters()
    getZones()
  }, []);

  //Loads parking zones and charging stations from backend
  async function getZones(){
    const response1 = await mapModel.getAllParkingZones();
    setParkingZones(response1.parkingZones)
    const response2 = await mapModel.getAllChargingStations();
    setChargingStations(response2.chargingStations)
  }
  
  //Loads scooter info from backend
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
          icon={scooterIcons[scooter.status]}
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
      
      
      {parkingZones.map((zone) => (
        <Rectangle key={zone.id} bounds={JSON.parse(zone.pos)} pathOptions={{color:"green"}}></Rectangle>
      ))}

      {chargingStations.map((zone) => (
                    <Marker
                    key={zone.id}
                    position={JSON.parse(zone.pos)}
                    icon={chargingStationIcon}
                    eventHandlers={{
                      click: (e) => {
                        
                      },
                    }}>
                    <Popup className="charging-popup">
                      10
                    </Popup>
                  </Marker>
      ))}

      </MapContainer>
      </div>
      <div className="map-info-box">Vald scooter: {selectedScooter}<br/>
      <ul>
        <li>0 - Stopped by Admin</li>
        <li style={{color:"blue"}}> 1 - Currently used </li>
        <li style={{color:"green"}}>2 - Parked outside zones</li>
        <li style={{color:"green"}}>3 - Parked in parking zone</li>
        <li style={{color:"orange"}}>4 - Charging (not available)</li>
        <li style={{color:"red"}}>5 - Out of batteries (and not in charging zone)</li>
        <li>6 - Removed from map for maintenance</li>
      </ul></div>

      </div>
      </div>
    </div>

  );
}
