import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import History from './pages/History';
import Payment from './pages/Payment';
import Login from './pages/Login';
import customerModel from './models/customers';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {

  // Authentication states
  const [jwt,setJwt] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("");
  // User state
  const [user, setUser] = useState(0);
  // User balance state
  const [balance, setBalance] = useState();

  console.log("user", user);

  // Initialize Apollo Client
const client = new ApolloClient({
  uri: `http://localhost:3000/graphql`,
  cache: new InMemoryCache(),
});

  // Set user when userEmail is updated
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

  // Set user balance when user is updated
  useEffect(() => {
    (async () => {
      await setBalance(user.balance);
    })();
  }, [user]);

  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Header />
        </header>
        <main className="main">
          {jwt ?
            <>
              <Home user={user} setBalance={setBalance} balance={balance} />
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
    </ApolloProvider>
  );
}

export default App;
