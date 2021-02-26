import React, { useContext } from 'react'
import { Context } from '../../../context'
import Track from './Track'


const Tracks = ({handleTrackSelect}) => {
  const [state] = useContext(Context)
  const { track_list, heading } = state

  return (
    <>
      <h4 id='song-form-title'>{heading}</h4>
      <div className='row'>
        {track_list.map(item => (
          <Track key={item.track.track_id} track={item.track} handleTrackSelect={handleTrackSelect}/>
        ))}
      </div>
    </>
  )
}

export default Tracks
