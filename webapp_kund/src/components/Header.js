import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <h1>High5 Customer's Page</h1>
            <ul className="nav">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/history'>History</Link>
                </li>
                <li>
                    <Link to='/payment'>Payment</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </>
    );
}

export default Header;
