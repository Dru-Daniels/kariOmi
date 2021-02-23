import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import PerformanceSerializer from '../../../serializers/PerformanceSerializer.js'
import SongSerializer from '../../../serializers/SongSerializer.js'

import { Song, Performance, User } from '../../../models/index.js'

const performancesRouter = new express.Router()

performancesRouter.get("/", async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const songs = await user.$relatedQuery("songs")

 
    let serializedSongs = []
    for (const song of songs) {
      if (song.performanceReady === true) {
        const serializedSong = await SongSerializer.getSongStats(song)
        serializedSongs.push(serializedSong)
      }
    }

    return res.status(200).json({ songs: serializedSongs })
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