import { useState, useEffect } from 'react';
//import fetchGraphQL from './fetchGraphQL';
import customerModel from '../models/customers';


export default function Customers() {
  const [customers, setCustomers] = useState(["default"]);

  useEffect(() => {
    customerModel.getAllCustomers()
    .then(response=> {
      setCustomers(response);
    })();
  }, []);

  console.log(customers);

  const customerList = customers.map(async (item) => <p>{item}</p>);

  return (
    <div>
      <h1>History Page</h1>
      <h2>List of customers</h2>
      {customerList}
    </div>
  );
}

