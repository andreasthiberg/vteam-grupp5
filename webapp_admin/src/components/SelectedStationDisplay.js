import { React } from 'react-router-dom';
import "../App.css";


export default function SelectedStationDisplay({selectedStation}) {

return (
    <div className="selected-display">
        <h2>Station {selectedStation.id}</h2>
        <p>Position:</p>
        <p>{selectedStation.pos[0]}</p>
        <p>{selectedStation.pos[1]}</p>
    </div>
  );
}

