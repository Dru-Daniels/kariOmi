import express from 'express'

import { Artist, User } from '../../../models/index.js'
import artistSongsRouter from './artistSongsRouter.js'
import ArtistSerializer from '../../../serializers/ArtistSerializer.js'

const artistsRouter = new express.Router()

artistsRouter.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    let artists = await user.$relatedQuery("artists").orderBy('artistName').where('userId', userId)
    let filteredArtists = artists.filter((s => a => !s.has(a.id) && s.add(a.id))(new Set))
    let serializedArtists = []
    for (let artist of filteredArtists) {
      let serializedArtist = await ArtistSerializer.getDetails(artist, userId)
      serializedArtists.push(serializedArtist)
    }

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

artistsRouter.delete("/:id", async (req, res) => {
  const artistId = req.params.id
  try {
    await Artist.query().deleteById(artistId);
    return res.status(200).json({delete: "artist deleted"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

artistSongsRouter.use("/:artistId/songs", artistSongsRouter)

export default artistsRouter