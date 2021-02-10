import React, { useState, useEffect } from "react"

const SongTile = (props) => {

  const videoSrcK = `https://www.youtube.com/embed/${props.song.karaokeVideoId}`
  const videoSrcL = `https://www.youtube.com/embed/${props.song.lyricVideoId}`

  return(
    <div>
      <h1>Hello from the Song Tile!</h1>
      <div>
        <div className="ui embed">
          <iframe src={videoSrcK} allowFullScreen title="Video player" />
        </div>
        <div className="ui embed">
          <iframe src={videoSrcL} allowFullScreen title="Video player" />
        </div>
        <p className='lyrics'>{props.song.lyrics}</p>
      </div> 
    </div>
  )
}

export default SongTile