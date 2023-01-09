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
        <h1>Kundlista</h1>
        <div className = "row">
        <button className="btn btn-primary">Lägg till kund?</button>
        </div>
        <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Id</th>
                            <th> Namn</th>
                            <th> E-mail</th>
                            <th> Hantera</th>
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
                                            <button className="btn btn-info">Ändra</button>
                                            <button className="btn btn-danger">Avaktivera </button>
                                            <button className="btn btn-info">Se information </button>
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

