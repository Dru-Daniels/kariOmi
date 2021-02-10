import React from 'react'
import { Link } from 'react-router-dom'


import catPic from '../assets/scss/images/cat.png'

const HomePage = (props) => {
  return (
    <div className='home-page'>
      <div className="grid-container text-center landing-header grid-margin-y grid-y">
        <div className='cell'>
        <h1 className="text-center">KariOmi
          <img src={catPic} className='cat-pic'/>
        </h1>
        </div>
        <div className='cell'>
          <h5>
            <Link to='/songs/new'>Add a New Song</Link>
          </h5>
        </div>
        <div className='cell'>
          <div className="grid-x grid-padding-x grid-margin-x grid-margin-y grid-padding-y">
            <div className="cell small-12 medium-6 landing-callout align-center">
              <h5>
                <Link to='/artists'>Go to your Practice Pad</Link>
              </h5>
            </div>
            <div className="cell small-12 medium-6 landing-callout">
              <h5>
                <Link to='/performances'>See my "Go-Tos" List!</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage