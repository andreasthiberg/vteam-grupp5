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
