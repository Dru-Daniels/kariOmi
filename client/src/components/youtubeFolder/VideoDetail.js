import React from 'react'

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
      <p>...Waiting for your search...</p>
    </div>
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
  
  return (
    <div>
      <div className='ui embed'>
        <iframe src={videoSrc} allowFullScreen title='Video player' />
      </div>
      <div className='ui segment'>
        <h2 id='song-form-title'>This Video will Save to Your Song Card!</h2>
        <h4 className='ui header'>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  )
}

export default VideoDetail