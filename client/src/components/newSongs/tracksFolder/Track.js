import React from 'react'
import { FaPlay, FaCompactDisc } from 'react-icons/fa'

const Track = (props) => {
  const {track, handleTrackSelect} = props

  const handleSongChoice = (e) => {
    handleTrackSelect(track)
  }

  return (
    <label
      className="track-label"
      name="track"
      value={track}
      onClick={handleSongChoice}
    >
      <div id='track-tile'>
        <h5 id='card-title'>{track.artist_name}</h5>
        <p className="card-text">
          <strong><FaPlay size={16} />Track</strong>: {track.track_name}
          <br/>
          <strong>< FaCompactDisc size={16} />Album</strong>:
          {track.album_name}
        </p>
      </div>
    </label> 
  )
}

export default Track