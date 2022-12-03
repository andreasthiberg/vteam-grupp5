import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import History from './pages/History';
import Payment from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/payment' element={<Payment />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
