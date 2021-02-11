
import express from 'express'
import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'
import { Song, Performance } from '../../../models/index.js'

const performancesRouter = new express.Router()

performancesRouter.delete('/:id', async (req, res) => {
  const performanceId = req.params.id
  try {
    const performance = await Performance.query().findById(performanceId)
    const userId = performance.userId
    const song = await Song.query().findById(performance.songId)
    await Performance.query().deleteById(performanceId)
    const performances = await song.$relatedQuery('performances')
    const serializedPerformances = await Promise.all(performances.map(performance => {
      return PerformanceSerializer.getDetails(performance, userId)
    }))
    return res.status(200).json({ performances: serializedPerformances })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
})

export default performancesRouter