import React from 'react';
import AlbumCard from '../AlbumCard/AlbumCard.js';

const AlbumList = (props) => {

const { userAlbums } = props;

    //if there are albums loaded, loop through them and display a card for each
    //if not, do nothing
    if (userAlbums) {
        console.log('from the list component', userAlbums)
        return(
            <div id='AlbumList' style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'space-around'}}>
                {userAlbums.map(album => {
                    return <AlbumCard key={album.id} name={album.name} image={album.image} popularity={album.popularity}/>
                })}
            </div>
        )
    } else {
        return(null)
    }
}

export default AlbumList