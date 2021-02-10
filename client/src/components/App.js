import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'

import '../assets/scss/main.scss'

import getCurrentUser from '../services/getCurrentUser'
import RegistrationForm from './registration/RegistrationForm'
import SignInForm from './authentication/SignInForm'
import TopBar from './layout/TopBar'
import ArtistIndex from './ArtistIndex'
import SongShow from './SongShowPage'
import HomePage from './HomePage'
import NewSongForm from './NewSongForm'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <AuthenticatedRoute exact path='/artists' component={ ArtistIndex } user={currentUser}/>
        <Route exact path='/users/new' component={RegistrationForm} />
        <Route exact path='/user-sessions/new' component={SignInForm} />
        <AuthenticatedRoute exact path='/songs/new' component={NewSongForm} user={currentUser}/>
        <AuthenticatedRoute exact path='/songs/:id' component={SongShow} user={currentUser}/>
      </Switch>
    </Router>
  )
}

export default hot(App)