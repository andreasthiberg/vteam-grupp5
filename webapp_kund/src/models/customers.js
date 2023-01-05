// Fetch customer's info from graphql

const customers = {
    // baseUrl:

    getAllCustomers: async function getAllCustomers() {
        const query = `
            query {
                customers {
                    id
                    first_name
                    last_name
                    email
                    balance
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

export default customers;
