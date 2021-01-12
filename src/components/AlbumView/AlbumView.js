import React from 'react';

const AlbumView = (props) => {
  
  const { loadedAlbum } = props

  return (
    <div className="Album Tracks">
      {loadedAlbum.map(item => {
        return <div key={item.id}>
                name: {item.name}, length: {item.length}ms, <a href={item.link}>view on spotify</a><br />
               </div>
      })}
    </div>
  )

}

export default AlbumView