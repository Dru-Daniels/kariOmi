import got from "got"
import dotenv from 'dotenv'

dotenv.config()

const youTubeApiKey = process.env.youTubeApiKey

class YouTubeClientLyrics {
  static async searchLyrics(userInput) {
    let lyricsQuery = `lyric video ${userInput}`

    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=${lyricsQuery}&type=video&videoDefinition=high&key=${youTubeApiKey}`
      const response = await got(url)
      const responseBody = response.body
      const parsedLyricsBody = JSON.parse(responseBody)
      return parsedLyricsBody
    } catch(err) {
      return {error}
    }

  }  
  
}

export default YouTubeClientLyrics