export default function Payment(props) {

    //graphql mutation to add balance

    console.log("Payment props", props);


    return (
        <div>
            <h1>Payment Page</h1>
            <p>Balance: {props.user.balance} sek</p>
            <button className="button1">Add</button>
        </div>
    )
};
