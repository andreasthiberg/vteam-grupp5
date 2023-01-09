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
        for (let i in result.data["chargingStations"]){
            let posAsIntArray = JSON.parse(result.data["chargingStations"][i].pos)
            result.data["chargingStations"][i].pos = posAsIntArray
        }
        return result.data;
    }
};

export default scooters;