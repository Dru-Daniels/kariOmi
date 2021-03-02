import express from 'express'
import { ValidationError } from 'objection'

import uploadImage from '../../../services/uploadImage.js'
import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'

import { Song, Performance } from '../../../models/index.js'

const songPerformancesRouter = new express.Router({ mergeParams: true })

songPerformancesRouter.get('/', async (req, res) => {
  const id  = req.params.songId
  try {
    let song = await Song.query().findById(id)
    let performances = await song.$relatedQuery("performances")

    let serializedPerformances = []
    let scores = []
    for (let performance of performances) {
      let serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
      serializedPerformances.push(serializedPerformance)
      scores.push(parseFloat(serializedPerformance.performanceScore))
    }
    let length = scores.length
    let total = scores.reduce((a,b) => a + b, 0)
    let overAllSongScore = (total / length).toFixed(1)
    
    return res.status(200).json({ performances: serializedPerformances, overAllSongScore: overAllSongScore })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

songPerformancesRouter.post('/', uploadImage.single('video'), async (req, res) => {
  const { songId } = req.params
  const userId = req.user.id
  let formInput = req.body
  let { 
    stagePresence, 
    vocalPerformance, 
    audienceReaction, 
    numOfDrinks, 
    venue, 
    notes, 
  } = formInput

  let performanceScore = ((parseFloat(stagePresence) + parseFloat(vocalPerformance) + parseFloat(audienceReaction)) / 3 ).toFixed(1)
  let videoFile
  if (req.file === undefined) {
    videoFile = " "
  } else {
    videoFile = req.file.location
  }
  numOfDrinks = parseFloat(numOfDrinks)
  try {
    await Performance.query().insert({ 
      stagePresence, 
      vocalPerformance, 
      audienceReaction, 
      numOfDrinks, 
      venue,  
      notes, 
      videoFile, 
      songId, 
      userId,
      performanceScore
    })
    let song = await Song.query().findById(songId)
    let performances = await song.$relatedQuery("performances")

    let serializedPerformances = []
    let scores = []
    for (let performance of performances) {
      let serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
      serializedPerformances.push(serializedPerformance)
      scores.push(parseFloat(serializedPerformance.performanceScore))
    }
    let length = scores.length
    let total = scores.reduce((a,b) => a + b, 0)
    let overAllSongScore = (total / length).toFixed(1)
    
    return res.status(200).json({ performances: serializedPerformances, overAllSongScore: overAllSongScore })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default songPerformancesRouter