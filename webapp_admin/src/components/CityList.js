import { Link } from "react-router-dom";

const CityList = () => {
    return (
        <>
            <h1>High5 scooters admin</h1>
            <ul className="nav">
                <li>
                    <Link to='/stockholm'>Stockholm</Link>
                </li>
                <li>
                    <Link to='/malmo'>Malmö</Link>
                </li>
                <li>
                    <Link to='/lund'>Lund</Link>
                </li>
            </ul>
        </>
    );
}

export default CityList;
