import got from "got"
import dotenv from 'dotenv'

dotenv.config()

const REACT_APP_MM_KEY = process.env.REACT_APP_MM_KEY

class AxiosClientTrack {

  static async searchTracks(query) {
    try {
      const url = `http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${query}&page_size=6&page=1&s_track_rating=desc&apikey=${REACT_APP_MM_KEY}`
      const response = await got(url)
      const responseBody = response.body
      const parsedTracksBody = JSON.parse(responseBody)
      return parsedTracksBody
    } catch(err) {
      return {error}
    }
  }  

  static async searchLyrics(trackId) {
    try {
      let lyrics = 'unavailable'
      const url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${REACT_APP_MM_KEY}`
      const response = await got(url)
      if (!response.ok) {
        lyrics = 'unavailable'
      } else {
        const responseBody = response.body
        const parsedSongLyricsBody = JSON.parse(responseBody)
        lyrics = parsedSongLyricsBody.message.body.lyrics.lyrics_body
      }
      return lyrics
    } catch {
      lyrics = 'unavailable' 
      return lyrics
    }
  }
  
}

export default AxiosClientTrack