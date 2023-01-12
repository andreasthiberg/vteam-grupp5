import React from 'react';
import { render, screen } from '@testing-library/react';
import ScooterList from '../components/ScooterList';


it('renders scooter id', () => {
  const {queryByText} = render(<ScooterList scooterData={[{id:5}]} selectedScooter={{id:5}}/>)
  expect(queryByText("Cykel 5")).toBeTruthy();
});

