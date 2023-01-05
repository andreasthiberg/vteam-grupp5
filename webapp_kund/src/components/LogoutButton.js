import React from 'react';

export default function LogoutButton(props) {

    //Set all user info to empty
    async function logout(){
        props.setJwt("");
        props.setUserEmail("");
        props.setLoggedIn(false);
    }

    return (
        <button class="button1" onClick={logout}>Logga ut</button>
    );

}
