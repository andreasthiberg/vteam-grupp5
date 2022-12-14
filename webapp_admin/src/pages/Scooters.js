import { Link } from 'react-router-dom';
import MapSto from "../components/MapSto";



const Scooters = () => {
    return (
      <div>
        <h2>Välj stad:</h2>
          <button onClick={MapSto}>Stockholm</button>


      </div>

    );
};

export default Scooters;