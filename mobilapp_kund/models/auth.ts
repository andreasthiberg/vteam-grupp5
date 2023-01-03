//import config from "../config/config.json";
//import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            body: JSON.stringify({email:email,password:password}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json"
            },
        });
        const loginResult = await response.json();
        console.log("Login Result", loginResult);

        //TODO:
        if(loginResult.result.loginCode===1){
        props.setJwt(loginResult.result.token)
        props.setUserEmail(loginResult.result.email)
        props.setLoggedIn(true)
        }

        return loginResult.data;
    },

    // register: async function register(email: string, password: string) {
    //     const response = await fetch("http://localhost:3000/auth/register", {
    //         method: "POST",
    //         body: JSON.stringify({email:email,password:password}),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //             "Access-Control-Allow-Origin": "*",
    //             "Accept": "application/json"
    //         },
    //     });
    //     const loginResult = await response.json();
    //     console.log("Login Result", loginResult);

    //     return await response.json();
    // },
    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;