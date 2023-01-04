import { useState, useEffect } from 'react';
//import fetchGraphQL from './fetchGraphQL';
import customerModel from '../models/customers';


export default function Customers() {
  const [customersInfo, setCustomersInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await customerModel.getAllCustomers();

      setCustomersInfo(response.customers);

    })();
  }, []);

    let list = customersInfo.map((name, index) => <li key={index}>{name.first_name}</li>);

    return (
      <div>
        <h1>History Page</h1>
        <h2>Travel history</h2>
        {list}
      </div>
    );
}
