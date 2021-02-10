import express from 'express'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { ValidationError } from 'objection'
import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'
import { Song } from '../../../models/index.js'

const songPerformancesRouter = new express.Router({ mergeParams: true })

songPerformancesRouter.post('/', async (req, res) => {
  const { songId } = req.params
  const { body } = req
  const cleanBody = cleanUserInput(body)

  try {
    const newPerformance = await Performance.query().insertAndFetch({ ...cleanBody, songId })
    const serializedPerformance = await ReviewSerializer.getDetails(newPerformance, newPerformance.userId)
    return res.status(201).json({ performance: serializedPerformance })
  } catch (error){
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

songPerformancesRouter.patch('/', async (req, res) => {
  const { songId } = req.params
  const { body } = req
  const cleanBody = cleanUserInput(body)
  try {
    await Performance.query().findById(cleanBody.id).update(cleanBody)
    const performance = await Performance.query().findById(cleanBody.id)
    const userId = performance.userId
    const song = await Song.query().findById(songId)
    const performances = await song.$relatedQuery('performances')
    const serializedPerformances = await Promise.all(performances.map(performance => PerformanceSerializer.getDetails(performance, userId)))
    return res.status(201).json({performances: serializedPerformances})
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
    }
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

export default songPerformancesRouter