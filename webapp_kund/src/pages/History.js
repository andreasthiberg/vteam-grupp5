import { useState, useEffect } from 'react';
//import fetchGraphQL from './fetchGraphQL';
import scooterModel from '../models/scooters';


function GetHistory() {
  const [scooters, setScooters] = useState([]);

  useEffect(() => {
    scooterModel.getAllScooters()
    .then(response=> {
      setScooters(response)
    })
  })
  console.log(scooters);

  return (
    <div>
      <h1>History Page</h1>
      <h2>List of scooters</h2>
      {scooters}
    </div>
  )

  // const allScooters = await scooterModel.getAllScooters();
}

export default GetHistory;

// const History = () => {
//     const [scooters, setScooters] = useState([]);

//     async function fetchScooters() {
//     const allScooters = await scooterModel.getAllScooters();

//     setScooters(allScooters);
//   }

//     return <h1>History Page</h1>;
// };

// export default History;
