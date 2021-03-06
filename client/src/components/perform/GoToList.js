import React, { useState, useEffect } from 'react'

import { Collapse } from 'antd'
const { Panel } = Collapse

import GoToSong from './GoToSong'
import starCat from '../../assets/scss/images/starCat.png'

const GoToList = (props) =>  {
  
  const [songs, setSongs] = useState([])
  
  const getGoToSongs = async () => {
    try {
      const response = await fetch(`/api/v1/performances`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setSongs(body.songs)
    } catch (error) {
      console.error(error)
      console.error(`Error in fetch ${error.message}`)
    }
  }
  
  function callback(key) {
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getGoToSongs()
  }, [])



  let goToSongList = songs.map((song, i) => {
    return (
      <Panel header={song.songTitle} key={song.id}>  
        < GoToSong 
          key={song.id}
          overAllSongScore={song.overallSongScore}
          performances={song.performances}
          song={song}
          getGoToSongs={getGoToSongs}
        />
      </Panel>
    )
  })
  
  return (
    <div className='body-accent'>
      <div className="background-runner-form">
        <div className='go-to-list-container '>
          <h1 className='go-to-title text-center'>Go-Tos: Sing Me!</h1>
            <Collapse onChange={callback} id='go-to-drop-down'>
              {goToSongList}
            </Collapse>
        </div>

        <div className='song-show-container' id='star-cat-container'>
          <div className='song-show-item pic'>
                <img id='star-cat' src={starCat}/>
                <h1 className='song-show-item pic' id='star-cat-text'>
                You're a Star!
                </h1>
              </div>
        </div>
      </div>

    </div>
  )
}

export default GoToList