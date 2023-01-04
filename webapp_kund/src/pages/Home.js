

export default function Home (props) {

    console.log(props);

    return (
        <div>
            <h1>My page</h1>
            <p>Name: {props.user.first_name} {props.user.last_name}</p>
            <p>Email: {props.user.email}</p>
            <p>Balance: {props.user.balance}</p>
            <button class="button1">History</button>
            <button class="button1">Payment</button>
        </div>
    )

}