import { useState, useEffect } from 'react';
//import fetchGraphQL from './fetchGraphQL';
import customerModel from '../models/customers';


function Customers() {
  const [customers, setCustomers] = useState(["Default"]);

  useEffect(() => {
    customerModel.getAllCustomers()
    .then(response=> {
      setCustomers(response)
    })
  })

  console.log(customers);

  return (
    <div>
      <h1>History Page</h1>
      <h2>List of customers</h2>
      {customers}
    </div>
  );
}

export default Customers;
