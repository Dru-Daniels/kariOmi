import React, { useState, useEffect } from 'react'
import SongTile from './SongTile'
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
]

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

  const songTiles = artist.songs.map((song) => {
    return (
      <SongTile
        key={song.id}
        song={song}
        artistImg={artist.imgUrl}
      />
    )
  })

  return(
    <div className="carousel-container">
      <h2>{artist.artistName}</h2>
      <div>
        <Carousel breakPoints={breakPoints}>
          {songTiles}
        </Carousel>
      </div>
    </div>
  )
}

export default ArtistList