import React from "react"
import { Link } from "react-router-dom"
import micPic from '../assets/scss/images/mic.png'

const SongTile = (props) => {

  const lyrics = props.song.lyrics.substring(0,40)

  return(
    <div className="container">
      <div className="card">
        <div className="circle">
          <h2><img src={micPic} className='cat-pic'/></h2>
        </div>
        <div className='content'>
          <p className='card-title'>{props.song.songTitle}</p>
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