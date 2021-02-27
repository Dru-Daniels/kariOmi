import React from 'react'

 const Ipod = ({videoSrc}) => {

  return (
    <div className='song-show-item'>
    <div className='back-cover'>
      <div className='ipod-main'>
        <div className='screen'>
          <iframe allowFullScreen preload='auto' src={ videoSrc }/> 
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
  )
}

export default Ipod