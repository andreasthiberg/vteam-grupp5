import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function SelectedStationDisplay({stationData, selectedStation}) {


return (
    <div className="selected-station-display">
        <h2>Laddstation {selectedStation}</h2>
    </div>
  );
}

