import express from 'express'
import songPerformancesRouter from './songPerformancesRouter.js'

import { Song } from '../../../models/index.js'
import SongSerializer from '../../../serializers/SongSerializer.js'

const songsRouter = new express.Router()

songsRouter.use('/:songId/performances', songPerformancesRouter)

songsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const { userId } = req.query
  try {
    const song = await Song.query().findById(id)
    const serializedSong = await SongSerializer.getDetails(song, userId)
    return res.status(200).json({ song: serializedSong })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

export default songsRouter