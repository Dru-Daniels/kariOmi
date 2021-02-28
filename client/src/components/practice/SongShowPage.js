import React, { useState, useEffect, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { useParams } from 'react-router'

import RabbitSing from '../../assets/scss/images/rabbitSing.png'
import RabbitPinkDancing from '../../assets/scss/images/RabbitPinkDancing.png'
import SmartCat from '../../assets/scss/images/smartCat.png'

import Ipod from '../layout/Ipod'
import Card from './Card'

import ToggleSwitch from "../layout/ToggleSwitch"
import ErrorList from '../ErrorList'

const SongShow = ({ user }) => {
  
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)

  const [song, setSong] = useState({})
  
  const { id } = useParams()

  const getSong = async () => {
    try {
      const response = await fetch(`/api/v1/songs/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setSong(body.song)

    } catch (error) {
      console.error(error)
      console.error(`Error in fetch ${error.message}`)
    }
  }
  
  const updateSong = async (newSong) => {
    try {
      const response = await fetch(`/api/v1/songs/${id}`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(newSong),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        setSong(body.song)
        setErrors({})
        return
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const songDelete = async () => {
    try {
      const response = await fetch(`/api/v1/songs/${id}`, {
        method: 'DELETE',
        headers: new Headers ({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
        const body = await response.json()
        setRedirect(true)
        setErrors({})
        return true
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
    }
  }

  const saveNote = (event) => {
    event.preventDefault()
    updateSong(song)
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setSong({
      ...song,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getSong()
  }, [])

  const videoSrcK = `https://www.youtube.com/embed/${song.karaokeVideoId}`
  const videoSrcL = `https://www.youtube.com/embed/${song.lyricVideoId}`
  
  let artist = ' The Artist'
  if (song.artist !== undefined) {
    artist = song.artist.artistName
  }


  let str
  if(song.lyrics !== undefined && song.lyrics !== "unavailable") {
    str = song.lyrics
    str= str.slice(0, str.length - 70)
  } else {
    str = "Sorry, lyrics aren't available for this song"
  }
  
  const onCheckedChange = (checked) => {
    updateSong({...song, 
      performanceReady: checked})
  }
      
  const aboveText = (<h6><Link to='/go-tos' className='go-to-link'>Add to Go-To List!</Link></h6>)

  const toggleBtn = (
    <ToggleSwitch 
      id="checked" 
      checked={ song.performanceReady } 
      onChange={ onCheckedChange } 
      aboveText={aboveText} 
    /> 
  )

  if(redirect){
    return <Redirect to='/artists' />
  }

  return (
    <div className='grid-container' id='parent'> 
      <h1 className='title-song-show'>Time to Practice!</h1>
      <div className='flex' >

        <div className='song-show-container'>
          <div className='song-show-item'>
           <Ipod videoSrc={videoSrcL}/>
          </div>
          <div className='song-show-item pic'>
            <div className='song-show-item pic'>
              <img className='rabbit-show' src={ RabbitSing }/>
            </div>
            <div>
              <h1 className='subheading'>Sing Along with { artist }</h1>
            </div>
          </div>
        </div>

        <div className='song-show-container'>
          <div className='song-show-item pic'>
              <div>
                <h1 className='subheading'>
                  Go Solo with the Karaoke Track
                </h1>
              </div>
              <div className='song-show-item pic'>
                <img className='rabbit-show' src={ RabbitPinkDancing }/>
              </div>
          </div>
         <Ipod videoSrc={videoSrcK}/>
        </div>
      </div>

    <div>
      <h1>Lyrics Drop Herrrr.</h1>
      <div id='needtowrap'>
          <p className='content-lyrics lyrics'>{ str }</p>
      </div>

      <h1>Check Your Progress!</h1>
      
      <div className='grid-x grid-margin-x grid-padding-x'>
        <div className= 'cell small-12 medium-8'>      
          <form className='form-show' onSubmit={ saveNote } >
            <ErrorList errors={ errors } />
            <h4 className='song-show-form-title'>
              Hey Singer, Leave some Practice Notes!
            </h4>
            
            <div className='button-group'>
              <textarea 
                rows="3"
                type='text' 
                className='input'
                name='practiceNotes' 
                value={ song.practiceNotes } 
                onChange={ handleInputChange } 
                placeholder='Type here to update your notes =]'
              />
            </div>
            <div>
              <input 
                id='primary-btn'
                type='submit' 
                className='button' 
                value='Save Notes' 
              />
            </div>
          <p className='show-notes-style'>{ song.practiceNotes }</p>
          <img className='smart-cat-show' src={ SmartCat }/>
          <div className=''>
            <Card
              songDelete={songDelete}
              toggleBtn={toggleBtn}
              aboveText={aboveText}
            />
          </div>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SongShow