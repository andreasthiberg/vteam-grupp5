import { Link } from "react-router-dom";
import high5_header from "./../assets/high5_header01.png";

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-img">
                    <img src={high5_header} alt="high5 header img" />
                </div>

                {/* <ul className="nav">
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
                </ul> */}
            </div>
        </>
    );
}

export default Header;
