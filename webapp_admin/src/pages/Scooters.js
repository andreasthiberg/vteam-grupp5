import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import scooterModel from '../models/scooters';


export default function Scooters() {
    const [scootersInfo, setScootersInfo] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await scooterModel.getAllScooters();
  
        setScootersInfo(response.scooters);
  
        })();
    }, []);
  
    // let list = scootersInfo.map((scooter, index) => <li key={index}>{scooter.id}{scooter.pos}{scooter.status}{scooter.battery}</li>);
    // let list = scootersInfo.map((scooter, index) => <><tr key={index}></tr><tr {...scooter.id}></tr><tr {...scooter.pos}></tr><tr {...scooter.status}></tr><tr {...scooter.battery}></tr></>);

return (
    <div>
        <h1>Scooters List Page</h1>
        <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Id</th>
                            <th> Position</th>
                            <th> Battery</th>
                            <th> Status</th>
                            <th> City</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scootersInfo.map(
                                scooter => 
                                <tr key = {scooter.id}>
                                        <td> {scooter.id} </td>
                                        <td> {scooter.pos}</td>
                                        <td> {scooter.battery}</td>
                                        <td> {scooter.status}</td>
                                        <td> {scooter.city}</td>
                                        <td>
                                            <button className="btn btn-info">Service </button>
                                            <button className="btn btn-danger">PickUp </button>
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