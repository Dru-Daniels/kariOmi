import React, { useState, useEffect } from "react"

import catPic from '../assets/scss/images/cat.png'
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

  useEffect(() => {
    window.scrollTo(0, 0)
    getArtists()
  }, [])

  const artistListTiles = artists.map(artist => {
    return (
      <ArtistList
        key={ artist.id }
        artist={ artist }
      />
    )
  })

  return (
    <div className="row background-runner">
      <div className="small-8 small-centered columns">
        <h1 className="text-center">KariOmi
          <img src={catPic} className='cat-pic'/>
        </h1>
        <div className=''>
          {artistListTiles}
        </div>
      </div>
    </div>
  )
}

export default ArtistIndex