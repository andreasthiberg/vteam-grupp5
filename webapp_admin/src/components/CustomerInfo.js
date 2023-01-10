import { useState, useEffect } from "react";

export default function CustomerInfo({setSelectedCustomer,selectedCustomer,tripsInfo}) {

    const [matchingTrips,setMatchingTrips] = useState([]);

    useEffect(() => {
        setMatchingTrips(tripsInfo.filter(trip => trip.customer_id === selectedCustomer.id))
    },[tripsInfo])

    function convertTime(time){
        const date = new Date(parseInt(time));
        const dateString = date.toString().substring(0,21);
        return dateString;
    }

    return (
    <div>
        <button onClick={()=>setSelectedCustomer({id:0})} className="customer-button">Tillbaka</button>
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
            <div key={trip.id} className={trip.end_time !== null ? "single-trip-div": "single-trip-div active-trip-div"}>
                <p>ID: {trip.id}</p>
                <p>Scooter-ID: {trip.scooter_id}</p>
                <p>Startposition: {JSON.stringify(trip.start_pos)}</p>
                <p>Slutposition: {trip.end_pos ? JSON.stringify(trip.end_pos): "Pågående"}</p>
                <p>Starttid: {convertTime(trip.start_time)}</p>
                <p>Sluttid: {trip.end_time ? convertTime(trip.end_time) : "Pågående"}</p>
                <p>Pris: {trip.price ? trip.price : "-"}</p>
            </div>
        )}
        </div>
    </div>
    );
}

