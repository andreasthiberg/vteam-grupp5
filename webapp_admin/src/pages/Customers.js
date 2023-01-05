import { useState, useEffect } from 'react';
import customerModel from '../models/customers';



export default function Customers() {
    const [customersInfo, setCustomersInfo] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await customerModel.getAllCustomers();
  
        setCustomersInfo(response.customers);
  
        })();
    }, []);

    return (
    <div>
        <h1>Customer List Page</h1>
        <div className = "row">
        <button className="btn btn-primary"> Add Customer</button>
        </div>
        <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Id</th>
                            <th> Customer name</th>
                            <th> Customer mail</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customersInfo.map(
                                customer => 
                                <tr key = {customer.id}>
                                        <td> {customer.id} </td>
                                        <td> {customer.last_name} {customer.first_name}</td>
                                        <td> {customer.email}</td>
                                        <td>
                                            <button className="btn btn-info">Update </button>
                                            <button className="btn btn-danger">Delete </button>
                                            <button className="btn btn-info">View </button>
                                        </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    </div>
    );


}

