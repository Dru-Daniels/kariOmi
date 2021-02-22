import React from 'react'

const Track = (props) => {
  const {track, handleTrackSelect} = props

  const handleSongChoice = (e) => {
    handleTrackSelect(track)
  }

  return (
    <div className="col-md-6" >
      <div id='track-tile'>
        <h5 id='card-title'>{track.artist_name}</h5>
        <p className="card-text">
          <strong><i ></i>Track</strong>: {track.track_name}
          <br/>
          <strong><i className=" fas fa-compact-disc"></i>Album</strong>:
          {track.album_name}
        </p>
          <label
            id="primary-btn"
            type="submit"
            className="btn btn-dark btn-dark"
            name="track"
            value={track}
            onClick={handleSongChoice}
          >Choose me!
          </label> 
      </div>
    </div>
  )
}

export default Track