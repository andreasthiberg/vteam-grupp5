import React from 'react';
import { render } from '@testing-library/react';
import SelectedStationDisplay from '../components/SelectedStationDisplay';


it('renders IDs and batteries for present scooters', () => {
  const {queryByText} = render(<SelectedStationDisplay selectedStation={{id:20,pos:[20,10]}} scootersInfo={[{station:20,id:30,battery:100}]}/>)
  expect(queryByText("1 Cyklar")).toBeTruthy();
  expect(queryByText("100% batteri.")).toBeTruthy();
});

it('renders station ID', () => {
  const {queryByText} = render(<SelectedStationDisplay selectedStation={{id:20,pos:[20,10]}} scootersInfo={[{station:20,id:30}]}/>)
  expect(queryByText("Station 20")).toBeTruthy();
});
