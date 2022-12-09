import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import History from './pages/History';
import Payment from './pages/Payment';
import Login from './pages/Login';

function App() {

  //Authentication states (Används för att lagra jwt och om användaren är inloggad /Andreas)
  const [jwt,setJwt] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/payment' element={<Payment />}/>
        <Route path='/login' element={<Login setJwt={setJwt} setLoggedIn={setLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail} jwt={jwt}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
