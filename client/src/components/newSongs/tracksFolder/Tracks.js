import React, { useContext } from 'react'
import { Context } from '../../../context'
import Track from './Track'


const Tracks = ({handleTrackSelect, selectedTrackId}) => {
  const [state] = useContext(Context)
  const { track_list, heading } = state

  
  let listOfTracks = track_list.map(item => {
    let selectedStatus = false
    if (selectedTrackId === item.track.track_id) {
      selectedStatus = true
    }
    return(
      <Track 
        key={item.track.track_id} 
        track={item.track} 
        handleTrackSelect={handleTrackSelect}
        selectedStatus={selectedStatus}
      />
    )
  })

  return (
    <>
      <h4 id='song-form-title'>{heading}</h4>
      <div className='track-container'>
        { listOfTracks }
      </div>
    </>
  )
}

export default Tracks
