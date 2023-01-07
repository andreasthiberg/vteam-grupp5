import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import History from './pages/History';
import Payment from './pages/Payment';
import Login from './pages/Login';
import customerModel from './models/customers';

function App() {

  //Authentication states (Används för att lagra jwt och om användaren är inloggad /Andreas)
  const [jwt,setJwt] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("");
  const [user, setUser] = useState(0);

  console.log("user", user);

  // Set userId when userEmail is updated
  useEffect(() => {
    if(userEmail !== "") {
      (async () => {
        const response = await customerModel.getAllCustomers();

        const customer = response.customers.find(customer => customer.email === userEmail);
        
        if (customer) {
          setUser(customer);
        }
      })();
    }
  }, [userEmail]);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Header />
        </header>
        <main className="main">
          {jwt ?
            <>
              <Home user={user}/>
              {/* <Login /> */}
            </>
            :
            <Login setJwt={setJwt} setLoggedIn={setLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail} jwt={jwt}/>
          }
        </main>
      </div>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/history' element={<History />} />
        <Route path='/payment' element={<Payment user={user} />}/>
        <Route path='/login' element={<Login setJwt={setJwt} setLoggedIn={setLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail} jwt={jwt}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
