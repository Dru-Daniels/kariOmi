import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from './ErrorList.js'
import translateServerErrors from './../services/translateServerErrors.js'

const NewSongForm = (props) => {

  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [newSongId, setNewSongId] = useState([])
  const [newSong, setNewSong] = useState({
    artistName: '',
    songTitle: '',
    karaokeVideoId: '',
    lyricVideoId: '',
    lyrics: '',
    practiceNotes: '',
    performanceReady: 'False'
  })

  const addNewSong = async () => {
    try {
      const response = await fetch('/api/v1/songs', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newSong)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        const newSong = body.song
        setNewSongId(newSong.id)
        if(body.song) {
          setShouldRedirect(true)
        }
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  const handleInputChange = event => {
    setNewSong({
      ...newSong,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    addNewSong(newSong)
    if (response.ok) {
      clearForm()
    }
  }
  
  const clearForm = () => {
    setNewSong({
      artistName: '',
      songTitle: '',
      karaokeVideoId: '',
      lyricVideoId: '',
      lyrics: '',
      practiceNotes: '',
      performanceReady: False
    })
  }

if (shouldRedirect){
  return <Redirect to={`/songs/${newSongId}`} />
}

return(
    <div className='form background-runner'>
      <ErrorList errors={errors} />
      <form className='main-container recipe-form' onSubmit={handleSubmit}>
        <h1 className= 'text-center formTitle'>Add a new song!</h1>
        <label>
          Artist:
          <input
            className='input'
            type='text'
            name='artistName'
            onChange={handleInputChange}
            value={newSong.artistName}
          />
        </label>

        <label>
          Song Title:
          <select 
            className='input'
            name='songTitle' 
            onChange={handleInputChange}
            value={newSong.songTitle}>
            <option></option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </label>

        <label>
          Pick A Karaoke Video to Save:
          <input 
            className='input'
            type='text'
            name='karaokeVideoId'
            onChange={handleInputChange}
            value={newSong.karaokeVideoId}
          />
        </label>

        <label>
          Pick A Lyric Video to Save:
          <input 
            className='input'
            type='text'
            name='lyricVideoId'
            onChange={handleInputChange}
            value={newSong.lyricVideoId}
          />
        </label>

        <label>
          Add Song to "go-to" Song List?
          <select 
            className='input'
            name='performanceReady' 
            onChange={handleInputChange}
            value={newSong.performanceReady}>
            <option></option>
            <option value='True'>Yes! It's ready!</option>
            <option value='False'>No. Still needs some work</option>
          </select>
        </label>

        <div className='button-group'>
          <input 
            className='btn btn-primary' 
            type='submit' 
            value='Submit' 
          />
        </div>
      </form>
    </div>
  )
}
export default NewSongForm
