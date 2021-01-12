import { React, useEffect } from 'react';
import AlbumCard from '../AlbumCard/AlbumCard.js';

const AlbumList = (props) => {

const { userAlbums } = props;

useEffect(()=>{
  if (userAlbums){popColor()}
})

//run through the album cards and set the color of the popularity text based on score
const popColor = () => {
  //set thresholds
  const high = 75
  const low = 25
  let pops = document.getElementsByClassName('popularity')

  for (let i=0; i<pops.length; i++){
    let score = Number(pops[i].innerHTML)
    if (score >= high){pops[i].style.color = "green"}
    else if (score >= low){pops[i].style.color = "darkorange"}
    else {pops[i].style.color = "red"}  
  }
}

//if there are albums loaded, loop through them and display a card for each
//if not, do nothing
if (userAlbums) {
    return(
        <div id='AlbumList' style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'space-around'}}>
            {userAlbums.map(album => {
                return <AlbumCard key={album.id} name={album.name} image={album.image} popularity={album.popularity}/>
            })}
            <div onLoad={popColor}></div>
        </div>
    )
} else {
    return(null)
}
}

export default AlbumList