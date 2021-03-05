import React from 'react'
import { FaPlay, FaCompactDisc } from 'react-icons/fa'

const Track = (props) => {
  const {track, handleTrackSelect, selectedStatus} = props

  let divClass = "track-tile tile-selected"
  if(!selectedStatus) {
    divClass = 'track-tile'
  }

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
      <div className={divClass}>
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