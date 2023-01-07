import React, { useState} from 'react';

export default function RegisterForm(props) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [registerMessage,setRegisterMessage] = useState("");

    //Attempts to manually log in with given email and password
    async function handleSubmit(){
        const response = await fetch(("http://localhost:3000/auth/register"), {
        
        method: "POST",
        
        body: JSON.stringify({email:email,password:password,first_name:firstName,last_name:lastName}),
    
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
        });
        let registerResult = await response.json()
        setRegisterMessage(registerResult.result.registerMessage);
    }

    return (
        <div className="login-form">
            <h3>Registrera</h3>
            E-mail<br />
            <input required className="login-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
            Lösenord<br />
            <input required className="login-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            Förnamn<br />
            <input required className="login-field" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br />
            Efternamn<br />
            <input required className="login-field" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br />
            <button className="button1" onClick={handleSubmit}>Registrera</button>
            {registerMessage}
        </div>
      ); 
}
