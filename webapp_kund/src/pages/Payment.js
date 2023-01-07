import AddBtn from './../components/AddBtn';
import { useState, useEffect } from 'react';

export default function Payment(props) {

    console.log("Payment props", props);

    return (
        <div>
            <h1>Payment</h1>
            <h3>Balance: {props.balance} sek</h3>
            <AddBtn balance={props.balance} setBalance={props.setBalance} user={props.user}/>
        </div>
    )
};
