import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function ScooterList({scooterData, setSelectedScooter, selectedScooter}) {

function handleScooterChange(scooter){
    setSelectedScooter(scooter)
} 

return (
    <div>
        {scooterData.map((scooter) => (
            <div className={`single-scooter-div ${scooter.id === selectedScooter.id ? "selected-scooter-div" : ""}`} 
            key={scooter.id} onClick={() => handleScooterChange(scooter)}
            id={`scooter-div-${scooter.id}`}>
                <p>Cykel {scooter.id}</p>
            </div>
        ))}
    </div>
  );
}

