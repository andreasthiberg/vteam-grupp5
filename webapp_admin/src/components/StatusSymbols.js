import { React } from 'react-router-dom';
import "../App.css";

export default function StatusSymbols(){

return (
    <div>
        <ul>
            <li> <span className="scooter-status-0">&#9632;</span> - Stoppad av admin</li>
            <li> <span className="scooter-status-1">&#9632;</span> - Används</li>
            <li> <span className="scooter-status-2">&#9632;</span> - Tillgänglig utanför P-zon</li>
            <li> <span className="scooter-status-3">&#9632;</span> - Tillgänglig i P-zon</li>
            <li> <span className="scooter-status-4">&#9632;</span> - Laddar (inte tillgänglig)</li>
            <li> <span className="scooter-status-5">&#9632;</span> - Slut på batterier</li>
            <li> <span className="scooter-status-6">&#9632;</span> - Borttagen för service</li>
        </ul>
    </div>
  );
}

