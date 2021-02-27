import React, { useState, useEffect } from 'react'
import Slider from "react-slick"

import SongTile from './SongTile'

const ArtistList = (props) => {
  
  
  const [artist, setArtist] = useState({
    id: '',
    artistName: '',
    songs: []
  })
  
  const artistId = props.artist.id
      
  const getArtist = async () => {
    try{
      const response = await fetch(`/api/v1/artists/${artistId}`)
      if(!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw(error)
      }
      const body = await response.json()
      setArtist(body.artist)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getArtist()
  }, [])
      
  const songTiles = artist.songs.map((song, index) => {
    return (
      <div  key={song.id} index={index} style={{ width: 300 }}>
        <SongTile
          key={song.id}
          song={song}
          artistImg={artist.imgUrl}
          />
      </div>
    )
  })

  var settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
  };

  return(
    <div className="carousel-container">
      <h2 className="artist-title">{artist.artistName}</h2>
      <div>
        <Slider {...settings}>
          {songTiles}
        </Slider>
      </div>
    </div>
  )
}

export default ArtistList