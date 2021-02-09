import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Song } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

const artistSongsRouter = new express.Router({ mergeParams: true })

artistSongsRouter.post('/', async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { songId } = req.params
  try {
    const newSong = await Song.query().insertAndFetch({ ...formInput, songId})
    return res.status(201).json({ newSong })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default artistSongsRouter