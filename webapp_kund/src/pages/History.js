import { useState, useEffect, useRef } from 'react';
import historyModel from '../models/history';
import HistoryDetails from './../components/HistoryDetails';

export default function History(props) {
  const [historyInfo, setHistoryInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState([]);

  const userId = props.user.id;
  //console.log("History pase user-id", userId)
  //console.log("selectedTrip", selectedTrip);
  const detailsRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await historyModel.getAllHistory();
      console.log(response);

      setHistoryInfo(response.trips);
    })();
  }, []);

  const handleClick = (trip) => {
    setShowDetails(true);
    setSelectedTrip(trip);
    detailsRef.current.scrollIntoView({ behaviour: "smooth" });
  }

    return (
      <div className='history-container'>
        <h1>Usage History</h1>

        <div className = "row">
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        {/* <th> Id</th> */}
                        <th> Date</th>
                        {/* <th> Scooter Id</th> */}
                        <th> City</th>
                        <th> Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyInfo
                        .filter(trip => trip.customer_id == userId)
                        .map(
                            trip => {
                              const date = new Date(parseInt(trip.start_time));
                              const dateString = date.toString().substring(0,21);

                            return (
                            <tr key = {trip.id}>
                                    {/* <td> {trip.id} </td> */}
                                    <td> {dateString}</td>
                                    {/* <td> {trip.scooter_id}</td> */}
                                    <td> {trip.city}</td>
                                    <td> {trip.price} sek</td>
                                    <td>
                                        <button className="button1" onClick={(e) => handleClick(trip)}
                                        >View </button>
                                    </td>
                            </tr>
                        );
                      })
                    }
                </tbody>
            </table>
            <div ref={detailsRef}>
              { showDetails ?
                <HistoryDetails selectedTrip={selectedTrip} /> : <></>} 
            </div>
        </div>
      </div>
    );
}
