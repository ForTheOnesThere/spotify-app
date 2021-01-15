import React from 'react';
import './Splashscreen.css'

const Splashscreen = (props) => {

const { clientId, redirect } = props

  return(
    <div className="splash">
      <div className={'btn grow'} onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true&scope=user-read-private%20user-library-read`)}>
      Connect to Spotify!
      </div>
    </div>
  )
}

export default Splashscreen
