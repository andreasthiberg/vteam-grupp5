// Fetch map related info from graphql

const map = {

    getParkings: async function getParkings() {
        const query = `
            query {
                parkingZones {
                    pos, 
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

        console.log("result from map model", result);

        return result.data;
    },
    getScooters: async function getScooters() {
        const query = `
            query {
                scooters {
                    id,
                    pos,
                    status,
                    battery
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

        console.log("result from map model", result);

        return result.data;

    }
};

export default map;
