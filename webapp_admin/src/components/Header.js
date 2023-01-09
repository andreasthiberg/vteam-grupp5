import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <h1>High5 Elsparkcyklar Administration</h1>
            <ul className="nav">
                <li>
                    <Link to='/'>Hem</Link>
                </li>
                <li>
                    <Link to='/customers'>Kunder</Link>
                </li>
                <li>
                    <Link to='/map'>Karta</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
