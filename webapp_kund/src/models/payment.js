// Update payment info to graphql

const payment = {

    updatedCustomer: async function updateCustomer(newBalance) {

        const UPDATE_CUSTOMER = gql`
            mutation UpdateCustomer($id: Int!, $balance: Int!) {
                updateCustomer(id: $id, balance: $balance)
            }
        `;
    }
};

export default payment;