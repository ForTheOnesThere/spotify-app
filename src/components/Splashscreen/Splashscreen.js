import React from 'react';

const Splashscreen = (props) => {

const { clientId, redirect } = props

  return(
    <div className="App">
        <button style={{'margin': '10%'}} onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true&scope=user-read-private%20user-library-read`)}>Connect to Spotify!</button>
    </div>
  )
}

export default Splashscreen
