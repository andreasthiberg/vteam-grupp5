// Update payment info to graphql

const payment = {

    updatedBalance: async function updateBalance(newBalance) {

        const UPDATE_CUSTOMER = gql`
            mutation UpdateCustomer($id: Int!, $balance: Int!) {
                updateCustomer(id: $id, balance: $balance)
            }
        `;
    }
};

export default payment;