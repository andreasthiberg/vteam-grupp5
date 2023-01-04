import { useState, useEffect } from 'react';
import customerModel from '../models/customers';
import CustomerCard from '../components/CustomerCard';


export default function Customers() {
    const [customersInfo, setCustomersInfo] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await customerModel.getAllCustomers();
  
        setCustomersInfo(response.customers);
  
        })();
    }, []);
  
    // let list = customersInfo.map((name, index) => <li key={index}>{name.first_name}{name.last_name}</li>);
    let customerlist = customersInfo.map((customer, index) => {
        return <CustomerCard
                    customer={customer}
                    key={index}
                />;
    });

    return (
    <div>
        <h1>Customer List Page</h1>
        <div className='list'>{customerlist}</div>
    </div>
    );
}

