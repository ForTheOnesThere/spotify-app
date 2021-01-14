import React from 'react';
import './AlbumView.css';

const AlbumView = (props) => {
  
const { loadedAlbum, clearAlbum } = props

  return (
    <div className="album-tracks">
      <div className={'track text-center grow'} onClick={clearAlbum}>
        BACK
      </div>
      
      {loadedAlbum.map(item => {
        return <div key={item.id} className='track text-center grow'>
                {item.name}  <br />
               </div>
      })}
      
    </div>
  )

}

export default AlbumView