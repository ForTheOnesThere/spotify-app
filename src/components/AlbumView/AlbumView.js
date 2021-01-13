import React, { useEffect } from 'react';
import './AlbumView.css';

const AlbumView = (props) => {
  
const { loadedAlbum, clearAlbum } = props

useEffect(()=>{window.scrollTo({top:0, behavior: 'auto'})},[])
  
//<a href={item.link}>view on spotify</a>
//length: {item.length}ms,
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