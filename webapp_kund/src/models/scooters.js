const scooterModel = {
    // baseUrl:

    getAllScooters: async function getAllScooters() {
        const query = `
            query {
                scooter {
                    scooter_id,
                    scooter_pos
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

        const scooters = await response.json();

        console.log(scooters.data);
        return scooters.data;
    }
};

export default scooterModel;
