import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Scooters from './pages/Scooters';
import Customers from './pages/Customers';
import Map from './pages/Map';






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
        <Route path='/map' element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
