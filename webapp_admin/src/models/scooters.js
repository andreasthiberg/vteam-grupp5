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
    changeScooterStatus: async function changeScooterStatus(scooterId,newStatus){
        const query = `
        mutation {
            updateScooter(id:${scooterId},status:${newStatus}) 
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
    return response;
    },
    moveScooterToChargingStation: async function moveScooterToChargingStation(scooterId){
        const query = `
        mutation {
            chargeScooter(id:${scooterId}) 
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
    return response;
    }
};

export default scooters;