import { useState, useEffect } from 'react';
import './App.css';

const clientId = 'ebcbc13ca3b34ed6a4cf0bf4d7579df9';
const redirect = 'http%3A%2F%2Flocalhost:3000%2F';

const App = () => {

  const [code, setCode] = useState('')

  const parseUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get('code'))
    return
  }

  useEffect(() => {
    parseUrl()
  },[])
  
  return (
    code===null
    ? <div className="App">
        <button onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true`)}>Connect to Spotify</button>
      </div>
    : <div className="App">
        <p>
          Connected to Spotify.
        </p>
        <p>
          The code is {code}
        </p>
      </div>
  )
  
}

export default App;
