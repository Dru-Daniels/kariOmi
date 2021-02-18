import express from 'express'
import { ValidationError } from 'objection'

import cleanUserInput from '../../../services/cleanUserInput.js'
import SongSerializer from '../../../serializers/SongSerializer.js'

import { Song, Performance } from '../../../models/index.js'

const songPerformancesRouter = new express.Router({ mergeParams: true })


songPerformancesRouter.get('/', async (req, res) => {
  const id  = req.params.songId
  try {

    const song = await Song.query().findById(id)
    const serializedSong = await SongSerializer.getDetails(song)
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

songPerformancesRouter.post('/', async (req, res) => {
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
    videoFile 
  } = formInput
  
  const  userId  = req.user.id

  try {
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
    const serializedSong = await SongSerializer.getDetails(song)
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

// songPerformancesRouter.patch('/', async (req, res) => {
//   const { songId } = req.params
//   const { body } = req
//   const cleanBody = cleanUserInput(body)
//   try {
//     await Performance.query().findById(cleanBody.id).update(cleanBody)
//     const performance = await Performance.query().findById(cleanBody.id)
//     const userId = performance.userId
//     const song = await Song.query().findById(songId)
//     const performances = await song.$relatedQuery('performances')
//     const serializedPerformances = await Promise.all(performances.map(performance => PerformanceSerializer.getDetails(performance, userId)))
//     return res.status(201).json({performances: serializedPerformances})
//   } catch (error) {
//     if (error instanceof ValidationError){
//       return res.status(422).json({ errors: error.data })
//     }
//     console.error(error)
//     return res.status(500).json({ errors: error })
//   }
// })

export default songPerformancesRouter