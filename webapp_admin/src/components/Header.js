import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <h1>High5 Admin's Page</h1>
            <ul className="nav">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/customers'>Customers</Link>
                </li>
                <li>
                    <Link to='/scooters'>Scooters</Link>
                </li>
            </ul>
        </>
    );
}

export default Header;
