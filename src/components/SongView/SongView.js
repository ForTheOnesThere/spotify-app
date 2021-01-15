import React from 'react'
import './SongView.css'

const SongView = (props) => {

  const { loadedSong, clearSong } = props

  return(
    <div >
      <h1 className={'test'}>{loadedSong.name}</h1>
      <p className={'test'}>This is the song details</p>
      <div className={'btn-to-alb-view test'} style={{cursor: 'pointer'}} onClick={clearSong}>
        BACK
      </div>
    </div>
  )
}

export default SongView