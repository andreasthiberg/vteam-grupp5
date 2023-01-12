import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerInfo from '../components/CustomerInfo';


it('renders customer info', () => {
  render(<CustomerInfo selectedCustomer={{email:"Andreas",id:5,balance:100}} tripsInfo={[{id:5}]}/>)
  expect(screen.getByText(/Andreas/)).toBeInTheDocument();
  expect(screen.getByText(/100/)).toBeInTheDocument();
});

it('renders correct trip info', () => {
  const { queryByText } =  render(<CustomerInfo selectedCustomer={{email:"Andreas",id:5,balance:100}} tripsInfo={[{customer_id:5,id:10,price:200}]}/>)
  expect(screen.getByText(/200/)).toBeInTheDocument();
  expect(queryByText("Pris: 200")).toBeTruthy();
});

it('doesnt render incorrect trip info', () => {
  const { queryByText } = render(<CustomerInfo selectedCustomer={{email:"Andreas",id:5,balance:100}} tripsInfo={[{customer_id:10,id:10,price:200}]}/>)
  expect(queryByText("Pris: 200")).toBeNull();
});

