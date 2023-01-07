import { useState, useEffect } from 'react';
import historyModel from '../models/history';

export default function History(props) {
  const [historyInfo, setHistoryInfo] = useState([]);

  const userId = props.user.id;
  console.log("History id", userId)

  useEffect(() => {
    (async () => {
      const response = await historyModel.getAllHistory();
      console.log(response);

      setHistoryInfo(response.trips);
    })();
  }, []);

    return (
      <div className='history-container'>
        <h1>Usage History</h1>

        <div className = "row">
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th> Id</th>
                        <th> Scooter id</th>
                        <th> Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyInfo
                        //.filter(trip => trip.customer_id == userId)
                        .map(
                            trip => 
                            <tr key = {trip.id}>
                                    <td> {trip.id} </td>
                                    <td> {trip.scooter_id}</td>
                                    <td> {trip.price} sek</td>
                                    {/* <td>
                                        <button className="btn btn-info">Update </button>
                                        <button className="btn btn-danger">Delete </button>
                                        <button className="btn btn-info">View </button>
                                    </td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    );
}
