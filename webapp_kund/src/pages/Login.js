import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import LogoutButton from '../components/LogoutButton'

//Oauth URL
const url = "https://github.com/login/oauth/authorize"
const stateString = "1021373719"
const clientId = "24530571d805bf20f230"
const redirectURL = "http://mylocal.com:3001/login"
const oAuthUrl = url + "?client_id=" + clientId + "&redirect_uri="+ redirectURL + "&state=" + stateString;


export default function Login(props) {

  //Use code from Github oauth to login via backend
  async function oAuthLoginOrRegister(code,props){
    const response = await fetch(("http://localhost:3000/auth/oauth"), {
      
      method: "POST",
      
      body: JSON.stringify({code:code}),

      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
      }
    });
    let loginResult = await response.json()
    props.setJwt(loginResult.result.token)
    props.setUserEmail(loginResult.result.email)
    props.setLoggedIn(true)
  }

  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code")
  const state = queryParameters.get("state")

  //Make sure state string is correct
  if(state === stateString && code !== "" && props.jwt === ""){
    oAuthLoginOrRegister(code,props);
    window.history.replaceState({}, document.title, "/");
  }

  console.log(props.userId)

  return (
    <div>
            { props.jwt === "" ? 
            <div>
              <h1>Welcome!</h1>
              <div><a href={oAuthUrl}>Klicka här för att logga in med GitHub</a></div>
              <div className='authform-container'>
                <LoginForm setJwt={props.setJwt} setUserEmail={props.setUserEmail} setLoggedIn={props.setLoggedIn} />
                <RegisterForm setJwt={props.setJwt} setUserEmail={props.setUserEmail} setLoggedIn={props.setLoggedIn} />
              </div>
            </div>
            :
            <div>
              {/* <p>Du är inloggad som {props.userEmail}</p> */}
              <LogoutButton setJwt={props.setJwt} setUserEmail={props.setUserEmail} setLoggedIn={props.setLoggedIn}/>
            </div>
            }
    </div>
    
  );
}
