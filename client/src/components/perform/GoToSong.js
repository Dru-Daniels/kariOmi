import React, {useState} from 'react'

import translateServerErrors from '../../services/translateServerErrors'

import PerformanceTile from './PerformanceTile'
import Spinner from '../layout/Spinner'
import RatingForm from './RatingForm'

const GoToSong = ({song, overAllSongScore, performances, getGoToSongs}) => {
  
  const [spin, setSpin] = useState(false)

  const postNewPerformance = async (formPayload) => {
    setSpin(true)
    try {
      const response = await fetch(`/api/v1/songs/${song.id}/performances`, {
        method: "POST",
        headers: new Headers({
          "Accept": "video/mp4"
        }),
        body: formPayload
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        await response.json()
        getGoToSongs()   
        setSpin(false)     
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

     const performanceDelete = async (performanceId) => {
      try {
        const response = await fetch(`/api/v1/performances/${performanceId}`, {
          method: 'DELETE',
          headers: new Headers ({
            "Content-Type": "application/json"
          })
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
          await response.json()
          getGoToSongs()
          return true
      } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
      }
    }

  let performanceList = performances.map(performance => {
    return (
      < PerformanceTile 
        key={performance.id}
        performance={performance}
        performanceDelete={performanceDelete}
      />
    )
  })

  let songScore = overAllSongScore
  songScore = (isNaN(songScore) ? 'NA' : songScore)

  let alertMessage

  return (
    <div>
      <h4 className='rating-card-titles' >Song Score: </h4>
        <div id='song-score'>
          <span><p className='song-score-num'>{songScore}</p></span>
        </div>
      <h4 className='rating-card-titles'> Memories:</h4>
          {performanceList}
        <Spinner spin={spin} alertMessage={alertMessage}/>
      <div className='text-right'>
        <input
          className='primary-btn' 
          id='primary-btn' 
          type='submit'
          value='Add New Performance' 
        />
      </div>
      <RatingForm
        key={song.id}
        songId={song.id}
        postNewPerformance={postNewPerformance}
      />
      <hr/>
    </div>
  )
}

export default GoToSong