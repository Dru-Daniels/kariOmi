
import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'
import SongSerializer from '../../../serializers/SongSerializer.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

import { Song, Performance } from '../../../models/index.js'

const performancesRouter = new express.Router()

performancesRouter.get("/", async (req, res) => {
  try {
    const songs = await Song.query()
    
    const serializedSongs = []
    for (const song of songs) {
      const serializedSong = await SongSerializer.getSongStats(song)
      serializedSongs.push(serializedSong)
    }

    let newSongs = []
    for (const song of serializedSongs) {
      if (song.performanceReady === true) {
        newSongs.push(song)
      }
    }

    return res.status(200).json({ songs: newSongs })
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

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