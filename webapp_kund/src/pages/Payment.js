import AddBtn from './../components/AddBtn';
import { useState, useEffect } from 'react';

export default function Payment(props) {

    const userBalance = props.user.balance;

    const [balance, setBalance] = useState(userBalance);

    console.log("Payment props", props);

    return (
        <div>
            <h1>Payment</h1>
            <h3>Balance: {balance} sek</h3>
            <AddBtn balance={balance} setBalance={setBalance} />
        </div>
    )
};
