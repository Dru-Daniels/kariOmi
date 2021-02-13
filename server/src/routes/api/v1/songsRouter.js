import express from 'express'
import { ValidationError } from 'objection'

// import songPerformancesRouter from './songPerformancesRouter.js'

import { Song } from '../../../models/index.js'
import SongSerializer from '../../../serializers/SongSerializer.js'

const songsRouter = new express.Router()

// songsRouter.use('/:songId/performances', songPerformancesRouter)

songsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const song = await Song.query().findById(id)
    const serializedSong = await SongSerializer.getDetails(song)
    return res.status(200).json({ song: serializedSong })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

songsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { practiceNotes } = req.body
    
    await Song.query().patch({ practiceNotes: practiceNotes }).findById(id)
    const song = await Song.query().patchAndFetchById(id, { practiceNotes: practiceNotes })
    const serializedSong =  await SongSerializer.getDetails(song)
    return res.status(201).json({ song: serializedSong })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})





export default songsRouter