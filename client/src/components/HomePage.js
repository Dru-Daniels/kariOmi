import React from 'react'
import { Link } from 'react-router-dom'

import catPic from '../assets/scss/images/cat.png'

const HomePage = (props) => {
  return (
    <div className='home-page'>
      <div className='cell'>
      <h1 className="text-center home-page-title">KariOmi</h1>
      <img src={catPic} className='cat-home-pg'/>
      <div className='home-pg-btn-container'>
        </div>
        <div className='input' id="home-page-btn" >          
          <Link to='/songs/new' style={{ color: '#5A54D1' }}>
            <h5 className='hm-btn'>Add a New Song</h5>
          </Link>          
        </div>
        <div className='input' id="home-page-btn" >          
          <Link to='/artists'  style={{ color: '#5A54D1' }}>
            <h5 className='hm-btn'>Go to your Practice Pad </h5>
          </Link>         
        </div>
        <div className="input" id="home-page-btn" >
          <Link to='/go-tos' style={{ color: '#5A54D1' }}>
            <h5 className='hm-btn'>See my "Go-Tos" List!</h5>
          </Link>          
        </div>
      </div>
    </div>
      
  )
}

export default HomePage