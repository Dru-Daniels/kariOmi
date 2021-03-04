import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import CatMouse from '../../assets/scss/images/catWitMouse.png'

import ArtistList from "./ArtistList"

const ArtistIndex = props => {

  const [artists, setArtists] = useState([])

  const getArtists = async () => {
    try {
      const response = await fetch('/api/v1/artists')

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setArtists(body.artists)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  let message; 
  if (artists.length > 0) {
    message = (
      <div className='practice-title-container'>
        <h1 className='text-center' id="practice-title">Practice Pad</h1>
      </div>
    )
  } else {
    message = (
      <div className='practice-title-container'>
        <h1 className='text-center' id="song-form-title-main">Uh oh! You need to add some songs!</h1>
        <Link to='/songs/new'><h4 className='center-text practice-text' id='song-form-title'>Click Me!</h4></Link>
        <img className='cat-mouse' src={CatMouse}/>
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getArtists()
  }, [])

  const artistListTiles = artists.map(artist => {
    return (
      <ArtistList
        key={ artist.id }
        artist={ artist }
        getArtists={ getArtists }
      />
    )
  })

  return (
    <div className="background-runner">
        {message}
        <div className=''>
          {artistListTiles}
        </div>
    </div>
  )
}

export default ArtistIndex