import express from 'express'
import getClientIndexPath from '../config/getClientIndexPath.js'

const router = new express.Router()

const clientRoutes = ['/', '/artists', '/go-tos/', '/user-sessions/new', '/users/new', '/artists/:id', '/songs/:id', '/songs/new',]
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
