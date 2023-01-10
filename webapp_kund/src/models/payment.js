// Update balance in payment page

const payment = {

    updateCustomer: async function updateCustomer(id, balance) {

        console.log(id, balance);

        const query = `
            mutation {
                updateCustomer(id:${id}, balance:${balance})
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

export default payment;