import LogoutButton from "../components/LogoutButton";
import History from "./History";
import Payment from './Payment';


export default function Home (props) {

    console.log("Home props", props);

    return (
        <div className="mypage-container">

            <div className="mypage-subcontainer1">
                <div className="mypage-personalinfo">
                    <h1>My page</h1>
                    <p>Name: {props.user.first_name} {props.user.last_name}</p>
                    <p>Email: {props.user.email}</p>
                    {/* <p>Balance: {props.user.balance}</p> */}
                </div>
                <div className="mypage-options">
                    <button className="button1" >Usage history</button>
                    <button className="button1" onClick={() =>window.location.href='/payment'}>Payment management</button>
                </div>
            </div>

            <div className="mypage-subcontainer2">
                <div className="mypage-components">
                    <History user={props.user} />
                    <Payment user={props.user} />
                </div>
            </div>
        </div>
    )

}


// return (
//     <div className="mypage-container">
//         <div className="personal-info">
//             <h1>My page</h1>
//             <p>Name: {props.user.first_name} {props.user.last_name}</p>
//             <p>Email: {props.user.email}</p>
//             <p>Balance: {props.user.balance}</p>
//         </div>
//         <div className="mypage-options">
//             <button class="button1" onClick={() =>window.location.href='/history'}>Usage history</button>
//             <button class="button1">Payment management</button>
//         </div>
//     </div>
// )
