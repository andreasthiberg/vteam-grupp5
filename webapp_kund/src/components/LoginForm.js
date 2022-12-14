import React, { useState} from 'react';

export default function LoginForm(props) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    //Attempts to manually log in with given email and password
    async function handleSubmit(){
        const response = await fetch(("http://localhost:3000/auth/login"), {
        
        method: "POST",
        
        body: JSON.stringify({email:email,password:password}),
    
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
        });
        let loginResult = await response.json()
        if(loginResult.result.loginMessage="Inloggad!"){
        props.setJwt(loginResult.result.token)
        props.setUserEmail(loginResult.result.email)
        props.setLoggedIn(true)
        }
    }

    return (
        <div className="login-form">
            <h3>Logga in</h3>
            E-mail<br />
            <input required className="login-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
            Lösenord<br />
            <input required className="login-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            <button onClick={handleSubmit}>Logga in</button>
        </div>
      ); 
}
