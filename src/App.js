import { useState, useEffect } from 'react';
import AlbumList from './components/AlbumList/AlbumList.js'
import './App.css';
import 'tachyons';

const clientId = 'ebcbc13ca3b34ed6a4cf0bf4d7579df9';
const redirect = 'http%3A%2F%2F192.168.1.188:3000%2F';

const App = () => {

  //hooks for state
  const [code, setCode] = useState(null)
  const [token, setToken] = useState(null) // eslint-disable-next-line 
  const [refreshToken, setRefreshToken] = useState(null) // eslint-disable-next-line 
  const [expiry, setExpiry] = useState(null) // eslint-disable-next-line 
  const [requestTime, setRequestTime] = useState(null)
  const [userDisplayName, setUserDisplayName] = useState(null)
  const [userProduct, setUserProduct] = useState(null)
  const [userProfileUrl, setUserProfileUrl] = useState(null)
  const [userAlbums, setUserAlbums] = useState(null)

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
      .catch(console.log)  
  }

  //make a request for profile data and update state with basic details
  const getUserData = () => {
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response => response.json())
      .then(user =>{
        setUserDisplayName(user.display_name)
        setUserProduct(user.product)
        setUserProfileUrl(user.external_urls.spotify)
      })
      .catch(console.log)
  }

  const getUserAlbums = () => {
    fetch('https://api.spotify.com/v1/me/albums?limit=50', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response => response.json())
      .then(albums => {
        handleAlbums(albums.items)
      })
  }

  const handleAlbums = (rawAlbumList) => {
    let albumList = rawAlbumList.map(item => {
      return {
        name: item.album.name,
        image: item.album.images[0].url,
        popularity: item.album.popularity,
        id: item.album.id
      } 
    })
    setUserAlbums(albumList)
  }

  return (
    //if there is no code stored, then the user must have no have logged in, so show them a 'connect' button
    //else, they must have logged in, so show the credentials returned from the Spotify accounts service
    code===null
    ? <div className="App">
        <button style={{'margin': '10%'}} onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true&scope=user-read-private%20user-library-read`)}>Connect to Spotify!</button>
      </div>
    : <div className="App">
        <button style={{'margin': '3%'}} onClick={getUserData}>Get Account Information</button>
        <p>
          Your name is: {userDisplayName}<br />
          Product: {userProduct}<br />
          Your profile can be found <a href={userProfileUrl}>here.</a>
        </p>
        <button style={{'margin': '3%'}} onClick={getUserAlbums}>Get Albums!</button>
        <AlbumList userAlbums={userAlbums}/>
      </div>
  )  
}

export default App;
