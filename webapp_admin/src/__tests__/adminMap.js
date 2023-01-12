import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminMap from '../components/AdminMap';
const dummyMap = <AdminMap mapCenter={[10,10]} scootersInfo={[]} selectedScooter={{id:10,battery:20,pos:[5,5]}} 
selectedStation={{id:5,pos:[1,1]}} chargingStations={[]} parkingZones={[]}/>


it('renders map id', () => {
  render(dummyMap)
  expect(screen.getByTestId('leaflet-container-div')).toBeTruthy();
});
