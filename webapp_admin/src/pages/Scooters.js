import LeafletMap from './MapSto';



const Scooters = () => {
    return (
      <div>
        <h2>Välj stad:</h2>
        <a href='/stockholm' element={<LeafletMap />}>
          <button>Stockholm</button>
        </a>

      </div>

    );
};

export default Scooters;