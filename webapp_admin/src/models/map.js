// Fetch map info from graphql

const scooters = {

    getAllParkingZones: async function getAllScooters() {
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
        console.log(result);
        convertCoordinateString();
        return result.data;
    },

};

function convertCoordinateString(coordString){
    let testString = "[[55.716690, 13.181575], [55.712179, 13.189716], [55.711478, 13.180755]]"
    let convertedString = JSON.parse(testString)
    console.log(convertedString)
}

export default scooters;