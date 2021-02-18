import React from 'react'

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
      <p>...</p>
    </div>
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
  
  return (
    <div>
      <div className='ui embed' id='large-vid'>
        <iframe src={videoSrc} allowFullScreen title='Video player' />
      </div>
      <div className='ui segment'>
        <h4>^This Video will Save to Your Song Card!</h4>
        <h4 className='ui header'>{video.snippet.title}</h4>
      </div>
    </div>
  )
}

export default VideoDetail