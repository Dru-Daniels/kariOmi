import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
 
import RabbitSing from '../assets/scss/images/rabbitSing.png'
import RabbitPinkDancing from '../assets/scss/images/RabbitPinkDancing.png'
import SmartCat from '../assets/scss/images/smartCat.png'

import ErrorList from './ErrorList'

const SongShow = ({ user }) => {
  
  const [errors, setErrors] = useState({})
  const [song, setSong] = useState({})
  const [newSong, setNewSong] = useState({
    id: song.id,
    songTitle: song.songTitle,
    karaokeVideoId: song.karaokeVideoId,
    lyricVideoId: song.lyrics,
    lyrics: song.lyrics,
    practiceNotes: '',
    performanceReady: song.performanceReady,
    artistId: song.artistId,
    userId: song.userId
  })

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1},
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 }
  ]
  
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

  const saveNote = (event) => {
    event.preventDefault()
    updateSong(newSong)
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setNewSong({
      ...newSong,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }
  
  useEffect(() => {
    getSong()
  }, [])
  
  const videoSrcK = `https://www.youtube.com/embed/${song.karaokeVideoId}`
  const videoSrcL = `https://www.youtube.com/embed/${song.lyricVideoId}`
  
  let artist = ' The Artist'
  if (song.artist !== undefined) {
    artist = song.artist.artistName
  }
  
  return (
    <div className='grid-container' id='parent'>   
      <h1 className='title-song-show'>Time to Practice!</h1>
      <div className='flex' >
        <div className='song-show-container'>
          <div className='song-show-item'>
            <div className='back-cover'>
              <div className='ipod-main'>
                <div className='screen'>
                  <iframe allowFullScreen preload='auto' src={videoSrcL}/> 
                </div>
                <div className='navigator'>        
                  <div className='keys'>                             
                    <span className='menu-btn'>MENU</span>                
                    <img className='fwd' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-forward-256.png'/>                  
                    <img className='bkd' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-backward-128.png'/>                  
                    <img className='play-pause' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/play-128.png'/>                
                    <div className='play'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='song-show-item pic'>
            <div className='song-show-item pic'>
              <img className='rabbit-show' src={RabbitSing}/>
            </div>
            <div>
              <h1 className='subheading'>Sing Along with {artist}</h1>
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
                <img className='rabbit-show' src={RabbitPinkDancing}/>
              </div>
          </div>
          <div className='song-show-item'>
            <div className='back-cover'>
              <div className='ipod-main'>
                <div className='screen'>
                  <iframe allowFullScreen preload='auto' src={videoSrcK}/> 
                </div>
                <div className='navigator'>        
                  <div className='keys'>      
                      <span className='menu-btn'>MENU</span>
                      <img className='fwd' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-forward-256.png'/>
                      <img className='bkd' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-backward-128.png'/>
                      <img className='play-pause' src='https://cdn2.iconfinder.com/data/icons/snipicons/5000/play-128.png'/>
                      <div className='play'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>Lyrics Drop Herrrr.</h1>
      <div id='needtowrap'>
          <p className='content-lyrics lyrics'>{song.lyrics}</p>
      </div>

      <div className='grid-x grid-margin-x grid-padding-x'>
        <div className= 'cell small-12 medium-8'>
          <form className='form-show' onSubmit={saveNote} >
            <ErrorList errors={errors} />
            <h4 className='song-show-form-title'>
              Hey Singer, Leave some Practice Notes!
            </h4>
            <p>{song.practiceNotes}</p>
            <div className='button-group'>
              <input 
                type='text' 
                name='practiceNotes' 
                value={newSong.practiceNotes} 
                onChange={handleInputChange} 
                placeholder='Type here to update your notes =]'
              />
            </div>
            <div>
              <input 
                type='submit' 
                className='button' 
                value='Save Notes' 
              />
            </div>
          </form>
          <img className='smart-cat-show' src={SmartCat}/>
        </div>
      </div>

    </div>
  )
}



export default SongShow