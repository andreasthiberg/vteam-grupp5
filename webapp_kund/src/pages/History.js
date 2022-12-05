import { useState, useEffect } from 'react';

import scooterModel from '../../webapp_kund/models/scooters';

const History = () => {
    const [scooters, setScooters] = useState([]);

    async function fetchScooters() {
    constc allScooters = await scooterModel.getAllScooters();

    setScooters(allScooters);
  }

    return <h1>History Page</h1>;
};

export default History;