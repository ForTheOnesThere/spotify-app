import { useState, useEffect } from 'react';
import './App.css';

const clientId = 'ebcbc13ca3b34ed6a4cf0bf4d7579df9';
const redirect = 'http%3A%2F%2Flocalhost:3000%2F';

const App = () => {

  //hooks for state
  const [code, setCode] = useState(null)
  const [token, setToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [requestTime, setRequestTime] = useState(null)

  //Make request for API token on page load if there is a query string on the url
  useEffect(() => {
    (window.location.search !== "")?parseUrl():console.log('Please link with Spotify')
    // eslint-disable-next-line
  },[])

  //grab the code parameter from the query string and pass it to getAccessToken()
  const parseUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recievedCode = urlParams.get('code')
    //console.log('ran parseUrl, code was ')
    //console.log(recievedCode)
    setCode(recievedCode)
    getAccessToken(recievedCode)
  }

  //send the code to the backend and update the state with the results
  const getAccessToken = (recievedCode) => {
      fetch('https://spotify-test-project.herokuapp.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          code: recievedCode,
          clientId: clientId,
          redirect: redirect
        })
      })
      .then(res => res.json())
      .then(response => {
        console.log('ran getAccessToken()')
        //console.log(response.access_token)
        setRequestTime(new Date().toString())
        setExpiry(response.expires_in)
        setToken(response.access_token)
        setRefreshToken(response.refresh_token)
      })    
  }

  return (
    //if there is no code stored, then the user must have no have logged in, so show them a 'connect' button.
    //else, they must have logged in, so show the credentials returned from the Spotify accounts service.
    code===null
    ? <div className="App">
        <button style={{'margin': '10%'}} onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true`)}>Connect to Spotify!</button>
      </div>
    : <div className="App">
        <p>
          Connected to Spotify.
        </p>
        <p>
          The code is: {code}
        </p>
        <p>
          The access token is: {token}
        </p>
        <p>
          The refresh token is: {refreshToken}
        </p>
        <p>
          The token was recieved at {requestTime} and is valid for {expiry} seconds.
        </p>
      </div>
  )  
}

export default App;
