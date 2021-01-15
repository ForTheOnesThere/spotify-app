import React from 'react'
import Welcome from '../Welcome/Welcome.js';
import AlbumList from '../AlbumList/AlbumList.js';

const LibraryView = (props) => {

  const { userDisplayName, userProfileUrl, userAlbums, getAlbumTracks } = props

  return(
    <div className={'library-view'}>
      <Welcome userDisplayName={userDisplayName} userProfileUrl={userProfileUrl}/>
      <AlbumList userAlbums={userAlbums} getAlbumTracks={getAlbumTracks}/>        
    </div>
  )
}

export default LibraryView