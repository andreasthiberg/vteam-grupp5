import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function ChargingStationList({stationData, setSelectedStation, selectedStation}) {

function handleStationChange(station){
    setSelectedStation(station.id)
} 

return (
    <div>
        {stationData.map((station) => (
            <div className={`single-station-div ${station.id === selectedStation ? "selected-station-div" : ""}`} 
            key={station.id} onClick={() => handleStationChange(station)}
            id={`station-div-${station.id}`}>
                <p>Station {station.id}</p>
            </div>
        ))}
    </div>
  );
}

