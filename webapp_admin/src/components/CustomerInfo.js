import { useState, useEffect } from "react";

export default function customerInfo({setSelectedCustomer,selectedCustomer,tripsInfo}) {

    const [matchingTrips,setMatchingTrips] = useState([]);

    useEffect(() => {
        setMatchingTrips(tripsInfo.filter(trip => trip.customer_id === selectedCustomer.id))
    },[tripsInfo])

    return (
    <div>
        <button onClick={()=>setSelectedCustomer({id:0})} className="customer-back-button">Tillbaka</button>
        <h3>Om kunden</h3>
        <div className="customer-info-div">
            ID: {selectedCustomer.id}<br/>
            Namn: {selectedCustomer.first_name} {selectedCustomer.last_name}<br/>
            Email: {selectedCustomer.email}<br/>
            Balance: {selectedCustomer.balance}<br/>
            Status: {selectedCustomer.status === 1 ? "Aktiv" : "Ej aktiv"}<br/>
        </div>
        <h3>Kundens resor</h3>
        <div className="customer-trip-div">
            {matchingTrips.map(trip => 
            <div key={trip.id} className="single-trip-div">
                <p>ID: {trip.id}</p>
                <p>Scooter-ID: {trip.scooter_id}</p>
                <p>Startposition: {JSON.stringify(trip.start_pos)}</p>
                <p>Slutposition: {JSON.stringify(trip.end_pos)}</p>
                <p>Starttid: {trip.start_time}</p>
                <p>Sluttid: {trip.end_time}</p>
                <p>Pris: {trip.price}</p>
            </div>
        )}
        </div>
    </div>
    );
}

