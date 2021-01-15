import React, { useEffect } from 'react'
import { HorizontalBar, Bar } from 'react-chartjs-2'
import './SongView.css'

const SongView = (props) => {

  const { loadedSong, clearSong } = props

  const songLengthMins = Math.floor((loadedSong.duration_ms / 1000)/60)
  const songLengthSecs = Math.round((loadedSong.duration_ms / 1000) % 60)

  const smallScreen = (window.innerWidth < 500)
  const happySong = (loadedSong.valence > 0.5)
  const acousticSong = (loadedSong.acousticness > 0.4)
  const danceableSong = (loadedSong.danceability > 0.45)
  const energeticSong = (loadedSong.energy > 0.4)
  const instrumentalSong = (loadedSong.instrumentalness > 0.5)
  const liveSong = (loadedSong.liveness > 0.4)
  const spokenSong = (loadedSong.speechiness > 0.33)


  const trueColor = 'rgba(0, 255, 0, 0.2)'
  const trueColorSolid = 'rgba(0, 255, 0, 1)'

  const falseColor = 'rgba(255, 84, 84, 0.2)'
  const falseColorSolid = 'rgba(255, 84, 84, 1)'

  useEffect(()=>{
    console.log(loadedSong)
  })

  const data = {
    labels: ['Acousticness', 'Danceability', 'Valence', 'Instrumentalness', 'Energy', 'Liveness', 'Speechiness'],
    datasets: [
      {
       // label: 'Value',
        data: [
          loadedSong.acousticness,
          loadedSong.danceability, 
          loadedSong.valence, 
          loadedSong.instrumentalness, 
          loadedSong.energy, 
          loadedSong.liveness, 
          loadedSong.speechiness
        ],
        backgroundColor: [
          `${acousticSong?trueColor:falseColor}`,
          `${danceableSong?trueColor:falseColor}`,
          `${happySong?trueColor:falseColor}`,
          `${instrumentalSong?trueColor:falseColor}`,
          `${energeticSong?trueColor:falseColor}`,
          `${liveSong?trueColor:falseColor}`,
          `${spokenSong?trueColor:falseColor}`,
        ],
        borderColor: [
          `${acousticSong?trueColorSolid:falseColorSolid}`,
          `${danceableSong?trueColorSolid:falseColorSolid}`,
          `${happySong?trueColorSolid:falseColorSolid}`,
          `${instrumentalSong?trueColorSolid:falseColorSolid}`,
          `${energeticSong?trueColorSolid:falseColorSolid}`,
          `${liveSong?trueColorSolid:falseColorSolid}`,
          `${spokenSong?trueColorSolid:falseColorSolid}`,
        ],
        borderWidth: 1,
      },
    ],
  }

  const verticalOptions = {
    
    scales: {
      yAxes: [
        {
          ticks: {
            display: true,
            fontColor: 'white',
            beginAtZero: true,
            min: 0,
            max: 1
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
            min: 0,
            max: 1
          }
        }
      ]
    },
  }

  const horizontalOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
            min: 0,
            max: 1
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: true,
            fontColor: 'white',
            beginAtZero: true,
            min: 0,
            max: 1
          }
        }
      ]
    },
  }
 
console.log(smallScreen)
  return(
    <div >
      <h1 className={'title'}>{loadedSong.name}</h1>
      <p className={'length'}>{`(${songLengthMins}:${songLengthSecs})`}</p>
      <div className={'title btn-to-alb-view grow'} style={{cursor: 'pointer'}} onClick={clearSong}>
        BACK
      </div>
      <div className={'chart'}> 
        {window.innerWidth<500?<Bar data={data} options={horizontalOptions}/>:<HorizontalBar data={data} options={verticalOptions} />}
      </div>
    </div>
  )
}

export default SongView