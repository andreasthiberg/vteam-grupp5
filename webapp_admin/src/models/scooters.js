// Fetch scooters's info from graphql

const scooters = {

    getAllScooters: async function getAllScooters() {
        const query = `
            query {
                scooters {
                    id
                    pos
                    status
                    battery
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
        for (let i in result.data["scooters"]){
            let posAsIntArray = JSON.parse(result.data["scooters"][i].pos)
            result.data["scooters"][i].pos = posAsIntArray
        }
        
        return result.data;
    },
    stopScooter: async function stopScooter(scooterId){
        const query = `
        mutation {
            updateScooter(id:${scooterId},status:${0}) 
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
    },
    moveToCharging: async function moveToCharging(scooterId){
        const query = `
        mutation {
            updateScooter(id:${scooterId},status:${4})
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
    }
};

export default scooters;