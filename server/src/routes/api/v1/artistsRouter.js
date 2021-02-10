
import express from 'express'

import { Artist } from '../../../models/index.js'
import artistSongsRouter from './artistSongsRouter.js'
import ArtistSerializer from '../../../serializers/ArtistSerializer.js'

const artistsRouter = new express.Router()

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.query()
    const serializedArtists = artists.map(artist => {
      return ArtistSerializer.getSummary(artist)
    })
    return res.status(200).json({artists: serializedArtists })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

artistsRouter.get('/:id', async (req, res) => {
  try {
    const artistId = req.params.id
    const artist = await Artist.query().findById(artistId)
    const serializedArtist = await ArtistSerializer.getDetails(artist)
    return res.status(200).json({ artist: serializedArtist })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

artistSongsRouter.use("/:artistId/songs", artistSongsRouter)

export default artistsRouter