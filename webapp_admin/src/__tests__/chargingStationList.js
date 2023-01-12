import React from 'react';
import { render, screen } from '@testing-library/react';
import ChargingStationList from '../components/ChargingStationList';


it('renders station id', () => {
  const {queryByText} = render(<ChargingStationList scooterData={[{id:20}]}selectedStation={{id:5}} stationData={[{id:5,pos:[0,0]}]}/>)
  expect(queryByText("Laddstation 5")).toBeTruthy();
});

it('renders number of scooters at station', () => {
  const {queryByText} = render(<ChargingStationList scooterData={[{id:20,station:5}]} selectedStation={{id:5}} stationData={[{id:5,pos:[0,0]}]}/>)
  expect(queryByText("1st")).toBeTruthy();
});


