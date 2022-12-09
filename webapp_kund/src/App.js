import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import History from './pages/History';
import Payment from './pages/Payment';
import Login from './pages/Login';

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
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
