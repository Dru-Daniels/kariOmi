import React, { useState, useEffect } from 'react'

import SongTile from './SongTile'

const ArtistList = ({artist}) => {

      
  const songTiles = artist.songs.map((song) => {
    return (
      <div  className='item' key={song.id} >
        <SongTile
          key={song.id}
          song={song}
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