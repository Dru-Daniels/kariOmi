import React from 'react'
import VideoItem from './VideoItem'

const VideoList = ({videos , handleVideoSelect}) => {

  const renderedVideos =  videos.map((video) => {
    return (
      <VideoItem 
        key={(video.id.videoId + 1)} 
        video={video} 
        handleVideoSelect={handleVideoSelect} 
      />
    )
  })

  return ( 
    <div className='ui relaxed divided list'>
      {renderedVideos}
    </div> 
  )
}
export default VideoList