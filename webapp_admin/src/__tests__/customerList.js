import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerList from '../components/CustomerList';


it('renders customer', () => {
  render(<CustomerList customersInfo={[{first_name:"Andreas",id:5}]}/>)
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('Andreas')).toBeInTheDocument();
});

it('renders titles', () => {
  render(<CustomerList customersInfo={[{first_name:"Andreas",id:5}]}/>)
  expect(screen.getByText("Id")).toBeInTheDocument();
  expect(screen.getByText("Namn")).toBeInTheDocument();
});

it('renders activate button', () => {
  render(<CustomerList customersInfo={[{first_name:"Andreas",id:5,status:0}]}/>)
  expect(screen.getByText("Aktivera")).toBeInTheDocument();
});

it('renders deactivate button', () => {
  render(<CustomerList customersInfo={[{first_name:"Andreas",id:5,status:1}]}/>)
  expect(screen.getByText("Avaktivera")).toBeInTheDocument();
});

it('renders info button', () => {
  render(<CustomerList customersInfo={[{first_name:"Andreas",id:5,status:1}]}/>)
  expect(screen.getByText("Se information")).toBeInTheDocument();
});
