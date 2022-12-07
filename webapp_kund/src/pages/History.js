import { useState, useEffect } from 'react';
//import fetchGraphQL from './fetchGraphQL';
import customerModel from '../models/customers';


export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await customerModel.getAllCustomers();
      setCustomers(response);
    })();
  }, []);

  console.log(customers);

 
  let customerList = customers.map(async (item) => <p>{item}</p>);
  

  return (
    <div>
      <h1>History Page</h1>
      <h2>List of customers</h2>
      {customerList}
    </div>
  );
}

