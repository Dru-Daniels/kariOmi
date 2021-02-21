import React from "react"
import { Link } from "react-router-dom"
import micPic from '../assets/scss/images/mic.png'

const SongTile = (props) => {

  const lyrics = props.song.lyrics.substring(0,48)
  const songtitle = props.song.songTitle.substring(0,41)

  return(
    <div className="container">
      <div className="card">
        <div className="circle">
          <h2><img src={micPic} className='cat-pic'/></h2>
        </div>
        <div className='content'>
          <p className='card-title'>{songtitle}</p>
          <p>{lyrics}...</p>
          <Link  className="song-tile-link"to={`/songs/${props.song.id}`}>
            Practice Song!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SongTile