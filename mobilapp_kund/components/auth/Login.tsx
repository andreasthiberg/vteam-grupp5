// auth/Login.tsx
import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import oAuth from './oAuth';
import { showMessage } from 'react-native-flash-message';
import { ScrollView, Text, Image, TouchableOpacity, Button, Linking } from 'react-native';
import { Base, Typography } from '../../styles';
import high5 from './../../assets/high5circle01.png';

//Oauth URL
// const url = "https://github.com/login/oauth/authorize"
// const stateString = "1021373719"
// const clientId = "24530571d805bf20f230"
// const redirectURL = "http://mylocal.com:3001/login"
// const oAuthUrl = url + "?client_id=" + clientId + "&redirect_uri="+ redirectURL + "&state=" + stateString;

export default function Login ({ navigation, setLoggedIn, setJwt, setUserEmail }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    // log in with email and password
    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            
            if (result.loginCode === 1) {
                console.log("You are logged in!");
                console.log("login result:", result);
                setJwt(result.token);
                setUserEmail(result.email);
                setLoggedIn(true);
            }
            showMessage(result);
        } else {
            showMessage({
                message: "Something missing",
                description: "Email or password missing",
                type: "warning"
            });
        }
    }
    
    // async function oAuthLoginOrRegister(code,props) {
    //     const response = await fetch(("http://localhost:3000/auth/oauth"), {
      
    //     method: "POST",
        
    //     body: JSON.stringify({code:code}),

    //     // Adding headers to the request
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         "Access-Control-Allow-Origin": "*",
    //         "Accept": "application/json"
    //     }
    //     });
    //     let loginResult = await response.json()
    //     props.setJwt(loginResult.result.token)
    //     props.setUserEmail(loginResult.result.email)
    //     props.setLoggedIn(true)
    // }

    // const queryParameters = new URLSearchParams(window.location.search)
    // const code = queryParameters.get("code")
    // const state = queryParameters.get("state")

    //Make sure state string is correct
    // if(state === stateString && code !== "" && props.jwt === ""){
    //     oAuthLoginOrRegister(code,props);
    //     window.history.replaceState({}, document.title, "/");
    // }

    return (
        <ScrollView style={Base.base}>
            <>
                <Text style={Typography.header2}>High5 Elsparkcyklar app</Text>
                <Image source={high5} style={Base.image} />
                {/* <Button
                    onPress={link}
                    title="Sign in with GitHub"
                /> */}
                {/* <TouchableOpacity onPress={() => Linking.openURL('{oAuthUrl}')}>
                    <Text style={Typography.header3}>Sign in with GitHub</Text>
                </TouchableOpacity> */}
                
                
                <AuthFields
                    auth={auth}
                    setAuth={setAuth}
                    submit={doLogin}
                    title="Log in"
                    navigation={navigation}
                />
            </>
        </ScrollView>
    );
};
