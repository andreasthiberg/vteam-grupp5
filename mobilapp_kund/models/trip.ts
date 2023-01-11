import { IP } from "@env";
import { useQuery, gql, ApolloProvider } from "@apollo/client";

const trip = {
    // baseUrl:

    getAllTrips: async function getAllTrips() {
        const query = `
            query {
                trips {
                    id,
                    scooter_id
                }
            }
        `;

        const response = await fetch(`http://${IP}:3000/graphql`, {
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
    }
};

export default trip;
