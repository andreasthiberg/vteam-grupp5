import LogoutButton from "../components/LogoutButton";
import History from "./History";
import Payment from './Payment';
import { useState } from 'react';


export default function Home (props) {
    const [showHistory, setShowHistory] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    console.log("Home props", props);

    function changeShowHistory() {
        setShowHistory(true);
        setShowPayment(false);
    }

    function changeShowPayment() {
        setShowPayment(true);
        setShowHistory(false);
    }

    return (
        <div className="mypage-container">

            <div className="mypage-subcontainer1">
                <div className="mypage-options">
                    <button className="button2" onClick={changeShowHistory} >Usage history</button>
                    <button className="button2" onClick={changeShowPayment} >Payment management</button>
                    <div>
                        <LogoutButton setJwt={props.setJwt} setLoggedIn={props.setLoggedIn} userEmail={props.userEmail} setUserEmail={props.setUserEmail} jwt={props.jwt}/>
                    </div>
                </div>
            </div>
            <div className="mypage-subcontainer2">
                <div className="mypage-personalinfo">
                    <h1>Personal Info</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>First Name:</td>
                                <td>{props.user.first_name} </td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{props.user.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{props.user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mypage-components">
                    {showHistory ? <History user={props.user} /> : "" }
                    {showPayment ? <Payment user={props.user} balance={props.balance} setBalance={props.setBalance} /> : "" }
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
