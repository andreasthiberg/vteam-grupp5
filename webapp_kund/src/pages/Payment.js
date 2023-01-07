import AddBtn from './../components/AddBtn';
import { useState, useEffect } from 'react';

export default function Payment(props) {

    const userBalance = props.user.balance;

    const [balance, setBalance] = useState({userBalance});

    console.log("Payment props", props);


    return (
        <div>
            <h1>Payment Page</h1>
            <p>Balance: {userBalance} sek</p>
            {/* <p>Balance state: {balance}</p> */}
            <button className="button1">Add</button>
            <AddBtn setBalanace={setBalance} />
        </div>
    )
};
