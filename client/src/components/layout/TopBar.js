import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../authentication/SignOutButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import catPic from '../../assets/scss/images/cat.png'

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key='sign-in'>
      <Link to='/user-sessions/new'>Sign In</Link>
    </li>,
    <li key='sign-up'>
      <Link to='/users/new' className='button'>
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
    if (burger.style.display === 'block') {
      burger.style.display = 'none'
    } else {
      burger.style.display = 'block'
    }
  }

  return (
    <div className='top-bar' id='top-bar-color'>
      <div className='top-bar-left' >
        <ul className='menu' id='top-bar-colors'>
          <li className='menu-text'></li>
          <a href='javascript:void(0)' className='icon' onClick={hamburgerMenu}>
            <FontAwesomeIcon icon={ faBars } />
          </a>
          <div id='hideToggle'>
            <li id='menuItem' ><Link to='/songs/new'>Add New Song!</Link></li>
          </div>
          <h1 className='text-center'>KariOmi
            <img src={catPic} className='cat-pic'/>
          </h1>
        </ul>
      </div>
      <div className='top-bar-right'>
        <ul className='menu'>{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  )
}

export default TopBar
