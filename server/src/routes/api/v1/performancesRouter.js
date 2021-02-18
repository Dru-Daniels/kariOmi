
import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

import { Song, Performance } from '../../../models/index.js'

const performancesRouter = new express.Router()


// performancesRouter.post('/', async (req, res) => {
//   const { body } = req
//   const formInput = cleanUserInput(body)
//   const { stagePresence, vocalPerformance, audienceReaction, numOfDrinks, venue,  notes, videoFile, songId } = formInput
//   const  userId  = req.user.id
//   debugger
//   try {
//     const performance = await Performance.query().insertAndFetch({ stagePresence, vocalPerformance, audienceReaction, numOfDrinks, venue,  notes, videoFile, songId, userId })
//     const serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
//     return res.status(201).json({ performance: serializedPerformance })
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       return res.status(422).json({ errors: error.data })
//     }
//     return res.status(500).json({ errors: error })
//   }
// })

performancesRouter.delete('/:id', async (req, res) => {
  const performanceId = req.params.id
  try {
    const performance = await Performance.query().findById(performanceId)
    const userId = performance.userId
    const song = await Song.query().findById(performance.songId)
    await Performance.query().deleteById(performanceId)
    const performances = await song.$relatedQuery('performances')
    const serializedPerformances = await Promise.all(performances.map(performance => {
      return PerformanceSerializer.getPerformanceDetails(performance, userId)
    }))
    return res.status(200).json({ performances: serializedPerformances })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
})

export default performancesRouter