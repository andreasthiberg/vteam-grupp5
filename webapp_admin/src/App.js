import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Scooters from './pages/Scooters';
import Customers from './pages/Customers';
import MapSto from './pages/MapSto';
import MapMal from './pages/MapMal';
import MapLun from './pages/MapLun';





function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customers' element={<Customers />}/>
        <Route path='/scooters' element={<Scooters />} />
        <Route path='/stockholm' element={<MapSto />} />
        <Route path='/malmo' element={<MapMal />} />
        <Route path='/lund' element={<MapLun />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
