import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { ContextController } from '../context'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'

import '../assets/scss/main.scss'

import getCurrentUser from '../services/getCurrentUser'
import RegistrationForm from './registration/RegistrationForm'
import SignInForm from './authentication/SignInForm'
import TopBar from './layout/TopBar'
import ArtistIndex from './practice/ArtistIndex'
import SongShow from './practice/SongShowPage'
import GoToList from './perform/GoToList'
import NewSongForm from './newSongs/NewSongForm'
import HomePage from './HomePage'

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
    <ContextController>
      <Router>
        <TopBar user={currentUser} />
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <AuthenticatedRoute exact path='/artists' component={ ArtistIndex } user={ currentUser }/>
          <AuthenticatedRoute exact path='/go-tos' component={ GoToList } user={ currentUser } />
          <Route exact path='/users/new' component={ RegistrationForm } />
          <Route exact path='/user-sessions/new' component={ SignInForm } />
          <AuthenticatedRoute exact path='/songs/new' component={ NewSongForm } user={ currentUser }/>
          <AuthenticatedRoute exact path='/songs/:id' component={ SongShow } user={ currentUser }/>
        </Switch>
      </Router>
    </ContextController>
  )
}

export default hot(App)