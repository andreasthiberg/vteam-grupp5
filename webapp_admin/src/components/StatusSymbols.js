import { React } from 'react-router-dom';
import "../App.css";

export default function StatusSymbols(){

return (
    <div>
        <ul>
            <li className="scooter-status-0">&#9632; - Stoppad av admin</li>
            <li className="scooter-status-1">&#9632; - Används</li>
            <li className="scooter-status-2">&#9632; - Tillgänglig utanför P-zon</li>
            <li className="scooter-status-3">&#9632; - Tillgänglig i P-zon</li>
            <li className="scooter-status-4">&#9632; - Laddar (inte tillgänglig)</li>
            <li className="scooter-status-5">&#9632; - Slut på batterier</li>
            <li className="scooter-status-6">&#9632; - Borttagen för service</li>
        </ul>
    </div>
  );
}

