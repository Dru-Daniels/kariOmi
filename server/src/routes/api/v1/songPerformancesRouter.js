import express from 'express'
import { ValidationError } from 'objection'

import uploadImage from '../../../services/uploadImage.js'

import cleanUserInput from '../../../services/cleanUserInput.js'
import SongSerializer from '../../../serializers/SongSerializer.js'

import { Song, Performance } from '../../../models/index.js'

const songPerformancesRouter = new express.Router({ mergeParams: true })


songPerformancesRouter.get('/', async (req, res) => {
  const id  = req.params.songId
  try {

    const song = await Song.query().findById(id)
    const serializedSong = await SongSerializer.getSongStats(song)
    const performances = serializedSong.performances
    
    let scores = performances.map(performance => {
      return parseFloat(performance.overAllPerformanceScore)
    })
    let length = scores.length
    let total = scores.reduce((a, b) => a + b, 0)
    let overAllSongScore = (total / length).toFixed(1)
    
    return res.status(200).json({ performances: performances, overAllSongScore: overAllSongScore })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

songPerformancesRouter.post('/', uploadImage.single('video'), async (req, res) => {
  const { songId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  const { 
    stagePresence, 
    vocalPerformance, 
    audienceReaction, 
    numOfDrinks, 
    venue, 
    notes, 
  } = formInput
  // debugger
  const videoFile = req.file.location
  const userId = req.user.id
 

  try {
    // debugger
    const newPerformance = await Performance.query().insertAndFetch({ 
      stagePresence, 
      vocalPerformance, 
      audienceReaction, 
      numOfDrinks, 
      venue,  
      notes, 
      videoFile, 
      songId, 
      userId 
    })
    const song = await Song.query().findById(songId)
    const serializedSong = await SongSerializer.getSongStats(song)
    const performances = serializedSong.performances
    
    let scores = performances.map(performance => {
      return parseFloat(performance.overAllPerformanceScore)
    })
    let length = scores.length
    let total = scores.reduce((a, b) => a + b, 0)
    let overAllSongScore = (total / length).toFixed(1)
    
    return res.status(200).json({ performances: performances, overAllSongScore: overAllSongScore })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default songPerformancesRouter