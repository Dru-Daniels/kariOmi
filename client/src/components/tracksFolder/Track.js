import React from 'react'

const Track = (props) => {
  const {track, handleTrackSelect} = props

  const handleSongChoice = (e) => {
    handleTrackSelect(track)
  }

  return (
    <div className="col-md-6" >
      <div id='track-tile'>
        <h5 className='text-center'>{track.artist_name}</h5>
        <p className="card-text">
          <strong><i className="fas fa-play"></i>Track</strong>: {track.track_name}
          <br/>
          <strong><i className=" fas fa-compact-disc"></i>Album</strong>:
          {track.album_name}
        </p>
          <label
            id="primary-btn"
            type="button"
            className="button"
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