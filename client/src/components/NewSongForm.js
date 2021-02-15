import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from './ErrorList.js'
import translateServerErrors from './../services/translateServerErrors.js'

import axios from 'axios'
import { Context } from '../context'

import VideoList from './youtubeFolder/VideoList'
import VideoDetail from './youtubeFolder/VideoDetail'
import Tracks from './tracksFolder/Tracks'

const REACT_APP_MM_KEY='1f3681a93333f848e78152032bee26e7'
const youTubeApiKey= 'AIzaSyCQtsJusuh_nPm_rdRZ8zUdY5uCFErIa7Q'

const NewSongForm = (props) => {

  const [state, setState] = useContext(Context)
  const [userInput, setUserInput] = useState('')
  const [trackTitle, setTrackTitle] = useState('')

  const [karaokeVideos, setKaraokeVideos] = useState([])
  const [selectedVideo1, setSelectedVideo1] = useState(null)

  const [lyricVideos, setLyricVideos] = useState([])
  const [selectedVideo2, setSelectedVideo2] = useState(null)


  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [newSongId, setNewSongId] = useState('')
  const [formData, setFormData] = useState({
    track: {},
    karaokeVideoId: '',
    lyricVideoId: '',
    practiceNotes: 'None Yet...Add me! :D',
    lyrics: 'unavailable',
    performanceReady: false
  })

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

  const getSongData = (userInput) => {
    let karaokeQuery = `karaoke ${userInput}`
    let lyricsQuery = `lyric video ${userInput}`
    axios.all([
      axios.get(`https://cors-access-allow.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${userInput}&page_size=6&page=1&s_track_rating=desc&apikey=${REACT_APP_MM_KEY}`), 
      
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${karaokeQuery}&type=video&videoDefinition=high&key=${youTubeApiKey}`),
      
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${lyricsQuery}&type=video&videoDefinition=high&key=${youTubeApiKey}`)
    ])
    .then(axios.spread((data1, data2, data3) => {
      let track_list = data1.data.message.body.track_list;
      setState({ track_list: track_list, heading: 'Click the best Fit!' });
    
      let karaokeVideos = data2.data.items
      setKaraokeVideos(karaokeVideos)

      let lyricVideos = data3.data.items
      setLyricVideos(lyricVideos)

      console.log(
        'data1', data1, 
        'data2', data2, 
        'data3', data3
      ) 
    }))
  }

  useEffect(() => {
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
  }

  if(shouldRedirect){
    return <Redirect to={`/songs/${newSongId}`} />
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
    <div className='background-runner-form'>
      <ErrorList errors={errors} />
      <div className='grid-x grid-margin-x grid-padding-x'>
        <div className= 'cell small-12 medium-8'>
          <form className='new-song-form' onSubmit={onSubmitHandler}>
            <h3 className='text-center' id='song-form-title'>
              Search to Add A New Song!
            </h3>
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
            <button className='button' type='submit'>
            Get Track Lyrics
            </button>
          </form>

          <form onSubmit={handleSubmit}>
            <Tracks handleTrackSelect={handleTrackSelect} />
            <h4>Karaoke Videos:</h4>
            <div className='eleven wide column'>
              <VideoDetail video={selectedVideo1}/>
            </div>
            <div className='five wide column'>
              <VideoList handleVideoSelect={handleKaraokeVideoSelect} videos={karaokeVideos}/>
            </div>
            <h4>Lyric Videos:</h4>
            <div className='eleven wide column'>
              <VideoDetail video={selectedVideo2}/>
            </div>
            <div className='five wide column'>
              <VideoList handleVideoSelect={handleLyricVideoSelect} videos={lyricVideos}/>
            </div>
          
            <label>
              <h4 id='song-form-title'>Do you want this song on your "go-to" performance list?!</h4>
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
  )
}
export default NewSongForm