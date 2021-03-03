import React from "react"
import { Link } from "react-router-dom"
import micPic from '../../assets/scss/images/mic.png'

const SongTile = (props) => {

  const lyrics = props.song.lyrics.substring(0,20)
  const songTitle = props.song.songTitle.substring(0,38)

  return(
      <div className="card">
        <div className="circle">
          <img src={ micPic } className='mic-pic'/>
        </div>
        <div className='content'>
          <p className='card-title'>{ songTitle }</p>
          <p>{ lyrics }...</p>
          <Link  className="song-tile-link"to={`/songs/${props.song.id}`}>
            Practice Song!
          </Link>
        </div>
      </div>
  )
}

export default SongTile