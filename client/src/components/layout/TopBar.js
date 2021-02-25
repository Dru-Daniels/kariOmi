import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../authentication/SignOutButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import catPic from '../../assets/scss/images/cat.png'

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key='sign-in'>
      <Link id="primary-btn" to='/user-sessions/new'>Sign In</Link>
    </li>,
    <li  key='sign-up'>
      <Link id="primary-btn" to='/users/new' className='button'>
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key='sign-out'>
      <SignOutButton />
    </li>,
  ]

  const hamburgerMenu = () => {
    var burger = document.getElementById('hideToggle')
    var burgers = document.getElementById('hideToggles')
    var bob = document.getElementById('showToggle')
    if (burger.style.display === 'flex') {
      burger.style.display = 'none'
      bob.style.display = 'flex'
    } else {
      burger.style.display = 'flex'
      bob.style.display = 'none'
    }
  }

  return (
    <div className='top-bar' id='top-bar-color'>
      <div className='top-bar-left' >
          <a href='javascript:void(0)' className='icon' onClick={hamburgerMenu}>
            <FontAwesomeIcon icon={ faBars } />
          </a>
          <div id='showToggle'> 
            <Link to='/'>
              <h1 className='text-center'>KariOmi
                <img src={catPic} className='cat-pic'/>
              </h1>
            </Link>
          </div>
          <div id='hideToggle'>
            <Link id='link-to-form' to='/songs/new'>Add New Song</Link>
            <Link id='link-to-form' to='/artists'>Practice</Link>
            <Link id='link-to-form' to='/go-tos'>Perform</Link>
          </div>
      </div>
      <div className='top-bar-right'>
        <ul className='menu sign-in-out-ul'>{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  )
}

export default TopBar
