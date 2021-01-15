import { useState, useEffect } from 'react';
import Splashscreen from './components/Splashscreen/Splashscreen.js';
import DetailOverlay from './components/DetailOverlay/DetailOverlay.js';
import LibraryView from './components/LibraryView/LibraryView.js';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';
import { Chart } from "react-chartjs-2";  
Chart.defaults.global.legend.display = false;

const clientId = 'ebcbc13ca3b34ed6a4cf0bf4d7579df9';
const redirect = 'https%3A%2F%2Fwww.jamescockayne.co.uk%2Fspotify-app%2F';

const App = () => {

  //hooks for state
  const [code, setCode] = useState(null)
  const [token, setToken] = useState(null)
  const [userDisplayName, setUserDisplayName] = useState('Loading...')
  const [userProfileUrl, setUserProfileUrl] = useState(null)
  const [userAlbums, setUserAlbums] = useState(null)
  const [loadedAlbum, setLoadedAlbum] = useState([])
  const [isSongLoaded, setIsSongLoaded] = useState(false)
  const [loadedSong, setLoadedSong] = useState({})

  //global options parameter for GET requests, take a token, and return an object with the right header
  //defaults to using the token from app state, but can be custom
  const GEToptions = (inputToken = token) => {
    return ({
      method: 'GET',
      headers: {'Authorization': `Bearer ${inputToken}`}
    })
  }

  //parameters for the particles background
  const particlesConfig = require('./particlesjs-config.json')

  //request for the url to be parsed if there is a query string on page load
  useEffect(() => {
    (window.location.search !== "")?parseUrl():console.log('Please link with Spotify') // eslint-disable-next-line
  },[])

  //grab the code parameter from the query string and pass it to getAccessToken()
  const parseUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recievedCode = urlParams.get('code')
    setCode(recievedCode)
    getAccessToken(recievedCode)
  }

  //send the code to the backend and update the state with the results
  const getAccessToken = async (recievedCode) => {
    let rawResponse = await fetch('https://spotify-test-project.herokuapp.com', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        code: recievedCode,
        clientId: clientId,
        redirect: redirect
      })
    })

    let response = await rawResponse.json()

    try {
      setToken(response.access_token)
      
      //get the user's profile with the token we just recieved, because the default value of token here comes back as blank
      getUserDataOnInit(response.access_token)  
    } catch(e){console.log(e)}
  }

  //make a request for profile data and update state with basic details
  const getUserDataOnInit = async (inputToken) => {
    try {
      let response = await fetch('https://api.spotify.com/v1/me', GEToptions(inputToken))
      let user = await response.json()  
      setUserDisplayName(user.display_name)
      setUserProfileUrl(user.external_urls.spotify)
      document.getElementById('welcome-text').classList.remove('hide-welcome')
      document.getElementById('welcome-text').classList.add('fade-in')
      getUserAlbums(inputToken)
    } catch(e){console.log(e)}  

  }

  const getUserAlbums = async (inputToken) => {
    //start with no albums, and make the first request from offset=0
    let allAlbums = []
    let offset = 0

    //spotify limits album requests to 50 at a time, so...
    //if the number of albums recieved so far is a multiple of 50, make another request for the next 50, by specifying the offset
    //Eventually the albums stop coming in 50s and we are done
    //For the edge case that the final number required is a multiple of 50, we check if each batch is blank. If so, we are done. 
    while ((allAlbums.length % 50) === 0){
      let response = await fetch(`https://api.spotify.com/v1/me/albums?offset=${offset}&limit=50`, GEToptions(inputToken))
      let albums = await response.json()
      if (albums.items.length === 0){break}
      allAlbums = allAlbums.concat(albums.items)
      offset += 50
    } 

    //process the complete album list
    handleAlbums(allAlbums)
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

  const getSongInfo = async (songId, songName) => {
    let response = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, GEToptions())
    let features = await response.json()
    features.name = songName
    setLoadedSong(features)
    setIsSongLoaded(true)
  }

  const getAlbumTracks = async (albumId) => {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'

    //make the request for the album whose id has been passed
    let response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, GEToptions())
    let rawTracks = await response.json()

    //process the response into a simpler array
    let tracks = rawTracks.items.map(track => {
      return {
        name: track.name,
        length: track.duration_ms,
        id: track.id,
        link: track.external_urls.spotify
      }
    })
    setLoadedAlbum(tracks)
    document.getElementsByClassName('overlay')[0].classList.add('show')
  }

  //hide the overlay to go back to library view
  const clearAlbum = () => {
    document.getElementsByClassName('overlay')[0].classList.remove('show')
    document.getElementsByTagName('html')[0].style.overflow = 'visible'
  }

  const clearSong = () => {
    setIsSongLoaded(false)
  }

  //if there is no code stored, then the user must have not have logged in, or has refused to grant access, so show them a 'connect' button
  //else, they must have logged in, so show the app
  return (
    <div className={'container'}>
      <Particles params={particlesConfig} className='particles'/>
      {(code===null)
        ? <Splashscreen clientId={clientId} redirect={redirect}/>
        : <div className="App">
            <DetailOverlay isSongLoaded={isSongLoaded} loadedSong={loadedSong} loadedAlbum={loadedAlbum} getSongInfo={getSongInfo} clearAlbum={clearAlbum} clearSong={clearSong}/>
            <LibraryView userDisplayName={userDisplayName} userProfileUrl={userProfileUrl} userAlbums={userAlbums} getAlbumTracks={getAlbumTracks}/> 
          </div>     
      }   
    </div>
  )  
}

export default App;