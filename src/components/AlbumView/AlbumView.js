import React from 'react';

const AlbumView = (props) => {
  
  const { loadedAlbum, clearAlbum } = props
  

  return (
    <div className="Album Tracks">
      {loadedAlbum.map(item => {
        return <div key={item.id}>
                name: {item.name}, length: {item.length}ms, <a href={item.link}>view on spotify</a><br />
               </div>
      })}
      <button className='back-btn-to-lib' onClick={clearAlbum}>Go back</button>
    </div>
  )

}

export default AlbumView