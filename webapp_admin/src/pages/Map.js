import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Marker, TileLayer, MapContainer, Popup, Rectangle, useMap} from "react-leaflet";
import "../App.css";
import scooterModel from '../models/scooters';
import mapModel from '../models/map';
import scooterIcons from '../assets/scooterIcons';
import chargingStationIcon from '../assets/chargingStationIcon';

function MapCenterChanger({mapCenter,selectedCity}) {
  const [panSelectedCity, setPanSelectedCity] = useState("Stockholm");
  const map = useMap()
  if(selectedCity != panSelectedCity){
    map.panTo(mapCenter)
    setPanSelectedCity(selectedCity)
  }
  return null
}

export default function Map() {
  //City changing
  const [selectedCity, setSelectedCity]  = useState("Stockholm");
  const [selectedScooter, setSelectedScooter] = useState();
  const [mapCenter, setMapCenter] = useState([59.33, 18.055]);

  //Map data
  const [parkingZones, setParkingZones] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);
  const [scootersInfo, setScootersInfo] = useState([]);

  //Load scooter info on load
  useEffect(() => {
    updateScooters()
    updateZones()
  }, []);

  //Loads parking zones and charging stations from backend
  async function updateZones(city = selectedCity){
    const response1 = await mapModel.getAllParkingZones();
    setParkingZones(response1.parkingZones.filter(zone => zone.city == city))
    const response2 = await mapModel.getAllChargingStations();
    setChargingStations(response2.chargingStations.filter(zone => zone.city == city))
  }
  
  //Loads scooter info from backend
  async function updateScooters(city = selectedCity){
    const response = await scooterModel.getAllScooters();
    setScootersInfo(response.scooters.filter(scooter => scooter.city == city));
  }

  // Interval to update scooter markers every x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateScooters();
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  // Function to change current city
  function handleCityChange(e){
    let cityCenterCoords = {
      "Stockholm": [59.33, 18.055],
      "Malmö": [55.5894, 13.0177],
      "Lund": [55.7066, 13.1940]
    }
    setSelectedCity(e.target.value);
    setMapCenter(cityCenterCoords[e.target.value])
    updateScooters(e.target.value);
    updateZones(e.target.value);
  }

  return (
    <div>
      <div className="map-page-div">
      <div className="map-content-div">
      <div className="city-select-div">
        {selectedCity}
        <button value="Stockholm" onClick={handleCityChange}>Stockholm</button>
        <button value="Malmö" onClick={handleCityChange}>Malmö</button>
        <button value="Lund" onClick={handleCityChange}>Lund</button>
      </div>
      <div className="map-display-div">
      <div className="map-div">
      <MapContainer center={mapCenter} zoom={14}>
      <MapCenterChanger mapCenter={mapCenter} selectedCity={selectedCity}/>
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
    <Rectangle key={zone.id} bounds={JSON.parse(zone.pos)} pathOptions={{color:"green",fillColor:"rgba(128, 177, 121, 1)"}}></Rectangle>
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
    </div>

  );
}

