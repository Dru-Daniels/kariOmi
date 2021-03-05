import React from 'react'

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div>
        <p>Click on a video to add it to your song card</p>
      </div>
    )
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
  
  return (
    <div>
      <div className='ui embed tile-selected' id='large-vid'>
        <iframe src={videoSrc} allowFullScreen title='Video player' />
      </div>
      <div className='vid-description'>
        <h4 id='song-form-title'>^This Video will Save to Your Song Card!</h4>
        <p >Not every video will play, make sure to check your selection before submitting!</p>
      </div>
    </div>
  )
}

export default VideoDetail