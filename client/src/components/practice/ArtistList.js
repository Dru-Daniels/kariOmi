import React, { useState, useEffect } from 'react'

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
      if (body.artist.songs.length !== 0) {
        setArtist(body.artist)
      } else {
        artistDelete()
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const artistDelete = async () => {
    try {
      const response = await fetch(`/api/v1/artists/${artistId}`, {
        method: 'DELETE',
        headers: new Headers ({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
        await response.json()
        props.getArtists()
        return true
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getArtist()
  }, [])
      
  const songTiles = artist.songs.map((song, index) => {
    return (
      <div  className='item' key={song.id} >
        <SongTile
          key={song.id}
          song={song}
          artistImg={artist.imgUrl}
          />
      </div>
    )
  })

  return(
    <div className="carousel-container">
      <h2 className="artist-title">{artist.artistName}</h2>
      <div className='containers'>
          {songTiles}
      </div>
    </div>
  )
}

export default ArtistList