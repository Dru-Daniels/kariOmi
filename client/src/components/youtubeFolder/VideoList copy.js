import React from 'react'
import VideoItem from './VideoItem'

const LyricVideoList = ({videos , handleLyricVideoSelect}) => {

  const renderedVideos =  videos.map((video) => {
    return (
      <VideoItem 
        key={(video.id.videoId + 1)} 
        video={video} 
        handleVideoSelect={handleLyricVideoSelect} 
      />
    )
  })

  return ( 
    <div className='ui relaxed divided list'>
      {renderedVideos}
    </div> 
  )
}
export default LyricVideoList