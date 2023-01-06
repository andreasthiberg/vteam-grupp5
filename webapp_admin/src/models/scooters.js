// Fetch scooters's info from graphql

const scooters = {
    // baseUrl:

    getAllScooters: async function getAllScooters() {
        const query = `
            query {
                scooters {
                    id
                    pos
                    status
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
        for (let i in result.data["scooters"]){
            let posAsIntArray = JSON.parse(result.data["scooters"][i].pos)
            result.data["scooters"][i].pos = posAsIntArray
        }
        
        return result.data;
    }
};

export default scooters;