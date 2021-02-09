import React, { useState, useEffect } from 'react'
import SongTile from './SongTile'

const ArtistList = (props) => {

  const [artist, setArtist] = useState({
    id: '',
    name: '',
    songs: []
  })

  const artistId = props.match.params.id

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
      />
    )
  })

  return(
    <div>
      <h1>{artist.name}</h1>
      {songTiles}
    </div>
  )
}

export default ArtistList