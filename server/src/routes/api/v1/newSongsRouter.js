import express from "express"

import AxiosClientTrack from '../../../apiClient/AxiosClientTrack.js'
import YouTubeClientKaraoke from '../../../apiClient/YouTubeClientKaraoke.js'
import YouTubeClientLyrics from '../../../apiClient/YouTubeClientLyrics.js'

const newSongsRouter = new express.Router();

newSongsRouter.post("/", async (req, res) => { 
  const query  = req.query.query
  try {
    const trackResults = await AxiosClientTrack.searchTracks(query)
    const karaokeResults = await YouTubeClientKaraoke.searchKaraoke(query)
    const lyricResults = await YouTubeClientLyrics.searchLyrics(query)
    return res.status(201).json( {trackResults: trackResults, karaokeResults: karaokeResults, lyricResults: lyricResults} );
  } catch (error){
    return res.status(422).json({ errors: error });
  }
});

export default newSongsRouter