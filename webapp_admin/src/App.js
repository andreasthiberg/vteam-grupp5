import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Scooters from './pages/Scooters';
import Customers from './pages/Customers';

import scooterModel from './models/scooters';

function App() {
  const [scooters, setScooters] = useState([]);

  async function fetchScooters() {
    constc allScooters = await scooterModel.getAllScooters(token);

    setScooters(allScooters);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/scooters' element={<Scooters />} />
        <Route path='/customers' element={<Customers />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;