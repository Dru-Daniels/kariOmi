import React, { useState, useEffect } from "react"

import catPic from '../assets/scss/images/cat.png'
import ArtistList from "./ArtistList"

const KariomiIndex = props => {
  const [songs, setSongs] = useState([])

  const getArtist = async () => {
    try{
      const response = await fetch('/api/v1/artist')
      if(!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw(error)
      }
      const songsBody = await response.json()
      setSongs(songsBody.songs)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    window.scrollTo(0, 0)
    getSongs()
  }, [])

  return (
    <div className="row background-runner">
      <div className="small-8 small-centered columns main-container">
        <h1 className="text-center">KariOmi
          <img src={catPic} className='cat-pic'/>
        </h1>
        <div>
          <ArtistList/>
        </div>
      </div>
    </div>
  )
}

export default KariomiIndex