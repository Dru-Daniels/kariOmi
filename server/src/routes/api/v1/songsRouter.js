import express from 'express'
import { ValidationError } from 'objection'

import AxiosClientTrack from '../../../apiClient/AxiosClientTrack.js'
import SongSerializer from '../../../serializers/SongSerializer.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

import songPerformancesRouter from './songPerformancesRouter.js'

import { Artist } from '../../../models/index.js'
import { Song } from '../../../models/index.js'

const songsRouter = new express.Router()

songsRouter.use('/:songId/performances', songPerformancesRouter)

songsRouter.get("/", async (req, res) => {
  try {
    const songs = await Song.query()
    
    const serializedSongs = []
    for (const song of songs) {
      const serializedSong = await SongSerializer.getSongStats(song)
      serializedSongs.push(serializedSong)
    }
    return res.status(200).json({ songs: serializedSongs })
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

songsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const song = await Song.query().findById(id)
    
    let trackId= await song.trackId  
    const songLyrics = await AxiosClientTrack.searchLyrics(trackId)
    song.lyrics = songLyrics
    const serializedSong = await SongSerializer.getDetails(song)
    return res.status(200).json({ song: serializedSong })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

songsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { practiceNotes, lyrics, performanceReady } = req.body
    await Song.query().patch({ practiceNotes: practiceNotes, lyrics: lyrics, performanceReady: performanceReady }).findById(id)
    const song = await Song.query().patchAndFetchById(id, { practiceNotes: practiceNotes, lyrics: lyrics })
    const serializedSong =  await SongSerializer.getDetails(song)
    return res.status(201).json({ song: serializedSong })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

songsRouter.post('/', async (req, res) => {
  let { body } = req
  let formInput = cleanUserInput(body)
  // let { karaokeVideoId, lyricVideoId, lyrics, practiceNotes, performanceReady } = formInput
  let karaokeVideoId = formInput.karaokeVideoId
  let lyricVideoId = formInput.lyricVideoId
  let lyrics = formInput.lyrics
  let practiceNotes = formInput.practiceNotes
  let performanceReady = formInput.performanceReady
  let artistName = formInput.track.artist_name
  let songTitle = formInput.track.track_name
  let trackId = formInput.track.track_id

  let  userId  = req.user.id
  let artistId

  try {
    let artist = await Artist.query().findOne({artistName})
      if(artist !== undefined) {
        artistId = artist.id
      } else {
        artist = await Artist.query().insertAndFetch({artistName})
        artistId = artist.id
      }
    let song = await Song.query().insertAndFetch({ 
      songTitle, 
      karaokeVideoId, 
      lyricVideoId, 
      lyrics, 
      practiceNotes, 
      performanceReady, 
      artistId, 
      userId,
      trackId 
    })
    const serializedSong =  await SongSerializer.getDetails(song)
    return res.status(201).json({ song: serializedSong })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.log(error.data)
    return res.status(500).json({ errors: error })
  }
})

export default songsRouter