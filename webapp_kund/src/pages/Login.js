let url = "https://github.com/login/oauth/authorize"
let stateString = "1021373719"
let code = "";
let clientId = "24530571d805bf20f230"
let redirectURL = "http://mylocal.com:3001"

//Send request to GitHub Oauth
async function makeOAuthRequest(){
  const response = await fetch((url + "?client_id=" + clientId + "&redirect_uri="+redirectURL), {
     
    method: "GET",
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
  });
  console.log(response)
};


//Get acess token from Github via backeknd
async function getToken(){
  const response = await fetch(("http://localhost:3000/auth/access"), {
     
    method: "POST",
     
    body: JSON.stringify({code:code}),

    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
    }
  });
  console.log(await response.json())
};



const Login = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  code = queryParameters.get("code")
  const state = queryParameters.get("state")
  if(state == stateString && code != ""){
    getToken();
  }
  return (
    <div>
            <a href={url + "?client_id=" + clientId + "&redirect_uri="+redirectURL}>GITHUB-LÄNK</a>
            <p>Code: {code}</p>
            <p>State: {state}</p>
    </div>
  );
}

export default Login;
