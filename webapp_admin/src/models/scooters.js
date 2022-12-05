const scooterModel = {
    // baseUrl:

    getAllScooters: async function getAllScooters(token) {
        const response = await fetch('/graphql', {
            headers: {
                "x-access-token": token,
        });

        const scooters = await response.json();

        return scooters.data;
    }
};

export default scooterModel;
