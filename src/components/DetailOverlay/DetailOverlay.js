import React from 'react'
import SongView from '../SongView/SongView.js';
import AlbumView from '../AlbumView/AlbumView.js';
import './DetailOverlay.css'

const DetailOverlay = (props) => {

  const {isSongLoaded, loadedSong, loadedAlbum, getSongInfo, clearAlbum, clearSong } = props

  return(
    <div className={'overlay hide'}>
      {isSongLoaded
      ? <SongView loadedSong={loadedSong} clearSong={clearSong}/>
      : <AlbumView loadedAlbum={loadedAlbum} getSongInfo={getSongInfo} clearAlbum={clearAlbum}/>
      }      
    </div>
  )
}

export default DetailOverlay