// Fetch customer's info from graphql

const customers = {

    getAllCustomers: async function getAllCustomers() {
        const query = `
            query {
                customers {
                    id
                    first_name
                    last_name
                    email
                    balance
                    status
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
    },
    setCustomerStatus: async function setCustomerStatus(id,status) {
        console.log(id)
        console.log(status)
        const query = `
            mutation {
                setCustomerStatus(id:${id},status:${status})
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
        console.log(result)
        
        return result.data;
    }
};

export default customers;