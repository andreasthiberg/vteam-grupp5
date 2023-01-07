import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function SelectedScooterDisplay({scooterData, selectedScooterId}) {

  const dummyData = {
    status: 0,
    battery: 100,
    pos: [1,2],
    id: 0
  }

  const [currentScooterInfo,setCurrentScooterInfo] = useState(dummyData);

  useEffect(() => {
    var result = scooterData.filter(scooter => {
    return scooter.id === selectedScooterId
    })
    if(result.length > 0){
      setCurrentScooterInfo(result[0]); 
      console.log(result)
    }
  },[selectedScooterId])

return (
    <div className="selected-display">
        <h2>Cykel {selectedScooterId}</h2>
        <p>Status: {currentScooterInfo.status}</p>
        <p>Position:</p>
        <p>{currentScooterInfo.pos[0]}</p>
        <p>{currentScooterInfo.pos[1]}</p>
        <p>Batteri: {currentScooterInfo.battery}%</p>
        <p>Hyrs av</p>
        <p>Hastighet?</p>
        <button>Stoppa cykel</button>
        <button>Flytta till laddstation</button>
        <button>Flytta till parkering</button>
    </div>
  );
}

