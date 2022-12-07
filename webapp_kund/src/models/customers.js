// Fetch customer's info from graphql

//const cors = require('cors');

const customers = {
    // baseUrl:

    getAllCustomers: async function getAllCustomers() {
        const query = `
            query {
                customers {
                    first_name
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
        
        console.log(result.data);
        return result.data;
    }
};

export default customers;
