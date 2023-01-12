import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Customers from '../pages/Customers';
import Map from '../pages/Map';
import Home from '../pages/Home';

it('renders page title', () => {
  render(<App />);
  expect(screen.getByText('High5 Elsparkcyklar Administration')).toBeInTheDocument();
});

it('renders customer page', () => {
  render(<Customers />);
  expect(screen.getByText('Kundlista')).toBeInTheDocument();
});

it('renders map page', () => {
  render(<Map />);
  expect(screen.getByText('Stockholm')).toBeInTheDocument();
});

it('renders home page', () => {
  render(<Home />);
  expect(screen.getByText('Välkommen!')).toBeInTheDocument();
});