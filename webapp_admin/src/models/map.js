// Fetch map info from graphql

const scooters = {

    getAllParkingZones: async function getAllParkingZones() {
        const query = `
            query {
                parkingZones {
                    id
                    pos
                    city
                }
            }
        `;

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        });

        const result = await response.json();
        return result.data;
    },
    getAllChargingStations: async function getAllChargingStations() {
        const query = `
            query {
                chargingStations {
                    id
                    pos
                    city
                }
            }
        `;

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        });

        const result = await response.json();
        console.log(result)
        return result.data;
    },

};

export default scooters;