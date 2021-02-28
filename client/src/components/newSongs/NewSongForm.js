import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../context'

import ErrorList from '../ErrorList.js'
import translateServerErrors from '../../services/translateServerErrors.js'

import earPhoneCat from '../../assets/scss/images/pandaHeadphones.png'


import VideoList from './youtubeFolder/VideoList'
import VideoDetail from './youtubeFolder/VideoDetail'
import Tracks from './tracksFolder/Tracks'

const NewSongForm = (props) => {

  const [state, setState] = useContext(Context)
  const [userInput, setUserInput] = useState("")
  const [trackTitle, setTrackTitle] = useState("")

  const [karaokeVideos, setKaraokeVideos] = useState([])
  const [selectedVideo1, setSelectedVideo1] = useState(null)

  const [lyricVideos, setLyricVideos] = useState([])
  const [selectedVideo2, setSelectedVideo2] = useState(null)


  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [songId, setSongId] = useState('')
  const [formData, setFormData] = useState({
    track: {},
    karaokeVideoId: "",
    lyricVideoId: "",
    practiceNotes: 'None Yet...Add me! :D',
    lyrics: 'unavailable',
    performanceReady: false
  })

  const getSongData = async (userInput) => {
    try {
      const response = await fetch(`/api/v1/new-songs?query=${userInput}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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
        const track_list = body.trackResults.message.body.track_list
        const karaoke = body.karaokeResults.items
        const lyrics = body.lyricResults.items
        setState({ track_list: track_list, heading: 'Click the best Fit!' });
        setKaraokeVideos(karaoke)
        setLyricVideos(lyrics)
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const addNewSong = async (formData) => {
    try {
      const response = await fetch('/api/v1/songs', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formData)
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
        const song = body.song
        setSongId(song.id)
        if(body.song) {
          setShouldRedirect(true)
        }
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [trackTitle])
  
  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    addNewSong(formData)
    clearForm()
    
  }
  
  const clearForm = () => {
    setFormData({
      track: {},
      karaokeVideoId: '',
      lyricVideoId: '',
      practiceNotes: 'None Yet...Add me! :D',
      lyrics: 'unavailable',
      performanceReady: false
    })
    setState({
      track_list: [],
      heading: ''
    })
  }

  if(shouldRedirect){
    return <Redirect to={`/songs/${songId}`} />
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    setTrackTitle(userInput)
    getSongData(userInput)
  }

  const onChange = e => {
    setUserInput(e.target.value)
  }

  const handleKaraokeVideoSelect = (video) => {
    setSelectedVideo1(video)
    setFormData({...formData,
      karaokeVideoId: video.id.videoId})
  }

  const handleLyricVideoSelect = (video) => {
    setSelectedVideo2(video)
    setFormData({...formData,
      lyricVideoId: video.id.videoId})
  }

  const handleTrackSelect = (selectedTrack) => {
    setFormData({...formData,
      track : selectedTrack
    })
  }

return(
  <div id='body-accent'>
    <div className='background-runner-form'>
      <ErrorList errors={errors} />
      <div className=''>
        <div className= ''>
          <form className='new-song-form' onSubmit={onSubmitHandler}>
            <h1 className='text-center' id='song-form-title-main'>
              Search to Add A New Song!
            </h1>
            <div className='form-group'>
              <input
                type='text'
                className='input'
                placeholder='Song Title and Artist Name...'
                name='userInput'
                value={userInput}
                onChange={onChange}
              />
            </div>
            <button id='primary-btn' className='button' type='submit'>
            Get Track Lyrics
            </button>
          </form>

          <form className='new-song-form' onSubmit={handleSubmit}>
            <Tracks handleTrackSelect={handleTrackSelect} />
            <h4 id='song-form-title'>Karaoke Videos:</h4>
            <div className='eleven wide column'>
              <VideoDetail video={selectedVideo1}/>
            </div>
            <div className='five wide column'>
              <VideoList handleVideoSelect={handleKaraokeVideoSelect} videos={karaokeVideos}/>
            </div>
            <span className='song-show-item pic'>
              <img className='panda' src={earPhoneCat}/>
            </span>
            <h4 id='song-form-title'>Lyric Videos:</h4>
            <div className='eleven wide column'>
              <VideoDetail video={selectedVideo2}/>
            </div>
            <div className='five wide column'>
              <VideoList handleVideoSelect={handleLyricVideoSelect} videos={lyricVideos}/>
            </div>
          
            <label>
              <h4 id='song-form-title'>Do you want this song on your 'go-to' performance list?!</h4>
              <select 
                className='input'
                name='performanceReady' 
                onChange={handleInputChange}
                value={formData.performanceReady}>
                <option></option>
                <option value={true}>Yes! It's ready!</option>
                <option value={false}>Nope. Gotta Practice First!</option>
              </select>
            </label>
              
            <div>
              <input
                className='primary-btn' 
                id='primary-btn' 
                type='submit' 
                value='Submit' 
              />
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default NewSongForm