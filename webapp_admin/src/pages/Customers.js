import { useState, useEffect } from 'react';
import customerModel from '../models/customers';
import scooterModel from '../models/scooters'
import CustomerList from '../components/CustomerList';
import CustomerInfo from '../components/CustomerInfo';

export default function Customers() {
    const [customersInfo, setCustomersInfo] = useState([]);
    const [tripsInfo, setTripsInfo] = useState([]);
    const [selectedCustomer,setSelectedCustomer] = useState({id:0,first_name:"Test",last_name:"Testson",balance:100,status:1,email:"123@email.com"})
  
    useEffect(() => {
      reloadCustomers()
        reloadTrips()
    }, []);

    async function reloadCustomers() {
        const response = await customerModel.getAllCustomers();
        setCustomersInfo(response.customers);
    }

    async function reloadTrips() {
        const response = await scooterModel.getAllTrips();
        setTripsInfo(response.trips);
    }


    return (
    <div>

        <div className = "row">
        </div>
        <br></br>
        {selectedCustomer.id !== 0 ?
        <>
        <h1>Kundsida</h1>
        <CustomerInfo tripsInfo={tripsInfo} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}/>
        </>
        :
        <>
        <h1>Kundlista</h1>
        <CustomerList customersInfo={customersInfo} reloadCustomers={reloadCustomers} setSelectedCustomer={setSelectedCustomer}/>
        </>
        }
    </div>
    );


}

