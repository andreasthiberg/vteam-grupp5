import React from 'react';
import { render } from '@testing-library/react';
import SelectedScooterDisplay from '../components/SelectedScooterDisplay';


it('renders selected scooter id', () => {
  const {queryByText} = render(<SelectedScooterDisplay selectedTrip={{id:1}} selectedScooter={{id:5}} scootersInfo={[{id:10,battery:20}]}/>)
  expect(queryByText("Cykel 5")).toBeTruthy();
});

it('renders matching trip id', () => {
  const {queryByText} = render(<SelectedScooterDisplay selectedTrip={{id:1,customer_id:30}} selectedScooter={{id:5}} scootersInfo={[{id:10,battery:20}]}/>)
  expect(queryByText("Hyrs av: Kund 30")).toBeTruthy();
});