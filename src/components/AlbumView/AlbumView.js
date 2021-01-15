import React from 'react';
import './AlbumView.css';

const AlbumView = (props) => {
  
const { loadedAlbum, clearAlbum, getSongInfo } = props

  return (
    <div className="album-tracks">
      <div className={'back-btn-to-lib track text-center grow'} onClick={clearAlbum}>
        BACK
      </div>
      
      {loadedAlbum.map(item => {
        return <div key={item.id} onClick={()=>{getSongInfo(item.id, item.name)}} className='track text-center grow'>
                {item.name}  <br />
               </div>
      })}
      
    </div>
  )

}

export default AlbumView