<<<<<<< HEAD
import * as React from 'react';
import { Navigate } from 'react-router-dom';

export default function CityList() {

    return (
      <div>
        <h2>Please select your city</h2>
        <Button title="Stockholm" onClick={Navigate('Stockholm')} />
        <Button title="Malmö" onClick={Navigate('Malmo')} />
        <Button title="Lund" onClick={Navigate('Lund')} />  
      </div>
  
    );
  }
=======
import { Link } from "react-router-dom";

const CityList = () => {
    return (
        <>
            <h1>High5 scooters admin</h1>
            <ul className="nav">
                <li>
                    <Link to='/stockholm'>Stockholm</Link>
                </li>
                <li>
                    <Link to='/malmo'>Malmö</Link>
                </li>
                <li>
                    <Link to='/lund'>Lund</Link>
                </li>
            </ul>
        </>
    );
}

export default CityList;
>>>>>>> main
