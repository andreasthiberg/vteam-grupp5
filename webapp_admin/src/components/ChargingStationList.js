import { React } from 'react-router-dom';
import "../App.css";

export default function ChargingStationList({stationData, setSelectedStation, selectedStation}) {

function handleStationChange(station){
    setSelectedStation(station)
} 

return (
    <div>
        {stationData.map((station) => (
            <div className={`single-station-div ${station.id === selectedStation.id ? "selected-scooter-div" : ""}`} 
            key={station.id} onClick={() => handleStationChange(station)}
            id={`station-div-${station.id}`}>
                <p>Laddstation {station.id}</p>
            </div>
        ))}
    </div>
  );
}

