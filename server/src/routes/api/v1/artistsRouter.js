import express from 'express'

import { Artist, User } from '../../../models/index.js'
import artistSongsRouter from './artistSongsRouter.js'
import ArtistSerializer from '../../../serializers/ArtistSerializer.js'

const artistsRouter = new express.Router()

artistsRouter.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const artists = await user.$relatedQuery("artists")
    const serializedArtists = artists.map(artist => {
      return ArtistSerializer.getSummary(artist)
    })
    return res.status(200).json({artists: artists })
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