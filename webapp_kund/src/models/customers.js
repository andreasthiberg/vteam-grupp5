// Fetch customer's info from graphql

const cors = require('cors');

const customers = {
    // baseUrl:

    getAllCustomers: async function getAllCustomers() {
        const query = `
            {
                customers {
                    first_name
                }
            }
        `;

        const response = await fetch('/graphql', cors(), {
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
