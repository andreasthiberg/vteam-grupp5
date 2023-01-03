// Fetch map related info from graphql

import { useQuery, gql, ApolloProvider } from "@apollo/client";

const map = {

    getParkings: async function getParkings() {
        const STO_PARKING_QUERY = gql`
            query StoParkingQuery {
                parkingZones {
                    id
                    pos
                    city
                }
            }
        `;

        const { data } = useQuery(STO_PARKING_QUERY, {
            fetchPolicy: 'network-only',
        });

        console.log("Stockholm parking data", data);

        return data;
    },

    // getParkings: async function getParkings() {
    //     const query = `
    //         {
    //             parkingZones {
    //                 id
    //                 pos
    //                 city
    //             }
    //         }
    //     `;

    //     const response = await fetch('/graphql', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             query
    //         })
    //     });

    //     const result = await response.json();

    //     console.log("getParkings.......")

    //     return result.data;
    // },
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
