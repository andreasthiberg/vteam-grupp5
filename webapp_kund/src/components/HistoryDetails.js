export default function HistoryDetails(props) {

    console.log("HistoryDetails ", props);

    const start_date = new Date(parseInt(props.selectedTrip.start_time));
    const end_date = new Date(parseInt(props.selectedTrip.end_time));

    const dateString = start_date.toString().substring(0,15);
    const start_timeString = start_date.toTimeString().substring(0,5);
    const end_timeString = end_date.toTimeString().substring(0, 5);

    return (
        <div>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Travel ID</td>
                        <td>{props.selectedTrip.id}</td>
                    </tr>
                    <tr>
                        <td>Scooter ID</td>
                        <td>{props.selectedTrip.scooter_id}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{dateString}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>Start: {start_timeString}</td> 
                        <td>End: {end_timeString}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{props.selectedTrip.city}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>Start: {props.selectedTrip.start_pos}</td>
                        <td>End: {props.selectedTrip.end_pos}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{props.selectedTrip.price}sek</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}