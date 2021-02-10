import express from 'express'
import userSessionsRouter from './api/v1/userSessionsRouter.js'
import usersRouter from './api/v1/usersRouter.js'
import artistsRouter from './api/v1/artistsRouter.js'
import songsRouter from './api/v1/songsRouter.js'
import performancesRouter from './api/v1/performancesRouter.js'
import clientRouter from './clientRouter.js'
const rootRouter = new express.Router()
rootRouter.use('/', clientRouter)

rootRouter.use('/api/v1/user-sessions', userSessionsRouter)
rootRouter.use('/api/v1/users', usersRouter)
rootRouter.use('/api/v1/artists', artistsRouter)
rootRouter.use('/api/v1/songs', songsRouter)
rootRouter.use('/api/v1/performances', performancesRouter)

export default rootRouter
