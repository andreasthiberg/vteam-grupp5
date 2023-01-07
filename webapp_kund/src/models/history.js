// Fetch history info from graphql

const history = {
    // baseUrl:

    getAllHistory: async function getAllHistory() {
        console.log("getAllHistory................");
        const query = `
            query {
                trips {
                    scooter_id
                    customer_id
                    id
                    price
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
    }
};

export default history;
